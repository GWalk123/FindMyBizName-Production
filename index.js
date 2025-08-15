const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }));
app.use(express.static('.', { maxAge: '1d' }));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success',
    platform: 'FindMyBizName - Complete Business Operating System',
    nodeVersion: process.version,
    market: '430.5M underbanked entrepreneurs globally',
    campaigns: ['PRICEGATE', 'STRIPEGATE']
  });
});

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API not found' });
  }
  
  res.send(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FindMyBizName - Complete Business Operating System</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, sans-serif; background: linear-gradient(135deg, #0040FF 0%, #FF2D2D 100%); min-height: 100vh; color: white; }
.container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; text-align: center; }
.hero { background: rgba(255,255,255,0.1); padding: 60px 40px; border-radius: 20px; backdrop-filter: blur(10px); }
h1 { font-size: 3.5em; margin-bottom: 20px; color: #FFDD00; font-weight: 900; }
.subtitle { font-size: 1.5em; margin-bottom: 30px; }
.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 40px 0; }
.feature { background: rgba(255,255,255,0.15); padding: 25px; border-radius: 15px; transition: transform 0.3s ease; }
.feature:hover { transform: translateY(-5px); }
.stats { display: flex; justify-content: space-around; margin: 40px 0; flex-wrap: wrap; }
.stat-number { font-size: 2.5em; font-weight: bold; color: #FFDD00; }
.campaign { display: inline-block; background: #FF2D2D; padding: 12px 25px; border-radius: 30px; margin: 0 15px; font-weight: bold; }
</style></head><body>
<div class="container">
  <div class="hero">
    <h1>FindMyBizName</h1>
    <div class="subtitle">The First Complete Global Business Operating System for Underbanked Entrepreneurs</div>
    <div class="stats">
      <div><div class="stat-number">430.5M</div><div>Global Market</div></div>
      <div><div class="stat-number">12+</div><div>Business Tools</div></div>
      <div><div class="stat-number">TTD 150K</div><div>Revenue Target</div></div>
    </div>
  </div>
  <div class="features">
    <div class="feature"><h3>🤖 AI Business Naming</h3><p>Generate perfect business names</p></div>
    <div class="feature"><h3>🌐 Domain Checking</h3><p>Real-time availability checking</p></div>
    <div class="feature"><h3>📊 Business Intelligence</h3><p>SEC EDGAR integration</p></div>
    <div class="feature"><h3>👥 Complete CRM</h3><p>Customer relationship management</p></div>
    <div class="feature"><h3>💰 Payment Processing</h3><p>Global payment solutions</p></div>
    <div class="feature"><h3>📈 Referral System</h3><p>30% recurring commissions</p></div>
    <div class="feature"><h3>🛍️ Digital Products</h3><p>Business templates marketplace</p></div>
    <div class="feature"><h3>📰 Biz Newz</h3><p>Live business news feed</p></div>
  </div>
  <div style="margin: 30px 0;">
    <span class="campaign">PRICEGATE</span>
    <span class="campaign">STRIPEGATE</span>
  </div>
  <div style="margin-top: 40px; font-size: 1.2em;">
    <div>✅ Platform: <strong>LIVE & OPERATIONAL</strong></div>
    <div>🎯 Mission: <strong>Democratizing Business Tools Globally</strong></div>
  </div>
</div></body></html>`);
});

app.listen(port, '0.0.0.0', () => {
  console.log(\`🚀 FindMyBizName running on port \${port}\`);
  console.log(\`📊 Node.js: \${process.version}\`);
  console.log('✅ Platform OPERATIONAL for 430.5M entrepreneurs');
});
