#!/bin/bash

# EduSync Deployment Verification Script

echo "🔍 Verifying EduSync deployment setup..."

# Check if required files exist
echo "1. Checking required files..."
if [ ! -f "package.json" ]; then
  echo "❌ package.json not found"
  exit 1
fi

if [ ! -f "vite.config.ts" ]; then
  echo "❌ vite.config.ts not found"
  exit 1
fi

echo "✅ Required configuration files found"

# Check Vite configuration
echo "2. Checking Vite configuration..."
if grep -q "base: './'" vite.config.ts; then
  echo "✅ Vite base path correctly configured"
else
  echo "⚠️  Warning: Vite base path may not be correctly configured"
fi

# Clean previous builds
echo "3. Cleaning previous builds..."
rm -rf dist
rm -rf node_modules/.vite

# Install dependencies
echo "4. Installing dependencies..."
npm install

# Build the application
echo "5. Building the application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
  echo "❌ Build failed: dist folder not created"
  exit 1
fi

echo "✅ Build completed successfully"

# Check dist contents
echo "6. Verifying dist contents..."
if [ ! -f "dist/index.html" ]; then
  echo "❌ dist/index.html not found"
  exit 1
fi

# Check that index.html references built JS, not source files
if grep -q 'src="/src/main.tsx"' dist/index.html; then
  echo "❌ Error: dist/index.html still references source files"
  echo "💡 This indicates a build configuration issue"
  exit 1
else
  echo "✅ dist/index.html correctly references built JavaScript files"
fi

# Check for common deployment issues
echo "7. Checking for common deployment issues..."

# Verify environment variables
echo "8. Environment variables check:"
echo "   VITE_API_URL: ${VITE_API_URL:-Not set}"
echo "   NODE_ENV: ${NODE_ENV:-Not set}"

echo ""
echo "✅ Deployment verification completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy the contents of the 'dist' folder to your static hosting"
echo "2. Ensure your hosting is configured for SPA (single-page application) routing"
echo "3. Set the required environment variables on your hosting platform"
echo "4. Your API should be accessible at the URL specified in VITE_API_URL"