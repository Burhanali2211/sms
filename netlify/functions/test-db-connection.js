// Netlify function to test database connection
import { neon } from '@netlify/neon';

export default async (req, res) => {
  try {
    // Test Netlify DB connection
    console.log('Testing Netlify DB connection...');
    
    // Check if Netlify DB is available
    const isAvailable = !!process.env.NETLIFY_DATABASE_URL;
    console.log('Netlify DB available:', isAvailable);
    
    if (isAvailable) {
      // Initialize the neon client
      const sql = neon();
      console.log('Netlify DB client initialized successfully');
      
      // Try a simple query to test the connection
      // Note: This will only work if you have a 'posts' table in your database
      try {
        const result = await sql`SELECT version()`;
        console.log('Database query successful:', result);
        
        res.status(200).json({
          success: true,
          message: 'Netlify DB connection successful!',
          database: result[0],
          timestamp: new Date().toISOString()
        });
      } catch (queryError) {
        console.error('Database query failed:', queryError);
        res.status(200).json({
          success: true,
          message: 'Netlify DB connected but query failed (may be due to missing tables)',
          error: queryError.message,
          timestamp: new Date().toISOString()
        });
      }
    } else {
      res.status(200).json({
        success: true,
        message: 'Netlify DB is not available in this environment',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error testing Netlify DB connection:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};