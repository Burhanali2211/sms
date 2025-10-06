// Netlify function to check database schema
import { neon } from '@netlify/neon';

exports.handler = async (event, context) => {
  try {
    // Initialize Netlify DB connection
    const sql = neon();
    
    // Get all tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    // Get column information for each table
    const tableInfo = {};
    for (const table of tables) {
      const tableName = table.table_name;
      const columns = await sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = ${tableName}
        ORDER BY ordinal_position
      `;
      tableInfo[tableName] = columns;
    }
    
    // Check constraints for users table
    const constraints = await sql`
      SELECT constraint_name, constraint_type, check_clause
      FROM information_schema.table_constraints tc
      LEFT JOIN information_schema.check_constraints cc ON tc.constraint_name = cc.constraint_name
      WHERE tc.table_name = 'users'
    `;
    
    // Check enum values for role column if it exists
    const enumValues = await sql`
      SELECT enumlabel
      FROM pg_enum e
      JOIN pg_type t ON e.enumtypid = t.oid
      WHERE t.typname = 'user_role'
      ORDER BY e.enumsortorder
    `;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        tables: tableInfo,
        constraints: constraints,
        enumValues: enumValues,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Schema check error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        message: 'Schema check failed',
        error: error.message
      })
    };
  }
};