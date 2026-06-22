export const products = [
  {
    id: 1,
    name: 'Berhampur Mango Pickle',
    category: 'pickles',
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop',
    ],
    description: 'Traditional raw mango pickle made with mustard oil, fenugreek, and authentic Berhampur spices. A family recipe passed down for generations.',
    ingredients: 'Raw Mango, Mustard Oil, Fenugreek, Turmeric, Red Chili, Salt, Asafoetida',
    shelfLife: '12 months',
    variants: [
      { weight: '250g', price: 149 },
      { weight: '500g', price: 249 },
      { weight: '1kg', price: 449 },
    ],
    tags: ['bestseller', 'featured'],
    inStock: true,
    reviews: [
      { id: 1, user: 'Priya M.', rating: 5, comment: 'Tastes exactly like my grandmother\'s pickle!', date: '2026-05-12' },
      { id: 2, user: 'Rajesh K.', rating: 4, comment: 'Great quality, slightly spicy but delicious.', date: '2026-04-28' },
    ],
  },
  {
    id: 2,
    name: 'Homemade Aloo Papad',
    category: 'papad',
    price: 180,
    originalPrice: 220,
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=500&fit=crop',
    ],
    description: 'Sun-dried potato papads, crispy and light. Perfect as a snack or side with meals.',
    ingredients: 'Potato, Rice Flour, Cumin, Salt, Black Pepper',
    shelfLife: '6 months',
    variants: [
      { weight: '200g', price: 120 },
      { weight: '400g', price: 180 },
      { weight: '800g', price: 320 },
    ],
    tags: ['bestseller'],
    inStock: true,
    reviews: [
      { id: 1, user: 'Anita S.', rating: 5, comment: 'Crispy and fresh. Will order again!', date: '2026-05-01' },
    ],
  },
  {
    id: 3,
    name: 'Chakuli Pitha Mix',
    category: 'snacks',
    price: 199,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1601050690597-df0565f70950?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1601050690597-df0565f70950?w=500&h=500&fit=crop',
    ],
    description: 'Ready-to-cook chakuli pitha mix. Just add water and pan-fry for authentic Odia breakfast.',
    ingredients: 'Rice Flour, Black Gram, Cumin, Salt',
    shelfLife: '4 months',
    variants: [
      { weight: '500g', price: 199 },
      { weight: '1kg', price: 349 },
    ],
    tags: ['new'],
    inStock: true,
    reviews: [],
  },
  {
    id: 4,
    name: 'Berhampur Garam Masala',
    category: 'spices',
    price: 165,
    originalPrice: 195,
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop',
    ],
    description: 'Aromatic blend of 12 spices, stone-ground in the traditional way for maximum flavour.',
    ingredients: 'Coriander, Cumin, Cardamom, Cinnamon, Cloves, Black Pepper, Nutmeg, Mace, Bay Leaf, Star Anise',
    shelfLife: '18 months',
    variants: [
      { weight: '100g', price: 95 },
      { weight: '200g', price: 165 },
      { weight: '500g', price: 349 },
    ],
    tags: ['bestseller', 'featured'],
    inStock: true,
    reviews: [
      { id: 1, user: 'Sunita D.', rating: 5, comment: 'The best garam masala I have ever used.', date: '2026-05-15' },
    ],
  },
  {
    id: 5,
    name: 'Pure Kewda Essence',
    category: 'kewda',
    price: 350,
    originalPrice: 420,
    rating: 4.5,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1615485925511-ef3c81a0c8e2?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1615485925511-ef3c81a0c8e2?w=500&h=500&fit=crop',
    ],
    description: 'Premium kewda (pandanus) essence from Ganjam district. Used in sweets, beverages, and rituals.',
    ingredients: 'Pure Kewda Extract, Food Grade Alcohol',
    shelfLife: '24 months',
    variants: [
      { weight: '50ml', price: 350 },
      { weight: '100ml', price: 620 },
    ],
    tags: ['featured'],
    inStock: true,
    reviews: [],
  },
  {
    id: 6,
    name: 'Chhena Poda',
    category: 'sweets',
    price: 299,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d82d12?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587241321921-91a834d82d12?w=500&h=500&fit=crop',
    ],
    description: 'Odisha\'s iconic baked cottage cheese sweet with caramelised edges. Freshly made daily.',
    ingredients: 'Chhena (Cottage Cheese), Sugar, Cardamom, Semolina',
    shelfLife: '5 days (refrigerated)',
    variants: [
      { weight: '250g', price: 199 },
      { weight: '500g', price: 299 },
      { weight: '1kg', price: 549 },
    ],
    tags: ['bestseller', 'featured'],
    inStock: true,
    reviews: [
      { id: 1, user: 'Meera P.', rating: 5, comment: 'Reminds me of Nayagarh chhena poda. Perfect!', date: '2026-05-10' },
    ],
  },
  {
    id: 7,
    name: 'Raja Festival Combo Pack',
    category: 'festival',
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=500&h=500&fit=crop',
    ],
    description: 'Special Raja Parba combo with pithas, sweets, and snacks. Perfect for gifting.',
    ingredients: 'Assorted Pithas, Chhena Poda, Khaja, Chakuli Mix',
    shelfLife: '7 days',
    variants: [
      { weight: 'Combo (1.5kg)', price: 899 },
      { weight: 'Family Pack (3kg)', price: 1599 },
    ],
    tags: ['festival', 'featured'],
    inStock: true,
    reviews: [],
  },
  {
    id: 8,
    name: 'Odisha Essentials Combo',
    category: 'combo',
    price: 749,
    originalPrice: 950,
    rating: 4.7,
    reviewCount: 95,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop',
    ],
    description: 'Starter pack with mango pickle, garam masala, papad, and chakuli mix. Great value!',
    ingredients: 'Mango Pickle 250g, Garam Masala 100g, Aloo Papad 200g, Chakuli Mix 500g',
    shelfLife: 'Varies by item',
    variants: [
      { weight: 'Standard', price: 749 },
      { weight: 'Premium', price: 1199 },
    ],
    tags: ['bestseller', 'combo'],
    inStock: true,
    reviews: [],
  },
  {
    id: 9,
    name: 'Lemon Pickle (Nimbu Achar)',
    category: 'pickles',
    price: 199,
    originalPrice: null,
    rating: 4.4,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=500&h=500&fit=crop',
    ],
    description: 'Tangy lemon pickle with a hint of sweetness. Pairs perfectly with dal and rice.',
    ingredients: 'Lemon, Mustard Oil, Jaggery, Turmeric, Red Chili, Salt',
    shelfLife: '10 months',
    variants: [
      { weight: '250g', price: 129 },
      { weight: '500g', price: 199 },
    ],
    tags: ['new'],
    inStock: true,
    reviews: [],
  },
  {
    id: 10,
    name: 'Khaja (Layered Sweet)',
    category: 'sweets',
    price: 220,
    originalPrice: 260,
    rating: 4.6,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d82d12?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587241321921-91a834d82d12?w=500&h=500&fit=crop',
    ],
    description: 'Crispy layered sweet from Puri, made with flour and sugar syrup. A timeless favourite.',
    ingredients: 'Refined Flour, Sugar, Ghee, Cardamom',
    shelfLife: '15 days',
    variants: [
      { weight: '250g', price: 140 },
      { weight: '500g', price: 220 },
    ],
    tags: ['bestseller'],
    inStock: true,
    reviews: [],
  },
  {
    id: 11,
    name: 'Turmeric Powder (Haldi)',
    category: 'spices',
    price: 120,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop',
    ],
    description: 'Bright yellow turmeric powder sourced from Odisha farms. High curcumin content.',
    ingredients: 'Pure Turmeric Rhizome',
    shelfLife: '24 months',
    variants: [
      { weight: '200g', price: 120 },
      { weight: '500g', price: 250 },
    ],
    tags: [],
    inStock: true,
    reviews: [],
  },
  {
    id: 12,
    name: 'Durga Puja Sweet Box',
    category: 'festival',
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=500&h=500&fit=crop',
    ],
    description: 'Premium gift box with rasagola, chhena poda, khaja, and kheer mohan for Durga Puja.',
    ingredients: 'Assorted Odia Sweets',
    shelfLife: '5 days (refrigerated)',
    variants: [
      { weight: '1kg Box', price: 1299 },
      { weight: '2kg Box', price: 2299 },
    ],
    tags: ['festival', 'featured'],
    inStock: true,
    reviews: [],
  },
];

