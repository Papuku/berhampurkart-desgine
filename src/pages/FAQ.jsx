import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { faqs } from '../data/products';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-brand-green sm:text-3xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-gray-500">Everything you need to know about BerhampurKart</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <span className="pr-4 font-semibold text-gray-900">{faq.q}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-gray-400 transition-transform ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="border-t border-gray-100 px-5 pb-5 pt-3">
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-brand-green/5 p-8 text-center">
        <MessageCircle size={40} className="mx-auto text-brand-green" />
        <h2 className="mt-4 text-lg font-bold text-brand-green">Still have questions?</h2>
        <p className="mt-2 text-sm text-gray-500">
          Our support team is available via WhatsApp and live chat
        </p>
        <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
            <Button>WhatsApp Support</Button>
          </a>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
