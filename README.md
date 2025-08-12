# FindMyBizName - Global Business Operating System

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/)

## Overview

FindMyBizName is the first complete global business operating system designed for underbanked entrepreneurs worldwide. Our platform integrates AI-powered business naming, domain checking, CRM, invoicing, and payment processing - serving over 430.5 million underbanked entrepreneurs globally.

## Key Features

### 🚀 AI-Powered Business Tools
- **Smart Business Name Generator** - AI algorithms for memorable business names
- **Live Domain Checker** - Real-time domain availability across multiple TLDs
- **Name Scorer** - AI-powered analysis for memorability and brandability
- **Brand Analysis Suite** - Social media handle checking and SEO optimization

### 💼 Complete Business Platform
- **CRM System** - Customer relationship management
- **Invoice Generator** - Professional invoicing capabilities  
- **Payment Processing** - Multi-gateway payment support (PayPal, Coinbase, Payoneer, WiPay)
- **Digital Products Marketplace** - Downloadable business templates and tools

### 📊 Business Intelligence
- **SEC EDGAR Integration** - Access to 500,000+ company database
- **Live Business News Feed** - Curated business news and trends
- **Entrepreneur Community** - Networking and collaboration platform
- **Referral System** - Global commission-based revenue sharing

## Technology Stack

- **Frontend**: React 18 with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express, PostgreSQL with Drizzle ORM
- **AI Integration**: OpenAI GPT-4o for intelligent business insights
- **Payment Gateways**: PayPal, Coinbase Commerce, Payoneer, WiPay
- **External APIs**: GoDaddy Domain API, SendGrid, Twilio

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Required API keys (see Environment Variables)

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/findmybizname.git
cd findmybizname

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### Environment Variables
```env
DATABASE_URL=your_postgresql_connection_string
RAPIDAPI_KEY=your_rapidapi_key_for_domain_checking
OPENAI_API_KEY=your_openai_api_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
SENDGRID_API_KEY=your_sendgrid_api_key
```

## Deployment

### Render Deployment
This project includes `render.yaml` for easy deployment to Render:

1. Connect your GitHub repository to Render
2. Configure environment variables in Render dashboard
3. Deploy automatically with included configuration

### Build Commands
```bash
# Production build
npm run build

# Start production server
npm start
```

## Market Impact

- **Target Market**: 430.5 million underbanked entrepreneurs globally
- **Revenue Model**: Freemium SaaS with domain services and payment processing
- **Global Reach**: Optimized for cash-based economies and underbanked markets
- **Value Proposition**: Complete business operating system reducing need for multiple paid services

## Contributing

We welcome contributions to help serve the global underbanked entrepreneur community:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Business Philosophy

"Build a new model that makes the existing model obsolete" - Our approach focuses on creating accessible, comprehensive business tools rather than fighting existing systems.

## License

MIT License - Building tools to empower global entrepreneurship.

## Support

- **Documentation**: [Coming Soon]
- **Community**: [Coming Soon] 
- **Enterprise**: Contact for custom deployment options

---

**FindMyBizName** - Empowering 430.5 million underbanked entrepreneurs worldwide with complete business operating system tools.
