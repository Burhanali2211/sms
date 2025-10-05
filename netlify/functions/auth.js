// Netlify function for authentication using Netlify DB
import { neon } from '@netlify/neon';
import bcrypt from 'bcrypt';

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log('Auth function called with method:', req.method);
    console.log('Request URL:', req.url);
    
    // Parse the request body
    let body = {};
    if (req.method === 'POST') {
      if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
      } else if (typeof req.body === 'object') {
        body = req.body;
      }
      console.log('Parsed body:', body);
    }

    // Route handling based on URL path
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    console.log('Request path:', path);

    if (path === '/.netlify/functions/auth/login' && req.method === 'POST') {
      // Login endpoint
      const { email, password } = body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      // Initialize Netlify DB connection
      // This automatically uses the NETLIFY_DATABASE_URL environment variable
      const sql = neon();

      // Query user from database
      const users = await sql`
        SELECT id, email, password_hash, role, first_name, last_name 
        FROM users 
        WHERE email = ${email} 
        LIMIT 1
      `;

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const user = users[0];

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // For demo purposes, we'll just return user info without JWT
      // In a production app, you'd generate and return a JWT token
      const { password_hash, ...userWithoutPassword } = user;

      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: userWithoutPassword
      });

    } else if (path === '/.netlify/functions/auth/register' && req.method === 'POST') {
      // Registration endpoint
      const { email, password, firstName, lastName } = body;

      // Validate input
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
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
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Insert new user
      const [newUser] = await sql`
        INSERT INTO users (email, password_hash, first_name, last_name, role)
        VALUES (${email}, ${passwordHash}, ${firstName}, ${lastName}, 'user')
        RETURNING id, email, first_name, last_name, role
      `;

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: newUser
      });

    } else {
      // Handle unsupported routes
      res.status(404).json({
        success: false,
        message: 'Endpoint not found'
      });
    }
  } catch (error) {
    console.error('Auth function error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};