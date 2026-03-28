// Global Appliance Store - Backend API Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// PRODUCT DATA
// ============================================
const products = [
    {
        id: 1,
        name: "Smart Air Fryer Pro",
        category: "kitchen",
        price: 129.99,
        originalPrice: 179.99,
        rating: 4.8,
        reviews: 1250,
        stock: 150,
        description: "Digital touchscreen air fryer with 8 preset modes",
        features: ["8-in-1 cooking modes", "Digital touchscreen", "4L capacity", "Timer & temperature control"]
    },
    {
        id: 2,
        name: "Robot Vacuum Cleaner",
        category: "cleaning",
        price: 249.99,
        originalPrice: 349.99,
        rating: 4.7,
        reviews: 890,
        stock: 80,
        description: "Smart navigation with app control and voice assistant",
        features: ["Smart navigation", "App control", "Voice assistant", "Auto charging"]
    },
    {
        id: 3,
        name: "Portable Air Conditioner",
        category: "comfort",
        price: 399.99,
        originalPrice: 499.99,
        rating: 4.6,
        reviews: 567,
        stock: 45,
        description: "3-in-1 AC, fan, and dehumidifier - cools up to 500 sq ft",
        features: ["3-in-1 function", "500 sq ft coverage", "Remote control", "Sleep mode"]
    },
    {
        id: 4,
        name: "Espresso Machine Deluxe",
        category: "kitchen",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.9,
        reviews: 2100,
        stock: 200,
        description: "Semi-automatic with milk frother and double shots",
        features: ["Milk frother", "Double shot", "15 bar pressure", "1.8L water tank"]
    },
    {
        id: 5,
        name: "Smart Washing Machine",
        category: "cleaning",
        price: 599.99,
        originalPrice: 799.99,
        rating: 4.5,
        reviews: 445,
        stock: 30,
        description: "10kg capacity with AI smart wash and WiFi control",
        features: ["10kg capacity", "AI smart wash", "WiFi control", "15 programs"]
    },
    {
        id: 6,
        name: "Humidifier Ultrasonic",
        category: "comfort",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.4,
        reviews: 3200,
        stock: 500,
        description: "Quiet operation, 4L tank, essential oil compatible",
        features: ["4L tank", "Quiet operation", "Essential oil compatible", "Auto shut-off"]
    },
    {
        id: 7,
        name: "High-Speed Blender Pro",
        category: "kitchen",
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.7,
        reviews: 1580,
        stock: 250,
        description: "1800W motor, 10 speeds, includes tamper and recipes",
        features: ["1800W motor", "10 speeds", "BPA-free pitcher", "Recipe book included"]
    },
    {
        id: 8,
        name: "Hair Dryer Professional",
        category: "personal",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.6,
        reviews: 980,
        stock: 180,
        description: "Ionic technology, tourmaline, 3 heat settings",
        features: ["Ionic technology", "Tourmaline", "3 heat settings", "Cool shot button"]
    },
    {
        id: 9,
        name: "Cordless Stick Vacuum",
        category: "cleaning",
        price: 179.99,
        originalPrice: 249.99,
        rating: 4.8,
        reviews: 2340,
        stock: 120,
        description: "40min runtime, HEPA filter, converts to handheld",
        features: ["40min runtime", "HEPA filter", "Handheld mode", "LED floor brush"]
    },
    {
        id: 10,
        name: "Smart Heater Tower",
        category: "comfort",
        price: 149.99,
        originalPrice: 199.99,
        rating: 4.5,
        reviews: 678,
        stock: 90,
        description: "Oscillating ceramic heater with remote and timer",
        features: ["Oscillating", "Remote control", "24hr timer", "Tip-over protection"]
    },
    {
        id: 11,
        name: "Multi-Cooker Electric",
        category: "kitchen",
        price: 119.99,
        originalPrice: 159.99,
        rating: 4.8,
        reviews: 1890,
        stock: 200,
        description: "8-in-1: pressure cook, slow cook, rice, porridge, soup",
        features: ["8 cooking functions", "6L capacity", "Delay timer", "Keep warm"]
    },
    {
        id: 12,
        name: "Electric Shaver Pro",
        category: "personal",
        price: 59.99,
        originalPrice: 79.99,
        rating: 4.3,
        reviews: 567,
        stock: 150,
        description: "Wet/dry, 5-blade rotary, USB rechargeable",
        features: ["Wet/dry", "5-blade rotary", "USB rechargeable", "Pop-up trimmer"]
    }
];

