// Netlify function to initialize database schema
import { neon } from '@netlify/neon';
import bcrypt from 'bcryptjs';

exports.handler = async (event, context) => {
  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          message: 'Method not allowed. Use POST to initialize database.'
        })
      };
    }

    // Initialize Netlify DB connection
    const sql = neon();

    // Check if tables already exist by querying one
    const tableCheck = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'users'
    `;
    
    if (tableCheck.length > 0) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: true,
          message: 'Database already initialized!',
          tables: ['users', 'events', 'notifications', 'user_notifications']
        })
      };
    }

    // Create users table
    await sql`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'super-admin', 'principal', 'school-admin', 'teacher', 'student', 'parent', 'financial', 'library', 'labs', 'admission', 'club')),
        status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
        avatar_url TEXT,
        phone VARCHAR(20),
        address TEXT,
        date_of_birth DATE,
        emergency_contact VARCHAR(100),
        last_login TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create events table
    await sql`
      CREATE TABLE events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        start_date TIMESTAMP WITH TIME ZONE NOT NULL,
        end_date TIMESTAMP WITH TIME ZONE NOT NULL,
        location VARCHAR(255),
        event_type VARCHAR(100),
        color VARCHAR(7) DEFAULT '#3b82f6',
        created_by UUID REFERENCES users(id),
        is_public BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create notifications table
    await sql`
      CREATE TABLE notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'info',
        created_by UUID REFERENCES users(id),
        action_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create user_notifications table (many-to-many relationship)
    await sql`
      CREATE TABLE user_notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        is_read BOOLEAN DEFAULT false,
        read_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create indexes
    await sql`CREATE INDEX idx_users_email ON users(email)`;
    await sql`CREATE INDEX idx_events_dates ON events(start_date, end_date)`;
    await sql`CREATE INDEX idx_notifications_created_by ON notifications(created_by)`;
    await sql`CREATE INDEX idx_user_notifications_user_id ON user_notifications(user_id)`;
    await sql`CREATE INDEX idx_user_notifications_is_read ON user_notifications(is_read)`;

    // Insert a default superadmin user
    const superadminEmail = 'superadmin@edusync.com';
    const saltRounds = 10;
    const defaultPassword = 'password123';
    const passwordHash = await bcrypt.hash(defaultPassword, saltRounds);
    
    const [newUser] = await sql`
      INSERT INTO users (email, password_hash, name, role)
      VALUES (${superadminEmail}, ${passwordHash}, 'Super Administrator', 'super-admin')
      RETURNING id, email, name, role
    `;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Database initialized successfully!',
        tables: ['users', 'events', 'notifications', 'user_notifications'],
        superadmin: newUser
      })
    };
  } catch (error) {
    console.error('Database initialization error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        message: 'Database initialization failed',
        error: error.message
      })
    };
  }
};