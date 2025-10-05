# Render Deployment Checklist

This checklist will guide you through deploying your EduSync application to Render step by step.

## Prerequisites

- [ ] Render account (sign up at [render.com](https://render.com))
- [ ] GitHub account with the repository connected
- [ ] PostgreSQL database (will be created on Render)

## Step 1: Deploy PostgreSQL Database

1. [ ] Go to [Render Dashboard](https://dashboard.render.com)
2. [ ] Click "New" → "PostgreSQL"
3. [ ] Configure the database:
   - Name: `edusync-db`
   - Region: Choose the closest to your users
   - Plan: Free (for testing) or Standard (for production)
4. [ ] Click "Create Database"
5. [ ] Note the connection details:
   - Host
   - Port (5432)
   - Database name
   - User
   - Password (click "Reset password" to get the initial password)

## Step 2: Update Environment Variables

Update your [render.yaml](file:///d:/ALL%20Data/eit_sms/render.yaml) with the correct database connection details:

```yaml
envVars:
  - key: DB_HOST
    value: [YOUR_DB_HOST]
  - key: DB_PORT
    value: 5432
  - key: DB_NAME
    value: [YOUR_DB_NAME]
  - key: DB_USER
    value: [YOUR_DB_USER]
  - key: DB_PASSWORD
    value: [YOUR_DB_PASSWORD]
  - key: JWT_SECRET
    value: [GENERATE_A_STRONG_SECRET]
  - key: CLIENT_URL
    value: https://[YOUR_FRONTEND_SERVICE_NAME].onrender.com
```

## Step 3: Deploy Backend API

1. [ ] In Render Dashboard, click "New" → "Web Service"
2. [ ] Connect to your GitHub repository
3. [ ] Configure the service:
   - Name: `edusync-backend`
   - Region: Same as your database
   - Environment: Node
   - Build command: `npm install`
   - Start command: `npm start`
   - Root directory: `backend`
4. [ ] Add the environment variables from Step 2
5. [ ] Click "Create Web Service"

## Step 4: Initialize Database Schema

1. [ ] Wait for the backend service to deploy successfully
2. [ ] Go to your backend service in the Render Dashboard
3. [ ] Click "Connect" → "Connect to SSH"
4. [ ] Run the database initialization script:
   ```bash
   node init-database.js
   ```

## Step 5: Deploy Frontend

1. [ ] In Render Dashboard, click "New" → "Static Site"
2. [ ] Connect to your GitHub repository
3. [ ] Configure the service:
   - Name: `edusync-frontend`
   - Region: Same as your backend
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
4. [ ] Add environment variables:
   ```yaml
   envVars:
     - key: VITE_API_URL
       value: https://[YOUR_BACKEND_SERVICE_NAME].onrender.com/api
   ```
5. [ ] Add custom domain (optional):
   - Domain: `[YOUR_CHOSEN_NAME].onrender.com`
6. [ ] Click "Create Static Site"

## Step 6: Verify Deployment

1. [ ] Check that both services are "Live" in the Render Dashboard
2. [ ] Visit your frontend URL to verify it loads correctly
3. [ ] Test API connectivity by trying to log in
4. [ ] Verify database connectivity by viewing dashboard data

## Troubleshooting

### Common Issues

1. **502 Bad Gateway Error**:
   - Check that the frontend service is properly configured with routes
   - Ensure the build completed successfully
   - Verify the publish directory is set to `dist`

2. **Database Connection Issues**:
   - Double-check all database environment variables
   - Ensure the database is in the same region as the backend
   - Verify the database password is correct

3. **API Connection Issues**:
   - Check that the VITE_API_URL points to the correct backend service
   - Verify CORS configuration in `backend/server.js`
   - Ensure the backend service is running

4. **Environment Variables Not Working**:
   - Make sure variables prefixed with `VITE_` are set in the frontend service
   - Redeploy after adding or changing environment variables

### Useful Render Commands

```bash
# Check logs for a service
# In Render Dashboard: Services → [Service Name] → Logs

# Redeploy a service
# In Render Dashboard: Services → [Service Name] → Manual Deploy

# Restart a service
# In Render Dashboard: Services → [Service Name] → Restart
```

## Post-Deployment Steps

1. [ ] Set up custom domains (if needed)
2. [ ] Configure SSL certificates (automatic with Render)
3. [ ] Set up monitoring and alerts
4. [ ] Test all application features
5. [ ] Create a backup strategy for your database

## Useful Links

- [Render Documentation](https://render.com/docs)
- [Render Dashboard](https://dashboard.render.com)
- [EduSync GitHub Repository](https://github.com/Burhanali2211/sms)