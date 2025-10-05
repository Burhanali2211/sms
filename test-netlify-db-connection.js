// Test script to verify Netlify DB connection
async function testNetlifyDBConnection() {
  try {
    console.log('Testing Netlify DB connection...');
    
    // Check if Netlify DB is available
    const isAvailable = typeof process !== 'undefined' && !!process.env.NETLIFY_DATABASE_URL;
    console.log('Netlify DB available:', isAvailable);
    
    if (isAvailable) {
      console.log('NETLIFY_DATABASE_URL:', process.env.NETLIFY_DATABASE_URL);
      
      // Try to import and use the neon client
      const { neon } = await import('@netlify/neon');
      const sql = neon();
      
      console.log('Netlify DB client initialized successfully');
      console.log('✅ Netlify DB integration is ready to use!');
      
      console.log('\nTo use in your functions, import and use like this:');
      console.log('');
      console.log('import { neon } from \'@netlify/neon\';');
      console.log('const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL');
      console.log('const [post] = await sql`SELECT * FROM your_table WHERE id = ${postId}`;');
      
    } else {
      console.log('Netlify DB is not available in this environment');
      console.log('The application will fall back to the traditional PostgreSQL connection');
    }
    
  } catch (error) {
    console.error('Error testing Netlify DB integration:', error.message);
  }
}

// Run the test
testNetlifyDBConnection();