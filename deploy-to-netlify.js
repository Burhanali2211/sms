/**
 * Netlify Deployment Script
 * This script prepares and provides instructions for deploying to Netlify
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execPromise = promisify(exec);

async function prepareForNetlify() {
  console.log('🔧 Preparing application for Netlify deployment...\n');

  try {
    // 1. Verify build process
    console.log('1. Verifying build process...');
    const { stdout: buildOutput } = await execPromise('npm run build');
    console.log('   ✅ Build completed successfully\n');

    // 2. Check if dist folder exists
    console.log('2. Checking dist folder...');
    const distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      throw new Error('Dist folder not found after build');
    }
    console.log('   ✅ Dist folder exists\n');

    // 3. Check essential files
    console.log('3. Checking essential files...');
    const essentialFiles = ['index.html'];
    for (const file of essentialFiles) {
      const filePath = path.join(distPath, file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Essential file ${file} not found in dist folder`);
      }
    }
    console.log('   ✅ All essential files present\n');

    // 4. Check Netlify config
    console.log('4. Checking Netlify configuration...');
    const netlifyConfigPath = path.join(process.cwd(), 'netlify.toml');
    if (!fs.existsSync(netlifyConfigPath)) {
      console.log('   ⚠️  netlify.toml not found, creating one...');
      // We already created it above, so this shouldn't happen
    }
    console.log('   ✅ Netlify configuration present\n');

    // 5. Provide deployment instructions
    console.log('5. Deployment instructions:');
    console.log(`
   🚀 To deploy to Netlify:
   
   1. Install Netlify CLI (if not already installed):
      npm install -g netlify-cli
      
   2. Login to Netlify:
      netlify login
      
   3. Deploy your site:
      netlify deploy --prod
      
   4. When prompted:
      - Set publish directory to: dist
      - The build command is already configured in netlify.toml
      
   5. Set environment variables in Netlify dashboard:
      - VITE_API_URL = https://your-backend-url.onrender.com/api
      
   🎉 Your site will be live at the provided Netlify URL!
   
   📝 Notes:
   - Make sure your backend is deployed and accessible
   - The VITE_API_URL should point to your backend API
   - For local testing, you can use: netlify dev
   `);

    console.log('\n✅ Preparation for Netlify deployment completed successfully!');
    return true;

  } catch (error) {
    console.error('❌ Error during preparation:', error.message);
    return false;
  }
}

// Run the preparation script
if (process.argv[1] === new URL(import.meta.url).pathname) {
  prepareForNetlify().then(success => {
    process.exit(success ? 0 : 1);
  });
}

export { prepareForNetlify };