import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../api/products';

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-brand-green sm:text-3xl">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-brand-green sm:text-3xl">Shop by Category</h2>
        <p className="mt-2 text-gray-500">Explore authentic Berhampur & Odisha products</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:ring-brand-green/30"
          >
            <div className="aspect-square overflow-hidden bg-gray-50">
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl">🛒</div>
              )}
            </div>
            <div className="p-4 text-center">
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-green">
                {cat.name}
              </h3>
              <p className="mt-1 text-xs text-gray-400 line-clamp-2">{cat.description}</p>
              <p className="mt-1 text-xs font-medium text-brand-orange">
                {cat.product_count} products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
