# ◈ ShopWave — E-Commerce App

A modern, dark-themed e-commerce frontend built with **Vite + React**.

## Tech Stack
- **Vite** — ultra-fast dev server & build tool
- **React 18** — functional components + hooks
- **React Router DOM v6** — client-side routing
- **Context API** — global cart state
- **localStorage** — cart persistence
- **CSS Variables** — design system (no Tailwind needed)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## Project Structure

```
src/
├── main.jsx              # Entry point — wraps app in BrowserRouter + CartProvider
├── App.jsx               # Route definitions + toast notification
├── index.css             # Global design system (CSS vars, utilities)
│
├── context/
│   └── CartContext.jsx   # Cart state (useReducer) + localStorage sync
│
├── data/
│   └── products.js       # Static product catalogue (8 products)
│
├── components/
│   ├── Navbar.jsx/css    # Sticky nav, search bar, cart badge, mobile menu
│   ├── Footer.jsx/css    # Links, brand info, legal
│   └── ProductCard.jsx/css # Product tile with Add/In Cart toggle
│
└── pages/
    ├── Home.jsx/css       # Hero + category filters + sort + product grid
    ├── ProductDetails.jsx/css  # Full product view, qty controls, related
    └── Cart.jsx/css       # Line items + order summary + GST calc
```

## Features

| Feature | Details |
|---|---|
| Product Listing | 8 curated products, filter by category, sort by price/rating |
| Search | URL-based search via `?search=query` |
| Product Details | Full view with specs table, stock status, related products |
| Add to Cart | Context API, persisted in localStorage |
| Cart Management | Qty +/−, remove item, clear all |
| Price Calculation | Subtotal + 18% GST + savings + free delivery |
| Toast Notifications | Auto-dismiss add-to-cart confirmation |
| Responsive | Works on mobile (≥320px) and desktop |

## Design System

The app uses a dark, editorial aesthetic inspired by premium tech retail:
- **Font**: Syne (display) + DM Sans (body)  
- **Accent**: `#ff5c28` (vivid orange)  
- **Background**: `#0d0d0d` with layered elevation  
- **Radius**: Consistent `--radius-lg: 20px` for cards  
- **Motion**: CSS transitions + page-enter animations  

## Cart State API

```js
const {
  items,        // CartItem[]
  addItem,      // (product) => void
  removeItem,   // (id) => void
  increment,    // (id) => void
  decrement,    // (id) => void — auto-removes at 0
  clearCart,    // () => void
  totalItems,   // number
  totalPrice,   // number (in paise-free ₹)
  isInCart,     // (id) => boolean
} = useCart();
```
