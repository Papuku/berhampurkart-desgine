import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import Button from '../components/common/Button';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-brand-green sm:text-3xl">Contact Us</h1>
        <p className="mt-2 text-gray-500">We&apos;d love to hear from you</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {[
            { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
            { icon: Mail, label: 'Email', value: 'support@berhampurkart.com', href: 'mailto:support@berhampurkart.com' },
            { icon: MapPin, label: 'Address', value: 'Berhampur, Ganjam, Odisha 760001' },
            { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/919876543210' },
          ].map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{label}</p>
                {href ? (
                  <a href={href} className="text-sm text-brand-orange hover:underline" target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-gray-600">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
              <Send size={48} className="text-brand-green" />
              <h2 className="mt-4 text-xl font-bold text-brand-green">Message Sent!</h2>
              <p className="mt-2 text-gray-500">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8"
            >
              <h2 className="mb-4 text-lg font-bold text-gray-900">Send a Message</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-green"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4" size="lg">
                <Send size={16} /> Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
