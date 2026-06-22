# BerhampurKart — E-Commerce Website

A professional React.js e-commerce frontend for **BerhampurKart**, delivering authentic Berhampur & Odisha products across India.

## Features

### Customer App
- **Home** — Banner slider, categories, featured products, best sellers, new arrivals, festival specials
- **Products** — Category browsing, search, sort, and price filters
- **Product Details** — Images, description, ingredients, weight variants, shelf life, reviews, related products
- **Wishlist** — Add, remove, and move items to cart
- **Cart** — Quantity updates, coupon codes, shipping calculation (free above ₹1000)
- **Checkout** — Address, payment methods (UPI, Cards, Net Banking, Wallet, COD), order review
- **Authentication** — Mobile OTP, email login, Google login, guest checkout
- **Orders** — Order history, tracking timeline, invoice download, reorder
- **Support** — FAQ, contact form, WhatsApp support

## Tech Stack

- React 19 + Vite
- React Router v7
- Tailwind CSS v4
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Brand Colors

| Color   | Hex       | Usage                |
|---------|-----------|----------------------|
| Green   | `#0B4D2C` | Primary, headers     |
| Orange  | `#D9531E` | CTAs, accents        |

## Demo Coupons

- `WELCOME10` — 10% off (min ₹299)
- `FESTIVAL50` — ₹50 flat off (min ₹500)

## Next Steps (Backend Integration)

This is a frontend prototype with mock data. Connect to Django + DRF backend for:
- Real authentication (OTP, Google OAuth)
- Razorpay / Cashfree payments
- Shiprocket shipping integration
- Admin, vendor, and delivery panels
