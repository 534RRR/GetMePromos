import React from 'react';
import Link from 'next/link';
import { Star, Tag, ChevronRight } from 'lucide-react';

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
        padding: '1.25rem',
        textDecoration: 'none',
        position: 'relative',
      }}
    >
      {/* Store Logo */}
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        marginBottom: '0.85rem',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src={store.logoUrl}
          alt={store.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Store Name */}
      <h4 style={{
        fontSize: '1.05rem',
        fontWeight: 700,
        color: 'var(--text-main)',
        marginBottom: '0.35rem',
      }}>
        {store.name}
      </h4>

      {/* Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.82rem', color: '#eab308', marginBottom: '0.5rem' }}>
        <Star size={13} fill="#eab308" />
        <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{store.ratingScore.toFixed(1)}</span>
        <span style={{ color: 'var(--text-muted)' }}>({store.ratingCount})</span>
      </div>

      {/* Coupon Count Pill */}
      <span className="badge badge-code" style={{ fontSize: '0.75rem', marginTop: 'auto' }}>
        <Tag size={12} /> {couponCount} Offers Available
      </span>
    </Link>
  );
}
