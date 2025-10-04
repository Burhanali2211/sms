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
   CLIENT_URL=https://your-frontend-url.onrender.com
   ```
6. Click "Create Web Service"

#### Step 3: Set up Database Schema

1. Once your backend is deployed, you'll need to initialize the database schema
2. You can do this by connecting to your Render PostgreSQL database using a tool like psql or pgAdmin
3. Run the SQL from `sql/complete_schema.sql` to create all tables
4. Optionally run `sql/02_insert_sample_data.sql` to populate with sample data

#### Step 4: Deploy Frontend to Render

1. On Render Dashboard, click "New" → "Static Site"
2. Connect your GitHub repository
3. Set the following configuration:
   - Name: edusync-frontend
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
4. Add environment variables:
   ```
   VITE_API_URL=<your-render-backend-url>/api
   VITE_APP_ENV=production
   ```
5. Click "Create Static Site"

### Option 2: Deploy Backend to Render and Frontend to Netlify

#### Step 1: Deploy Backend to Render

Follow steps 1-3 from Option 1 above.

#### Step 2: Deploy Frontend to Netlify

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

## Automated Deployment Scripts

This repository includes automated deployment scripts for your convenience:

### For Windows Users:
Run `deploy.bat` from the command line:
```cmd
deploy.bat
```

### For Mac/Linux Users:
Run `deploy.sh` from the terminal:
```bash
chmod +x deploy.sh
./deploy.sh
```

These scripts will:
1. Clean previous builds
2. Install dependencies
3. Verify build configuration
4. Build the application
5. Commit and push changes to GitHub
6. Provide instructions for Render deployment

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
CLIENT_URL=http://localhost:8080  # Frontend URL
```

### Frontend (.env for local development)
```env
VITE_API_URL=http://localhost:3001/api  # Backend API URL
VITE_APP_ENV=development                # Application environment
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
4. **MIME Type Errors**: These are typically resolved by setting the correct base path in `vite.config.ts` and adding `<base href="./">` in `index.html`

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