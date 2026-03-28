// Global Appliance Store - Main Application JavaScript

// Product Data
const products = [
    {
        id: 1,
        name: "Smart Air Fryer Pro",
        category: "kitchen",
        price: 129.99,
        originalPrice: 179.99,
        rating: 4.8,
        reviews: 1250,
        image: "https://images.unsplash.com/photo-1648145952225-e2f03d3a88bc?w=400&h=400&fit=crop",
        badge: "Best Seller",
        description: "Digital touchscreen air fryer with 8 preset modes"
    },
    {
        id: 2,
        name: "Robot Vacuum Cleaner",
        category: "cleaning",
        price: 249.99,
        originalPrice: 349.99,
        rating: 4.7,
        reviews: 890,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        badge: "Hot",
        description: "Smart navigation with app control and voice assistant"
    },
    {
        id: 3,
        name: "Portable Air Conditioner",
        category: "comfort",
        price: 399.99,
        originalPrice: 499.99,
        rating: 4.6,
        reviews: 567,
        image: "https://images.unsplash.com/photo-1631545308281-c48ea88fd041?w=400&h=400&fit=crop",
        badge: "",
        description: "3-in-1 AC, fan, and dehumidifier - cools up to 500 sq ft"
    },
    {
        id: 4,
        name: "Espresso Machine Deluxe",
        category: "kitchen",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.9,
        reviews: 2100,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
        badge: "Premium",
        description: "Semi-automatic with milk frother and double shots"
    },
    {
        id: 5,
        name: "Smart Washing Machine",
        category: "cleaning",
        price: 599.99,
        originalPrice: 799.99,
        rating: 4.5,
        reviews: 445,
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop",
        badge: "",
        description: "10kg capacity with AI smart wash and WiFi control"
    },
    {
        id: 6,
        name: "Humidifier Ultrasonic",
        category: "comfort",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.4,
        reviews: 3200,
        image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=400&h=400&fit=crop",
        badge: "Value",
        description: "Quiet operation, 4L tank, essential oil compatible"
    },
    {
        id: 7,
        name: "High-Speed Blender Pro",
        category: "kitchen",
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.7,
        reviews: 1580,
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop",
        badge: "",
        description: "1800W motor, 10 speeds, includes tamper and recipes"
    },
    {
        id: 8,
        name: "Hair Dryer Professional",
        category: "personal",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.6,
        reviews: 980,
        image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=400&fit=crop",
        badge: "",
        description: "Ionic technology, tourmaline, 3 heat settings"
    },
    {
        id: 9,
        name: "Cordless Stick Vacuum",
        category: "cleaning",
        price: 179.99,
        originalPrice: 249.99,
        rating: 4.8,
        reviews: 2340,
        image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
        badge: "Popular",
        description: "40min runtime, HEPA filter, converts to handheld"
    },
    {
        id: 10,
        name: "Smart Heater Tower",
        category: "comfort",
        price: 149.99,
        originalPrice: 199.99,
        rating: 4.5,
        reviews: 678,
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
        badge: "",
        description: "Oscillating ceramic heater with remote and timer"
    },
    {
        id: 11,
        name: "Multi-Cooker Electric",
        category: "kitchen",
        price: 119.99,
        originalPrice: 159.99,
        rating: 4.8,
        reviews: 1890,
        image: "https://images.unsplash.com/photo-1585659722983-3a675dab8c77?w=400&h=400&fit=crop",
        badge: "Essential",
        description: "8-in-1: pressure cook, slow cook, rice, porridge, soup"
    },
    {
        id: 12,
        name: "Electric Shaver Pro",
        category: "personal",
        price: 59.99,
        originalPrice: 79.99,
        rating: 4.3,
        reviews: 567,
        image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=400&fit=crop",
        badge: "",
        description: "Wet/dry, 5-blade rotary, USB rechargeable"
    }
];

// Cart State
let cart = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    setupEventListeners();
    loadCartFromStorage();
});

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Render Products
function renderProducts(category) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card bg-white rounded-xl overflow-hidden shadow-md" data-category="${product.category}">
            <div class="relative overflow-hidden">
                ${product.badge ? `<span class="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image w-full h-48 object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <button onclick="addToCart(${product.id})" class="opacity-0 hover:opacity-100 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-1 truncate">${product.name}</h3>
                <p class="text-gray-500 text-sm mb-2">${product.description}</p>
                <div class="flex items-center gap-1 mb-2">
                    <span class="star-rating">★</span>
                    <span class="text-sm font-medium">${product.rating}</span>
                    <span class="text-gray-400 text-sm">(${product.reviews.toLocaleString()})</span>
                </div>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-xl font-bold text-blue-600">$${product.price}</span>
                        ${product.originalPrice > product.price ? `<span class="text-gray-400 text-sm line-through ml-2">$${product.originalPrice}</span>` : ''}
                    </div>
                    <button onclick="addToCart(${product.id})" class="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Products
function filterProducts(category) {
    // Update button styles
    document.querySelectorAll('#products button').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-white', 'text-gray-700');
    });
    event.target.classList.remove('bg-white', 'text-gray-700');
    event.target.classList.add('bg-blue-600', 'text-white');

    renderProducts(category);
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    saveCartToStorage();
    showToast(`${product.name} added to cart!`, 'success');
}

// Update Cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.classList.remove('cart-badge-update');
        void cartCount.offsetWidth; // Trigger reflow
        cartCount.classList.add('cart-badge-update');
    }
}

// Cart Storage
function saveCartToStorage() {
    localStorage.setItem('globalApplianceCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('globalApplianceCart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
    }
}

// Scroll to Products
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    // Implement mobile menu toggle if needed
    console.log('Mobile menu toggled');
}

// Contact Form Handler
function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Here you would typically send the data to a server
    console.log('Contact form submitted:', Object.fromEntries(formData));
    
    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
    form.reset();
}

// Toast Notification
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'toast-in 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}
