
import { pgPool, DB_CONFIG } from './database/config';
import { DatabaseConfig } from '@/types';

/**
 * Checks if the database connection is available
 * @returns Promise<boolean> indicating if the connection was successful
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    
    return false;
  }

  try {
    const client = await pgPool.connect();
    // client.release() would be called here in Node environment
    
    return true;
  } catch (error) {
    
    return false;
  }
}

/**
 * Determines if mock data should be used (in case database is not available)
 * @returns Promise<boolean> indicating if mock data should be used
 */
export async function shouldUseMockData(): Promise<boolean> {
  return typeof window !== 'undefined' || !(await checkDatabaseConnection());
}

// Re-export the DB_CONFIG
export { DB_CONFIG };
