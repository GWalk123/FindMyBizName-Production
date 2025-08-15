const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success',
    platform: 'FindMyBizName - Complete Business Operating System',
    market: '430.5M underbanked entrepreneurs globally',
    campaigns: ['PRICEGATE', 'STRIPEGATE']
  });
});

// Serve platform for all routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FindMyBizName - Complete Business Operating System</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #0040FF 0%, #FF2D2D 100%);
      min-height: 100vh; display: flex; align-items: center; justify-content: center; color: white;
    }
    .container { 
      text-align: center; padding: 40px; background: rgba(255,255,255,0.1);
      border-radius: 20px; backdrop-filter: blur(10px); max-width: 900px;
    }
    h1 { font-size: 3em; margin-bottom: 20px; color: #FFDD00; }
    .subtitle { font-size: 1.4em; margin-bottom: 30px; opacity: 0.9; }
    .features { 
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px; margin: 30px 0;
    }
    .feature { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; font-weight: bold; }
    .campaign { 
      display: inline-block; background: #FF2D2D; color: white;
      padding: 8px 20px; border-radius: 25px; margin: 0 10px; font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>FindMyBizName</h1>
    <div class="subtitle">The First Complete Global Business Operating System for Underbanked Entrepreneurs</div>
    
    <div class="features">
      <div class="feature">🤖 AI Business Naming</div>
      <div class="feature">🌐 Domain Checking</div>
      <div class="feature">📊 Business Intelligence</div>
      <div class="feature">👥 Complete CRM</div>
      <div class="feature">💰 Payment Processing</div>
      <div class="feature">📈 Referral System</div>
      <div class="feature">🛍️ Digital Products</div>
      <div class="feature">📰 Biz Newz</div>
      <div class="feature">🤖 Biz Botz</div>
      <div class="feature">💼 Invoicing</div>
      <div class="feature">🎯 Analytics</div>
      <div class="feature">🔒 Secure Payments</div>
    </div>
    
    <div style="margin-top: 30px; font-size: 1.2em;">
      <div>✅ Platform: <strong>LIVE & OPERATIONAL</strong></div>
      <div>🎯 Market: <strong>430.5M Underbanked Entrepreneurs</strong></div>
      <div style="margin-top: 20px;">
        <span class="campaign">PRICEGATE</span>
        <span class="campaign">STRIPEGATE</span>
      </div>
    </div>
  </div>
</body>
</html>`);
});

app.listen(port, '0.0.0.0', () => {
  console.log(\`🚀 FindMyBizName live on port \${port}\`);
  console.log('✅ Serving 430.5M underbanked entrepreneurs globally');
});
