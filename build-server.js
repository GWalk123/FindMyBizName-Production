import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📦 Building server bundle...');

// Read the server entry point
const serverPath = path.join(__dirname, 'server', 'index.ts');
console.log('📁 Looking for server file at:', serverPath);

// Check if file exists
if (!fs.existsSync(serverPath)) {
  console.error('❌ Server file not found at:', serverPath);
  console.log('📁 Available files in server directory:');
  try {
    const serverDir = path.join(__dirname, 'server');
    const files = fs.readdirSync(serverDir);
    console.log(files);
  } catch (e) {
    console.error('❌ Cannot read server directory:', e.message);
  }
  process.exit(1);
}

let serverContent = fs.readFileSync(serverPath, 'utf8');

// Replace TypeScript imports with CommonJS requires for production
serverContent = serverContent
  .replace(/import\s+(.+?)\s+from\s+['"](.+?)['"];?/g, (match, imports, module) => {
    if (module.startsWith('.')) {
      // Local module - convert to .js extension
      const jsModule = module.replace(/\.ts$/, '.js');
      return `const ${imports} = require('${jsModule}');`;
    }
    // External module
    return `const ${imports} = require('${module}');`;
  })
  .replace(/export\s+default\s+/g, 'module.exports = ')
  .replace(/export\s+\{([^}]+)\}/g, 'module.exports = { $1 }')
  .replace(/export\s+const\s+(\w+)/g, 'const $1')
  .replace(/export\s+function\s+(\w+)/g, 'function $1')
  .replace(/export\s+async\s+function\s+(\w+)/g, 'async function $1');

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write the converted server file
const outputPath = path.join(distDir, 'server.js');
fs.writeFileSync(outputPath, serverContent);

console.log('✅ Server bundle created at dist/server.js');
console.log('🚀 Ready for production deployment');
