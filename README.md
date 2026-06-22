# BerhampurKart — E-Commerce Website

A professional React.js e-commerce frontend for **BerhampurKart**, delivering authentic Berhampur & Odisha products across India.

## Features

### Customer App
- **Home** — Full-width banner slider, categories, featured products, best sellers, new arrivals
- **Products** — Category browsing, search, sort, price filters, sticky sidebar
- **Product Details** — Images, description, reviews, related products
- **Wishlist** — Add, remove, and move items to cart
- **Cart** — Quantity updates, coupon codes, shipping calculation (free above ₹1000)
- **Checkout** — Address, payment methods, order review
- **Authentication** — Login/register popup modal, guest checkout
- **Orders** — Order history, tracking timeline
- **Support** — FAQ, contact form, WhatsApp support

## Tech Stack

- React 19 + Vite 6
- React Router v7
- Tailwind CSS v4
- Lucide React icons
- Mu Berhampuria API (Django REST)

## Getting Started

```bash
npm install
```

Copy `.env.example` to `.env` and set your API URL:

```env
VITE_API_BASE_URL=https://your-api-url.example.com
```

```bash
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
