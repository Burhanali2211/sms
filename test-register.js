// Test script for registration function
async function testRegister() {
  try {
    const response = await fetch('https://edusync-school.netlify.app/.netlify/functions/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      })
    });
    
    const data = await response.json();
    console.log('Registration response:', data);
  } catch (error) {
    console.error('Registration error:', error);
  }
}

testRegister();