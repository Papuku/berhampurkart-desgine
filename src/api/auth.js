import { apiRequest, setAuthToken } from './client';

export async function login(email, password) {
  const data = await apiRequest('/api/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setAuthToken(data.token);
  return data;
}

export async function register({ email, password, password_confirm, first_name, last_name, phone }) {
  const data = await apiRequest('/api/auth/register/', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      password_confirm,
      first_name,
      last_name,
      phone: phone || '',
    }),
  });
  setAuthToken(data.token);
  return data;
}

export async function logout() {
  try {
    await apiRequest('/api/auth/logout/', { method: 'POST' });
  } finally {
    setAuthToken(null);
  }
}

export async function fetchProfile() {
  return apiRequest('/api/auth/profile/');
}

export async function updateProfile(data) {
  return apiRequest('/api/auth/profile/', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
