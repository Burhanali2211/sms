# EduSync Netlify Deployment Guide

This guide provides step-by-step instructions for deploying the EduSync frontend to Netlify.

## Prerequisites

1. Node.js and npm installed
2. Netlify CLI installed (`npm install -g netlify-cli`)
3. A Netlify account (free tier available)

## Deployment Steps

### 1. Build the Application

First, ensure your application builds correctly:

```bash
npm run build
```

This will create a `dist` folder with all the production files.

### 2. Login to Netlify

```bash
netlify login
```

This will open a browser window where you can log in to your Netlify account.

### 3. Deploy to Netlify

From your project root directory:

```bash
netlify deploy --prod
```

### 4. Configuration During Deployment

When prompted, provide the following information:

- **Publish directory**: `dist`
- **Build command**: (Leave empty as it's configured in netlify.toml)

### 5. Set Environment Variables

After deployment, go to your site settings in the Netlify dashboard:

1. Navigate to Site settings → Environment variables
2. Add the following variable:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com/api
   ```

### 6. Redeploy

After setting environment variables, redeploy your site:

```bash
netlify deploy --prod
```

## Manual Deployment Using Netlify Dashboard

If you prefer to deploy using the Netlify dashboard:

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "New site from Git"
3. Connect to your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository
5. Configure the deployment settings:
   - Branch to deploy: `main` or `master`
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

## Environment Variables

Make sure to set the following environment variable in your Netlify site settings:

- `VITE_API_URL`: The URL of your backend API (e.g., `https://your-backend.onrender.com/api`)

## Custom Domain (Optional)

To use a custom domain:

1. In Netlify dashboard, go to Domain settings
2. Add your custom domain
3. Follow the instructions to configure DNS records

## Troubleshooting

### Build Issues

If you encounter build issues:

1. Check that all dependencies are properly installed:
   ```bash
   npm install
   ```

2. Verify the build works locally:
   ```bash
   npm run build
   ```

### Routing Issues

If routing doesn't work correctly (404 errors on page refresh):

The netlify.toml file includes the necessary redirect rules:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures all routes are redirected to index.html for client-side routing.

### Environment Variables Not Working

If environment variables are not taking effect:

1. Make sure they are prefixed with `VITE_`
2. Redeploy your site after adding/updating environment variables
3. Check that variable names match exactly

## Local Development with Netlify

You can use Netlify's development server:

```bash
netlify dev
```

This will start a local development server with Netlify's features emulated.

## Continuous Deployment

Netlify automatically deploys your site when you push to your connected Git repository. To configure this:

1. Ensure your repository is connected to Netlify
2. Push changes to your configured branch
3. Netlify will automatically build and deploy your site

## Monitoring and Analytics

Netlify provides built-in monitoring and analytics:

1. Check deploy logs in the Deploys tab
2. Monitor site performance in the Analytics tab
3. Set up notifications for deployment status