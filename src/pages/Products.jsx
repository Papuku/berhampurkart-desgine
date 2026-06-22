import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { fetchProducts, fetchCategoryProducts, fetchCategories } from '../api/products';

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'bestseller', label: 'Best Sellers' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

function sortProducts(products, sort) {
  const result = [...products];
  switch (sort) {
    case 'bestseller':
      return result.filter((p) => p.isBestseller);
    case 'price-low':
      return result.sort((a, b) => a.price - b.price);
    case 'price-high':
      return result.sort((a, b) => b.price - a.price);
    case 'rating':
      return result.sort((a, b) => b.rating - a.rating);
    default:
      return result;
  }
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, totalPages: 1, page: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'default';
  const page = Number(searchParams.get('page')) || 1;
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 2000;

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        setError('');

        const params = { page, page_size: 12 };
        if (search) params.search = search;

        const data = category
          ? await fetchCategoryProducts(category, params)
          : await fetchProducts(params);

        if (cancelled) return;

        setProducts(data.results);
        setPagination({
          count: data.count,
          totalPages: data.totalPages,
          page: data.page,
        });
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load products');
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, [category, search, page]);

  const filtered = useMemo(() => {
    let result = sortProducts(products, sort);
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    return result;
  }, [products, sort, minPrice, maxPrice]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.delete('page');
    setSearchParams(params);
  };

  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-4">
      {/* Compact page header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-brand-green sm:text-2xl">
            {activeCategory ? activeCategory.name : search ? `Results for "${search}"` : 'All Products'}
          </h1>
          <p className="text-xs text-gray-500 sm:text-sm">{pagination.count} products found</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium lg:hidden"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
          <select
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value === 'default' ? '' : e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-green"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-start gap-4 lg:gap-5">
        {/* Sticky sidebar — stays fixed while products scroll */}
        <aside className="hidden w-52 shrink-0 lg:block xl:w-56">
          <div className="sticky top-[118px] max-h-[calc(100vh-130px)] overflow-y-auto rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <FilterPanel
              categories={categories}
              category={category}
              minPrice={minPrice}
              maxPrice={maxPrice}
              updateParam={updateParam}
            />
          </div>
        </aside>

        {/* Scrollable product area */}
        <div className="min-w-0 flex-1">
          {error && (
            <div className="mb-3 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600 ring-1 ring-red-100">
              {error}
            </div>
          )}

          {loading ? (
            <LoadingSpinner label="Loading products..." />
          ) : filtered.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
              <p className="text-base font-medium text-gray-500">No products found</p>
              <p className="mt-1 text-sm text-gray-400">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    onClick={() => updateParam('page', String(page - 1))}
                    disabled={page <= 1}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm disabled:opacity-40"
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>
                  <span className="text-sm text-gray-500">
                    {page} / {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => updateParam('page', String(page + 1))}
                    disabled={page >= pagination.totalPages}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm disabled:opacity-40"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <FilterPanel
              categories={categories}
              category={category}
              minPrice={minPrice}
              maxPrice={maxPrice}
              updateParam={updateParam}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPanel({ categories, category, minPrice, maxPrice, updateParam }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-gray-500">
          Categories
        </h3>
        <div className="space-y-1">
          <FilterChip
            label="All Categories"
            active={!category}
            onClick={() => updateParam('category', '')}
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              label={cat.name}
              count={cat.product_count}
              active={category === cat.slug}
              onClick={() => updateParam('category', cat.slug)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-gray-500">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice || ''}
            onChange={(e) => updateParam('minPrice', e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-2.5 py-2 text-sm outline-none focus:border-brand-green"
          />
          <span className="text-gray-300">—</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice === 2000 ? '' : maxPrice}
            onChange={(e) => updateParam('maxPrice', e.target.value || '2000')}
            className="w-full rounded-lg border border-gray-200 px-2.5 py-2 text-sm outline-none focus:border-brand-green"
          />
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
        active
          ? 'bg-brand-green font-semibold text-white shadow-sm'
          : 'text-gray-600 hover:bg-gray-50 hover:text-brand-green'
      }`}
    >
      <span>{label}</span>
      {count != null && (
        <span className={`text-xs ${active ? 'text-white/80' : 'text-gray-400'}`}>{count}</span>
      )}
    </button>
  );
}
