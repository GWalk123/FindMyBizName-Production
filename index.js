import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    platform: 'FindMyBizName - Complete Business Operating System',
    market: '430.5M underbanked entrepreneurs globally',
    campaigns: ['PRICEGATE', 'STRIPEGATE'],
    features: [
      'AI Business Naming Engine',
      'Real-time Domain Checking', 
      'Complete CRM System',
      'Business Intelligence Suite',
      'Digital Products Marketplace'
    ]
  });
});

// Production static serving - React App
if (isProduction) {
  // Serve React assets
  app.use('/assets', express.static('assets', { maxAge: '1y' }));
  app.use(express.static('.', { maxAge: '1d' }));

  // SPA fallback - serve React app
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    
    const indexPath = path.join(__dirname, 'index.html');
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.send(`<!DOCTYPE html>
<html><head><title>FindMyBizName</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body><div id="root"><div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
<h1 style="color: #0040FF;">FindMyBizName</h1><p>Complete Business Operating System</p>
<p>Serving 430.5M underbanked entrepreneurs globally</p><p>PRICEGATE + STRIPEGATE campaigns active</p>
</div></div></body></html>`);
    }
  });
}

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 FindMyBizName server running on 0.0.0.0:${port}`);
  console.log(`✅ Deployment: SUCCESS`);
  console.log(`🎯 Market: 430.5M underbanked entrepreneurs`);
});
