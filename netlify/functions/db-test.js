// Netlify function to test database connection
import { neon } from '@netlify/neon';

exports.handler = async (event, context) => {
  try {
    console.log('Starting database test function');
    
    // Initialize Netlify DB connection
    // This automatically uses the NETLIFY_DATABASE_URL environment variable
    const sql = neon();
    console.log('Neon client initialized');
    
    // Test the connection by querying the database version
    console.log('Executing version query');
    const result = await sql`SELECT version()`;
    console.log('Version query result:', result);
    
    const { version } = result[0];
    console.log('Database version:', version);
    
    // Check what roles exist in the users table
    try {
      console.log('Checking existing user roles');
      const roles = await sql`
        SELECT DISTINCT role 
        FROM users
      `;
      console.log('Existing roles:', roles);
    } catch (roleError) {
      console.log('Error checking roles:', roleError.message);
    }
    
    // Also test if we can access the users table
    let userCount = 0;
    try {
      console.log('Executing user count query');
      const userResult = await sql`SELECT COUNT(*) as count FROM users`;
      console.log('User count query result:', userResult);
      userCount = userResult[0].count;
    } catch (userError) {
      console.log('Users table may not exist yet:', userError.message);
    }
    
    const response = {
      success: true,
      message: 'Database connection successful!',
      databaseVersion: version,
      userCount: userCount,
      timestamp: new Date().toISOString()
    };
    
    console.log('Sending successful response:', response);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Database connection error:', error);
    
    const errorResponse = {
      success: false,
      message: 'Database connection failed',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString()
    };
    
    console.log('Sending error response:', errorResponse);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorResponse)
    };
  }
};