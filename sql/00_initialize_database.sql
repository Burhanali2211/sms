-- EduSync Database Initialization Script
-- This script initializes the edusync database with required extensions and functions
-- Run this after creating the database

-- Connect to the edusync database (this line should be run after connecting to the database)
-- \c edusync;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create a function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Success message
SELECT 'Database edusync initialized successfully!' as message;