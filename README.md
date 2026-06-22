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

Set your **production API URL** before building (it is baked into the build):

```bash
cp .env.example .env
# Edit .env → VITE_API_BASE_URL=https://api.berhampurkart.in  (your real backend URL)

npm run build
```

Output is in the **`dist/`** folder. Upload **only the contents of `dist/`** to your web server — not the full source project.

```bash
npm run preview   # test production build locally
```

## Deploy on Apache (Ubuntu) — berhampurkart.in

**403 Forbidden** usually means Apache cannot read the folder, or `index.html` is missing.

### 1. Build and copy files on the server

```bash
cd ~/Demo/berhampurkart-desgine
npm install
cp .env.example .env
nano .env   # set VITE_API_BASE_URL to your live API URL
npm run build

sudo mkdir -p /var/www/berhampurkart.in
sudo cp -r dist/* /var/www/berhampurkart.in/
sudo chown -R www-data:www-data /var/www/berhampurkart.in
sudo find /var/www/berhampurkart.in -type d -exec chmod 755 {} \;
sudo find /var/www/berhampurkart.in -type f -exec chmod 644 {} \;
```

### 2. Apache virtual host

Create `/etc/apache2/sites-available/berhampurkart.in.conf`:

```apache
<VirtualHost *:80>
    ServerName berhampurkart.in
    ServerAlias www.berhampurkart.in
    DocumentRoot /var/www/berhampurkart.in

    <Directory /var/www/berhampurkart.in>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/berhampurkart-error.log
    CustomLog ${APACHE_LOG_DIR}/berhampurkart-access.log combined
</VirtualHost>
```

Enable site and reload:

```bash
sudo a2enmod rewrite
sudo a2ensite berhampurkart.in.conf
sudo a2dissite 000-default.conf   # optional, if default site conflicts
sudo apache2ctl configtest
sudo systemctl reload apache2
```

### 3. Verify

```bash
ls -la /var/www/berhampurkart.in/index.html   # must exist
curl -I http://berhampurkart.in               # should return 200, not 403
```

### Common mistakes

| Problem | Fix |
|--------|-----|
| Uploaded source code, not `dist/` | Run `npm run build`, copy `dist/*` only |
| No `index.html` in web root | Copy build output again |
| Permission denied | `chown www-data:www-data` + chmod 755/644 |
| React routes 404 on refresh | Enable `mod_rewrite` + `.htaccess` in `dist/` |
| API fails in production | Set `VITE_API_BASE_URL` in `.env` **before** `npm run build` |

## Brand Colors

| Color   | Hex       | Usage                |
|---------|-----------|----------------------|
| Green   | `#0B4D2C` | Primary, headers     |
| Orange  | `#D9531E` | CTAs, accents        |

## Demo Coupons

- `WELCOME10` — 10% off (min ₹299)
- `FESTIVAL50` — ₹50 flat off (min ₹500)
