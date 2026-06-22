import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    if (item.variants?.length) {
      addToCart(item, item.variants[0]);
      removeFromWishlist(item.id);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <Heart size={64} className="mx-auto text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-500">Your wishlist is empty</h1>
        <p className="mt-2 text-gray-400">Save products you love for later</p>
        <Link to="/products" className="mt-6 inline-block">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <h1 className="mb-6 text-2xl font-bold text-brand-green sm:text-3xl">
        My Wishlist ({items.length})
      </h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
          >
            <Link to={`/products/${item.slug || item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-xl object-cover"
              />
            </Link>
            <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  to={`/products/${item.slug || item.id}`}
                  className="font-semibold text-gray-900 hover:text-brand-green"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-lg font-bold text-brand-green">₹{item.price}</p>
              </div>
              <div className="mt-3 flex gap-2 sm:mt-0">
                <Button size="sm" onClick={() => handleMoveToCart(item)}>
                  <ShoppingCart size={16} /> Move to Cart
                </Button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
