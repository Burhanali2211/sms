@echo off
title EduSync Deployment Helper

echo EduSync Deployment Helper
echo ========================

echo Step 1: Building the frontend
npm run build

if %errorlevel% neq 0 (
    echo Error: Frontend build failed
    pause
    exit /b 1
)

echo Step 2: Frontend built successfully to dist/ folder

echo Step 3: To deploy the frontend, you can now:
echo   - Use Netlify: npx netlify-cli deploy --prod
echo   - Or deploy the dist/ folder to any static hosting service

echo.
echo Step 4: For the backend deployment:
echo   - Deploy the backend/ folder to Render, Railway, or similar service
echo   - Make sure to set the required environment variables
echo   - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, JWT_SECRET

echo.
echo Step 5: Database setup:
echo   - Create a PostgreSQL database on your chosen platform
echo   - Run sql/complete_schema.sql to create tables
echo   - Optionally run sql/02_insert_sample_data.sql for sample data

echo.
echo Deployment complete! Remember to update the VITE_API_URL in your frontend to point to your deployed backend.

pause