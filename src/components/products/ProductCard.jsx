import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Zap } from 'lucide-react';
import StarRating from '../common/StarRating';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);
  const defaultVariant = product.variants?.[0] || { weight: 'Standard', price: product.price };
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : product.discountPercentage || 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, defaultVariant);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const productPath = `/products/${product.slug || product.id}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100/80 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/20 hover:shadow-[0_12px_28px_rgba(11,77,44,0.12)]">
      <Link to={productPath} className="flex flex-1 flex-col">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2.5">
            <div className="flex flex-wrap gap-1.5">
              {discount > 0 && (
                <span className="rounded-md bg-brand-orange px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {discount}% off
                </span>
              )}
              {product.isBestseller && (
                <span className="flex items-center gap-0.5 rounded-md bg-brand-green px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  <Zap size={10} className="fill-white" /> Bestseller
                </span>
              )}
            </div>
            <button
              onClick={handleWishlist}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all ${
                inWishlist
                  ? 'bg-brand-orange text-white'
                  : 'bg-white/95 text-gray-500 hover:bg-white hover:text-brand-orange'
              }`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={15} className={inWishlist ? 'fill-current' : ''} />
            </button>
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-800">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-3.5 sm:p-4">
          <span className="mb-1.5 inline-flex w-fit rounded-full bg-brand-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-green">
            {product.categoryName || product.category || 'Product'}
          </span>

          <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-brand-green sm:text-[15px]">
            {product.name}
          </h3>

          <div className="mb-3 flex items-center gap-1.5">
            <StarRating rating={product.rating} size={13} />
            <span className="text-[11px] text-gray-400">
              {product.reviewCount > 0 ? `(${product.reviewCount})` : 'New'}
            </span>
          </div>

          <div className="mt-auto flex items-end justify-between gap-2 border-t border-gray-50 pt-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-brand-green sm:text-xl">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>
              {product.weight && (
                <p className="mt-0.5 text-[11px] text-gray-400">{product.weight}</p>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="border-t border-gray-50 px-3.5 pb-3.5 sm:px-4 sm:pb-4">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-orange-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
