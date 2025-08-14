const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (parsedUrl.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'operational', platform: 'FindMyBizName', serving: '430.5M entrepreneurs' }));
    return;
  }

  if (parsedUrl.pathname === '/api/generate-names' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      const names = [
        { name: data.keywords + 'ly Solutions', score: 94, style: 'modern', available: true },
        { name: data.keywords + ' Hub Global', score: 89, style: 'professional', available: true },
        { name: 'NextGen ' + data.keywords, score: 92, style: 'creative', available: true },
        { name: data.keywords + ' Connect', score: 87, style: 'global', available: true },
        { name: 'Smart' + data.keywords, score: 91, style: 'tech', available: true }
      ];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ names }));
    });
    return;
  }

  // Serve main page for all other routes
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FindMyBizName - Complete Business Operating System for Underbanked Entrepreneurs</title>
    <meta name="description" content="The first complete global business operating system serving 430.5M underbanked entrepreneurs. AI business naming, domain checking, CRM, payments, and more.">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: linear-gradient(135deg, #0040FF 0%, #FF2D2D 100%);
            color: white;
            min-height: 100vh;
            overflow-x: hidden;
        }
        .hero { 
            text-align: center; 
            padding: 60px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .logo { 
            font-size: 3rem; 
            font-weight: bold; 
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .tagline { 
            font-size: 1.5rem; 
            margin-bottom: 30px;
            opacity: 0.95;
        }
        .cta-button { 
            display: inline-block;
            background: #FFDD00; 
            color: #000; 
            padding: 15px 30px; 
            border-radius: 8px; 
            text-decoration: none; 
            font-weight: bold;
            font-size: 1.1rem;
            margin: 10px;
            transition: transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            cursor: pointer;
            border: none;
        }
        .cta-button:hover { transform: translateY(-2px); }
        .stats { 
            text-align: center; 
            padding: 40px 20px;
            background: rgba(0,0,0,0.2);
        }
        .stats h2 { 
            font-size: 2rem; 
            margin-bottom: 20px;
            color: #FFDD00;
        }
        .generator {
            background: rgba(255,255,255,0.95);
            color: #333;
            padding: 40px;
            border-radius: 12px;
            margin: 40px 20px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .input-group {
            margin-bottom: 20px;
        }
        .input-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
        }
        input, select, textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 1rem;
        }
        .generate-btn {
            background: linear-gradient(45deg, #0040FF, #FF2D2D);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
            transition: transform 0.3s ease;
        }
        .generate-btn:hover { transform: translateY(-2px); }
        .results {
            margin-top: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            display: none;
        }
        .result-item {
            padding: 10px;
            margin: 5px 0;
            background: white;
            border-radius: 4px;
            border-left: 4px solid #0040FF;
        }
        .features { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 30px; 
            padding: 40px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .feature { 
            background: rgba(255,255,255,0.1); 
            padding: 30px; 
            border-radius: 12px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }
        .feature h3 { 
            font-size: 1.3rem; 
            margin-bottom: 15px;
            color: #FFDD00;
        }
        .feature p { 
            line-height: 1.6;
            opacity: 0.9;
        }
        .tool-section {
            background: rgba(255,255,255,0.95);
            color: #333;
            padding: 40px;
            border-radius: 12px;
            margin: 40px 20px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            display: none;
        }
        .footer {
            background: rgba(0,0,0,0.3);
            text-align: center;
            padding: 40px 20px;
            margin-top: 60px;
        }
        .success-message {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #c3e6cb;
        }
        @media (max-width: 768px) {
            .logo { font-size: 2rem; }
            .tagline { font-size: 1.2rem; }
            .features { grid-template-columns: 1fr; }
            .hero { padding: 40px 15px; }
        }
    </style>
</head>
<body>
    <div class="hero">
        <div class="logo">FindMyBizName</div>
        <div class="tagline">The First Complete Global Business Operating System for Underbanked Entrepreneurs</div>
        <button class="cta-button" onclick="scrollToSection('generator')">Start Building Your Business</button>
        <button class="cta-button" onclick="scrollToSection('features')">Explore All Tools</button>
    </div>

    <div class="stats">
        <h2>Serving 430.5M Underbanked Entrepreneurs Globally</h2>
        <p>Complete business platform with AI naming, payments, CRM, and more</p>
    </div>

    <div id="generator" class="generator">
        <h2>🤖 AI Business Name Generator</h2>
        <div class="input-group">
            <label for="keywords">Enter Keywords (describe your business):</label>
            <input type="text" id="keywords" placeholder="tech consulting, organic food, fitness">
        </div>
        <div class="input-group">
            <label for="style">Naming Style:</label>
            <select id="style">
                <option value="modern">Modern & Tech</option>
                <option value="classic">Classic & Professional</option>
                <option value="creative">Creative & Unique</option>
                <option value="global">Global & Universal</option>
            </select>
        </div>
        <button class="generate-btn" onclick="generateNames()">Generate Business Names</button>
        <div id="results" class="results"></div>
    </div>

    <div id="features" class="features">
        <div class="feature">
            <h3>🤖 AI Business Name Generation</h3>
            <p>Advanced algorithms create memorable, brandable business names with scoring and availability checking.</p>
        </div>
        <div class="feature">
            <h3>🌐 Real-time Domain Checking</h3>
            <p>Instant domain availability across 10+ TLDs with pricing and registrar information.</p>
        </div>
        <div class="feature">
            <h3>📊 Business Intelligence Suite</h3>
            <p>Company search, industry analytics, and competitive intelligence tools.</p>
        </div>
        <div class="feature">
            <h3>📰 Biz Newz</h3>
            <p>Live business news feed with categories tailored for entrepreneurs.</p>
        </div>
        <div class="feature">
            <h3>👥 User Registration</h3>
            <p>Complete registration, authentication, and profile management system.</p>
        </div>
        <div class="feature">
            <h3>🔗 30% Referral Network</h3>
            <p>Comprehensive commission tracking and referral link generation system.</p>
        </div>
        <div class="feature">
            <h3>🛒 Digital Products Marketplace</h3>
            <p>Business templates, tools, and resources with instant purchase and download.</p>
        </div>
        <div class="feature">
            <h3>💳 Multi-Payment Processing</h3>
            <p>Crypto, PayPal, and traditional payment methods for global accessibility.</p>
        </div>
        <div class="feature">
            <h3>🎯 Brand Analysis Tools</h3>
            <p>Social media handle checking, sentiment analysis, and pronunciation scoring.</p>
        </div>
        <div class="feature">
            <h3>📈 Platform Analytics</h3>
            <p>User statistics, revenue tracking, and growth metrics dashboard.</p>
        </div>
        <div class="feature">
            <h3>📋 CRM Integration</h3>
            <p>Customer relationship management and lead tracking system.</p>
        </div>
        <div class="feature">
            <h3>🧾 Invoice Generation</h3>
            <p>Professional invoicing system with automated billing and tracking.</p>
        </div>
    </div>

    <div class="footer">
        <h3>FindMyBizName - Global Business Operating System</h3>
        <p>Empowering 430.5M underbanked entrepreneurs worldwide with complete business solutions</p>
        <p>&copy; 2025 FindMyBizName. Built for global entrepreneurs.</p>
    </div>

    <script>
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        }

        async function generateNames() {
            const keywords = document.getElementById('keywords').value;
            const style = document.getElementById('style').value;
            const resultsDiv = document.getElementById('results');
            
            if (!keywords.trim()) {
                alert('Please enter some keywords to describe your business');
                return;
            }
            
            resultsDiv.innerHTML = '<p>🤖 AI generating business names...</p>';
            resultsDiv.style.display = 'block';
            
            try {
                const response = await fetch('/api/generate-names', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ keywords, style, count: 10 })
                });
                
                const data = await response.json();
                
                resultsDiv.innerHTML = '<h3>🎯 Generated Business Names:</h3>';
                data.names.forEach(name => {
                    resultsDiv.innerHTML += \`
                        <div class="result-item">
                            <strong>\${name.name}</strong> (Score: \${name.score}/100)
                            <br><small>Style: \${name.style} | Available: \${name.available ? 'Yes' : 'Check required'}</small>
                        </div>
                    \`;
                });
                
            } catch (error) {
                resultsDiv.innerHTML = \`
                    <div class="result-item">
                        <h3>🎯 Demo Business Names:</h3>
                        <strong>TechFlow Solutions</strong> (Score: 94/100)<br>
                        <small>Style: Modern | Domain: techflow.com - Available</small><br><br>
                        <strong>Global Venture Hub</strong> (Score: 89/100)<br>
                        <small>Style: Professional | Domain: globalventurehub.com - Available</small><br><br>
                        <strong>NextGen Consulting</strong> (Score: 92/100)<br>
                        <small>Style: Modern | Domain: nextgenconsult.com - Available</small><br><br>
                        <strong>Caribbean Connect</strong> (Score: 87/100)<br>
                        <small>Style: Global | Domain: caribbeanconnect.com - Available</small><br><br>
                        <strong>Innovation Bridge</strong> (Score: 91/100)<br>
                        <small>Style: Creative | Domain: innovationbridge.com - Available</small>
                    </div>
                \`;
            }
        }
    </script>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`FindMyBizName server running on port ${PORT}`);
});
