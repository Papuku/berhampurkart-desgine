import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { fetchProductBySlug, fetchCategoryProducts } from '../api/products';
import StarRating from '../components/common/StarRating';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchProductBySlug(slug);
        if (cancelled) return;

        setProduct(data);
        setSelectedVariant(0);
        setActiveImage(0);
        setQuantity(1);

        if (data.category) {
          const categoryData = await fetchCategoryProducts(data.category, { page_size: 5 });
          if (!cancelled) {
            setRelated(categoryData.results.filter((p) => p.id !== data.id).slice(0, 4));
          }
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Product not found');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProduct();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <LoadingSpinner label="Loading product..." />;
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-500">{error || 'Product not found'}</h1>
        <Link to="/products" className="mt-4 inline-block text-brand-orange hover:underline">
          Browse all products
        </Link>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, variant, quantity);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <nav className="mb-6 text-sm text-gray-400">
        <Link to="/" className="hover:text-brand-green">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-brand-green">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
            <img
              src={product.images[activeImage] || product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 overflow-hidden rounded-lg ring-2 ${
                    i === activeImage ? 'ring-brand-green' : 'ring-transparent'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-green/70">
            {product.categoryName}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} size={18} showValue />
            <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-green">₹{variant.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>

          <p className="mt-4 leading-relaxed text-gray-600">{product.description}</p>

          {product.weight && (
            <p className="mt-2 text-sm text-gray-500">Weight: {product.weight}</p>
          )}

          {product.variants.length > 1 && (
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-bold text-gray-900">Select Option</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.weight}
                    onClick={() => setSelectedVariant(i)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors ${
                      i === selectedVariant
                        ? 'border-brand-green bg-brand-green/5 text-brand-green'
                        : 'border-gray-200 text-gray-600 hover:border-brand-green/50'
                    }`}
                  >
                    {v.weight} — ₹{v.price}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-bold text-gray-900">Quantity</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-brand-green"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-brand-green"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-sm text-gray-400">Total: ₹{variant.price * quantity}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="flex-1"
              disabled={!product.inStock}
            >
              <ShoppingCart size={18} /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 transition-colors ${
                inWishlist
                  ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                  : 'border-gray-200 text-gray-400 hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              <Heart size={20} className={inWishlist ? 'fill-current' : ''} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: Truck, text: 'Free shipping above ₹1000' },
              { icon: Shield, text: '100% authentic products' },
              { icon: RotateCcw, text: 'Easy returns policy' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center rounded-xl bg-gray-50 p-3 text-center">
                <Icon size={20} className="mb-1 text-brand-green" />
                <span className="text-xs text-gray-500">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-brand-green">Related Products</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
