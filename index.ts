import express from "express";
import { setupVite, serveStatic, log } from "./vite";
import { registerRoutes } from "./routes";

const app = express();

// Basic request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API health check for Render
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    platform: 'FindMyBizName - Complete Business Operating System',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Vite for development or serve static for production  
const isProduction = process.env.NODE_ENV === "production";

// Render assigns PORT environment variable in production
const port = parseInt(process.env.PORT || "5000", 10);
const host = "0.0.0.0";

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
      console.log(`🚀 FindMyBizName server running on ${host}:${port}`);
      console.log(`🌍 Render URL: https://findmybizname.onrender.com`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✅ Render deployment: SUCCESS`);
    });
  } catch (error) {
    console.error('Error setting up server:', error);
    process.exit(1);
  }
}

startServer();
