import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: '📱' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
  { id: 'wallet', label: 'Wallet', icon: '👛' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
];

export default function Checkout() {
  const { items, subtotal, discount, shipping, total, clearCart } = useCart();
  const { user, loginAsGuest, placeOrder, addAddress } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState('upi');
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  });

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-500">No items to checkout</h1>
        <Link to="/products" className="mt-4 inline-block text-brand-orange hover:underline">
          Browse products
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <CheckCircle size={64} className="mx-auto text-brand-green" />
        <h1 className="mt-4 text-2xl font-bold text-brand-green">Order Placed!</h1>
        <p className="mt-2 text-gray-500">Order ID: <strong>{orderPlaced.id}</strong></p>
        <p className="mt-1 text-sm text-gray-400">
          You will receive order updates via SMS and email.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to={`/orders/${orderPlaced.id}`}>
            <Button variant="secondary">Track Order</Button>
          </Link>
          <Link to="/products">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (!user) loginAsGuest();
    addAddress(address);
    const order = placeOrder({
      items: [...items],
      address,
      payment,
      subtotal,
      discount,
      shipping,
      total,
    });
    clearCart();
    setOrderPlaced(order);
  };

  const isAddressValid =
    address.name && address.phone && address.line1 && address.city && address.state && address.pincode;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <h1 className="mb-6 text-2xl font-bold text-brand-green sm:text-3xl">Checkout</h1>

      {/* Steps */}
      <div className="mb-8 flex items-center justify-center gap-4">
        {[
          { num: 1, label: 'Address', icon: MapPin },
          { num: 2, label: 'Payment', icon: CreditCard },
          { num: 3, label: 'Review', icon: Truck },
        ].map(({ num, label, icon: Icon }) => (
          <button
            key={num}
            onClick={() => num < step && setStep(num)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              step === num
                ? 'bg-brand-green text-white'
                : step > num
                  ? 'bg-brand-green/10 text-brand-green'
                  : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-4 text-lg font-bold">Delivery Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { key: 'name', label: 'Full Name', col: 2 },
                  { key: 'phone', label: 'Phone Number', col: 2 },
                  { key: 'line1', label: 'Address Line 1', col: 2 },
                  { key: 'line2', label: 'Address Line 2 (Optional)', col: 2 },
                  { key: 'city', label: 'City', col: 1 },
                  { key: 'state', label: 'State', col: 1 },
                  { key: 'pincode', label: 'PIN Code', col: 2 },
                ].map(({ key, label, col }) => (
                  <div key={key} className={col === 2 ? 'sm:col-span-2' : ''}>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
                    <input
                      type="text"
                      value={address[key]}
                      onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
                    />
                  </div>
                ))}
              </div>
              <Button
                className="mt-6"
                disabled={!isAddressValid}
                onClick={() => setStep(2)}
              >
                Continue to Payment
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-4 text-lg font-bold">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                      payment === method.id
                        ? 'border-brand-green bg-brand-green/5'
                        : 'border-gray-200 hover:border-brand-green/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={payment === method.id}
                      onChange={() => setPayment(method.id)}
                      className="accent-brand-green"
                    />
                    <span className="text-xl">{method.icon}</span>
                    <span className="font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Review Order</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-4 text-lg font-bold">Order Review</h2>

              <div className="mb-4 rounded-xl bg-gray-50 p-4">
                <h3 className="text-sm font-bold text-gray-900">Delivery Address</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {address.name}, {address.phone}<br />
                  {address.line1}{address.line2 && `, ${address.line2}`}<br />
                  {address.city}, {address.state} — {address.pincode}
                </p>
              </div>

              <div className="mb-4 rounded-xl bg-gray-50 p-4">
                <h3 className="text-sm font-bold text-gray-900">Payment</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {paymentMethods.find((m) => m.id === payment)?.label}
                </p>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
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

              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={handlePlaceOrder} size="lg">
                  Place Order — ₹{total}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal ({items.length} items)</span>
              <span>₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-brand-green">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2 text-lg font-bold">
              <span>Total</span>
              <span className="text-brand-green">₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
