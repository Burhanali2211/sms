# Netlify Deployment Instructions

This document provides instructions for deploying the EduSync application to Netlify with Netlify DB integration.

## Prerequisites

1. A Netlify account
2. The Netlify CLI installed (`npm install -g netlify-cli`)
3. This project cloned locally

## Deployment Steps

### 1. Initialize Netlify Site

```bash
# Navigate to your project directory
cd path/to/eit_sms

# Initialize a new Netlify site
netlify init
```

### 2. Initialize Netlify DB

✅ **Netlify DB is already configured!** The `NETLIFY_DATABASE_URL` environment variable has been successfully set in your Netlify project.

If you need to reinitialize or troubleshoot:
```bash
# Initialize Netlify DB for your site
netlify db init
```

This command will:
- Create a new database (if not already created)
- Add the `NETLIFY_DATABASE_URL` environment variable to your Netlify site
- Configure the necessary settings

### 3. Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy your site
netlify deploy --prod --dir=dist --no-build
```

## Environment Variables

✅ **Environment variables are already configured!** The following environment variables are set in your Netlify project:
- `NETLIFY_DATABASE_URL` - Main database connection URL
- `NETLIFY_DATABASE_URL_UNPOOLED` - Unpooled database connection URL

## Using Netlify DB in Your Application

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

## Local Development

For local development, you can set the environment variables in your `.env` file:

```env
NETLIFY_DATABASE_URL=your_netlify_database_url_here
NETLIFY_DATABASE_URL_UNPOOLED=your_netlify_database_url_unpooled_here
```

Note: These URLs are only available after you've run `netlify db init` and deployed your site.

## Testing Netlify DB Integration

To test the Netlify DB integration when deployed:

1. Visit the test function URL:
   ```
   https://edusync-school.netlify.app/.netlify/functions/test-db-connection
   ```

2. Run the verification script:
   ```bash
   node verify-netlify-db.js
   ```

## Troubleshooting

### Common Issues

1. **"connection string is not provided" error**: This is expected when running locally without setting the `NETLIFY_DATABASE_URL` environment variable.

2. **Package not found**: Ensure you've run `npm install @netlify/neon`.

3. **Import errors**: Make sure you're using a modern JavaScript environment that supports ES modules.

### Getting Help

For more information about Netlify DB, visit:
- [Netlify DB Documentation](https://docs.netlify.com/db/)
- [Netlify CLI Documentation](https://cli.netlify.com/)