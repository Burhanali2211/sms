// Netlify function to check database constraints
import { neon } from '@netlify/neon';

exports.handler = async (event, context) => {
  try {
    // Initialize Netlify DB connection
    const sql = neon();
    
    // Get constraint information for users table
    const constraints = await sql`
      SELECT 
        tc.constraint_name,
        tc.constraint_type,
        kcu.column_name,
        cc.check_clause
      FROM information_schema.table_constraints tc
      LEFT JOIN information_schema.key_column_usage kcu 
        ON tc.constraint_name = kcu.constraint_name
      LEFT JOIN information_schema.check_constraints cc 
        ON tc.constraint_name = cc.constraint_name
      WHERE tc.table_name = 'users'
      ORDER BY tc.constraint_name
    `;
    
    // Get enum values if role is an enum
    const enumValues = await sql`
      SELECT t.typname, e.enumlabel
      FROM pg_type t
      JOIN pg_enum e ON t.oid = e.enumtypid
      WHERE t.typname LIKE '%role%'
      ORDER BY e.enumsortorder
    `;
    
    // Try to insert a test user with different roles to see which ones work
    const testRoles = ['admin', 'student', 'teacher', 'user'];
    const roleTestResults = {};
    
    for (const role of testRoles) {
      try {
        // Try to insert a test user with this role (this will be rolled back)
        await sql`
          INSERT INTO users (email, password_hash, name, role)
          VALUES ('test_' || ${role} || '@example.com', 'test_hash', 'Test ' || ${role}, ${role})
        `;
        roleTestResults[role] = 'allowed';
        
        // Delete the test user
        await sql`
          DELETE FROM users 
          WHERE email = 'test_' || ${role} || '@example.com'
        `;
      } catch (error) {
        roleTestResults[role] = 'rejected: ' + error.message;
      }
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        constraints: constraints,
        enumValues: enumValues,
        roleTestResults: roleTestResults,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Constraint check error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        message: 'Constraint check failed',
        error: error.message
      })
    };
  }
};