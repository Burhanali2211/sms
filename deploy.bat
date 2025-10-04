@echo off
:: EduSync Deployment Script for Windows
:: This script automates the deployment process to GitHub and Render

title EduSync Deployment

echo 🚀 Starting EduSync Deployment Process...

:: 1. Clean previous builds
echo 🧹 Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist "node_modules/.vite" rmdir /s /q "node_modules/.vite"

:: 2. Install dependencies
echo 📦 Installing dependencies...
npm install

:: 3. Run build verification
echo 🔍 Verifying build configuration...
npm run verify

:: 4. Build the application
echo 🏗️ Building the application...
npm run build

:: 5. Check if build was successful
if not exist "dist" (
  echo ❌ Build failed: dist folder not created
  pause
  exit /b 1
)

echo ✅ Build completed successfully

:: 6. Commit and push to GitHub
echo 💾 Committing changes to GitHub...
git add .
git commit -m "Automated deployment: %date% %time%"
git push origin main

echo ✅ Changes pushed to GitHub

:: 7. Instructions for Render deployment
echo 📋 Deployment Summary:
echo    1. Your code has been pushed to GitHub
echo    2. Go to your Render dashboard to trigger deployment
echo    3. Monitor the deployment logs for any issues
echo    4. Visit https://sms-kn5a.onrender.com after deployment completes

echo 🎉 Deployment process completed!
echo 💡 Remember to verify that your environment variables are correctly set on Render

pause