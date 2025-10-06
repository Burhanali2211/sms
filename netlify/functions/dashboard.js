// Netlify function for dashboard data
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
    console.log('Dashboard function called with method:', event.httpMethod);
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
    if (event.path === '/.netlify/functions/dashboard/stats' && event.httpMethod === 'GET') {
      // Get dashboard statistics
      const { user_id, role } = event.queryStringParameters || {};
      
      if (!user_id || !role) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'user_id and role are required'
          })
        };
      }
      
      try {
        // Get user count
        const userCount = await sql`SELECT COUNT(*) as count FROM users`;
        
        // Get event count
        const eventCount = await sql`SELECT COUNT(*) as count FROM events`;
        
        // Get notification count for user
        const notificationCount = await sql`
          SELECT COUNT(*) as count
          FROM notifications n
          JOIN user_notifications un ON n.id = un.notification_id
          WHERE un.user_id = ${user_id}
        `;
        
        // Get unread notification count for user
        const unreadNotificationCount = await sql`
          SELECT COUNT(*) as count
          FROM notifications n
          JOIN user_notifications un ON n.id = un.notification_id
          WHERE un.user_id = ${user_id} AND un.is_read = false
        `;
        
        // Get recent events (next 7 days)
        const recentEvents = await sql`
          SELECT *
          FROM events
          WHERE start_date >= NOW() AND start_date <= NOW() + INTERVAL '7 days'
          ORDER BY start_date
          LIMIT 5
        `;
        
        // Format stats properly for the frontend
        const stats = [
          {
            metric: "total_users",
            value: parseInt(userCount[0].count),
            label: "Total Users",
            description: "Active users in the system"
          },
          {
            metric: "total_events",
            value: parseInt(eventCount[0].count),
            label: "Events",
            description: "Scheduled events"
          },
          {
            metric: "total_notifications",
            value: parseInt(notificationCount[0].count),
            label: "Notifications",
            description: "Your notifications"
          },
          {
            metric: "unread_notifications",
            value: parseInt(unreadNotificationCount[0].count),
            label: "Unread",
            description: "Unread notifications"
          }
        ];
        
        // Role-specific stats
        let roleEvents = [];
        if (role === 'student') {
          // Get student-specific data
          roleEvents = await sql`
            SELECT *
            FROM events
            WHERE is_public = true OR created_by = ${user_id}
            ORDER BY start_date
            LIMIT 10
          `;
        } else if (role === 'teacher') {
          // Get teacher-specific data
          roleEvents = await sql`
            SELECT *
            FROM events
            WHERE (is_public = true OR created_by = ${user_id})
            ORDER BY start_date
            LIMIT 10
          `;
        } else {
          // Admin/other roles - get all events
          roleEvents = await sql`
            SELECT *
            FROM events
            ORDER BY start_date
            LIMIT 10
          `;
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: stats,
            events: roleEvents
          })
        };
      } catch (error) {
        console.error('Dashboard stats error:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Failed to fetch dashboard statistics',
            error: error.message
          })
        };
      }

    } else if (event.path === '/.netlify/functions/dashboard/notifications' && event.httpMethod === 'GET') {
      // Get user notifications for dashboard
      const { user_id, limit } = event.queryStringParameters || {};
      
      if (!user_id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'user_id is required'
          })
        };
      }
      
      try {
        const notifications = await sql`
          SELECT n.*, un.is_read, un.read_at
          FROM notifications n
          JOIN user_notifications un ON n.id = un.notification_id
          WHERE un.user_id = ${user_id}
          ORDER BY n.created_at DESC
          LIMIT ${limit ? parseInt(limit) : 10}
        `;
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: notifications
          })
        };
      } catch (error) {
        console.error('Dashboard notifications error:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Failed to fetch notifications',
            error: error.message
          })
        };
      }

    } else if (event.path === '/.netlify/functions/dashboard/events' && event.httpMethod === 'GET') {
      // Get user events for dashboard
      const { user_id, role, start_date, end_date } = event.queryStringParameters || {};
      
      if (!user_id || !role) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'user_id and role are required'
          })
        };
      }
      
      try {
        let events;
        if (role === 'student') {
          // Students see public events and events they created
          events = await sql`
            SELECT *
            FROM events
            WHERE (is_public = true OR created_by = ${user_id})
            AND start_date >= ${start_date || 'NOW()'} 
            AND end_date <= ${end_date || 'NOW() + INTERVAL \'30 days\''}
            ORDER BY start_date
          `;
        } else if (role === 'teacher') {
          // Teachers see public events and events they created
          events = await sql`
            SELECT *
            FROM events
            WHERE (is_public = true OR created_by = ${user_id})
            AND start_date >= ${start_date || 'NOW()'} 
            AND end_date <= ${end_date || 'NOW() + INTERVAL \'30 days\''}
            ORDER BY start_date
          `;
        } else {
          // Admin/other roles see all events
          events = await sql`
            SELECT *
            FROM events
            WHERE start_date >= ${start_date || 'NOW()'} 
            AND end_date <= ${end_date || 'NOW() + INTERVAL \'30 days\''}
            ORDER BY start_date
          `;
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: events
          })
        };
      } catch (error) {
        console.error('Dashboard events error:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Failed to fetch events',
            error: error.message
          })
        };
      }

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
    console.error('Dashboard function error:', error);
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