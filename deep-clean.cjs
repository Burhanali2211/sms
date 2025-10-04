/**
 * Deep Code Cleaner
 * Removes all debug statements, console logs, and development-only code
 */

const fs = require('fs');
const path = require('path');

// Patterns to remove
const patterns = {
  consoleLog: /console\.(log|error|warn|debug|info|table)\([^)]*\);?\n?/g,
  debugger: /debugger;?\n?/g,
  todos: /\/\/\s*(?:TODO|FIXME|HACK):.*\n/g,
  multipleEmptyLines: /\n\s*\n\s*\n/g,
  developmentBlocks: /if\s*\(\s*process\.env\.NODE_ENV\s*===?\s*['"]development['"]\s*\)\s*{[^}]*}\n?/g
};

// File extensions to process
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Directories to exclude
const excludeDirs = ['node_modules', '.git', 'dist', 'build'];

let cleanedFiles = 0;
let totalRemovals = 0;

function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  return extensions.includes(ext);
}

function shouldProcessDirectory(dirPath) {
  const dirName = path.basename(dirPath);
  return !excludeDirs.includes(dirName);
}

function cleanFile(filePath) {
  if (!shouldProcessFile(filePath)) {
    return false;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    // Count removals for this file
    let fileRemovals = 0;
    
    // Apply all cleaning patterns
    Object.entries(patterns).forEach(([name, pattern]) => {
      const matches = content.match(pattern);
      if (matches) {
        fileRemovals += matches.length;
      }
      content = content.replace(pattern, '');
    });
    
    // Clean up multiple empty lines
    content = content.replace(patterns.multipleEmptyLines, '\n\n');
    
    // Write back if changed
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log(`\x1b[34m🔧 Cleaned:\x1b[0m ${filePath} (\x1b[33m${fileRemovals} items removed\x1b[0m)`);
      cleanedFiles++;
      totalRemovals += fileRemovals;
      return true;
    }
  } catch (error) {
    console.error(`\x1b[31m❌ Error cleaning ${filePath}:\x1b[0m ${error.message}`);
  }
  
  return false;
}

function scanDirectory(dir) {
  try {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && shouldProcessDirectory(itemPath)) {
        scanDirectory(itemPath);
      } else if (stat.isFile()) {
        cleanFile(itemPath);
      }
    });
  } catch (error) {
    console.error(`\x1b[31m❌ Error scanning directory ${dir}:\x1b[0m ${error.message}`);
  }
}

// Main execution
console.log('\x1b[36m========================================\x1b[0m');
console.log('\x1b[36mDEEP CODE CLEANER\x1b[0m');
console.log('\x1b[36m========================================\x1b[0m');

scanDirectory('./src');
scanDirectory('./backend');

console.log('\x1b[36m========================================\x1b[0m');
console.log('\x1b[32m✅ CLEANUP COMPLETE\x1b[0m');
console.log(`\x1b[34m📁 Files cleaned: ${cleanedFiles}\x1b[0m`);
console.log(`\x1b[33m🗑️  Items removed: ${totalRemovals}\x1b[0m`);
console.log('\x1b[36m========================================\x1b[0m');