// ============================================
// IN-MEMORY DATA STORE (Replace with MongoDB/PostgreSQL in production)
// ============================================
const orders = [];
let orderIdCounter = 1;

// ============================================
// API ROUTES
// ============================================

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get All Products
app.get('/api/products', (req, res) => {
    const { category, minPrice, maxPrice, sort } = req.query;
    
    let filtered = [...products];
    
    // Filter by category
    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    // Filter by price range
    if (minPrice) {
        filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    // Sort products
    if (sort) {
        switch (sort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
                filtered.sort((a, b) => b.reviews - a.reviews);
                break;
        }
    }
    
    res.json({ success: true, data: filtered, count: filtered.length });
});

// Get Single Product
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({ success: true, data: product });
});

// Get Categories
app.get('/api/categories', (req, res) => {
    const categories = [
        { id: 'kitchen', name: 'Kitchen', icon: '🍳', count: products.filter(p => p.category === 'kitchen').length },
        { id: 'cleaning', name: 'Cleaning', icon: '🧹', count: products.filter(p => p.category === 'cleaning').length },
        { id: 'comfort', name: 'Comfort', icon: '❄️', count: products.filter(p => p.category === 'comfort').length },
        { id: 'personal', name: 'Personal Care', icon: '💆', count: products.filter(p => p.category === 'personal').length }
    ];
    
    res.json({ success: true, data: categories });
});

// ============================================
// CHECKOUT & PAYMENT ROUTES
// ============================================

// Create Payment Intent (Stripe)
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency = 'usd', items } = req.body;
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects cents
            currency,
            automatic_payment_methods: {
                enabled: true
            },
            metadata: {
                items: JSON.stringify(items)
            }
        });
        
        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ success: false, message: 'Payment processing error' });
    }
});

// Create Order
app.post('/api/orders', (req, res) => {
    const { customer, items, total, shippingAddress, paymentIntentId } = req.body;
    
    if (!customer || !items || items.length === 0 || !total) {
        return res.status(400).json({ success: false, message: 'Missing required order information' });
    }
    
    const order = {
        id: orderIdCounter++,
        customer,
        items,
        total,
        shippingAddress,
        paymentIntentId,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    orders.push(order);
    
    res.json({
        success: true,
        message: 'Order created successfully',
        orderId: order.id,
        data: order
    });
});

// Get Order Status
app.get('/api/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    
    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.json({ success: true, data: order });
});

// ============================================
// CONTACT & NEWSLETTER ROUTES
// ============================================

// Contact Form Submission
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    // In production, send email using nodemailer
    if (process.env.SMTP_HOST) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.CONTACT_EMAIL,
            subject: `Contact Form: ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong></p>
                   <p>${message}</p>`
        });
    }
    
    res.json({ success: true, message: 'Message sent successfully' });
});

// Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    
    // In production, save to database and send confirmation email
    res.json({ success: true, message: 'Subscribed successfully' });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🌍 Global Appliance Store API Server                     ║
║                                                            ║
║   Server running on: http://localhost:${PORT}                 ║
║   Environment: ${process.env.NODE_ENV || 'development'}                            ║
║                                                            ║
║   Available Endpoints:                                      ║
║   • GET  /api/health      - Health check                   ║
║   • GET  /api/products     - List all products             ║
║   • GET  /api/products/:id - Get single product            ║
║   • GET  /api/categories   - List categories               ║
║   • POST /api/orders       - Create order                   ║
║   • POST /api/contact      - Contact form                   ║
║   • POST /api/newsletter   - Newsletter signup              ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
