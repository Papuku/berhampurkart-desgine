import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, Package, Heart, LogOut, Gift, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

export default function Profile() {
  const { user, logout, orders } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <User size={64} className="mx-auto text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-500">Please login to view profile</h1>
        <Link to="/login" className="mt-6 inline-block">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { icon: Package, label: 'My Orders', link: '/orders', count: orders.length },
    { icon: Heart, label: 'Wishlist', link: '/wishlist' },
    { icon: MapPin, label: 'Saved Addresses', link: '/checkout' },
    { icon: Gift, label: 'Refer & Earn', link: '/profile' },
    { icon: Wallet, label: 'Wallet & Rewards', link: '/profile' },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-2xl font-bold text-white">
            {user.name[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            {user.email && <p className="text-sm text-gray-400">{user.email}</p>}
            {user.phone && <p className="text-sm text-gray-400">{user.phone}</p>}
            {user.isGuest && (
              <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                Guest Account
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {menuItems.map(({ icon: Icon, label, link, count }) => (
          <Link
            key={label}
            to={link}
            className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-colors hover:ring-brand-green/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
              <Icon size={20} />
            </div>
            <span className="font-medium text-gray-900">{label}</span>
            {count !== undefined && (
              <span className="ml-auto rounded-full bg-brand-orange/10 px-2 py-0.5 text-xs font-bold text-brand-orange">
                {count}
              </span>
            )}
          </Link>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}
