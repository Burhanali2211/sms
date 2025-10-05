#!/bin/bash

echo "EduSync Netlify Deployment Helper"
echo "================================="

echo ""
echo "1. Building the application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
echo "✅ Build completed successfully."

echo ""
echo "2. Checking if Netlify CLI is installed..."
if ! command -v netlify &> /dev/null; then
    echo "⚠️  Netlify CLI not found. Installing..."
    npm install -g netlify-cli
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Netlify CLI."
        exit 1
    fi
    echo "✅ Netlify CLI installed successfully."
else
    echo "✅ Netlify CLI is already installed."
fi

echo ""
echo "3. Deploying to Netlify..."
echo "Please follow the prompts in your browser to login to Netlify."
echo "When asked for deployment settings:"
echo "  - Publish directory: dist"
echo "  - Build command: (leave empty)"
echo ""
netlify deploy --prod

echo ""
echo "🎉 Deployment process completed!"
echo ""
echo "Next steps:"
echo "1. Set your VITE_API_URL environment variable in the Netlify dashboard"
echo "2. Redeploy your site for the environment variables to take effect"
echo "3. Visit your site URL to verify everything is working"