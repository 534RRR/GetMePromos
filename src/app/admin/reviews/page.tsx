'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Plus, Search, Trash2, Edit2, ExternalLink, ShieldCheck } from 'lucide-react';

interface ReviewItem {
  id: string;
  title: string;
  slug: string;
  rating: number;
  authorName: string;
  status: string;
  updatedAt: string;
  store: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
  };
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      if (data.reviews) setReviews(data.reviews);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete review "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete review');
      fetchReviews();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const filteredReviews = reviews.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.store.name.toLowerCase().includes(search.toLowerCase()) ||
    r.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Action Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Store Reviews Manager
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Publish in-depth merchant reviews with pros/cons, rating breakdowns, and editorial verdicts.
          </p>
        </div>

        <Link href="/admin/reviews/new" className="btn btn-primary btn-sm">
          <Plus size={16} /> Write Store Review
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Filter reviews by store name, title, or slug..."
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

      {/* Reviews Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 700 }}>
              <th style={{ padding: '1rem 1.25rem' }}>Store / Merchant</th>
              <th style={{ padding: '1rem 1.25rem' }}>Review Title</th>
              <th style={{ padding: '1rem 1.25rem' }}>Score</th>
              <th style={{ padding: '1rem 1.25rem' }}>Author</th>
              <th style={{ padding: '1rem 1.25rem' }}>Status</th>
              <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading reviews...
                </td>
              </tr>
            ) : filteredReviews.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No store reviews found.
                </td>
              </tr>
            ) : (
              filteredReviews.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.15s' }}>
                  
                  {/* Store info */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={r.store.logoUrl}
                        alt={r.store.name}
                        style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                      />
                      <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.92rem' }}>
                        {r.store.name}
                      </div>
                    </div>
                  </td>

                  {/* Title & Slug */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.92rem', maxWidth: '320px' }}>
                      {r.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      /reviews/{r.slug}
                    </div>
                  </td>

                  {/* Rating */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 800 }}>
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      {r.rating.toFixed(1)} / 5.0
                    </span>
                  </td>

                  {/* Author */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}>
                      {r.authorName}
                    </span>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className={`badge ${r.status === 'published' ? 'badge-verified' : 'badge-deal'}`}>
                      {r.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <Link
                        href={`/reviews/${r.slug}`}
                        target="_blank"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem' }}
                        title="View Live Review"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <Link
                        href={`/admin/reviews/${r.id}`}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem' }}
                        title="Edit Review"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(r.id, r.title)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem', color: '#ef4444' }}
                        title="Delete Review"
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
