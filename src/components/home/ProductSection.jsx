import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';

export default function ProductSection({ title, subtitle, products, viewAllLink }) {
  if (!products.length) return null;

  return (
    <section>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-green sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-gray-500">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="hidden items-center gap-1 text-sm font-semibold text-brand-orange hover:underline sm:flex"
          >
            View All <ArrowRight size={16} />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {viewAllLink && (
        <div className="mt-6 text-center sm:hidden">
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-orange"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
