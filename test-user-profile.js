// Test script for user profile update functionality
async function testUserProfile() {
  try {
    console.log('Testing user profile update functionality...');
    
    // Test updating user profile
    console.log('\n1. Testing user profile update...');
    const updateUserResponse = await fetch('https://edusync-school.netlify.app/.netlify/functions/users/8b64f2de-34b8-4cc5-90b7-c92cb695b650', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Warren Kirby Updated',
        phone: '+1 (248) 285-3425',
        address: 'Et mollit assumenda ',
        avatar_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwEAAAFERejJEBERERExMUoCRARERERcTH/P2NSzQeHhJO8AAAAAElFTkSuQmCC'
      })
    });
    
    const updateUserData = await updateUserResponse.json();
    console.log('Update user response:', updateUserData);
    
    if (updateUserData.success) {
      console.log('✅ User profile updated successfully!');
      console.log('Updated user:', updateUserData.user);
      
      // Test getting the updated user
      console.log('\n2. Testing user retrieval...');
      const getUserResponse = await fetch('https://edusync-school.netlify.app/.netlify/functions/users/8b64f2de-34b8-4cc5-90b7-c92cb695b650');
      const getUserData = await getUserResponse.json();
      console.log('Get user response:', getUserData);
      
      if (getUserData.success) {
        console.log('✅ User retrieved successfully!');
        console.log('User data:', getUserData.user);
      } else {
        console.log('❌ User retrieval failed:', getUserData.message);
      }
    } else {
      console.log('❌ User profile update failed:', updateUserData.message);
    }
    
    console.log('\n✅ User profile test completed!');
    
  } catch (error) {
    console.error('User profile test error:', error);
  }
}

testUserProfile();