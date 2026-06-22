import { apiRequest } from './client';

export async function fetchCart() {
  return apiRequest('/api/cart/');
}

export async function addToCart(productId, quantity = 1) {
  return apiRequest('/api/cart/add/', {
    method: 'POST',
    body: JSON.stringify({ product_id: productId, quantity }),
  });
}

export async function updateCartItem(itemId, quantity) {
  return apiRequest(`/api/cart/items/${itemId}/`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(itemId) {
  return apiRequest(`/api/cart/items/${itemId}/`, { method: 'DELETE' });
}

export async function clearCart() {
  return apiRequest('/api/cart/', { method: 'DELETE' });
}
