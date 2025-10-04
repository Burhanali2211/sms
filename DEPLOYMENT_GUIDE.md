# EduSync Deployment Guide

This guide explains how to deploy the EduSync school management system with a working database online.

## Architecture Overview

The EduSync application consists of:
1. **Frontend**: React application built with Vite
2. **Backend**: Node.js/Express API server
3. **Database**: PostgreSQL database

## Deployment Options

There are several platforms you can use to deploy this application. Below are instructions for two popular options:

### Option 1: Deploy to Render (Recommended)

Render offers free tiers for both web services and databases, making it ideal for testing.

#### Step 1: Set up PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "PostgreSQL"
3. Choose a name (e.g., "edusync-db")
4. Select "Free" plan
5. Click "Create Database"
6. Once created, note the "External Database URL" - you'll need this for the backend

#### Step 2: Deploy Backend API to Render

1. Fork this repository to your GitHub account
2. On Render Dashboard, click "New" → "Web Service"
3. Connect your GitHub repository
4. Set the following configuration:
   - Name: edusync-backend
   - Environment: Node
   - Build command: `npm install`
   - Start command: `npm start`
   - Root directory: `backend`
5. Add environment variables (click "Advanced" settings):
   ```
   DB_HOST=<from your database External Database URL>
   DB_PORT=5432
   DB_NAME=<from your database External Database URL>
   DB_USER=<from your database External Database URL>
   DB_PASSWORD=<from your database External Database URL>
   JWT_SECRET=<generate a strong secret>
   NODE_ENV=production
   ```
6. Click "Create Web Service"

#### Step 3: Set up Database Schema

1. Once your backend is deployed, you'll need to initialize the database schema
2. You can do this by connecting to your Render PostgreSQL database using a tool like psql or pgAdmin
3. Run the SQL from `sql/complete_schema.sql` to create all tables
4. Optionally run `sql/02_insert_sample_data.sql` to populate with sample data

#### Step 4: Deploy Frontend to Netlify

1. Build the frontend locally first:
   ```bash
   npm install
   npm run build
   ```
2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```
   - Select the `dist` folder as the publish directory
4. Set environment variables in Netlify:
   - Go to your site settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=<your-render-backend-url>/api
     VITE_APP_ENV=production
     ```

### Option 2: Deploy to Railway (Alternative)

Railway allows you to deploy both the database and application easily.

#### Step 1: Deploy to Railway

1. Go to [Railway](https://railway.app/) and create an account
2. Create a new project
3. Provision a PostgreSQL database:
   - Click "New" → "Database" → "PostgreSQL"
4. Deploy the backend:
   - Click "New" → "Service"
   - Connect your GitHub repository
   - Set root directory to `backend`
   - Set environment variables:
     ```
     DB_HOST=<provided by Railway>
     DB_PORT=<provided by Railway>
     DB_NAME=<provided by Railway>
     DB_USER=<provided by Railway>
     DB_PASSWORD=<provided by Railway>
     JWT_SECRET=<generate a strong secret>
     NODE_ENV=production
     ```
5. Initialize database schema as described in Option 1

#### Step 2: Deploy Frontend

Deploy the frontend similarly to Netlify:
1. Build locally: `npm run build`
2. Deploy the `dist` folder to Netlify or Vercel
3. Set environment variables:
   ```
   VITE_API_URL=<your-railway-backend-url>/api
   VITE_APP_ENV=production
   ```

## Environment Variables Summary

### Backend (.env for local development)
```env
DB_HOST=localhost              # Database host
DB_PORT=5432                   # Database port
DB_NAME=edusync_db             # Database name
DB_USER=postgres               # Database user
DB_PASSWORD=admin              # Database password
JWT_SECRET=your-secret-key     # JWT signing key
NODE_ENV=production            # Environment
```

### Frontend (.env for local development)
```env
VITE_API_URL=http://localhost:3001/api  # Backend API URL
VITE_APP_ENV=production                 # Application environment
```

## Database Initialization

After setting up your database, run these SQL scripts in order:
1. `sql/complete_schema.sql` - Creates all tables
2. `sql/02_insert_sample_data.sql` - Optional: Adds sample data

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your frontend URL is added to the CORS configuration in `backend/server.js`
2. **Database Connection**: Verify all database environment variables are correctly set
3. **API Not Found**: Ensure the backend service is running and the API_URL in frontend points to the correct backend URL

### Checking Deployment Status

1. Backend health check: Visit `<your-backend-url>/health`
2. Frontend: Should load the application UI
3. Database: Should be able to connect using provided credentials

## Scaling Considerations

For production use:
1. Upgrade from free tier databases to paid plans for better performance
2. Add monitoring and logging
3. Implement backup strategies for your database
4. Consider CDN for frontend assets
5. Add caching layers for better performance