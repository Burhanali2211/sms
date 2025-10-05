/**
 * Render Configuration Verification Script
 * This script checks your Render configuration files for common issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function checkRenderYaml() {
  console.log('🔍 Checking render.yaml configuration...\n');
  
  const renderYamlPath = path.join(__dirname, 'render.yaml');
  
  if (!fs.existsSync(renderYamlPath)) {
    console.log('❌ render.yaml not found');
    return false;
  }
  
  const content = fs.readFileSync(renderYamlPath, 'utf8');
  console.log('✅ render.yaml found');
  
  // Check for required sections
  if (!content.includes('services:')) {
    console.log('❌ Missing services section');
    return false;
  }
  
  if (!content.includes('type: web')) {
    console.log('❌ Missing web service type');
    return false;
  }
  
  if (!content.includes('env: static') && content.includes('staticPublishPath:')) {
    console.log('⚠️  Inconsistent configuration: staticPublishPath found but env is not static');
  }
  
  // Check for frontend service
  if (content.includes('edusync-frontend')) {
    console.log('✅ Frontend service configuration found');
    
    if (!content.includes('staticPublishPath: dist')) {
      console.log('⚠️  staticPublishPath should be "dist" for Vite builds');
    }
    
    if (!content.includes('buildCommand: npm install && npm run build')) {
      console.log('⚠️  Build command should be "npm install && npm run build"');
    }
  }
  
  // Check for backend service
  if (content.includes('edusync-backend')) {
    console.log('✅ Backend service configuration found');
    
    if (!content.includes('rootDir: backend')) {
      console.log('⚠️  rootDir should be "backend" for backend service');
    }
  }
  
  console.log('\n✅ render.yaml verification completed\n');
  return true;
}

function checkViteConfig() {
  console.log('🔍 Checking vite.config.ts configuration...\n');
  
  const viteConfigPath = path.join(__dirname, 'vite.config.ts');
  
  if (!fs.existsSync(viteConfigPath)) {
    console.log('❌ vite.config.ts not found');
    return false;
  }
  
  const content = fs.readFileSync(viteConfigPath, 'utf8');
  console.log('✅ vite.config.ts found');
  
  // Check base configuration
  if (!content.includes("base: '/'")) {
    console.log('⚠️  Base should be "/" for proper static hosting');
  }
  
  // Check HMR configuration
  if (!content.includes('hmr: false')) {
    console.log('⚠️  HMR should be disabled for production deployment');
  }
  
  console.log('\n✅ vite.config.ts verification completed\n');
  return true;
}

function checkDistFolder() {
  console.log('🔍 Checking dist folder...\n');
  
  const distPath = path.join(__dirname, 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.log('❌ dist folder not found. Run "npm run build" first');
    return false;
  }
  
  console.log('✅ dist folder found');
  
  // Check essential files
  const essentialFiles = ['index.html'];
  for (const file of essentialFiles) {
    const filePath = path.join(distPath, file);
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Essential file ${file} not found in dist folder`);
      return false;
    }
  }
  
  console.log('✅ Essential files present in dist folder\n');
  return true;
}

function checkEnvironmentVariables() {
  console.log('🔍 Checking environment variable configuration...\n');
  
  // Check for .env file
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file found. Make sure it is in .gitignore for security');
  }
  
  console.log('✅ Environment variable check completed\n');
  return true;
}

async function main() {
  console.log('🧪 EduSync Render Configuration Verification\n');
  
  const checks = [
    { name: 'Render YAML', fn: checkRenderYaml },
    { name: 'Vite Config', fn: checkViteConfig },
    { name: 'Dist Folder', fn: checkDistFolder },
    { name: 'Environment Variables', fn: checkEnvironmentVariables }
  ];
  
  let passed = 0;
  
  for (const check of checks) {
    try {
      if (await check.fn()) {
        passed++;
      }
    } catch (error) {
      console.log(`❌ Error checking ${check.name}:`, error.message);
    }
  }
  
  console.log(`\n📋 Verification Summary: ${passed}/${checks.length} checks passed`);
  
  if (passed === checks.length) {
    console.log('\n🎉 All configuration checks passed! You are ready to deploy to Render.');
    console.log('\nNext steps:');
    console.log('1. Push your changes to GitHub');
    console.log('2. Follow the RENDER_DEPLOYMENT_CHECKLIST.md');
    console.log('3. Deploy to Render using the GitHub integration');
  } else {
    console.log('\n⚠️  Some checks failed or have warnings. Please review the output above.');
  }
}

// Run verification
if (process.argv[1] === __filename) {
  main();
}

export { checkRenderYaml, checkViteConfig, checkDistFolder, checkEnvironmentVariables };