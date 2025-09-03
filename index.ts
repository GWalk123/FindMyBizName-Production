import express from "express";
import { setupVite, serveStatic, log } from "./vite";
import { registerRoutes } from "./routes";

const app = express();

// Basic request logging
app.use((req, res, next) => {
  console.log(`<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>r</mi><mi>e</mi><mi>q</mi><mi mathvariant="normal">.</mi><mi>m</mi><mi>e</mi><mi>t</mi><mi>h</mi><mi>o</mi><mi>d</mi></mrow><annotation encoding="application/x-tex">{req.method} </annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">re</span><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="mord">.</span><span class="mord mathnormal">m</span><span class="mord mathnormal">e</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mord mathnormal">o</span><span class="mord mathnormal">d</span></span></span></span></span>{req.path}`);
  next();
});

// API health check for Railway
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    platform: 'FindMyBizName - Complete Business Operating System',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    features: [
      'AI Business Naming Engine',
      'Real-time Domain Checking',
      'Global Payment Processing',
      'Complete CRM System',
      '30% Referral Network',
      'Business Intelligence Suite',
      'Digital Products Marketplace'
    ]
  });
});

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Platform status API
app.get('/api/status', (req, res) => {
  res.json({
    platform: 'FindMyBizName',
    status: 'DEVELOPMENT',
    environment: process.env.NODE_ENV || 'development',
    market: '430.5M underbanked entrepreneurs',
    positioning: 'The Essential Business Toolkit for Sole Traders, SMEs and Underbanked Entrepreneurs Worldwide',
    features: {
      'AI Naming': 'Active',
      'Domain Checking': 'Active', 
      'PayPal Payments': 'Connected',
      'Payoneer': 'Approved',
      'Digital Products': 'Active',
      'AI Templates': 'Active',
      'Business Intelligence': 'Active',
      'Biz Newz': 'Active',
      'Biz Botz': 'Active'
    },
    apis: {
      'Database': 'Connected',
      'OpenAI': process.env.OPENAI_API_KEY ? 'Active' : 'Pending',
      'GoDaddy': process.env.GODADDY_API_KEY ? 'Active' : 'Pending',
      'SendGrid': process.env.SENDGRID_API_KEY ? 'Active' : 'Pending',
      'RapidAPI': process.env.RAPIDAPI_KEY ? 'Active' : 'Pending',
      'PayPal': process.env.PAYPAL_CLIENT_ID ? 'Active' : 'Pending',
      'Coinbase': process.env.COINBASE_COMMERCE_API_KEY ? 'Active' : 'Pending'
    }
  });
});

// Setup Vite for development or serve static for production  
const isProduction = process.env.NODE_ENV === "production";

// Use different ports for dev/prod to avoid conflicts
const port = parseInt(process.env.PORT || "3000", 10);
const host = "0.0.0.0"; // Render requires 0.0.0.0

async function startServer() {
  try {
    // Register all API routes BEFORE setting up Vite middleware
    const server = await registerRoutes(app);
    
    if (isProduction) {
      serveStatic(app);
    } else {
      await setupVite(app, server);
    }
    
    server.listen(port, host, () => {
      console.log(`🚀 FindMyBizName server running on <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi>h</mi><mi>o</mi><mi>s</mi><mi>t</mi></mrow><mo>:</mo></mrow><annotation encoding="application/x-tex">{host}:</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord"><span class="mord mathnormal">h</span><span class="mord mathnormal">os</span><span class="mord mathnormal">t</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">:</span></span></span></span>{port}`);
      console.log(`🌍 Live URL: https://findmybizname.com`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🤖 OpenAI integration: ${process.env.OPENAI_API_KEY ? 'ACTIVE' : 'PENDING'}`);
    });
  } catch (error) {
    console.error('Error setting up server:', error);
    process.exit(1);
  }
}

startServer();
