const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>FindMyBizName - Live</title>
      <style>
        body { 
          font-family: Arial; 
          background: linear-gradient(135deg, #0040FF, #FF2D2D); 
          color: white; 
          text-align: center; 
          padding: 50px; 
          margin: 0;
        }
        .container { 
          background: rgba(255,255,255,0.1); 
          padding: 40px; 
          border-radius: 20px; 
          max-width: 800px; 
          margin: 0 auto;
        }
        .logo { font-size: 3em; margin-bottom: 20px; }
        .status { color: #FFDD00; font-size: 1.5em; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">🚀 FindMyBizName</div>
        <div class="status">✅ PLATFORM LIVE</div>
        <h1>Complete Business Operating System</h1>
        <p><strong>Serving 430.5M underbanked entrepreneurs globally</strong></p>
        <p>First Complete Global Business Operating System</p>
        <p>Revenue Target: TTD 150,000 annually</p>
        <br>
        <p>🤖 AI Business Naming • 🌐 Domain Checking • 💼 CRM</p>
        <p>💰 Global Payments • 📊 Business Intelligence • 🎯 30% Referrals</p>
      </div>
    </body>
    </html>
  `);
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    platform: 'FindMyBizName',
    market: '430.5M underbanked entrepreneurs'
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`FindMyBizName server running on port ${PORT}`);
});
