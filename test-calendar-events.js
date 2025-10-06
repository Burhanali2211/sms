// Test script for calendar and events functionality
async function testCalendarEvents() {
  try {
    console.log('Testing calendar and events functionality...');
    
    // Test creating an event
    console.log('\n1. Testing event creation...');
    const createEventResponse = await fetch('https://edusync-school.netlify.app/.netlify/functions/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Event',
        description: 'This is a test event',
        start_date: '2025-10-10T10:00:00Z',
        end_date: '2025-10-10T12:00:00Z',
        location: 'Room 101',
        event_type: 'meeting',
        color: '#3b82f6',
        created_by: '8b64f2de-34b8-4cc5-90b7-c92cb695b650', // Super admin ID from earlier test
        is_public: true
      })
    });
    
    const createEventData = await createEventResponse.json();
    console.log('Create event response:', createEventData);
    
    if (createEventData.success) {
      console.log('✅ Event created successfully!');
      const eventId = createEventData.event.id;
      
      // Test getting the event
      console.log('\n2. Testing event retrieval...');
      const getEventResponse = await fetch(`https://edusync-school.netlify.app/.netlify/functions/events/${eventId}`);
      const getEventData = await getEventResponse.json();
      console.log('Get event response:', getEventData);
      
      if (getEventData.success) {
        console.log('✅ Event retrieved successfully!');
        
        // Test updating the event
        console.log('\n3. Testing event update...');
        const updateEventResponse = await fetch(`https://edusync-school.netlify.app/.netlify/functions/events/${eventId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Updated Test Event',
            description: 'This is an updated test event'
          })
        });
        
        const updateEventData = await updateEventResponse.json();
        console.log('Update event response:', updateEventData);
        
        if (updateEventData.success) {
          console.log('✅ Event updated successfully!');
          
          // Test getting notifications (there should be some from the event creation)
          console.log('\n4. Testing notifications retrieval...');
          const getNotificationsResponse = await fetch(`https://edusync-school.netlify.app/.netlify/functions/notifications?user_id=8b64f2de-34b8-4cc5-90b7-c92cb695b650`);
          const getNotificationsData = await getNotificationsResponse.json();
          console.log('Get notifications response:', getNotificationsData);
          
          if (getNotificationsData.success) {
            console.log('✅ Notifications retrieved successfully!');
            console.log(`Found ${getNotificationsData.notifications.length} notifications`);
          }
          
          // Test dashboard stats
          console.log('\n5. Testing dashboard stats...');
          const getDashboardStatsResponse = await fetch(`https://edusync-school.netlify.app/.netlify/functions/dashboard/stats?user_id=8b64f2de-34b8-4cc5-90b7-c92cb695b650&role=super-admin`);
          const getDashboardStatsData = await getDashboardStatsResponse.json();
          console.log('Get dashboard stats response:', getDashboardStatsData);
          
          if (getDashboardStatsData.success) {
            console.log('✅ Dashboard stats retrieved successfully!');
            console.log('Stats:', getDashboardStatsData.stats);
          }
          
          // Test deleting the event
          console.log('\n6. Testing event deletion...');
          const deleteEventResponse = await fetch(`https://edusync-school.netlify.app/.netlify/functions/events/${eventId}`, {
            method: 'DELETE'
          });
          
          const deleteEventData = await deleteEventResponse.json();
          console.log('Delete event response:', deleteEventData);
          
          if (deleteEventData.success) {
            console.log('✅ Event deleted successfully!');
          } else {
            console.log('❌ Event deletion failed:', deleteEventData.message);
          }
        } else {
          console.log('❌ Event update failed:', updateEventData.message);
        }
      } else {
        console.log('❌ Event retrieval failed:', getEventData.message);
      }
    } else {
      console.log('❌ Event creation failed:', createEventData.message);
    }
    
    console.log('\n✅ Calendar and events test completed!');
    
  } catch (error) {
    console.error('Calendar events test error:', error);
  }
}

testCalendarEvents();