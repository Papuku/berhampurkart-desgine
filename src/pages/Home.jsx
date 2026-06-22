import { useEffect, useState } from 'react';
import BannerSlider from '../components/home/BannerSlider';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductSection from '../components/home/ProductSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  fetchProducts,
  fetchFeaturedProducts,
  fetchBestsellerProducts,
} from '../api/products';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadHomeData() {
      try {
        setLoading(true);
        setError('');

        const [featuredData, bestsellerData, productsData] = await Promise.all([
          fetchFeaturedProducts({ page_size: 8 }),
          fetchBestsellerProducts({ page_size: 8 }),
          fetchProducts({ page_size: 24 }),
        ]);

        if (cancelled) return;

        const allProducts = productsData.results;

        setFeatured(
          featuredData.length
            ? featuredData
            : allProducts.filter((p) => p.isFeatured).slice(0, 8)
        );
        setBestsellers(
          bestsellerData.length
            ? bestsellerData
            : allProducts.filter((p) => p.isBestseller).slice(0, 8)
        );
        setNewArrivals(allProducts.slice(0, 8));
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadHomeData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <BannerSlider />

      <div className="mx-auto max-w-7xl space-y-10 px-3 py-5 sm:px-4 sm:py-6">
        {loading ? (
          <LoadingSpinner label="Loading products..." />
        ) : (
          <>
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-100">
                {error}
              </div>
            )}

            <CategoryGrid />

            <ProductSection
              title="Featured Products"
              subtitle="Handpicked favourites from Berhampur"
              products={featured}
              viewAllLink="/products"
            />

            <ProductSection
              title="Best Sellers"
              subtitle="Most loved by our customers"
              products={bestsellers}
              viewAllLink="/products?sort=bestseller"
            />

            <ProductSection
              title="New Arrivals"
              subtitle="Fresh additions to our collection"
              products={newArrivals}
              viewAllLink="/products?sort=new"
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {[
                { icon: '🚚', title: 'Pan-India Delivery', desc: '3-7 business days' },
                { icon: '✅', title: '100% Authentic', desc: 'Direct from Berhampur' },
                { icon: '🔒', title: 'Secure Payments', desc: 'UPI, Cards & COD' },
                { icon: '💬', title: '24/7 Support', desc: 'WhatsApp & Live Chat' },
              ].map((badge) => (
                <div
                  key={badge.title}
                  className="flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-gray-100 sm:p-5"
                >
                  <span className="mb-2 text-2xl sm:text-3xl">{badge.icon}</span>
                  <h3 className="text-xs font-bold text-brand-green sm:text-sm">{badge.title}</h3>
                  <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">{badge.desc}</p>
                </div>
              ))}
            </div>

            {/* Refer & Earn — bottom of page */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 p-6 text-center text-white shadow-lg sm:p-10">
              <div className="mb-3 text-3xl sm:text-4xl">🎁 💰 🎉</div>
              <h2 className="text-xl font-bold sm:text-3xl">Refer & Earn ₹100!</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/95 sm:text-base">
                👥 Share BerhampurKart with friends and earn reward points on every purchase 🛒✨
              </p>
              <button className="mt-5 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-orange-600 shadow-md transition-transform hover:scale-105">
                🚀 Start Referring Now
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
