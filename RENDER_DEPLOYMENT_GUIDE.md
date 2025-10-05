# EduSync Render Deployment Guide

This guide provides detailed instructions for deploying the EduSync application to Render using GitHub integration.

## Overview

Render is a unified cloud platform that automatically builds and deploys apps and sites with free SSL, a global CDN, and completely automated Git-based deployment. This guide will walk you through deploying both the frontend and backend of EduSync to Render.

## Prerequisites

Before starting, ensure you have:

1. A Render account (sign up at [render.com](https://render.com))
2. A GitHub account with the EduSync repository
3. All changes pushed to your GitHub repository

## Deployment Architecture

The EduSync application consists of three main components:

1. **Frontend**: React application built with Vite (Static Site)
2. **Backend**: Node.js/Express API server (Web Service)
3. **Database**: PostgreSQL (Database)

## Step-by-Step Deployment

### Step 1: Deploy PostgreSQL Database

1. Go to the [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "PostgreSQL"
3. Configure your database:
   - **Name**: `edusync-db`
   - **Region**: Choose the region closest to your users
   - **Plan**: Select "Free" for testing or "Standard" for production
4. Click "Create Database"
5. After creation, note down these connection details:
   - Host
   - Port (typically 5432)
   - Database name
   - User
   - Password (click "Reset password" to view)

### Step 2: Deploy Backend API

1. In the Render Dashboard, click "New" → "Web Service"
2. Connect to your GitHub repository
3. Configure the service:
   - **Name**: `edusync-backend`
   - **Region**: Same as your database for optimal performance
   - **Environment**: Node
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Root directory**: `backend`
4. Add environment variables:
   ```env
   DB_HOST=[Your database host]
   DB_PORT=5432
   DB_NAME=[Your database name]
   DB_USER=[Your database user]
   DB_PASSWORD=[Your database password]
   JWT_SECRET=[Generate a strong secret]
   NODE_ENV=production
   CLIENT_URL=https://[your-frontend-name].onrender.com
   ```
5. Click "Create Web Service"

### Step 3: Initialize Database Schema

1. Wait for the backend service to deploy successfully
2. In the Render Dashboard, go to your backend service
3. Click "Connect" → "Connect to SSH"
4. Run the database initialization script:
   ```bash
   node init-database.js
   ```

### Step 4: Deploy Frontend

1. In the Render Dashboard, click "New" → "Static Site"
2. Connect to your GitHub repository
3. Configure the service:
   - **Name**: `edusync-frontend`
   - **Region**: Same as your backend
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `dist`
4. Add environment variables:
   ```env
   VITE_API_URL=https://[your-backend-name].onrender.com/api
   ```
5. Click "Create Static Site"

## Environment Variables Summary

### Backend Environment Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `DB_HOST` | Database host | dpg-example123.region.render.com |
| `DB_PORT` | Database port | 5432 |
| `DB_NAME` | Database name | edusync_db_xxx |
| `DB_USER` | Database user | edusync_db_xxx_user |
| `DB_PASSWORD` | Database password | your_database_password |
| `JWT_SECRET` | Secret for JWT tokens | generate_a_strong_secret |
| `NODE_ENV` | Environment | production |
| `CLIENT_URL` | Frontend URL | https://your-frontend.onrender.com |

### Frontend Environment Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `VITE_API_URL` | Backend API URL | https://your-backend.onrender.com/api |

## Custom Domains (Optional)

To use custom domains:

1. In the Render Dashboard, go to your service
2. Click "Settings" → "Custom domains"
3. Add your domain
4. Follow the instructions to configure DNS records

Render automatically provisions SSL certificates for custom domains.

## Monitoring and Logs

### Viewing Logs

1. In the Render Dashboard, go to your service
2. Click "Logs" to view real-time logs
3. Use the filters to narrow down log entries

### Setting Up Alerts

1. In the Render Dashboard, go to your service
2. Click "Settings" → "Alerts"
3. Configure alerts for:
   - CPU usage
   - Memory usage
   - Response time
   - Error rate

## Scaling Considerations

### Free Tier Limitations

- **Web Services**: Sleep after 15 minutes of inactivity
- **Databases**: Limited storage and connections
- **Bandwidth**: Limited monthly bandwidth

### Upgrading to Paid Plans

For production use, consider upgrading to paid plans:

1. **Web Services**: Choose the "Standard" plan
2. **Databases**: Choose the "Standard" plan
3. **Static Sites**: Free tier is usually sufficient

## Troubleshooting Common Issues

### 502 Bad Gateway Error

This typically occurs with static site deployments. Ensure:

1. Your [render.yaml](file:///d:/ALL%20Data/eit_sms/render.yaml) includes proper routing:
   ```yaml
   routes:
     - type: rewrite
       source: /*
       destination: /index.html
   ```

2. Your build completes successfully
3. Your publish directory is set to `dist`

### Database Connection Issues

1. Verify all database environment variables are correct
2. Ensure the database and backend are in the same region
3. Check that the database password is correct

### API Connection Issues

1. Verify the `VITE_API_URL` points to the correct backend service
2. Check CORS configuration in `backend/server.js`
3. Ensure the backend service is running

### Environment Variables Not Working

1. Make sure variables prefixed with `VITE_` are set in the frontend service
2. Redeploy after adding or changing environment variables

## Useful Render CLI Commands

While Render doesn't have a full CLI, you can use these tools:

```bash
# Check your Git repository status
git status

# Push changes to trigger deployment
git push origin main

# View deployment status
# Check the Render Dashboard
```

## Continuous Deployment

Render automatically deploys your application when you push to your connected Git repository:

1. Make changes to your code
2. Commit and push to your GitHub repository
3. Render automatically builds and deploys your application

## Best Practices

1. **Environment Variables**: Never commit sensitive information to version control
2. **Database Backups**: Regularly backup your database
3. **Monitoring**: Set up alerts for critical metrics
4. **Performance**: Use caching and CDNs for better performance
5. **Security**: Keep dependencies updated and use strong secrets

## Next Steps

1. Test all application features after deployment
2. Set up monitoring and alerts
3. Configure custom domains (if needed)
4. Plan for scaling as your user base grows
5. Implement backup strategies for your database

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Render Status Page](https://status.render.com)
- [Render Community Forum](https://community.render.com)