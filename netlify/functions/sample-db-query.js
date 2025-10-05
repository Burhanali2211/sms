import { neon } from '@netlify/neon';

// This function demonstrates how to query the Netlify DB
export default async (req, res) => {
  try {
    // Automatically uses env NETLIFY_DATABASE_URL
    const sql = neon();
    
    // Example query - replace with your actual table and data
    const result = await sql`SELECT * FROM users LIMIT 5`;
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Successfully queried Netlify DB'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to query Netlify DB'
    });
  }
};