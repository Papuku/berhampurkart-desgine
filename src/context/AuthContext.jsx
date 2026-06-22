import { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';
import { getAuthToken } from '../api/client';

const AuthContext = createContext(null);

function mapApiUser(apiUser) {
  if (!apiUser) return null;
  return {
    id: apiUser.id,
    email: apiUser.email,
    name: [apiUser.first_name, apiUser.last_name].filter(Boolean).join(' ') || apiUser.email,
    firstName: apiUser.first_name,
    lastName: apiUser.last_name,
    phone: apiUser.profile?.phone || '',
    profile: apiUser.profile || {},
    addresses: apiUser.profile?.address_line1
      ? [
          {
            id: 1,
            line1: apiUser.profile.address_line1,
            line2: apiUser.profile.address_line2,
            city: apiUser.profile.city,
            state: apiUser.profile.state,
            postalCode: apiUser.profile.postal_code,
            country: apiUser.profile.country,
          },
        ]
      : [],
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('bk_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }

    authApi
      .fetchProfile()
      .then((profile) => setUser(mapApiUser(profile)))
      .catch(() => authApi.logout())
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    const mapped = mapApiUser(data.user);
    setUser(mapped);
    return mapped;
  };

  const register = async (formData) => {
    const data = await authApi.register(formData);
    const mapped = mapApiUser(data.user);
    setUser(mapped);
    return mapped;
  };

  const loginAsGuest = () => {
    const guest = { id: 'guest', name: 'Guest', isGuest: true, addresses: [] };
    setUser(guest);
    return guest;
  };

  const logout = async () => {
    if (getAuthToken()) {
      await authApi.logout();
    }
    setUser(null);
  };

  const updateProfile = async (data) => {
    const updated = await authApi.updateProfile(data);
    const mapped = mapApiUser(updated);
    setUser(mapped);
    return mapped;
  };

  const addAddress = (address) => {
    setUser((prev) => ({
      ...prev,
      addresses: [...(prev.addresses || []), { ...address, id: Date.now() }],
    }));
  };

  const placeOrder = (orderData) => {
    const order = {
      id: `BK${Date.now()}`,
      date: new Date().toISOString(),
      status: 'confirmed',
      tracking: [
        { step: 'confirmed', label: 'Order Confirmed', done: true, date: new Date().toISOString() },
        { step: 'packed', label: 'Packed', done: false },
        { step: 'shipped', label: 'Shipped', done: false },
        { step: 'out_for_delivery', label: 'Out for Delivery', done: false },
        { step: 'delivered', label: 'Delivered', done: false },
      ],
      ...orderData,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && !user.isGuest,
        loading,
        orders,
        login,
        register,
        loginAsGuest,
        logout,
        updateProfile,
        addAddress,
        placeOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
