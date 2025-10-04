/**
 * Script to verify the build output has correct paths
 */
const fs = require('fs');
const path = require('path');

// Check if dist folder exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Build failed: dist folder not found');
  process.exit(1);
}

// Check if index.html exists and has correct base href
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ Build failed: dist/index.html not found');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, 'utf8');
if (!indexContent.includes('<base href="./">')) {
  console.warn('⚠️  Warning: <base href="./"> not found in index.html');
}

// Check if assets are properly referenced
if (!indexContent.includes('src="/src/main.tsx"') && !indexContent.includes('src="./src/main.tsx"')) {
  console.warn('⚠️  Warning: main.tsx reference might be incorrect in index.html');
}

console.log('✅ Build verification passed');
console.log('✅ You can now deploy the dist folder');