// Netlify function for events and calendar operations
import { neon } from '@netlify/neon';

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    console.log('Events function called with method:', event.httpMethod);
    console.log('Request path:', event.path);
    
    // Parse the request body
    let body = {};
    if (event.httpMethod === 'POST' || event.httpMethod === 'PUT') {
      if (typeof event.body === 'string') {
        body = JSON.parse(event.body);
      } else if (typeof event.body === 'object') {
        body = event.body;
      }
      console.log('Parsed body:', body);
    }

    // Initialize Netlify DB connection
    const sql = neon();

    // Route handling
    if (event.path === '/.netlify/functions/events' && event.httpMethod === 'GET') {
      // Get all events
      const { start_date, end_date, user_id } = event.queryStringParameters || {};
      
      let query, params;
      if (start_date && end_date) {
        // Filter by date range
        query = `
          SELECT e.*, u.name as created_by_name
          FROM events e
          LEFT JOIN users u ON e.created_by = u.id
          WHERE (e.start_date BETWEEN $1 AND $2 OR e.end_date BETWEEN $1 AND $2)
          ORDER BY e.start_date
        `;
        params = [start_date, end_date];
      } else {
        // Get all events
        query = `
          SELECT e.*, u.name as created_by_name
          FROM events e
          LEFT JOIN users u ON e.created_by = u.id
          ORDER BY e.start_date
        `;
        params = [];
      }
      
      const events = await sql(query, params);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          events
        })
      };

    } else if (event.path === '/.netlify/functions/events' && event.httpMethod === 'POST') {
      // Create a new event
      const { title, description, start_date, end_date, location, event_type, color, created_by, is_public } = body;
      
      // Log the incoming data for debugging
      console.log('Creating event with data:', body);
      
      // Validate required fields
      if (!title || !start_date || !end_date || !created_by) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Title, start_date, end_date, and created_by are required'
          })
        };
      }
      
      // Validate date formats
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Invalid date format. Please use ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)'
          })
        };
      }
      
      if (startDate >= endDate) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'End date must be after start date'
          })
        };
      }
      
      try {
        // Insert new event
        const [newEvent] = await sql`
          INSERT INTO events (title, description, start_date, end_date, location, event_type, color, created_by, is_public)
          VALUES (${title}, ${description || ''}, ${start_date}, ${end_date}, ${location || ''}, ${event_type || 'event'}, ${color || '#3b82f6'}, ${created_by}, ${is_public !== undefined ? is_public : true})
          RETURNING *
        `;
        
        console.log('Event created successfully:', newEvent);
        
        // Create notifications for all relevant users
        try {
          // Get all users except the creator
          const users = await sql`
            SELECT id FROM users WHERE id != ${created_by}
          `;
          
          console.log(`Creating notifications for ${users.length} users`);
          
          // Create a single notification and then link it to all users
          const [notification] = await sql`
            INSERT INTO notifications (title, message, type, created_by, action_url)
            VALUES (${`New Event: ${title}`}, ${`A new event "${title}" has been scheduled for ${new Date(start_date).toLocaleDateString()}`}, 'event', ${created_by}, ${`/calendar/${newEvent.id}`})
            RETURNING id
          `;
          
          if (notification && users.length > 0) {
            // Prepare batch insert for user_notifications
            const userNotificationValues = users.map(user => 
              `(${notification.id}, ${user.id})`
            ).join(',');
            
            await sql`
              INSERT INTO user_notifications (notification_id, user_id)
              VALUES ${userNotificationValues}
            `;
          }
        } catch (notificationError) {
          console.error('Error creating notifications:', notificationError);
        }
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Event created successfully',
            event: newEvent
          })
        };
      } catch (insertError) {
        console.error('Error inserting event:', insertError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Failed to create event',
            error: insertError.message
          })
        };
      }

    } else if (event.path.startsWith('/.netlify/functions/events/') && event.httpMethod === 'GET') {
      // Get a specific event
      const eventId = event.path.split('/').pop();
      
      const events = await sql`
        SELECT e.*, u.name as created_by_name
        FROM events e
        LEFT JOIN users u ON e.created_by = u.id
        WHERE e.id = ${eventId}
      `;
      
      if (events.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Event not found'
          })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          event: events[0]
        })
      };

    } else if (event.path.startsWith('/.netlify/functions/events/') && event.httpMethod === 'PUT') {
      // Update an event
      const eventId = event.path.split('/').pop();
      const { title, description, start_date, end_date, location, event_type, color, is_public } = body;
      
      // Check if event exists
      const existingEvents = await sql`
        SELECT * FROM events WHERE id = ${eventId}
      `;
      
      if (existingEvents.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Event not found'
          })
        };
      }
      
      // Update event
      const [updatedEvent] = await sql`
        UPDATE events
        SET title = COALESCE(${title}, title),
            description = COALESCE(${description}, description),
            start_date = COALESCE(${start_date}, start_date),
            end_date = COALESCE(${end_date}, end_date),
            location = COALESCE(${location}, location),
            event_type = COALESCE(${event_type}, event_type),
            color = COALESCE(${color}, color),
            is_public = COALESCE(${is_public}, is_public),
            updated_at = NOW()
        WHERE id = ${eventId}
        RETURNING *
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Event updated successfully',
          event: updatedEvent
        })
      };

    } else if (event.path.startsWith('/.netlify/functions/events/') && event.httpMethod === 'DELETE') {
      // Delete an event
      const eventId = event.path.split('/').pop();
      
      // Check if event exists
      const existingEvents = await sql`
        SELECT * FROM events WHERE id = ${eventId}
      `;
      
      if (existingEvents.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Event not found'
          })
        };
      }
      
      // Delete event
      await sql`
        DELETE FROM events WHERE id = ${eventId}
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Event deleted successfully'
        })
      };

    } else {
      // Handle unsupported routes
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Endpoint not found'
        })
      };
    }
  } catch (error) {
    console.error('Events function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};