'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Store, Plus, Search, Trash2, Edit2, ExternalLink, Star, Tag } from 'lucide-react';

interface StoreItem {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  merchantUrl: string;
  ratingScore: number;
  isFeatured: boolean;
  isPopular: boolean;
  status: string;
  storeCountries: { country: { code: string; flagIcon: string } }[];
  storeCategories: { category: { name: string } }[];
  _count: { coupons: number; deals: number };
}

export default function AdminStoresPage() {
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      const res = await fetch('/api/admin/stores');
      const data = await res.json();
      if (data.stores) setStores(data.stores);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" and all associated coupons?`)) return;
    try {
      const res = await fetch(`/api/admin/stores?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete store');
      fetchStores();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const filteredStores = stores.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Action Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Stores & Brand Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Manage merchant stores, affiliate tracking parameters, regional assignments and logos.
          </p>
        </div>

        <Link href="/admin/stores/new" className="btn btn-primary btn-sm">
          <Plus size={16} /> Add New Store
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Filter stores by name or slug..."
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

      {/* Stores Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 700 }}>
              <th style={{ padding: '1rem 1.25rem' }}>Store Brand</th>
              <th style={{ padding: '1rem 1.25rem' }}>Regions</th>
              <th style={{ padding: '1rem 1.25rem' }}>Categories</th>
              <th style={{ padding: '1rem 1.25rem' }}>Coupons / Deals</th>
              <th style={{ padding: '1rem 1.25rem' }}>Status</th>
              <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading stores...
                </td>
              </tr>
            ) : filteredStores.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No stores match your search query.
                </td>
              </tr>
            ) : (
              filteredStores.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.15s' }}>
                  
                  {/* Brand info */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img
                        src={s.logoUrl}
                        alt={s.name}
                        style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.95rem' }}>{s.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          /stores/{s.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Regions */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {s.storeCountries.slice(0, 5).map((sc, i) => (
                        <span key={i} title={sc.country.code} style={{ fontSize: '1.1rem' }}>
                          {sc.country.flagIcon}
                        </span>
                      ))}
                      {s.storeCountries.length > 5 && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                          +{s.storeCountries.length - 5}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Categories */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {s.storeCategories.map((sc, i) => (
                        <span key={i} className="badge badge-deal" style={{ fontSize: '0.72rem' }}>
                          {sc.category.name}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Coupon Count */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className="badge badge-code">
                      <Tag size={12} /> {s._count.coupons} Coupons • {s._count.deals} Deals
                    </span>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className={`badge ${s.status === 'active' ? 'badge-verified' : 'badge-amber'}`}>
                      {s.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <Link
                        href={`/admin/stores/${s.id}`}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem' }}
                        title="Edit Store"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(s.id, s.name)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem', color: '#ef4444' }}
                        title="Delete Store"
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
