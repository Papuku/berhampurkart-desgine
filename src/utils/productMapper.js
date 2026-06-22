function parsePrice(value) {
  const num = parseFloat(value);
  return Number.isFinite(num) ? num : 0;
}

export function mapProduct(apiProduct) {
  if (!apiProduct) return null;

  const price = parsePrice(apiProduct.price);
  const compareAt = apiProduct.compare_at_price
    ? parsePrice(apiProduct.compare_at_price)
    : null;

  const images = apiProduct.images?.length
    ? apiProduct.images.map((img) => img.image)
    : apiProduct.primary_image
      ? [apiProduct.primary_image]
      : [];

  const weight = apiProduct.weight?.trim() || 'Standard';

  return {
    id: apiProduct.id,
    slug: apiProduct.slug,
    name: apiProduct.name,
    category: apiProduct.category?.slug || '',
    categoryName: apiProduct.category?.name || '',
    categoryData: apiProduct.category || null,
    price,
    originalPrice: compareAt && compareAt > price ? compareAt : null,
    discountPercentage: parsePrice(apiProduct.discount_percentage),
    rating: parsePrice(apiProduct.rating),
    reviewCount: apiProduct.review_count || 0,
    image: apiProduct.primary_image || images[0] || '',
    images,
    description: apiProduct.description || apiProduct.short_description || '',
    shortDescription: apiProduct.short_description || '',
    weight: apiProduct.weight || '',
    stock: apiProduct.stock ?? 0,
    variants: [{ weight, price }],
    tags: [
      ...(apiProduct.is_bestseller ? ['bestseller'] : []),
      ...(apiProduct.is_featured ? ['featured'] : []),
    ],
    inStock: apiProduct.is_in_stock === true || apiProduct.is_in_stock === 'true',
    isBestseller: Boolean(apiProduct.is_bestseller),
    isFeatured: Boolean(apiProduct.is_featured),
    createdAt: apiProduct.created_at || null,
    reviews: [],
    ingredients: '',
    shelfLife: '',
  };
}

export function mapPaginatedProducts(data) {
  return {
    count: data.count ?? 0,
    totalPages: data.total_pages ?? 1,
    page: data.page ?? 1,
    pageSize: data.page_size ?? data.results?.length ?? 0,
    next: data.next,
    previous: data.previous,
    results: (data.results || []).map(mapProduct),
  };
}