export const coupons = [
  { code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 299, description: '10% off on first order' },
  { code: 'FESTIVAL50', type: 'flat', value: 50, minOrder: 500, description: '₹50 off on festival items' },
  { code: 'FREESHIP', type: 'shipping', value: 0, minOrder: 1000, description: 'Free shipping on orders above ₹1000' },
];

export const faqs = [
  { q: 'What areas do you deliver to?', a: 'We deliver pan-India across all major cities and towns. Delivery typically takes 3-7 business days depending on your location.' },
  { q: 'What is the shipping charge?', a: 'Orders above ₹1000 qualify for free shipping. For orders below ₹1000, a flat shipping charge of ₹60 applies. Zone-wise rates may vary for remote areas.' },
  { q: 'How fresh are the products?', a: 'All perishable items like sweets and pickles are prepared fresh and shipped with proper packaging. Shelf life is mentioned on each product page.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI, Credit/Debit Cards, Net Banking, Wallets, and Cash on Delivery (COD).' },
  { q: 'Can I return or exchange products?', a: 'Due to the perishable nature of food products, returns are accepted only for damaged or incorrect items reported within 24 hours of delivery.' },
  { q: 'Do you offer bulk or corporate orders?', a: 'Yes! Contact us via WhatsApp or the support page for B2B bulk orders and corporate gifting options.' },
];

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

export function getProductsByCategory(category) {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.tags.includes('featured'));
}

export function getBestSellers() {
  return products.filter((p) => p.tags.includes('bestseller'));
}

export function getNewArrivals() {
  return products.filter((p) => p.tags.includes('new'));
}

export function getFestivalSpecials() {
  return products.filter((p) => p.tags.includes('festival') || p.category === 'festival');
}

export function getRelatedProducts(productId, category, limit = 4) {
  return products.filter((p) => p.category === category && p.id !== productId).slice(0, limit);
}
