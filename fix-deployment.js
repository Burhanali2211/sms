/**
 * Deployment Fix Script
 * This script fixes common deployment issues for the EduSync application
 */

import fs from 'fs';
import path from 'path';

function fixViteConfig() {
  const viteConfigPath = path.join(process.cwd(), 'vite.config.ts');
  if (!fs.existsSync(viteConfigPath)) {
    console.log('❌ vite.config.ts not found');
    return false;
  }

  let configContent = fs.readFileSync(viteConfigPath, 'utf8');
  
  // Fix base path
  if (configContent.includes("base: './'")) {
    configContent = configContent.replace("base: './'", "base: '/'");
    console.log('✅ Fixed base path in vite.config.ts');
  }
  
  // Ensure HMR is disabled for production
  if (!configContent.includes("hmr: false")) {
    configContent = configContent.replace(
      "server: {",
      "server: {\n    hmr: false,"
    );
    console.log('✅ Disabled HMR in vite.config.ts');
  }
  
  fs.writeFileSync(viteConfigPath, configContent);
  return true;
}

function fixIndexHtml() {
  const indexPath = path.join(process.cwd(), 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.log('❌ index.html not found');
    return false;
  }

  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Fix base tag
  if (indexContent.includes('<base href="./">')) {
    indexContent = indexContent.replace('<base href="./">', '<base href="/">');
    console.log('✅ Fixed base tag in index.html');
  }
  
  fs.writeFileSync(indexPath, indexContent);
  return true;
}

function fixRenderYaml() {
  const renderPath = path.join(process.cwd(), 'render.yaml');
  if (!fs.existsSync(renderPath)) {
    console.log('❌ render.yaml not found');
    return false;
  }

  let renderContent = fs.readFileSync(renderPath, 'utf8');
  
  // Fix API URL if it's pointing to the wrong backend
  if (renderContent.includes('edusync-backend-yg5g.onrender.com')) {
    renderContent = renderContent.replace(
      'edusync-backend-yg5g.onrender.com', 
      'edusync-backend.onrender.com'
    );
    console.log('✅ Fixed API URL in render.yaml');
  }
  
  fs.writeFileSync(renderPath, renderContent);
  return true;
}

function cleanDistFolder() {
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
    console.log('✅ Cleaned dist folder');
  }
  return true;
}

async function main() {
  console.log('🔧 Fixing deployment issues...\n');
  
  const fixes = [
    { name: 'Vite config', fn: fixViteConfig },
    { name: 'Index HTML', fn: fixIndexHtml },
    { name: 'Render YAML', fn: fixRenderYaml },
    { name: 'Dist folder', fn: cleanDistFolder }
  ];
  
  let successCount = 0;
  
  for (const fix of fixes) {
    try {
      if (await fix.fn()) {
        successCount++;
      }
    } catch (error) {
      console.log(`❌ Error fixing ${fix.name}:`, error.message);
    }
  }
  
  console.log(`\n✅ Completed ${successCount}/${fixes.length} fixes`);
  
  if (successCount === fixes.length) {
    console.log('\n🎉 All deployment issues fixed! You can now rebuild and deploy.');
  } else {
    console.log('\n⚠️  Some issues may still need manual fixing.');
  }
}

// Run the fix script
if (process.argv[1] === new URL(import.meta.url).pathname) {
  main();
}

export { fixViteConfig, fixIndexHtml, fixRenderYaml, cleanDistFolder };