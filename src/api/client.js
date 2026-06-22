import { API_BASE_URL } from '../config/api';

const TOKEN_KEY = 'bk_token';

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = {
    'ngrok-skip-browser-warning': 'true',
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const error = await response.json();
      if (typeof error === 'string') message = error;
      else if (error.detail) message = error.detail;
      else if (error.message) message = error.message;
      else if (error.non_field_errors) message = error.non_field_errors.join(', ');
      else {
        const firstKey = Object.keys(error)[0];
        if (firstKey && Array.isArray(error[firstKey])) {
          message = error[firstKey].join(', ');
        }
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}
