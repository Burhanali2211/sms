// Netlify function for authentication using Netlify DB
import { neon } from '@netlify/neon';
import bcrypt from 'bcryptjs';

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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
    console.log('Auth function called with method:', event.httpMethod);
    console.log('Request path:', event.path);
    
    // Parse the request body
    let body = {};
    if (event.httpMethod === 'POST') {
      if (typeof event.body === 'string') {
        body = JSON.parse(event.body);
      } else if (typeof event.body === 'object') {
        body = event.body;
      }
      console.log('Parsed body:', body);
    }

    if (event.path === '/.netlify/functions/auth/login' && event.httpMethod === 'POST') {
      // Login endpoint
      const { email, password } = body;

      // Validate input
      if (!email || !password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Email and password are required'
          })
        };
      }

      if (!isValidEmail(email)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Invalid email format'
          })
        };
      }

      // Initialize Netlify DB connection
      // This automatically uses the NETLIFY_DATABASE_URL environment variable
      const sql = neon();

      // Query user from database (matching existing schema)
      const users = await sql`
        SELECT id, email, password_hash, name, role
        FROM users 
        WHERE email = ${email} 
        LIMIT 1
      `;

      if (users.length === 0) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Invalid email or password'
          })
        };
      }

      const user = users[0];

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Invalid email or password'
          })
        };
      }

      // For demo purposes, we'll just return user info without JWT
      // In a production app, you'd generate and return a JWT token
      const { password_hash, ...userWithoutPassword } = user;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Login successful',
          user: userWithoutPassword
        })
      };

    } else if (event.path === '/.netlify/functions/auth/register' && event.httpMethod === 'POST') {
      // Registration endpoint
      const { email, password, name } = body;

      // Validate input
      if (!email || !password || !name) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Email, password, and name are required'
          })
        };
      }

      if (!isValidEmail(email)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Invalid email format'
          })
        };
      }

      if (password.length < 6) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Password must be at least 6 characters long'
          })
        };
      }

      // Initialize Netlify DB connection
      const sql = neon();

      // Check if user already exists
      const existingUsers = await sql`
        SELECT id 
        FROM users 
        WHERE email = ${email} 
        LIMIT 1
      `;

      if (existingUsers.length > 0) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'User with this email already exists'
          })
        };
      }

      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Insert new user (matching existing schema with valid role)
      const [newUser] = await sql`
        INSERT INTO users (email, password_hash, name, role)
        VALUES (${email}, ${passwordHash}, ${name}, 'student')
        RETURNING id, email, name, role
      `;

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'User registered successfully',
          user: newUser
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
    console.error('Auth function error:', error);
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