'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tag, Plus, Search, Trash2, Edit2, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

interface CouponItem {
  id: string;
  title: string;
  couponCode?: string | null;
  discountValue: string;
  discountType: string;
  couponType: string;
  isVerified: boolean;
  isFeatured: boolean;
  status: string;
  expiryDate?: string | null;
  store: {
    id: string;
    name: string;
    logoUrl: string;
  };
  couponCountries: { country: { code: string; flagIcon: string } }[];
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/admin/coupons');
      const data = await res.json();
      if (data.coupons) setCoupons(data.coupons);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete coupon: "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/coupons?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      fetchCoupons();
    } catch (err) {
      alert('Failed to delete coupon');
    }
  };

  const filtered = coupons.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.store.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.couponCode && c.couponCode.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Coupons & Promo Codes
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Create and manage verified vouchers, percentage discounts, and countdown expirations.
          </p>
        </div>

        <Link href="/admin/coupons/new" className="btn btn-primary btn-sm">
          <Plus size={16} /> Add New Coupon
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Filter by title, promo code, or store name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '0.92rem',
            background: 'transparent',
          }}
        />
      </div>

      {/* Coupons Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 700 }}>
              <th style={{ padding: '1rem 1.25rem' }}>Store & Offer</th>
              <th style={{ padding: '1rem 1.25rem' }}>Promo Code</th>
              <th style={{ padding: '1rem 1.25rem' }}>Discount</th>
              <th style={{ padding: '1rem 1.25rem' }}>Regions</th>
              <th style={{ padding: '1rem 1.25rem' }}>Status</th>
              <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading coupons...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No coupons found matching your criteria.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  
                  {/* Store & Title */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img
                        src={c.store.logoUrl}
                        alt={c.store.name}
                        style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{c.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.store.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Code */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    {c.couponCode ? (
                      <code style={{ background: '#f8fafc', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--primary)', color: 'var(--primary)', fontWeight: 800, fontFamily: 'Space Grotesk, monospace' }}>
                        {c.couponCode}
                      </code>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Direct Deal</span>
                    )}
                  </td>

                  {/* Discount */}
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {c.discountValue}
                  </td>

                  {/* Regions */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {c.couponCountries.slice(0, 4).map((cc, i) => (
                        <span key={i} title={cc.country.code} style={{ fontSize: '1.05rem' }}>
                          {cc.country.flagIcon}
                        </span>
                      ))}
                      {c.couponCountries.length > 4 && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          +{c.couponCountries.length - 4}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className={`badge ${c.status === 'active' ? 'badge-verified' : 'badge-amber'}`}>
                      {c.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <Link
                        href={`/admin/coupons/${c.id}`}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem' }}
                        title="Edit Coupon"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(c.id, c.title)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem', color: '#ef4444' }}
                        title="Delete Coupon"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
