import { apiRequest } from './client';
import { mapProduct, mapPaginatedProducts } from '../utils/productMapper';

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });
  const qs = query.toString();
  return qs ? `?${qs}` : '';
}

export async function fetchProducts(params = {}) {
  const data = await apiRequest(`/api/products/${buildQuery(params)}`);
  return mapPaginatedProducts(data);
}

export async function fetchProductBySlug(slug) {
  const data = await apiRequest(`/api/products/${slug}/`);
  return mapProduct(data);
}

export async function fetchCategories(params = {}) {
  const data = await apiRequest(`/api/products/categories/${buildQuery(params)}`);
  return data.results || [];
}

export async function fetchCategoryProducts(slug, params = {}) {
  const data = await apiRequest(
    `/api/products/categories/${slug}/products/${buildQuery(params)}`
  );
  return mapPaginatedProducts(data);
}

export async function fetchFeaturedProducts(params = {}) {
  const data = await apiRequest(`/api/products/featured/${buildQuery(params)}`);
  return mapPaginatedProducts(data).results;
}

export async function fetchBestsellerProducts(params = {}) {
  const data = await apiRequest(`/api/products/bestsellers/${buildQuery(params)}`);
  return mapPaginatedProducts(data).results;
}
