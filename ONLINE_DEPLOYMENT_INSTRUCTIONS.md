# Online Deployment Instructions for EduSync

This document provides step-by-step instructions to deploy EduSync online with a working database.

## Overview

The EduSync application has three main components:
1. **Frontend**: React application (runs in browser)
2. **Backend**: Node.js/Express API server
3. **Database**: PostgreSQL

## Quick Deployment Option (Recommended)

The easiest way to deploy EduSync with a working database is using **Railway**:

### Step 1: Prepare Your Code

1. Push your code to a GitHub repository
2. Make sure all files are committed and pushed

### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app) and create a free account
2. Click "New Project" → "Deploy from GitHub"
3. Select your EduSync repository
4. Railway will automatically detect it's a Node.js project
5. In the service settings, set:
   - Root directory: `backend`
   - Start command: `npm start`

### Step 3: Add PostgreSQL Database

1. In Railway, click "New" → "Database" → "Add PostgreSQL"
2. Railway will automatically inject database connection variables

### Step 4: Configure Environment Variables

In Railway, go to your service → Settings → Environment Variables and add:
```
JWT_SECRET=your-very-secure-secret-key-here
NODE_ENV=production
```

### Step 5: Initialize Database Schema

1. Once deployed, go to Railway → Your PostgreSQL database → Connect
2. Use the provided connection string to connect with any PostgreSQL client (like pgAdmin or psql)
3. Run the SQL scripts in this order:
   - `sql/00_initialize_database.sql`
   - `sql/01_create_core_tables.sql`
   - `sql/02_insert_sample_data.sql` (optional, for sample data)

### Step 6: Deploy Frontend to Netlify

1. Build the frontend locally:
   ```bash
   npm run build
   ```
2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Deploy:
   ```bash
   netlify deploy --prod
   ```
   - Choose the `dist` directory when prompted

4. Set environment variables in Netlify:
   - Go to your site → Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-railway-backend-url.up.railway.app/api`

## Alternative: Manual Deployment

### Backend Deployment Options:
1. **Render** (render.com) - Free tier available
2. **Heroku** (heroku.com) - Free tier available (limited)
3. **DigitalOcean App Platform**
4. **AWS Elastic Beanstalk**

### Database Options:
1. **Supabase** - PostgreSQL with free tier
2. **Neon** - Serverless PostgreSQL with free tier
3. **Railway PostgreSQL** (as above)
4. **DigitalOcean PostgreSQL**

## Detailed Deployment Steps

### 1. Database Setup

Choose one of these options:

**Option A: Supabase (Recommended for ease of use)**
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Note the database connection details (host, port, database name, user, password)

**Option B: Neon**
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Note the connection details

### 2. Backend Deployment (Using Render as example)

1. Fork your repository to GitHub
2. Go to [render.com](https://render.com) and create a free account
3. Create a new Web Service:
   - Connect to your GitHub repository
   - Set:
     - Name: edusync-backend
     - Environment: Node
     - Build command: `npm install`
     - Start command: `npm start`
     - Root directory: `backend`
4. Add environment variables:
   ```
   DB_HOST=your-database-host
   DB_PORT=5432
   DB_NAME=your-database-name
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   JWT_SECRET=your-very-secure-secret-key-here
   NODE_ENV=production
   ```

### 3. Database Initialization

After your database is set up, initialize the schema:

1. Connect to your database using psql, pgAdmin, or any PostgreSQL client
2. Run these scripts in order:
   - `sql/00_initialize_database.sql`
   - `sql/01_create_core_tables.sql`
   - `sql/02_insert_sample_data.sql` (optional)

### 4. Frontend Deployment

Build and deploy the frontend:

1. Update `.env.production` file with your backend URL:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

2. Build the frontend:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to any static hosting service:
   - **Netlify**: Use `netlify deploy --prod`
   - **Vercel**: Use `vercel --prod`
   - **GitHub Pages**: Set up workflow to deploy `dist` folder

## Environment Variables Summary

### Backend Required Variables:
```
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
JWT_SECRET=your-very-secure-secret-key-here
NODE_ENV=production
```

### Frontend Required Variables:
```
VITE_API_URL=https://your-backend-url.com/api
```

## Testing Your Deployment

1. Visit your frontend URL - it should load the EduSync application
2. Try logging in with sample credentials:
   - Email: admin@edusync.com
   - Password: admin123
3. Check backend health: `https://your-backend-url.com/health`

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your frontend URL is in the CORS configuration in `backend/server.js`

2. **Database Connection Failed**: 
   - Check all database environment variables
   - Ensure your database accepts connections from your backend service

3. **Blank Page on Frontend**: 
   - Check browser console for errors
   - Verify VITE_API_URL is set correctly

4. **API Calls Failing**: 
   - Check that backend service is running
   - Verify the API_URL points to the correct backend

## Next Steps

Once deployed successfully, consider:
1. Setting up custom domains
2. Adding SSL certificates
3. Configuring monitoring and logging
4. Setting up automated backups for your database
5. Optimizing performance with caching