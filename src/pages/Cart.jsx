import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';

export default function Cart() {
  const {
    items,
    subtotal,
    discount,
    shipping,
    total,
    coupon,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    shippingThreshold,
  } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    setCouponMsg(result.message);
    if (result.success) setCouponCode('');
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-500">Your cart is empty</h1>
        <p className="mt-2 text-gray-400">Add some delicious Odisha products!</p>
        <Link to="/products" className="mt-6 inline-block">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <h1 className="mb-6 text-2xl font-bold text-brand-green sm:text-3xl">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 shrink-0 rounded-xl object-cover"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.weight}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.key)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-gray-200">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center text-gray-500"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center text-gray-500"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-lg font-bold text-brand-green">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Order Summary</h2>

          {/* Coupon */}
          <div className="mb-4">
            {coupon ? (
              <div className="flex items-center justify-between rounded-lg bg-brand-green/10 px-3 py-2">
                <span className="flex items-center gap-1 text-sm font-medium text-brand-green">
                  <Tag size={14} /> {coupon.code}
                </span>
                <button onClick={removeCoupon} className="text-xs text-red-500 hover:underline">
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-green"
                />
                <Button variant="outline" size="sm" onClick={handleApplyCoupon}>
                  Apply
                </Button>
              </div>
            )}
            {couponMsg && (
              <p className={`mt-1 text-xs ${coupon ? 'text-brand-green' : 'text-red-500'}`}>
                {couponMsg}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-400">Try: WELCOME10, FESTIVAL50</p>
          </div>

          <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-brand-green">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-brand-green">FREE</span>
                ) : (
                  `₹${shipping}`
                )}
              </span>
            </div>
            {subtotal < shippingThreshold && (
              <p className="text-xs text-brand-orange">
                Add ₹{shippingThreshold - subtotal} more for free shipping!
              </p>
            )}
          </div>

          <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-brand-green">₹{total}</span>
          </div>

          <Link to="/checkout" className="mt-6 block">
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </Link>

          <Link
            to="/products"
            className="mt-3 block text-center text-sm text-brand-orange hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
