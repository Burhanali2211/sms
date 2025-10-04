# EduSync Deployment Summary

## What You Need to Know

To deploy EduSync online with a working database, you'll need to deploy three components:
1. **Frontend** (React application) - Static files hosted on services like Netlify or Vercel
2. **Backend** (Node.js API) - Server-side application hosted on services like Render or Railway
3. **Database** (PostgreSQL) - Database hosted on services like Supabase, Neon, or the same platform as your backend

## Recommended Deployment Approach

### Option 1: Railway (Easiest - All-in-One)
1. Push your code to GitHub
2. Create a free account at [railway.app](https://railway.app)
3. Deploy the backend from your repository (set root directory to `backend`)
4. Add a PostgreSQL database directly in Railway
5. Build and deploy the frontend separately to Netlify:
   ```bash
   npm run build
   npx netlify-cli deploy --prod
   ```

### Option 2: Render + Supabase
1. Create a free PostgreSQL database at [supabase.com](https://supabase.com)
2. Deploy the backend to [render.com](https://render.com)
3. Deploy the frontend to Netlify or Vercel

## Files We've Created to Help You

1. **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Detailed deployment instructions
2. **[ONLINE_DEPLOYMENT_INSTRUCTIONS.md](ONLINE_DEPLOYMENT_INSTRUCTIONS.md)** - Step-by-step online deployment guide
3. **[deploy.bat](deploy.bat)** - Windows deployment helper script
4. **[deploy.sh](deploy.sh)** - Linux/Mac deployment helper script
5. **[railway.json](railway.json)** - Configuration for Railway deployment
6. **[init-database.js](init-database.js)** - Database initialization script

## Quick Start Steps

1. **Prepare your code**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Railway** (recommended):
   - Go to [railway.app](https://railway.app)
   - Create a new project from your GitHub repository
   - Set root directory to `backend`
   - Add PostgreSQL database
   - Set environment variables:
     ```
     JWT_SECRET=your-very-secure-secret
     NODE_ENV=production
     ```

3. **Initialize the database**:
   - Connect to your Railway PostgreSQL database
   - Run the SQL scripts in order:
     1. `sql/00_initialize_database.sql`
     2. `sql/01_create_core_tables.sql`
     3. `sql/02_insert_sample_data.sql` (optional)

4. **Deploy the frontend**:
   ```bash
   npm run build
   npx netlify-cli deploy --prod
   ```
   - Set environment variable in Netlify:
     ```
     VITE_API_URL=https://your-railway-backend.up.railway.app/api
     ```

## Sample Login Credentials

After deployment and database initialization, you can log in with:
- **Email**: admin@edusync.com
- **Password**: admin123

## Need Help?

If you encounter any issues during deployment:
1. Check the console logs in your deployment platform
2. Verify all environment variables are set correctly
3. Ensure database connection details are correct
4. Make sure you've initialized the database with the SQL scripts

The most common issues are:
- Incorrect database connection variables
- Missing environment variables
- CORS configuration (if frontend and backend are on different domains)