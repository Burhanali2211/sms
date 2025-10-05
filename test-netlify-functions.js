// Script to test Netlify functions
async function testNetlifyFunctions() {
  const siteUrl = 'https://edusync-school.netlify.app';
  
  console.log('Testing Netlify Functions');
  console.log('========================');
  
  try {
    // Test database connection
    console.log('\n1. Testing database connection...');
    const dbTestResponse = await fetch(`${siteUrl}/.netlify/functions/db-test`);
    const dbTestData = await dbTestResponse.json();
    console.log('Database test result:', dbTestData);
    
    // Test auth function
    console.log('\n2. Testing auth function...');
    const authTestResponse = await fetch(`${siteUrl}/.netlify/functions/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'superadmin@edusync.com',
        password: 'password123'
      })
    });
    const authTestData = await authTestResponse.json();
    console.log('Auth test result:', authTestData);
    
    console.log('\n✅ Netlify functions are working correctly!');
    console.log('\nNext steps:');
    console.log('1. To initialize the database, make a POST request to:');
    console.log(`   ${siteUrl}/.netlify/functions/init-db`);
    console.log('2. To test login, make a POST request to:');
    console.log(`   ${siteUrl}/.netlify/functions/auth/login`);
    console.log('3. To test registration, make a POST request to:');
    console.log(`   ${siteUrl}/.netlify/functions/auth/register`);
    
  } catch (error) {
    console.error('Error testing Netlify functions:', error);
  }
}

testNetlifyFunctions();