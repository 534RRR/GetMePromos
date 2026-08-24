'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Tag, ShieldCheck, Sparkles } from 'lucide-react';

interface StoreOption {
  id: string;
  name: string;
}

interface CountryOption {
  id: string;
  code: string;
  name: string;
  flagIcon: string;
}

export default function NewCouponPage() {
  const router = useRouter();
  const [stores, setStores] = useState<StoreOption[]>([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [storeId, setStoreId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [couponType, setCouponType] = useState('coupon_code');
  const [ctaText, setCtaText] = useState('Get Code');
  const [affiliateUrlOverride, setAffiliateUrlOverride] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState('active');
  const [termsConditions, setTermsConditions] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/stores').then((r) => r.json()),
      fetch('/api/admin/countries').then((r) => r.json()),
    ]).then(([storeData, countryData]) => {
      if (storeData.stores) {
        setStores(storeData.stores);
        if (storeData.stores.length > 0) setStoreId(storeData.stores[0].id);
      }
      if (countryData.countries) {
        setCountries(countryData.countries);
        setSelectedCountries(countryData.countries.map((c: CountryOption) => c.id));
      }
    });
  }, []);

  const handleCountryToggle = (id: string) => {
    setSelectedCountries((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        storeId,
        title,
        description,
        couponCode: couponCode || null,
        discountValue,
        discountType,
        couponType,
        ctaText,
        affiliateUrlOverride: affiliateUrlOverride || null,
        startDate,
        expiryDate: expiryDate ? expiryDate : null,
        isVerified,
        isFeatured,
        status,
        termsConditions,
        countryIds: selectedCountries,
      };

      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create coupon');

      router.push('/admin/coupons');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link href="/admin/coupons" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Coupons
          </Link>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Create New Coupon / Deal
          </h1>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Core Coupon Details */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            Offer Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Select Store *</label>
              <select
                required
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: '#fff' }}
              >
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Discount Badge Text *</label>
              <input
                type="text"
                required
                placeholder="e.g. 25% OFF, $50 OFF, Free Shipping"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Coupon Headline Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. 25% OFF All Orders Sitewide on Nike.com"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Promo Code (Leave blank if Deal)</label>
              <input
                type="text"
                placeholder="e.g. SAVE25"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  if (e.target.value.trim()) {
                    setCtaText('Get Code');
                  } else {
                    setCtaText('Get Deal');
                  }
                }}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontFamily: 'Space Grotesk, monospace', fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: '#fff' }}
              >
                <option value="percentage">Percentage Off (%)</option>
                <option value="fixed_amount">Fixed Amount Off ($)</option>
                <option value="free_shipping">Free Shipping</option>
                <option value="cashback">Cashback / Rebate</option>
                <option value="other">Special Sale / Offer</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>CTA Button Text</label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Description & How to Apply</label>
            <textarea
              rows={3}
              placeholder="Apply this promo code at checkout to receive 25% off..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
            />
          </div>
        </div>

        {/* Lifecycle & Dates */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            Lifecycle & Region Scope
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Expiry Date (Optional)</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: '#fff' }}
              >
                <option value="active">Active (Published)</option>
                <option value="draft">Draft (Hidden)</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

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
                    <span>{c.code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={isVerified} onChange={(e) => setIsVerified(e.target.checked)} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Mark as Verified (100% Tested)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Feature on Homepage</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Link href="/admin/coupons" className="btn btn-secondary btn-lg">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
            {loading ? 'Saving Coupon...' : 'Publish Coupon'}
          </button>
        </div>

      </form>

    </div>
  );
}
