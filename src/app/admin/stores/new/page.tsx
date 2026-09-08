'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Store, ArrowLeft, Plus, Trash2, ShieldCheck, Sparkles } from 'lucide-react';

interface Country {
  id: string;
  code: string;
  name: string;
  flagIcon: string;
}

interface Category {
  id: string;
  name: string;
}

export default function NewStorePage() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [merchantUrl, setMerchantUrl] = useState('');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [ratingScore, setRatingScore] = useState('4.8');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [status, setStatus] = useState('active');

  // Relational selections
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // FAQs
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([
    { question: '', answer: '' },
  ]);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/countries').then((r) => r.json()),
      fetch('/api/admin/categories').then((r) => r.json()),
    ]).then(([countryData, categoryData]) => {
      if (countryData.countries) {
        setCountries(countryData.countries);
        // Default select all active countries
        setSelectedCountries(countryData.countries.map((c: Country) => c.id));
      }
      if (categoryData.categories) {
        setCategories(categoryData.categories);
      }
    });
  }, []);

  const handleCountryToggle = (id: string) => {
    setSelectedCountries((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const handleAddFaq = () => {
    setFaqs((prev) => [...prev, { question: '', answer: '' }]);
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    setFaqs((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name,
        slug,
        logoUrl,
        bannerUrl,
        shortDescription,
        longDescription,
        merchantUrl,
        affiliateUrl,
        ratingScore,
        isFeatured,
        isPopular,
        status,
        seoTitle,
        metaDescription,
        countryIds: selectedCountries,
        categoryIds: selectedCategories,
        faqs: faqs.filter((f) => f.question.trim() && f.answer.trim()),
      };

      const res = await fetch('/api/admin/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create store');

      router.push('/admin/stores');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link href="/admin/stores" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Stores
          </Link>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Add New Store / Brand
          </h1>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* 1. Core Profile Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            1. Core Store Profile
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Store Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Adidas"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                }}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>URL Slug *</label>
              <input
                type="text"
                required
                placeholder="e.g. adidas"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Logo Image URL *</label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Banner Image URL (Optional)</label>
              <input
                type="url"
                placeholder="https://..."
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Short Description</label>
            <input
              type="text"
              placeholder="One-line summary for cards..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Full Store Overview</label>
            <textarea
              rows={4}
              placeholder="Detailed store description, shipping info, return policies..."
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
            />
          </div>
        </div>

        {/* 2. Affiliate Tracking & URLs */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            2. Affiliate Tracking & URLs
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Merchant Website URL *</label>
              <input
                type="url"
                required
                placeholder="https://www.store.com"
                value={merchantUrl}
                onChange={(e) => setMerchantUrl(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Affiliate Tracking URL *</label>
              <input
                type="url"
                required
                placeholder="https://merchant.com/?ref=refpromos"
                value={affiliateUrl}
                onChange={(e) => setAffiliateUrl(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>
        </div>

        {/* 3. Regions & Category Assignments */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            3. Geographic Regions & Categories
          </h3>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Target Countries / Regions (Select all where store operates):
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {countries.map((c) => {
                const isSelected = selectedCountries.includes(c.id);
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => handleCountryToggle(c.id)}
                    className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    <span>{c.flagIcon}</span>
                    <span>{c.name} ({c.code})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Shopping Categories:
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map((cat) => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => handleCategoryToggle(cat.id)}
                    className={`btn btn-sm ${isSelected ? 'btn-indigo' : 'btn-secondary'}`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. Display Toggles & FAQs */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            4. Store FAQs & Highlights
          </h3>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Feature on Homepage</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={isPopular} onChange={(e) => setIsPopular(e.target.checked)} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Mark as Popular Store</span>
            </label>
          </div>

          {/* FAQ Repeater */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>Store FAQs:</span>
              <button type="button" onClick={handleAddFaq} className="btn btn-secondary btn-sm">
                <Plus size={14} /> Add FAQ Item
              </button>
            </div>

            {faqs.map((faq, idx) => (
              <div key={idx} style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>FAQ #{idx + 1}</span>
                  {faqs.length > 1 && (
                    <button type="button" onClick={() => handleRemoveFaq(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Question (e.g. How to redeem promo code?)"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
                <textarea
                  rows={2}
                  placeholder="Answer..."
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Link href="/admin/stores" className="btn btn-secondary btn-lg">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
            {loading ? 'Creating Store...' : 'Publish Store'}
          </button>
        </div>

      </form>

    </div>
  );
}
