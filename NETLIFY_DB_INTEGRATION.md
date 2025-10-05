# Netlify DB Integration Guide

This document explains how to use the Netlify DB integration in the EduSync project.

## Overview

Netlify DB provides a simplified way to interact with your PostgreSQL database using the `@netlify/neon` package. This integration allows you to write SQL queries directly in your JavaScript/TypeScript code with automatic connection management.

## Prerequisites

- A Netlify site with Netlify DB enabled
- The `@netlify/neon` package installed (already done in this project)

## Environment Variables

Netlify DB automatically uses the following environment variables:
- `NETLIFY_DATABASE_URL` - Main database connection URL
- `NETLIFY_DATABASE_URL_UNPOOLED` - Unpooled database connection URL

These are automatically configured when you enable Netlify DB. Based on your configuration, these variables are now set in your Netlify project.

## Usage Examples

### In Netlify Functions

```javascript
import { neon } from '@netlify/neon';

export default async (req, res) => {
  try {
    // Automatically uses env NETLIFY_DATABASE_URL
    const sql = neon();
    
    // Example query
    const result = await sql`SELECT * FROM users LIMIT 5`;
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

### In Frontend Code

Utility functions are available in `src/utils/netlify-db.ts`:

```typescript
import { getPostById, getAllPosts, createPost } from '@/utils/netlify-db';

// Get a specific post
const post = await getPostById('123');

// Get all posts
const posts = await getAllPosts();

// Create a new post
const newPost = await createPost({
  title: 'New Post',
  content: 'Post content here'
});
```

## Available Utility Functions

The following utility functions are available in `src/utils/netlify-db.ts`:

1. `initNetlifyDB()` - Initialize the Netlify DB connection
2. `isNetlifyDBAvailable()` - Check if Netlify DB is available
3. `getPostById(postId)` - Get a specific post by ID
4. `getAllPosts()` - Get all posts from the database
5. `createPost(postData)` - Create a new post
6. `neon` - Export of the neon function for custom queries

## Security Considerations

- Netlify DB connections are automatically secured
- All queries use parameterized statements to prevent SQL injection
- Environment variables are automatically managed by Netlify

## Testing the Connection

You can test the Netlify DB connection by deploying the test function:

```bash
# Deploy to Netlify
netlify deploy --prod
```

Then visit your Netlify function URL: `/.netlify/functions/test-db-connection`

## Troubleshooting

If you encounter issues:

1. Ensure Netlify DB is enabled in your site settings
2. Check that your environment variables are correctly set
3. Verify your database schema matches your queries
4. Check the Netlify functions logs for error details

## More Information

For detailed documentation, visit [Netlify DB Documentation](https://docs.netlify.com/db/).