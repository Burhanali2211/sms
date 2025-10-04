/**
 * Database Initialization Script for Render Deployment
 * This script initializes the PostgreSQL database for EduSync on Render
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Get database configuration from environment variables (Render provides these)
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
};

console.log('Initializing EduSync database on Render...');
console.log('Database config:', {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
});

// Create a client
const client = new Client(dbConfig);

async function initDatabase() {
  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to database successfully');
    
    // Read SQL files
    const initSql = fs.readFileSync(path.join(__dirname, 'sql', '00_initialize_database.sql'), 'utf8');
    const tablesSql = fs.readFileSync(path.join(__dirname, 'sql', '01_create_core_tables.sql'), 'utf8');
    const sampleDataSql = fs.readFileSync(path.join(__dirname, 'sql', '02_insert_sample_data.sql'), 'utf8');
    
    // Run initialization script
    console.log('Running initialization script...');
    await client.query(initSql);
    console.log('Initialization script completed');
    
    // Run tables creation script
    console.log('Creating tables...');
    await client.query(tablesSql);
    console.log('Tables created successfully');
    
    // Run sample data script
    console.log('Inserting sample data...');
    await client.query(sampleDataSql);
    console.log('Sample data inserted successfully');
    
    console.log('Database initialization completed successfully!');
    
  } catch (err) {
    console.error('Error initializing database:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run the initialization
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };