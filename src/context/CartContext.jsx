import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { coupons } from '../data/products';

const CartContext = createContext(null);
const SHIPPING_THRESHOLD = 1000;
const SHIPPING_CHARGE = 60;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('bk_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('bk_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, variant, quantity = 1) => {
    setItems((prev) => {
      const key = `${product.id}-${variant.weight}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.image,
          weight: variant.weight,
          price: variant.price,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (key, quantity) => {
    if (quantity < 1) return removeFromCart(key);
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, quantity } : i)));
  };

  const removeFromCart = (key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!found) return { success: false, message: 'Invalid coupon code' };
    if (subtotal < found.minOrder) {
      return { success: false, message: `Minimum order of ₹${found.minOrder} required` };
    }
    setCoupon(found);
    return { success: true, message: `Coupon "${found.code}" applied!` };
  };

  const removeCoupon = () => setCoupon(null);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const discount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.type === 'percentage') return Math.round(subtotal * (coupon.value / 100));
    if (coupon.type === 'flat') return coupon.value;
    return 0;
  }, [coupon, subtotal]);

  const shipping = useMemo(() => {
    if (subtotal >= SHIPPING_THRESHOLD) return 0;
    if (coupon?.type === 'shipping') return 0;
    return items.length > 0 ? SHIPPING_CHARGE : 0;
  }, [subtotal, coupon, items.length]);

  const total = subtotal - discount + shipping;
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        coupon,
        subtotal,
        discount,
        shipping,
        total,
        itemCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        shippingThreshold: SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
