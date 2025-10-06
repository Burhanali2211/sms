// Test script for login function
async function testLogin() {
  try {
    const response = await fetch('https://edusync-school.netlify.app/.netlify/functions/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'superadmin@edusync.com',
        password: 'password123'
      })
    });
    
    const data = await response.json();
    console.log('Login response:', data);
  } catch (error) {
    console.error('Login error:', error);
  }
}

testLogin();