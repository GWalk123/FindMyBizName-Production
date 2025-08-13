import fs from 'fs';
import path from 'path';

// Copy server files to dist
const serverFiles = ['server/index.ts', 'shared/schema.ts'];
const distDir = 'dist';

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Simple server bundle for production
const serverCode = `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'client')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch-all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`🌍 FindMyBizName running on port ${PORT}\`);
});
`;

fs.writeFileSync(path.join(distDir, 'server.js'), serverCode);
console.log('✅ Server bundle created');
