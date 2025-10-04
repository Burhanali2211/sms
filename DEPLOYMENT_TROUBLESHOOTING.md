# EduSync Deployment Troubleshooting Guide

## Common Issues and Solutions

### 1. MIME Type Errors ("disallowed MIME type")

**Symptoms:**
- Loading module from "..." was blocked because of a disallowed MIME type ("")
- Loading failed for the module with source "..."

**Causes:**
1. Incorrect base path configuration in Vite
2. Static hosting not serving files with correct MIME types
3. Trying to load source files instead of built files

**Solutions:**
1. Ensure `base: './'` is set in `vite.config.ts`
2. Verify you're deploying the `dist` folder contents, not source files
3. Check that `index.html` references built JavaScript files, not source files

### 2. Module Loading Failures

**Symptoms:**
- Loading failed for the module with source "..."
- 404 errors for JavaScript/CSS files

**Causes:**
1. Incorrect routing configuration for SPA
2. Missing asset files in deployment
3. Wrong build output directory

**Solutions:**
1. Configure your static hosting to serve `index.html` for all routes (SPA mode)
2. Ensure all files from the `dist` folder are deployed
3. Verify `vite.config.ts` has correct `outDir` setting

### 3. WebSocket Connection Failures

**Symptoms:**
- Firefox can't establish a connection to the server at wss://localhost:8080/
- [vite] failed to connect to websocket

**Causes:**
- Development server configuration leaking into production build
- HMR (Hot Module Replacement) settings not properly disabled

**Solutions:**
1. Ensure you're running `npm run build` for production, not `npm run dev`
2. Check that environment variables are set correctly for production

## Step-by-Step Fix Process

### Step 1: Clean and Rebuild

```bash
# Remove build artifacts
rm -rf dist
rm -rf node_modules/.vite

# Reinstall dependencies
npm install

# Build for production
npm run build
```

### Step 2: Verify Build Output

Check that:
1. `dist` folder is created
2. `dist/index.html` exists
3. `dist/index.html` references built JS files (not source files)
4. Built JavaScript files exist in `dist/assets/js/`

### Step 3: Check Vite Configuration

Ensure `vite.config.ts` includes:
```typescript
export default defineConfig({
  base: './', // Essential for static hosting
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // ... other settings
  }
})
```

### Step 4: Deploy Correctly

When deploying to Render or similar platforms:
1. Deploy the contents of the `dist` folder, not the source files
2. Configure the static hosting for SPA routing
3. Set environment variables correctly

## Render-Specific Configuration

### Static Site Configuration
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment variables:
  - `VITE_API_URL`: Your backend API URL

### SPA Routing
Ensure your Render static site is configured to serve `index.html` for all routes to support client-side routing.

## Environment Variables

### Frontend (.env for local development)
```env
VITE_API_URL=http://localhost:3001/api  # Backend API URL
VITE_APP_ENV=development                # Application environment
```

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

## Verification Commands

Run these commands to verify your setup:

```bash
# Check Vite configuration
npm run build && node verify-build.js

# Run deployment fix script
npm run fix-deploy

# Check for common issues
bash verify-deployment.sh
```

## If Problems Persist

1. Clear your browser cache completely
2. Try deploying to a different static hosting provider to isolate the issue
3. Check browser developer tools Network tab for specific file loading errors
4. Verify your hosting provider's documentation for SPA deployment requirements