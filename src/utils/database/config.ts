
// Database configuration with proper browser/server handling
import { toast } from '@/hooks/use-toast';
import { createPgPolyfills } from '../pg-polyfills';

// Initialize polyfills for browser environment
createPgPolyfills();

// Detect environment
const isBrowser = typeof window !== 'undefined';

// Get database configuration from environment variables
export const DB_CONFIG = {
  host: import.meta.env.VITE_PG_HOST || 'localhost',
  port: parseInt(import.meta.env.VITE_PG_PORT || '5432'),
  database: import.meta.env.VITE_PG_DATABASE || 'edusync',
  user: import.meta.env.VITE_PG_USER || 'postgres',
  password: import.meta.env.VITE_PG_PASSWORD || 'password',
  // Disable SSL in development environment
  ssl: import.meta.env.PROD ? { rejectUnauthorized: false } : false,
  // Connection settings
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  // App settings
  environment: import.meta.env.VITE_APP_ENV || 'development',
  appName: import.meta.env.VITE_APP_NAME || 'EduSync'
};

// Backend configuration (for Node.js environment)
export const BACKEND_DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'edusync',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// This function allows us to isolate the import statement to avoid Vite analyzing it
const createNodePgPool = async () => {
  if (isBrowser) return null;
  
  try {
    // Using a direct dynamic import with a variable to prevent Vite from analyzing
    const modulePath = 'pg';
    const pg = await import(/* @vite-ignore */ modulePath);
    const { Pool } = pg;
    const pool = new Pool(DB_CONFIG);
    
    pool.on('error', (err: Error) => {
      
    });    return pool;
  } catch (err) {
    
    return null;
  }
};

// Create a proper pool interface that works in both environments
export class DatabasePool {
  private pgPool: any = null;
  private static instance: DatabasePool;
  private initialized = false;
  private initializing = false;

  private constructor() {
    if (isBrowser) {
      
    } else {
      this.initialized = false;
      this.initializing = false;
    }
  }

  public static getInstance(): DatabasePool {
    if (!DatabasePool.instance) {
      DatabasePool.instance = new DatabasePool();
    }
    return DatabasePool.instance;
  }

  private async ensureInitialized() {
    if (isBrowser || this.initialized || this.initializing) return;
    
    this.initializing = true;
    this.pgPool = await createNodePgPool();
    this.initialized = true;
    this.initializing = false;
  }

  async query(text: string, params: any[] = []) {
    if (isBrowser) {
      
      return { rows: [] };
    }
    
    await this.ensureInitialized();
    
    try {
      if (!this.pgPool) {
        throw new Error('Database pool not initialized');
      }
      return await this.pgPool.query(text, params);
    } catch (error) {
      
      throw error;
    }
  }

  async connect() {
    if (isBrowser) {
      
      throw new Error('Cannot connect to database from browser');
    }
    
    await this.ensureInitialized();
    
    try {
      if (!this.pgPool) {
        throw new Error('Database pool not initialized');
      }
      return await this.pgPool.connect();
    } catch (error) {
      
      throw error;
    }
  }

  async end() {
    if (!isBrowser && this.pgPool) {
      await this.pgPool.end();
    }
  }
}

// Export a singleton instance
export const pgPool = DatabasePool.getInstance();

// Export shouldUseMockData function
export async function shouldUseMockData(): Promise<boolean> {
  // In browser, always use mock data
  if (isBrowser) {
    return true;
  }

  try {
    const client = await pgPool.connect();
    return false; // Connection successful, no need for mock data
  } catch (error) {
    
    toast({
      title: 'Database Connection Error',
      description: 'Using mock data instead of live database.',
      variant: 'destructive',
    });
    return true; // Connection failed, use mock data
  }
}
