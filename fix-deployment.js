/**
 * Script to fix deployment issues with Vite application
 */
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing deployment issues...');

// 1. Check if dist folder exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Error: dist folder not found. Please run "npm run build" first.');
  process.exit(1);
}

// 2. Check if index.html exists in dist
const distIndexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(distIndexPath)) {
  console.error('❌ Error: dist/index.html not found.');
  process.exit(1);
}

// 3. Read the built index.html
let indexContent = fs.readFileSync(distIndexPath, 'utf8');

// 4. Verify that the script tag has been replaced with built JS
if (indexContent.includes('src="/src/main.tsx"')) {
  console.warn('⚠️  Warning: index.html still references source files. This indicates a build issue.');
  console.log('💡 Try clearing the build cache and rebuilding:');
  console.log('   rm -rf dist');
  console.log('   rm -rf node_modules/.vite');
  console.log('   npm run build');
} else {
  console.log('✅ index.html correctly references built JavaScript files');
}

// 5. Check for common issues in vite.config.ts
const viteConfigPath = path.join(__dirname, 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  if (!viteConfig.includes("base: './'")) {
    console.warn('⚠️  Warning: vite.config.ts should include base: "./" for proper asset loading');
  } else {
    console.log('✅ vite.config.ts has correct base configuration');
  }
}

console.log('\n📋 Deployment checklist:');
console.log('1. Ensure you are deploying the "dist" folder contents, not the source files');
console.log('2. Make sure your static hosting is configured to serve index.html for all routes (SPA mode)');
console.log('3. Verify environment variables are set correctly:');
console.log('   - VITE_API_URL should point to your backend API');
console.log('4. If problems persist, try clearing build cache and rebuilding');

console.log('\n✅ Deployment fix script completed');