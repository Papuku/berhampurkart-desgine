const envUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

// In dev, use Vite proxy (see vite.config.js) to avoid CORS issues
export const API_BASE_URL = import.meta.env.DEV ? '' : envUrl || 'https://wispy-trading-nastily.ngrok-free.dev';
