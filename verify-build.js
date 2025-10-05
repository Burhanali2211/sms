/**
 * Build Verification Script
 * This script verifies that the Vite build is configured correctly for deployment
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execPromise = promisify(exec);

async function verifyBuild() {
  console.log('🔍 Verifying build configuration...\n');

  try {
    // Check if dist folder exists
    const distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      console.log('❌ Dist folder does not exist. Building project...');
      await buildProject();
    } else {
      console.log('✅ Dist folder exists');
    }

    // Check if index.html exists in dist
    const indexPath = path.join(distPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
      console.log('❌ index.html not found in dist folder');
      return false;
    }
    console.log('✅ index.html found in dist folder');

    // Check if assets folder exists
    const assetsPath = path.join(distPath, 'assets');
    if (!fs.existsSync(assetsPath)) {
      console.log('⚠️  Assets folder not found in dist folder');
    } else {
      console.log('✅ Assets folder found in dist folder');
    }

    // Check Vite config
    const viteConfigPath = path.join(process.cwd(), 'vite.config.ts');
    if (!fs.existsSync(viteConfigPath)) {
      console.log('❌ vite.config.ts not found');
      return false;
    }
    console.log('✅ vite.config.ts found');

    // Check package.json scripts
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    if (!packageJson.scripts || !packageJson.scripts.build) {
      console.log('❌ Build script not found in package.json');
      return false;
    }
    console.log('✅ Build script found in package.json');

    console.log('\n✅ Build verification completed successfully!');
    return true;

  } catch (error) {
    console.error('❌ Build verification failed:', error.message);
    return false;
  }
}

async function buildProject() {
  try {
    console.log('🔨 Building project...');
    const { stdout, stderr } = await execPromise('npm run build');
    console.log('✅ Build completed successfully');
    if (stdout) console.log('Output:', stdout);
    if (stderr) console.log('Warnings:', stderr);
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    if (error.stdout) console.log('Output:', error.stdout);
    if (error.stderr) console.log('Errors:', error.stderr);
    throw error;
  }
}

// Run verification
if (process.argv[1] === new URL(import.meta.url).pathname) {
  verifyBuild().then(success => {
    process.exit(success ? 0 : 1);
  });
}

export { verifyBuild };