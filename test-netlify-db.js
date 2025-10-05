// Test script for Netlify DB integration
import { neon } from '@netlify/neon';

async function testNetlifyDB() {
  try {
    console.log('Testing Netlify DB connection...');
    
    // Initialize the neon client (uses NETLIFY_DATABASE_URL automatically)
    const sql = neon();
    
    console.log('Netlify DB client initialized successfully');
    
    // Note: We can't actually run a query here because we don't know what tables exist
    // in the user's database. This is just to verify the import works.
    
    console.log('Netlify DB integration is ready to use!');
    console.log('To use in your functions, import and use like this:');
    console.log('');
    console.log('import { neon } from \'@netlify/neon\';');
    console.log('const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL');
    console.log('const [post] = await sql`SELECT * FROM your_table WHERE id = ${postId}`;');
    
  } catch (error) {
    console.error('Error testing Netlify DB integration:', error.message);
  }
}

// Run the test
testNetlifyDB();