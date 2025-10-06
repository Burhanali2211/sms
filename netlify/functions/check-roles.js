// Netlify function to check user roles
import { neon } from '@netlify/neon';

exports.handler = async (event, context) => {
  try {
    // Initialize Netlify DB connection
    const sql = neon();
    
    // Get all distinct roles
    const roles = await sql`
      SELECT DISTINCT role 
      FROM users
      ORDER BY role
    `;
    
    // Get a sample user to see the structure
    const sampleUser = await sql`
      SELECT id, email, name, role
      FROM users
      LIMIT 1
    `;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        roles: roles.map(r => r.role),
        sampleUser: sampleUser[0],
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Role check error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        message: 'Role check failed',
        error: error.message
      })
    };
  }
};