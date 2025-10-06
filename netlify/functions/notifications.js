// Netlify function for notifications
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
    console.log('Notifications function called with method:', event.httpMethod);
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
    if (event.path === '/.netlify/functions/notifications' && event.httpMethod === 'GET') {
      // Get notifications for a user
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
      
      const notifications = await sql`
        SELECT n.*, un.is_read, un.read_at
        FROM notifications n
        JOIN user_notifications un ON n.id = un.notification_id
        WHERE un.user_id = ${user_id}
        ORDER BY n.created_at DESC
        LIMIT ${limit ? parseInt(limit) : 50}
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          notifications
        })
      };

    } else if (event.path === '/.netlify/functions/notifications/unread' && event.httpMethod === 'GET') {
      // Get unread notifications count for a user
      const { user_id } = event.queryStringParameters || {};
      
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
      
      const result = await sql`
        SELECT COUNT(*) as count
        FROM notifications n
        JOIN user_notifications un ON n.id = un.notification_id
        WHERE un.user_id = ${user_id} AND un.is_read = false
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          unread_count: parseInt(result[0].count)
        })
      };

    } else if (event.path.startsWith('/.netlify/functions/notifications/') && event.httpMethod === 'PUT') {
      // Mark notification as read
      const notificationId = event.path.split('/').pop();
      const { user_id } = body;
      
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
      
      // Check if notification exists and belongs to user
      const notifications = await sql`
        SELECT n.id
        FROM notifications n
        JOIN user_notifications un ON n.id = un.notification_id
        WHERE n.id = ${notificationId} AND un.user_id = ${user_id}
      `;
      
      if (notifications.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Notification not found or does not belong to user'
          })
        };
      }
      
      // Mark as read
      await sql`
        UPDATE user_notifications
        SET is_read = true, read_at = NOW()
        WHERE notification_id = ${notificationId} AND user_id = ${user_id}
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Notification marked as read'
        })
      };

    } else if (event.path === '/.netlify/functions/notifications/mark-all-read' && event.httpMethod === 'PUT') {
      // Mark all notifications as read for a user
      const { user_id } = body;
      
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
      
      await sql`
        UPDATE user_notifications
        SET is_read = true, read_at = NOW()
        WHERE user_id = ${user_id} AND is_read = false
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'All notifications marked as read'
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
    console.error('Notifications function error:', error);
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