# 🌍 Global Appliance Store

Premium home appliances e-commerce website with worldwide shipping.

## 🚀 Features

- 🛍️ Full-featured product catalog with categories
- 🛒 Shopping cart with local storage persistence
- 💳 Stripe payment integration ready
- 📱 Fully responsive design (mobile-first)
- 🌐 Multi-language support ready
- 🔐 Contact form with email notifications
- 📦 Order management API
- ✉️ Newsletter subscription system

## 🛠️ Tech Stack

### Frontend
- HTML5 + CSS3 + JavaScript (Vanilla)
- TailwindCSS for styling
- Responsive design

### Backend
- Node.js + Express.js
- Stripe for payments
- Nodemailer for emails

## 📁 Project Structure

```
global Appliance Store/
├── frontend/
│   ├── index.html      # Main website
│   ├── styles.css      # Custom styles
│   └── app.js          # Frontend JavaScript
├── backend/
│   ├── server.js       # Express API server
│   ├── package.json    # Backend dependencies
│   └── .env.example    # Environment template
├── README.md           # This file
└── .gitignore         # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Open `index.html` in your browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using npx
   npx serve .
   ```

3. Open http://localhost:8000 in your browser

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your Stripe keys

5. Start the server:
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

6. API available at http://localhost:3000

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/categories` | List categories |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/:id` | Get order status |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter` | Subscribe to newsletter |
| POST | `/api/create-payment-intent` | Create Stripe payment |

## 🔧 Configuration

### Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Add keys to your `.env` file:
   ```
   STRIPE_SECRET_KEY=sk_test_xxx
   STRIPE_PUBLISHABLE_KEY=pk_test_xxx
   ```

### Email Setup (Optional)

For contact form emails, configure SMTP:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🚢 Deployment

### Frontend (Vercel/Netlify)

1. Push code to GitHub
2. Connect to Vercel/Netlify
3. Set build command (if needed)
4. Deploy!

### Backend (Railway/Render/Heroku)

1. Push code to GitHub
2. Connect to Railway/Render
3. Set environment variables
4. Deploy!

## 📊 Product Categories

- 🍳 **Kitchen** - Air fryers, blenders, espresso machines, multi-cookers
- 🧹 **Cleaning** - Robot vacuums, stick vacuums, washing machines
- ❄️ **Comfort** - Air conditioners, humidifiers, heaters
- 💆 **Personal Care** - Hair dryers, electric shavers

## 🌏 Supported Markets

This store is designed for global B2C sales with:
- Multi-currency support ready
- International shipping calculators
- GDPR-compliant data handling
- Multiple payment methods

## 📄 License

MIT License - feel free to use for your own projects!

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

---

Built with ❤️ for global entrepreneurs
