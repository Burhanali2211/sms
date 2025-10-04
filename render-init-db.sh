#!/bin/bash

# Database initialization script for Render
# This script should be run after the initial deployment to set up the database

echo "Initializing EduSync database on Render..."

# Run the database initialization script
cd backend
npm run init-db-render

echo "Database initialization complete!"