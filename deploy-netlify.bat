@echo off
echo EduSync Netlify Deployment Helper
echo =================================

echo.
echo 1. Building the application...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed. Please check the errors above.
    exit /b %errorlevel%
)
echo ✅ Build completed successfully.

echo.
echo 2. Checking if Netlify CLI is installed...
netlify --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Netlify CLI not found. Installing...
    npm install -g netlify-cli
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Netlify CLI.
        exit /b %errorlevel%
    )
    echo ✅ Netlify CLI installed successfully.
) else (
    echo ✅ Netlify CLI is already installed.
)

echo.
echo 3. Deploying to Netlify...
echo Please follow the prompts in your browser to login to Netlify.
echo When asked for deployment settings:
echo   - Publish directory: dist
echo   - Build command: (leave empty)
echo.
netlify deploy --prod

echo.
echo 🎉 Deployment process completed!
echo.
echo Next steps:
echo 1. Set your VITE_API_URL environment variable in the Netlify dashboard
echo 2. Redeploy your site for the environment variables to take effect
echo 3. Visit your site URL to verify everything is working