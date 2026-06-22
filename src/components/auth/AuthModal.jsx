import { useState, useEffect } from 'react';
import { X, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuthModal } from '../../context/AuthModalContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function AuthModal() {
  const { isOpen, tab, setTab, closeAuthModal } = useAuthModal();
  const { login, register, loginAsGuest } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirm: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setError('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(loginForm.email, loginForm.password);
      closeAuthModal();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.password_confirm) {
      setError('Passwords do not match');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await register(registerForm);
      closeAuthModal();
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeAuthModal} />
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="border-b border-gray-100 px-6 pt-6">
          <img src="/logo.png" alt="BerhampurKart" className="mx-auto h-12" />
          <div className="mt-4 flex rounded-lg bg-gray-100 p-1">
            {['login', 'register'].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); }}
                className={`flex-1 rounded-md py-2 text-sm font-semibold capitalize transition-colors ${
                  tab === t ? 'bg-white text-brand-green shadow-sm' : 'text-gray-500'
                }`}
              >
                {t === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin}>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <div className="relative mb-4">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-brand-green"
                  required
                />
              </div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-10 text-sm outline-none focus:border-brand-green"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  value={registerForm.first_name}
                  onChange={(e) => setRegisterForm({ ...registerForm, first_name: e.target.value })}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={registerForm.last_name}
                  onChange={(e) => setRegisterForm({ ...registerForm, last_name: e.target.value })}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
                />
              </div>
              {[
                { key: 'email', type: 'email', placeholder: 'Email address' },
                { key: 'phone', type: 'tel', placeholder: 'Phone (optional)' },
                { key: 'password', type: 'password', placeholder: 'Password' },
                { key: 'password_confirm', type: 'password', placeholder: 'Confirm password' },
              ].map(({ key, type, placeholder }) => (
                <input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  value={registerForm[key]}
                  onChange={(e) => setRegisterForm({ ...registerForm, [key]: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
                  required={key !== 'phone'}
                />
              ))}
              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          )}

          <button
            onClick={handleGuest}
            className="mt-4 w-full text-center text-sm text-brand-orange hover:underline"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
