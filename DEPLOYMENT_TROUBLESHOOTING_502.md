# EduSync Deployment Troubleshooting: 502 Bad Gateway Error

This document provides troubleshooting steps for resolving the 502 Bad Gateway error when deploying the EduSync application to Render.

## Understanding the 502 Error

A 502 Bad Gateway error occurs when a server (in this case, Render's proxy) receives an invalid response from an upstream server. For static site hosting, this typically means:

1. The service failed to start properly
2. The service is not serving content on the expected port
3. There's a configuration issue with the service

## Troubleshooting Steps

### 1. Check Render Dashboard

1. Go to your Render dashboard
2. Navigate to the `edusync-frontend` service
3. Check the "Events" tab for any deployment errors
4. Check the "Logs" tab for runtime errors

### 2. Verify Service Configuration

Ensure your [render.yaml](file:///d:/ALL%20Data/eit_sms/render.yaml) is correctly configured:

```yaml
- type: web
  name: edusync-frontend
  env: static
  buildCommand: npm install && npm run build
  staticPublishPath: dist
  envVars:
    - key: VITE_API_URL
      value: https://edusync-backend.onrender.com/api
  routes:
    - type: rewrite
      source: /*
      destination: /index.html
  headers:
    - path: /*
      headers:
        - name: X-Frame-Options
          value: DENY
        - name: X-Content-Type-Options
          value: nosniff
```

The key additions are:
- `routes` section to handle SPA routing
- Proper `static` environment type

### 3. Verify Build Process

1. Ensure the build completes successfully locally:
   ```bash
   npm run build
   ```

2. Check that the `dist` folder contains:
   - `index.html`
   - `assets` folder with CSS and JS files
   - Any files from the `public` directory

### 4. Test Local Preview

Before deploying, test the production build locally:

```bash
npm run preview
```

This serves the built files on `http://localhost:4173` by default.

### 5. Check Domain Configuration

If you're using a custom domain:

1. Ensure DNS records are properly configured
2. Check that SSL certificates are issued
3. Verify domain is correctly added to the service

### 6. Common Fixes

#### Add Routes Configuration
The most important fix for SPA deployments is adding the routes configuration:

```yaml
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

This ensures that all routes are redirected to `index.html` for client-side routing to work.

#### Verify Build Command
Ensure your build command is correct:
```yaml
buildCommand: npm install && npm run build
```

#### Check Publish Path
Ensure the publish path is correct:
```yaml
staticPublishPath: dist
```

### 7. Manual Redeployment

If changes don't seem to take effect:

1. In Render dashboard, go to your service
2. Click "Manual Deploy"
3. Select "Clear build cache & deploy"
4. Wait for deployment to complete

### 8. Check Service Health

You can check if your service is running by:

1. Looking at the service status in Render dashboard
2. Checking the preview URL provided by Render
3. Verifying the service shows as "Live"

## Additional Debugging Steps

### Check Environment Variables
Ensure environment variables are correctly set:
- `VITE_API_URL` should point to your backend service

### Verify File Structure
After building, your `dist` folder should contain:
```
dist/
├── index.html
├── assets/
│   ├── css/
│   │   └── *.css
│   └── js/
│       ├── *.js
│       └── vendor-*.js
└── (files from public/ folder)
```

### Test Build Locally
```bash
# Build the project
npm run build

# Serve the build locally
npm run preview
```

## If Issues Persist

1. Check Render's status page for any ongoing issues
2. Review Render documentation for static site hosting
3. Consider using a different static hosting service temporarily (Netlify, Vercel) to verify if the issue is specific to Render
4. Contact Render support with:
   - Service name
   - Deployment logs
   - Error details

## Prevention for Future Deployments

1. Always test builds locally before deploying
2. Use the routes configuration for SPA applications
3. Monitor deployment logs
4. Set up health check endpoints for monitoring