import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-green-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src="/logo.png" alt="BerhampurKart" className="mb-4 h-16 w-auto brightness-0 invert" />
            <p className="text-sm text-white/70 leading-relaxed">
              Authentic Berhampur & Odisha products delivered across India.
              Local roots, delivered to you.
            </p>
            <div className="mt-4 flex gap-3">
              {['Facebook', 'Instagram', 'X'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold transition-colors hover:bg-brand-orange"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-orange" aria-label="Share">
                <Share2 size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/products" className="hover:text-brand-orange">All Products</Link></li>
              <li><Link to="/products?category=festival" className="hover:text-brand-orange">Festival Specials</Link></li>
              <li><Link to="/products?sort=bestseller" className="hover:text-brand-orange">Best Sellers</Link></li>
              <li><Link to="/orders" className="hover:text-brand-orange">Track Order</Link></li>
              <li><Link to="/faq" className="hover:text-brand-orange">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/contact" className="hover:text-brand-orange">Contact Us</Link></li>
              <li><a href="https://wa.me/919876543210" className="hover:text-brand-orange">WhatsApp Support</a></li>
              <li><Link to="/faq" className="hover:text-brand-orange">Shipping Policy</Link></li>
              <li><Link to="/faq" className="hover:text-brand-orange">Return Policy</Link></li>
              <li><Link to="/faq" className="hover:text-brand-orange">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-orange" />
                Berhampur, Ganjam, Odisha 760001
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-brand-orange" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-brand-orange" />
                support@berhampurkart.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} BerhampurKart. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/50">
            <span>UPI</span>
            <span>•</span>
            <span>Cards</span>
            <span>•</span>
            <span>Net Banking</span>
            <span>•</span>
            <span>COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
