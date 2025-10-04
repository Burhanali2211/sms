/**
 * Database Initialization Script
 * This script initializes the PostgreSQL database for EduSync when deployed
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Get database configuration from environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'edusync',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
};

console.log('Initializing EduSync database...');
console.log('Database config:', {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
});

// Create a pool
const pool = new Pool(dbConfig);

// Read SQL files
const initSql = fs.readFileSync(path.join(__dirname, 'sql', '00_initialize_database.sql'), 'utf8');
const tablesSql = fs.readFileSync(path.join(__dirname, 'sql', '01_create_core_tables.sql'), 'utf8');
const sampleDataSql = fs.readFileSync(path.join(__dirname, 'sql', '02_insert_sample_data.sql'), 'utf8');

async function initDatabase() {
  let client;
  
  try {
    // Get a client from the pool
    client = await pool.connect();
    console.log('Connected to database successfully');
    
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
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

// Run the initialization
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };