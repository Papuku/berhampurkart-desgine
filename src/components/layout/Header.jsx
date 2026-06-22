import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Phone,
  Package,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import { fetchCategories } from '../../api/products';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  const handleAuthClick = () => {
    if (user && !user.isGuest) {
      navigate('/profile');
    } else {
      openAuthModal('login');
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Promo strip */}
      <div className="bg-brand-green text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-1 text-[11px] sm:px-4 sm:text-xs">
          <span>🚚 Free shipping on orders above ₹1000</span>
          <a href="tel:+919876543210" className="flex items-center gap-1 hover:underline">
            <Phone size={11} /> +91 98765 43210
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3">
          <Link to="/" className="shrink-0">
            <img src="/logo.png" alt="BerhampurKart" className="h-10 w-auto sm:h-12" />
          </Link>

          <form onSubmit={handleSearch} className="hidden min-w-0 flex-1 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
              <input
                type="text"
                placeholder="Search pickles, papad, sweets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand-green focus:bg-white"
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link
              to="/wishlist"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlistItems.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[9px] font-bold text-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Cart"
            >
              <ShoppingCart size={19} />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[9px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={handleAuthClick}
              className="hidden h-9 items-center gap-1.5 rounded-lg bg-brand-green/10 px-3 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/15 sm:flex"
            >
              <User size={17} />
              <span className="hidden lg:inline">
                {user && !user.isGuest ? (user.name?.split(' ')[0] || 'Account') : 'Login'}
              </span>
            </button>

            <Link
              to="/orders"
              className="hidden h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:flex"
              aria-label="Orders"
            >
              <Package size={19} />
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="border-t border-gray-50 px-3 pb-2 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-green"
            />
          </div>
        </form>
      </div>

      {/* Category pills */}
      <nav className="hidden border-b border-gray-100 bg-gray-50/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-3 py-2 sm:px-4">
          <Link
            to="/products"
            className="shrink-0 rounded-full bg-brand-green px-4 py-1.5 text-xs font-semibold text-white"
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-white hover:text-brand-green"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            to="/products?category=sweets"
            className="ml-auto shrink-0 rounded-full bg-brand-orange/10 px-3.5 py-1.5 text-xs font-semibold text-brand-orange"
          >
            🍬 Sweets
          </Link>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-3 py-3">
            <button
              onClick={handleAuthClick}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <User size={18} /> {user && !user.isGuest ? 'My Profile' : 'Login / Register'}
            </button>
            <Link
              to="/orders"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Package size={18} /> My Orders
            </Link>
            <div className="border-t border-gray-100 pt-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
