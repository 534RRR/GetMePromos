'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditStorePage() {
  const router = useRouter();
  const params = useParams();
  const storeId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [countries, setCountries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

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

  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/countries').then((r) => r.json()),
      fetch('/api/admin/categories').then((r) => r.json()),
      fetch(`/api/admin/stores?id=${storeId}`).then((r) => r.json()),
    ]).then(([countryData, categoryData, storeData]) => {
      if (countryData.countries) setCountries(countryData.countries);
      if (categoryData.categories) setCategories(categoryData.categories);
      if (storeData.store) {
        const s = storeData.store;
        setName(s.name);
        setSlug(s.slug);
        setLogoUrl(s.logoUrl);
        setBannerUrl(s.bannerUrl || '');
        setShortDescription(s.shortDescription || '');
        setLongDescription(s.longDescription || '');
        setMerchantUrl(s.merchantUrl);
        setAffiliateUrl(s.affiliateUrl);
        setRatingScore(s.ratingScore.toString());
        setIsFeatured(s.isFeatured);
        setIsPopular(s.isPopular);
        setStatus(s.status);
        setSelectedCountries(s.storeCountries.map((sc: any) => sc.countryId));
        setSelectedCategories(s.storeCategories.map((sc: any) => sc.categoryId));
      }
      setLoading(false);
    });
  }, [storeId]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const payload = {
        id: storeId,
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
        countryIds: selectedCountries,
        categoryIds: selectedCategories,
      };

      const res = await fetch('/api/admin/stores', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update store');

      router.push('/admin/stores');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading store data...</div>;
  }

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link href="/admin/stores" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Stores
          </Link>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Edit Store: {name}
          </h1>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            Store Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Store Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Logo URL</label>
              <input
                type="url"
                required
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Banner URL</label>
              <input
                type="url"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Merchant Website</label>
              <input
                type="url"
                required
                value={merchantUrl}
                onChange={(e) => setMerchantUrl(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Affiliate URL</label>
              <input
                type="url"
                required
                value={affiliateUrl}
                onChange={(e) => setAffiliateUrl(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Short Description</label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Full Overview</label>
            <textarea
              rows={4}
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
            />
          </div>
        </div>

        {/* Region & Category Assignments */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            Regional & Category Scopes
          </h3>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Target Countries:
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

        {/* Toggles */}
        <div className="card" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Feature on Homepage</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={isPopular} onChange={(e) => setIsPopular(e.target.checked)} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Mark as Popular Store</span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Link href="/admin/stores" className="btn btn-secondary btn-lg">
            Cancel
          </Link>
          <button type="submit" disabled={saving} className="btn btn-primary btn-lg">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
