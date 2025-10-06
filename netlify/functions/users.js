// Netlify function for user operations
import { neon } from '@netlify/neon';
import bcrypt from 'bcryptjs';

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
    console.log('Users function called with method:', event.httpMethod);
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
    if (event.path === '/.netlify/functions/users' && event.httpMethod === 'GET') {
      // Get all users (admin only)
      const users = await sql`
        SELECT id, email, name, role, phone, address, avatar_url, status, created_at
        FROM users
        ORDER BY name
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          users
        })
      };

    } else if (event.path.startsWith('/.netlify/functions/users/') && event.httpMethod === 'GET') {
      // Get a specific user
      const userId = event.path.split('/').pop();
      
      const users = await sql`
        SELECT id, email, name, role, phone, address, avatar_url, status, created_at
        FROM users
        WHERE id = ${userId}
      `;
      
      if (users.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'User not found'
          })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          user: users[0]
        })
      };

    } else if (event.path.startsWith('/.netlify/functions/users/') && event.httpMethod === 'PUT') {
      // Update a user profile
      const userId = event.path.split('/').pop();
      const { name, phone, address, avatar_url, email, role, status, currentPassword, newPassword } = body;
      
      // Check if user exists
      const existingUsers = await sql`
        SELECT id, password_hash FROM users WHERE id = ${userId}
      `;
      
      if (existingUsers.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'User not found'
          })
        };
      }
      
      // If changing password, verify current password
      if (newPassword) {
        if (!currentPassword) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'Current password is required to change password'
            })
          };
        }
        
        const isPasswordValid = await bcrypt.compare(currentPassword, existingUsers[0].password_hash);
        if (!isPasswordValid) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'Current password is incorrect'
            })
          };
        }
      }
      
      // Update user profile
      let updateFields = [];
      let updateValues = [];
      
      if (name !== undefined) {
        updateFields.push('name = $' + (updateValues.length + 1));
        updateValues.push(name);
      }
      
      if (phone !== undefined) {
        updateFields.push('phone = $' + (updateValues.length + 1));
        updateValues.push(phone);
      }
      
      if (address !== undefined) {
        updateFields.push('address = $' + (updateValues.length + 1));
        updateValues.push(address);
      }
      
      // Handle avatar_url specifically to ensure it's properly updated
      if (avatar_url !== undefined) {
        updateFields.push('avatar_url = $' + (updateValues.length + 1));
        updateValues.push(avatar_url);
        console.log('Updating avatar_url:', avatar_url);
      }
      
      // Only admins can update email, role, and status
      // This would require token verification in a real implementation
      if (email !== undefined) {
        updateFields.push('email = $' + (updateValues.length + 1));
        updateValues.push(email);
      }
      
      if (role !== undefined) {
        // Validate role against allowed values
        const allowedRoles = ['admin', 'super-admin', 'principal', 'school-admin', 'teacher', 'student', 'parent', 'financial', 'library', 'labs', 'admission', 'club'];
        if (allowedRoles.includes(role)) {
          updateFields.push('role = $' + (updateValues.length + 1));
          updateValues.push(role);
        }
      }
      
      if (status !== undefined) {
        // Validate status against allowed values
        const allowedStatuses = ['active', 'inactive', 'suspended'];
        if (allowedStatuses.includes(status)) {
          updateFields.push('status = $' + (updateValues.length + 1));
          updateValues.push(status);
        }
      }
      
      // If changing password, hash the new password
      if (newPassword) {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);
        updateFields.push('password_hash = $' + (updateValues.length + 1));
        updateValues.push(passwordHash);
      }
      
      // Always update the updated_at timestamp
      updateFields.push('updated_at = NOW()');
      
      if (updateFields.length > 1) { // More than just updated_at
        // Build the update query
        const query = `
          UPDATE users
          SET ${updateFields.join(', ')}
          WHERE id = $${updateValues.length + 1}
          RETURNING id, email, name, role, phone, address, avatar_url, status, created_at
        `;
        
        updateValues.push(userId);
        
        const [updatedUser] = await sql(query, updateValues);
        
        console.log('User updated successfully:', updatedUser);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'User profile updated successfully',
            user: updatedUser
          })
        };
      } else {
        // No fields to update except timestamp
        const users = await sql`
          SELECT id, email, name, role, phone, address, avatar_url, status, created_at
          FROM users
          WHERE id = ${userId}
        `;
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'User profile updated successfully',
            user: users[0]
          })
        };
      }

    } else if (event.path.startsWith('/.netlify/functions/users/') && event.httpMethod === 'DELETE') {
      // Delete a user (admin only)
      const userId = event.path.split('/').pop();
      
      // Check if user exists
      const existingUsers = await sql`
        SELECT id FROM users WHERE id = ${userId}
      `;
      
      if (existingUsers.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'User not found'
          })
        };
      }
      
      // Delete user
      await sql`
        DELETE FROM users WHERE id = ${userId}
      `;
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'User deleted successfully'
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
    console.error('Users function error:', error);
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