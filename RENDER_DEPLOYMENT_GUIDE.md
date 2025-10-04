# Render Deployment Guide for EduSync

This guide will help you deploy EduSync to Render using your specific PostgreSQL database credentials.

## Database Credentials

Your PostgreSQL database is already set up on Render:
- **Host**: dpg-d3g7j363jp1c73eha0m0-a.oregon-postgres.render.com
- **Port**: 5432
- **Database Name**: edusync_db_uhqd
- **User**: edusync_db_uhqd_user
- **Password**: hd7FYH2v6aHsPVesKBcOHLts2nTOCPeu

## Deployment Steps

### 1. Deploy to Render

1. Go to [render.com](https://render.com) and create an account or log in
2. Click "New" → "Web Service"
3. Connect your GitHub repository (https://github.com/Burhanali2211/eit_sms.git)
4. Configure the service:
   - **Name**: edusync-backend
   - **Environment**: Node
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=your-very-secure-jwt-secret-here
   DB_HOST=dpg-d3g7j363jp1c73eha0m0-a.oregon-postgres.render.com
   DB_PORT=5432
   DB_NAME=edusync_db_uhqd
   DB_USER=edusync_db_uhqd_user
   DB_PASSWORD=hd7FYH2v6aHsPVesKBcOHLts2nTOCPeu
   CLIENT_URL=https://your-frontend-url.com
   ```

### 2. Initialize the Database

After your backend is deployed:

1. Go to your service dashboard in Render
2. Click "Manual Deploy" → "Deploy latest commit"
3. Once deployed, initialize the database by running the initialization script:
   - In your service dashboard, go to "Shell"
   - Run: `npm run init-db-render`

Alternatively, you can run the provided script:
```bash
chmod +x render-init-db.sh
./render-init-db.sh
```

### 3. Deploy Frontend

1. Create another Web Service in Render
2. Configure as a Static Site:
   - **Name**: edusync-frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-service-name.onrender.com/api
   ```

## Alternative: Use render.yaml

You can also use the provided `render.yaml` file for automatic deployment:

1. Make sure your repository is connected to Render
2. Render will automatically detect the `render.yaml` file
3. It will create both services automatically

## Post-Deployment Steps

1. Update the `CLIENT_URL` environment variable in your backend with your frontend URL
2. Update the `VITE_API_URL` environment variable in your frontend with your backend URL
3. Redeploy both services

## Sample Login Credentials

After deployment and database initialization, you can log in with:
- **Email**: admin@edusync.com
- **Password**: admin123

## Troubleshooting

### Common Issues

1. **Database Connection Failed**: 
   - Verify all database credentials are correct
   - Ensure the database is not blocked by firewall rules

2. **CORS Errors**: 
   - Make sure `CLIENT_URL` environment variable matches your frontend URL

3. **Build Failures**: 
   - Check the build logs in Render dashboard
   - Ensure all dependencies are correctly specified in package.json

### Checking Service Status

1. Backend health check: Visit `https://your-backend-url.onrender.com/health`
2. Database connection: Check logs in Render dashboard
3. Frontend: Should load the application UI

## Next Steps

Once deployed successfully, consider:
1. Setting up a custom domain
2. Adding SSL certificate (Render provides this automatically)
3. Configuring monitoring and logging
4. Setting up automated backups for your database