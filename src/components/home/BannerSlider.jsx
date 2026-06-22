import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { banners } from '../../data/banners';

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % banners.length);
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const banner = banners[current];

  return (
    <section className="relative w-full overflow-hidden bg-gray-900">
      <div className="relative h-[260px] sm:h-[340px] lg:h-[420px]">
        {banners.map((b, i) => (
          <img
            key={b.id}
            src={b.banner_image}
            alt={b.title}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pb-8 pt-20 sm:px-8 sm:pb-10 lg:px-12">
          <div key={banner.id} className="mx-auto max-w-7xl animate-slide-up">
            <h2 className="mb-1 text-lg font-semibold leading-snug text-white sm:text-2xl lg:text-3xl">
              {banner.title}
            </h2>
            <p className="mb-3 max-w-lg text-sm text-white/85 sm:text-base">{banner.subtitle}</p>
            <Link
              to={banner.link}
              className="inline-flex items-center rounded-md bg-brand-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-light"
            >
              {banner.cta}
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 sm:left-4"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 sm:right-4"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-3 right-4 flex gap-1.5 sm:bottom-4 sm:right-8">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
