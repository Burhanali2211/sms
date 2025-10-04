#!/bin/bash

# Build the frontend
npm install
npm run build

# The dist folder is now ready for deployment
echo "Frontend build completed. Deploy the dist folder to your static hosting provider."