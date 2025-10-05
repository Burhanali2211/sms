/**
 * Test script to verify connection to Neon database
 */

const { Pool } = require('pg');
require('dotenv').config();

// Database configuration for Neon
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false,
    sslmode: 'require',
    channel_binding: 'require'
  } : false,
};

console.log('Testing connection to Neon database...');
console.log('Host:', dbConfig.host);
console.log('Database:', dbConfig.database);
console.log('User:', dbConfig.user);
console.log('SSL:', dbConfig.ssl ? 'Enabled' : 'Disabled');

const pool = new Pool(dbConfig);

async function testConnection() {
  let client;
  try {
    // Get a client from the pool
    client = await pool.connect();
    console.log('✅ Connected to Neon database successfully!');
    
    // Run a simple query
    const result = await client.query('SELECT version(), current_database(), current_user');
    console.log('✅ Query executed successfully!');
    console.log('PostgreSQL version:', result.rows[0].version);
    console.log('Database name:', result.rows[0].current_database);
    console.log('User:', result.rows[0].current_user);
    
    // Test creating a temporary table
    await client.query('CREATE TEMP TABLE test_table (id SERIAL PRIMARY KEY, name VARCHAR(100))');
    await client.query("INSERT INTO test_table (name) VALUES ('Test Connection')");
    const testResult = await client.query('SELECT * FROM test_table');
    console.log('✅ Temporary table test successful!');
    console.log('Test data:', testResult.rows);
    
    console.log('\n🎉 All tests passed! Your Neon database connection is working correctly.');
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('Error code:', err.code);
    console.error('Error detail:', err.detail);
    return false;
  } finally {
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

// Run the test
testConnection();