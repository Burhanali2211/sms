/**
 * Database Connection Test Script
 * This script tests the connection to your PostgreSQL database
 */

import { testConnection } from './backend/config/database.js';

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...\n');
  
  try {
    const connected = await testConnection();
    
    if (connected) {
      console.log('✅ Database connection successful!');
      console.log('\n🎉 Your database is properly configured and accessible.');
      console.log('\nNext steps:');
      console.log('1. Run "node init-database.js" to initialize your database schema');
      console.log('2. Deploy your frontend application');
      console.log('3. Test the complete application');
    } else {
      console.log('❌ Database connection failed.');
      console.log('\nTroubleshooting steps:');
      console.log('1. Verify database credentials in render.yaml');
      console.log('2. Check that the database is running');
      console.log('3. Ensure the database firewall allows connections');
      console.log('4. Verify environment variables are set correctly');
    }
  } catch (error) {
    console.error('❌ Error testing database connection:', error.message);
    console.log('\nTroubleshooting steps:');
    console.log('1. Verify database credentials in render.yaml');
    console.log('2. Check that the database is running');
    console.log('3. Ensure the database firewall allows connections');
    console.log('4. Verify environment variables are set correctly');
  }
}

// Run the test if this script is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  testDatabaseConnection();
}

export { testDatabaseConnection };