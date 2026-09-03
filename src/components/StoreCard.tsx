import React from 'react';
import Link from 'next/link';
import { Star, Tag } from 'lucide-react';

interface StoreCardProps {
  store: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
    ratingScore: number;
    ratingCount: number;
    shortDescription?: string | null;
    _count?: {
      coupons: number;
      deals: number;
    };
  };
}

export default function StoreCard({ store }: StoreCardProps) {
  const couponCount = store._count ? store._count.coupons + store._count.deals : 3;

  return (
    <Link
      href={`/stores/${store.slug}`}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1.6rem 1.25rem',
        textDecoration: 'none',
        position: 'relative',
      }}
    >
      {/* Store Logo Container */}
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        marginBottom: '0.9rem',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        boxShadow: 'var(--shadow-xs)',
      }}>
        <img
          src={store.logoUrl}
          alt={store.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Store Name */}
      <h4 style={{
        fontSize: '1.05rem',
        fontWeight: 800,
        color: 'var(--text-heading)',
        marginBottom: '0.4rem',
        letterSpacing: '-0.02em',
      }}>
        {store.name}
      </h4>

      {/* Star Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: '#d97706', marginBottom: '0.85rem' }}>
        <Star size={13} fill="#d97706" strokeWidth={0} />
        <span style={{ fontWeight: 800, color: 'var(--text-heading)' }}>{store.ratingScore.toFixed(1)}</span>
        <span style={{ color: 'var(--text-muted)' }}>({store.ratingCount})</span>
      </div>

      {/* Coupon Count Pill */}
      <span className="badge badge-code" style={{ fontSize: '0.74rem', marginTop: 'auto' }}>
        <Tag size={11} /> {couponCount} Available Deals
      </span>
    </Link>
  );
}
