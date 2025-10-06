// Test script for frontend authentication
import apiClient from './src/utils/api/client.ts';

async function testFrontendAuth() {
  try {
    console.log('Testing frontend authentication with Netlify functions...');
    
    // Test login
    console.log('\n1. Testing login...');
    const loginResponse = await apiClient.login('superadmin@edusync.com', 'password123');
    console.log('Login response:', loginResponse);
    
    if (loginResponse.data) {
      console.log('✅ Login successful!');
      console.log('User:', loginResponse.data.user);
    } else {
      console.log('❌ Login failed:', loginResponse.error);
    }
    
    // Test registration
    console.log('\n2. Testing registration...');
    const registerResponse = await apiClient.register({
      email: 'frontendtest@example.com',
      password: 'password123',
      name: 'Frontend Test User'
    });
    console.log('Registration response:', registerResponse);
    
    if (registerResponse.data) {
      console.log('✅ Registration successful!');
      console.log('User:', registerResponse.data.user);
    } else {
      console.log('❌ Registration failed:', registerResponse.error);
    }
    
    console.log('\n✅ Frontend authentication test completed!');
    
  } catch (error) {
    console.error('Frontend auth test error:', error);
  }
}

testFrontendAuth();