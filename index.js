const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// DEPLOYMENT TEST - Admin Endpoints Fixed Version 3.2.0
console.log('🚀 ADMIN ENDPOINTS VERSION 3.2.0 LOADING...');

app.use(helmet({ contentSecurityPolicy: false }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));
app.use(express.json());
app.use(express.static('.'));

// CRITICAL: Admin authentication endpoint
app.post('/api/admin/login', (req, res) => {
  console.log('🔑 Admin login attempt received');
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (password === adminPassword) {
    console.log('✅ Admin login successful');
    res.json({ success: true, message: 'Authentication successful - Version 3.2.0' });
  } else {
    console.log('❌ Admin login failed');
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// CRITICAL: Admin panel data endpoint
app.get('/api/admin/data', (req, res) => {
  console.log('📊 Admin data requested');
  res.json({
    version: '3.2.0-admin-fixed',
    deployment: 'ADMIN_ENDPOINTS_ACTIVE',
    apiKeys: {
      rapidapi: process.env.RAPIDAPI_KEY ? 'Configured' : 'Not set',
      openai: process.env.OPENAI_API_KEY ? 'Configured' : 'Not set',
      godaddy: process.env.GODADDY_API_KEY ? 'Configured' : 'Not set',
      sendgrid: process.env.SENDGRID_API_KEY ? 'Configured' : 'Not set',
      coinbase: process.env.COINBASE_COMMERCE_API_KEY ? 'Configured' : 'Not set',
      paypal: process.env.PAYPAL_CLIENT_ID ? 'Configured' : 'Not set'
    },
    status: {
      database: process.env.DATABASE_URL ? 'Connected' : 'Not configured',
      domainChecker: process.env.RAPIDAPI_KEY || process.env.GODADDY_API_KEY ? 'Active' : 'Inactive',
      aiFeatures: process.env.OPENAI_API_KEY ? 'Active' : 'Inactive'
    }
  });
});

// DEPLOYMENT VERIFICATION ENDPOINT
app.get('/api/deployment-status', (req, res) => {
  res.json({ 
    message: 'ADMIN ENDPOINTS SUCCESSFULLY DEPLOYED!', 
    version: '3.2.0-admin-fixed',
    timestamp: new Date().toISOString(),
    adminEndpoints: 'ACTIVE',
    deployment: 'SUCCESS'
  });
});

app.get('/', (req, res) => {
  res.send(\`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FindMyBizName - ADMIN ENDPOINTS ACTIVE v3.2.0</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #FF2D2D, #0040FF); color: white; }
        .container { max-width: 800px; margin: 0 auto; text-align: center; }
        .status { background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin: 20px 0; }
        .admin-test { background: #00FF00; color: black; padding: 10px; border-radius: 5px; margin: 10px 0; }
        button { background: #FFDD00; color: black; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
        input { padding: 10px; margin: 10px; border: none; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 FindMyBizName v3.2.0</h1>
        <h2>The Essential Business Toolkit for Underbanked Entrepreneurs</h2>
        
        <div class="admin-test">
            ✅ ADMIN ENDPOINTS SUCCESSFULLY DEPLOYED!
        </div>
        
        <div class="status">
            <h3>🔑 Admin Panel Test</h3>
            <input type="password" id="adminPassword" placeholder="Enter admin password">
            <br>
            <button onclick="testAdminLogin()">Test Admin Login</button>
            <div id="adminResult" style="margin-top: 20px;"></div>
        </div>
        
        <div class="status">
            <h3>📊 API Status Check</h3>
            <button onclick="checkDeploymentStatus()">Check Deployment Status</button>
            <div id="deploymentResult" style="margin-top: 20px;"></div>
        </div>
    </div>
    
    <script>
        async function testAdminLogin() {
            const password = document.getElementById('adminPassword').value;
            if (!password) {
                alert('Please enter admin password');
                return;
            }
            
            try {
                const response = await fetch('/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });
                
                const result = await response.json();
                document.getElementById('adminResult').innerHTML = 
                    \`<div style="background: \${result.success ? '#00FF00' : '#FF0000'}; color: black; padding: 10px; border-radius: 5px;">
                        \${result.message}
                    </div>\`;
                    
                if (result.success) {
                    loadAdminData();
                }
            } catch (error) {
                document.getElementById('adminResult').innerHTML = 
                    \`<div style="background: #FF0000; color: white; padding: 10px; border-radius: 5px;">
                        Error: \${error.message}
                    </div>\`;
            }
        }
        
        async function loadAdminData() {
            try {
                const response = await fetch('/api/admin/data');
                const data = await response.json();
                
                const statusHtml = \`
                    <h4>🔑 API Configuration Status</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; text-align: left;">
                        <div><strong>RapidAPI:</strong> \${data.apiKeys.rapidapi}</div>
                        <div><strong>OpenAI:</strong> \${data.apiKeys.openai}</div>
                        <div><strong>GoDaddy:</strong> \${data.apiKeys.godaddy}</div>
                        <div><strong>SendGrid:</strong> \${data.apiKeys.sendgrid}</div>
                        <div><strong>Coinbase:</strong> \${data.apiKeys.coinbase}</div>
                        <div><strong>PayPal:</strong> \${data.apiKeys.paypal}</div>
                    </div>
                    <h4 style="margin-top: 1rem;">⚡ Service Status</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; text-align: left;">
                        <div><strong>Database:</strong> \${data.status.database}</div>
                        <div><strong>Domain Checker:</strong> \${data.status.domainChecker}</div>
                        <div><strong>AI Features:</strong> \${data.status.aiFeatures}</div>
                    </div>
                \`;
                
                document.getElementById('adminResult').innerHTML += statusHtml;
            } catch (error) {
                document.getElementById('adminResult').innerHTML += 
                    '<div style="background: #FF0000; color: white; padding: 10px; border-radius: 5px; margin-top: 10px;">Error loading admin data: ' + error.message + '</div>';
            }
        }
        
        async function checkDeploymentStatus() {
            try {
                const response = await fetch('/api/deployment-status');
                const data = await response.json();
                
                document.getElementById('deploymentResult').innerHTML = 
                    \`<div style="background: #00FF00; color: black; padding: 10px; border-radius: 5px;">
                        <strong>Deployment:</strong> \${data.deployment}<br>
                        <strong>Version:</strong> \${data.version}<br>
                        <strong>Admin Endpoints:</strong> \${data.adminEndpoints}<br>
                        <strong>Timestamp:</strong> \${data.timestamp}
                    </div>\`;
            } catch (error) {
                document.getElementById('deploymentResult').innerHTML = 
                    \`<div style="background: #FF0000; color: white; padding: 10px; border-radius: 5px;">
                        Error: \${error.message}
                    </div>\`;
            }
        }
    </script>
</body>
</html>
  \`);
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'operational',
    platform: 'FindMyBizName - The Essential Business Toolkit',
    description: 'For Sole Traders, SMEs and Underbanked Entrepreneurs Worldwide',
    version: '3.2.0-admin-fixed',
    adminEndpoints: 'ACTIVE',
    deployment: 'SUCCESS',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 FindMyBizName v3.2.0 with ADMIN ENDPOINTS ACTIVE on port ' + PORT);
  console.log('🔑 Admin login endpoint: /api/admin/login');
  console.log('📊 Admin data endpoint: /api/admin/data');
  console.log('✅ Deployment status endpoint: /api/deployment-status');
  console.log('🌍 Platform: The Essential Business Toolkit for Underbanked Entrepreneurs');
});
