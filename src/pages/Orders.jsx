import { Link } from 'react-router-dom';
import { Package, ChevronRight, Download, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const statusColors = {
  confirmed: 'bg-blue-100 text-blue-700',
  packed: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-purple-100 text-purple-700',
  out_for_delivery: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
};

export default function Orders() {
  const { orders, user } = useAuth();

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <Package size={64} className="mx-auto text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-500">Login to view orders</h1>
        <Link to="/login" className="mt-6 inline-block">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <Package size={64} className="mx-auto text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-500">No orders yet</h1>
        <p className="mt-2 text-gray-400">Start shopping authentic Odisha products</p>
        <Link to="/products" className="mt-6 inline-block">
          <Button>Shop Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <h1 className="mb-6 text-2xl font-bold text-brand-green sm:text-3xl">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">{order.id}</p>
                <p className="text-xs text-gray-400">
                  {new Date(order.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  statusColors[order.status] || 'bg-gray-100 text-gray-700'
                }`}
              >
                {order.status.replace('_', ' ')}
              </span>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto">
              {order.items.slice(0, 4).map((item) => (
                <img
                  key={item.key}
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                />
              ))}
              {order.items.length > 4 && (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500">
                  +{order.items.length - 4}
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="font-bold text-brand-green">₹{order.total}</span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50">
                  <Download size={14} /> Invoice
                </button>
                <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50">
                  <RotateCcw size={14} /> Reorder
                </button>
                <Link
                  to={`/orders/${order.id}`}
                  className="flex items-center gap-1 rounded-lg bg-brand-green/10 px-3 py-1.5 text-xs font-semibold text-brand-green hover:bg-brand-green/20"
                >
                  Track <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
