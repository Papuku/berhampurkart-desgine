import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Circle, Package, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

export default function OrderTracking() {
  const { orderId } = useParams();
  const { orders } = useAuth();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <Package size={64} className="mx-auto text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-500">Order not found</h1>
        <Link to="/orders" className="mt-6 inline-block">
          <Button variant="outline">View All Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
      <Link to="/orders" className="mb-4 inline-block text-sm text-brand-orange hover:underline">
        ← Back to Orders
      </Link>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order {order.id}</h1>
            <p className="text-sm text-gray-400">
              Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10">
            <Truck size={24} className="text-brand-green" />
          </div>
        </div>

        {/* Tracking timeline */}
        <div className="mt-8">
          {order.tracking.map((step, i) => (
            <div key={step.step} className="flex gap-4">
              <div className="flex flex-col items-center">
                {step.done ? (
                  <CheckCircle size={24} className="text-brand-green" />
                ) : (
                  <Circle size={24} className="text-gray-300" />
                )}
                {i < order.tracking.length - 1 && (
                  <div
                    className={`my-1 h-12 w-0.5 ${
                      step.done ? 'bg-brand-green' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
              <div className="pb-8">
                <p className={`font-semibold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.label}
                </p>
                {step.date && step.done && (
                  <p className="text-xs text-gray-400">
                    {new Date(step.date).toLocaleString('en-IN')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Delivery address */}
        {order.address && (
          <div className="rounded-xl bg-gray-50 p-4">
            <h3 className="text-sm font-bold text-gray-900">Delivery Address</h3>
            <p className="mt-1 text-sm text-gray-600">
              {order.address.name}, {order.address.phone}<br />
              {order.address.line1}<br />
              {order.address.city}, {order.address.state} — {order.address.pincode}
            </p>
          </div>
        )}

        {/* Order items */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-bold text-gray-900">Order Items</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.key} className="flex items-center gap-3 text-sm">
                <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-400">{item.weight} × {item.quantity}</p>
                </div>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 font-bold">
            <span>Total</span>
            <span className="text-brand-green">₹{order.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
