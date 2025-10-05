# EduSync Online Deployment Instructions

This document provides step-by-step instructions for deploying EduSync to production environments, with options for both Render and Netlify deployments.

## Prerequisites

1. Either:
   - A Render account (free tier available)
   - OR a Netlify account
2. A GitHub account
3. Node.js and npm installed locally (for local testing)

## Deployment Options

### Option 1: Deploy to Render (Traditional Approach)

```
# EduSync Online Deployment Instructions

This document provides step-by-step instructions for deploying EduSync to production environments, specifically focusing on Render deployment.

## Prerequisites

1. A Render account (free tier available)
2. A GitHub account
3. Node.js and npm installed locally (for local testing)

## Deployment Steps

### 1. Database Setup on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "PostgreSQL"
3. Choose a name (e.g., "edusync-db")
4. Select "Free" plan
5. Click "Create Database"
6. Once created, note the "External Database URL" - you'll need the host, database name, user, and password

### 2. Backend API Deployment

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

### 3. Database Initialization

1. Once your backend is deployed, initialize the database schema:
   - Go to your backend service on Render
   - Click "Connect" → "Connect to SSH"
   - Run: `node init-database.js`
   - This will create all tables and insert sample data

### 4. Frontend Deployment

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

## Common Issues and Solutions

### WebSocket Connection Errors

**Problem**: `Firefox can't establish a connection to the server at wss://...`

**Solution**: 
- Ensure HMR is disabled in [vite.config.ts](file:///d:/ALL%20Data/eit_sms/vite.config.ts):
  ```javascript
  server: {
    hmr: false
  }
  ```

### MIME Type Errors

**Problem**: `Loading module from ... was blocked because of a disallowed MIME type ("text/html")`

**Solution**:
1. Check that your [vite.config.ts](file:///d:/ALL%20Data/eit_sms/vite.config.ts) has the correct base path:
   ```javascript
   base: '/'
   ```
2. Ensure your [index.html](file:///d:/ALL%20Data/eit_sms/index.html) has the correct base tag:
   ```html
   <base href="/">
   ```
3. Clean and rebuild:
   ```bash
   rm -rf dist
   npm run build
   ```

### Module Not Found Errors

**Problem**: Browser tries to load files from `node_modules/.vite/deps/`

**Solution**:
1. Make sure you're building for production, not development
2. Check that you're deploying the `dist` folder, not the source code
3. Verify your [render.yaml](file:///d:/ALL%20Data/eit_sms/render.yaml) has the correct `staticPublishPath: dist`

## Verification Steps

After deployment, verify that:

1. Backend health check: Visit `<your-backend-url>/health` - should return JSON with status "OK"
2. Frontend loads: Visit your frontend URL - should show the EduSync application
3. API connection: Try logging in - should connect to the backend API
4. Database connection: Try viewing dashboard data - should fetch from database

## Troubleshooting Commands

### Local Testing

```bash
# Test backend locally
cd backend
npm start

# Test frontend locally
npm run dev

# Build frontend for production
npm run build

# Preview production build locally
npm run preview
```

### Render Debugging

```bash
# Check backend logs
# In Render dashboard, go to your backend service → Logs

# Check frontend logs
# In Render dashboard, go to your frontend service → Logs

# Redeploy
# In Render dashboard, go to your service → Manual Deploy → Deploy latest commit
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
CLIENT_URL=http://localhost:8080  # Frontend URL
```

### Frontend (.env for local development)
```env
VITE_API_URL=http://localhost:3001/api  # Backend API URL
VITE_APP_ENV=development                # Application environment
```

## Automated Fix Script

Run the automated fix script to resolve common deployment issues:

```bash
node fix-deployment.js
```

This script will:
1. Fix base path in [vite.config.ts](file:///d:/ALL%20Data/eit_sms/vite.config.ts)
2. Fix base tag in [index.html](file:///d:/ALL%20Data/eit_sms/index.html)
3. Fix API URL in [render.yaml](file:///d:/ALL%20Data/eit_sms/render.yaml)
4. Clean the dist folder

## Manual Verification Script

Run the verification script to check your build configuration:

```bash
npm run verify:build
```

This script will:
1. Check if dist folder exists
2. Verify index.html is present
3. Check assets folder
4. Validate Vite configuration
5. Confirm build scripts in package.json

## Notes

1. Always use `npm run build` for production, not `npm run dev`
2. The dist folder contains the production-ready build
3. Never commit sensitive information to version control
4. Update environment variables in Render dashboard, not in code
5. After making configuration changes, redeploy your services