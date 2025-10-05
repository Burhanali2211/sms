// Netlify function to initialize database schema
import { neon } from '@netlify/neon';

export default async (req, res) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        message: 'Method not allowed. Use POST to initialize database.'
      });
    }

    // Initialize Netlify DB connection
    const sql = neon();

    // Create users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        role VARCHAR(50) DEFAULT 'user',
        phone VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create an index on email for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `;

    // Create events table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP NOT NULL,
        location VARCHAR(255),
        event_type VARCHAR(100),
        is_public BOOLEAN DEFAULT true,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create notifications table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'info',
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Insert a default superadmin user if none exists
    const superadminEmail = 'superadmin@edusync.com';
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${superadminEmail} LIMIT 1
    `;

    if (existingUsers.length === 0) {
      // Note: In a real application, you would use a proper password hashing library
      // For this example, we're using a simple hash
      const bcrypt = require('bcrypt');
      const saltRounds = 10;
      const defaultPassword = 'password123';
      const passwordHash = await bcrypt.hash(defaultPassword, saltRounds);
      
      await sql`
        INSERT INTO users (email, password_hash, first_name, last_name, role)
        VALUES (${superadminEmail}, ${passwordHash}, 'Super', 'Admin', 'super-admin')
      `;
    }

    res.status(200).json({
      success: true,
      message: 'Database initialized successfully!',
      tables: ['users', 'events', 'notifications'],
      superadminCreated: existingUsers.length === 0
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Database initialization failed',
      error: error.message
    });
  }
};