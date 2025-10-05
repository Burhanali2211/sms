// Utility functions for Netlify DB integration with fallback to existing PostgreSQL setup
import { neon } from '@netlify/neon';
import { pgPool } from './database/config';

/**
 * Check if Netlify DB is available
 */
export const isNetlifyDBAvailable = () => {
  // Check if we're running in an environment with Netlify DB
  // This will be true when deployed to Netlify with Netlify DB enabled
  return typeof process !== 'undefined' && !!process.env.NETLIFY_DATABASE_URL;
};

/**
 * Initialize Netlify DB connection
 * This automatically uses the NETLIFY_DATABASE_URL environment variable
 */
export const initNetlifyDB = () => {
  try {
    // Check if we're running in an environment with Netlify DB
    if (isNetlifyDBAvailable()) {
      const sql = neon();
      return sql;
    }
    return null;
  } catch (error) {
    console.warn('Failed to initialize Netlify DB:', error);
    return null;
  }
};

/**
 * Example function to query posts from the database
 * @param {string} postId - The ID of the post to retrieve
 */
export const getPostById = async (postId: string) => {
  try {
    // Try Netlify DB first if available
    if (isNetlifyDBAvailable()) {
      try {
        const sql = initNetlifyDB();
        if (sql) {
          const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`;
          return post;
        }
      } catch (netlifyError) {
        console.warn('Netlify DB query failed, falling back to PostgreSQL:', netlifyError);
      }
    }
    
    // Fallback to existing PostgreSQL setup
    const result = await pgPool.query('SELECT * FROM posts WHERE id = $1', [postId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error querying post:', error);
    throw error;
  }
};

/**
 * Example function to get all posts
 */
export const getAllPosts = async () => {
  try {
    // Try Netlify DB first if available
    if (isNetlifyDBAvailable()) {
      try {
        const sql = initNetlifyDB();
        if (sql) {
          const posts = await sql`SELECT * FROM posts`;
          return posts;
        }
      } catch (netlifyError) {
        console.warn('Netlify DB query failed, falling back to PostgreSQL:', netlifyError);
      }
    }
    
    // Fallback to existing PostgreSQL setup
    const result = await pgPool.query('SELECT * FROM posts');
    return result.rows;
  } catch (error) {
    console.error('Error querying posts:', error);
    throw error;
  }
};

/**
 * Example function to create a new post
 * @param {Object} postData - The data for the new post
 */
export const createPost = async (postData: { title: string; content: string }) => {
  try {
    // Try Netlify DB first if available
    if (isNetlifyDBAvailable()) {
      try {
        const sql = initNetlifyDB();
        if (sql) {
          const [newPost] = await sql`
            INSERT INTO posts (title, content) 
            VALUES (${postData.title}, ${postData.content}) 
            RETURNING *
          `;
          return newPost;
        }
      } catch (netlifyError) {
        console.warn('Netlify DB query failed, falling back to PostgreSQL:', netlifyError);
      }
    }
    
    // Fallback to existing PostgreSQL setup
    const result = await pgPool.query(
      'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
      [postData.title, postData.content]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Export the neon function directly for custom queries
export { neon };