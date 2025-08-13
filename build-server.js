import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📦 Building server bundle...');

// Try multiple possible server entry points
const possiblePaths = [
  path.join(__dirname, 'server', 'index.ts'),
  path.join(__dirname, 'src', 'server', 'index.ts'),
  path.join(__dirname, 'server.js'),
  path.join(__dirname, 'index.js')
];

let serverPath = null;
let serverContent = '';

for (const tryPath of possiblePaths) {
  console.log('🔍 Checking path:', tryPath);
  if (fs.existsSync(tryPath)) {
    serverPath = tryPath;
    console.log('✅ Found server file at:', serverPath);
    break;
  }
}

if (!serverPath) {
  console.error('❌ No server file found. Tried paths:');
  possiblePaths.forEach(p => console.log('  -', p));
  console.log('📁 Available files in root:');
  try {
    const rootFiles = fs.readdirSync(__dirname);
    console.log(rootFiles);
  } catch (e) {
    console.error('Cannot read root directory:', e.message);
  }
  
  // Create a minimal server.js as fallback
  console.log('🔧 Creating minimal server fallback...');
  serverContent = `
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
`;
} else {
  serverContent = fs.readFileSync(serverPath, 'utf8');
}

// Only process TypeScript if we have TypeScript content
if (serverPath && serverPath.endsWith('.ts')) {
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
}

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write the converted server file
const outputPath = path.join(distDir, 'server.js');
fs.writeFileSync(outputPath, serverContent);

console.log('✅ Server bundle created at dist/server.js');
console.log('
