#!/bin/bash

# EduSync Database Setup Script
# This script sets up the EduSync database with all required tables

echo "Setting up EduSync database..."

# Try to create the database (will show error if exists, but that's OK)
echo "Creating database edusync..."
psql -U postgres -c "CREATE DATABASE edusync;" 2>/dev/null || echo "Database might already exist, continuing..."

# Connect to the edusync database and run the initialization script
echo "Initializing database..."
psql -U postgres -d edusync -f 00_initialize_database.sql

# Run the core tables creation script
echo "Creating core tables..."
psql -U postgres -d edusync -f 01_create_core_tables.sql

echo ""
echo "Database setup completed successfully!"
echo "You can now start the backend server."