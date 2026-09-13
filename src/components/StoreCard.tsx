'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Tag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t, formatRegionLink } = useLanguage();
  const couponCount = store._count ? store._count.coupons + store._count.deals : 3;

  return (
    <Link
      href={formatRegionLink(`/stores/${store.slug}`)}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1.5rem 1rem',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        minWidth: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Store Logo Container */}
      <div style={{
        width: '68px',
        height: '68px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        marginBottom: '0.85rem',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        boxShadow: 'var(--shadow-xs)',
        flexShrink: 0,
      }}>
        <img
          src={store.logoUrl}
          alt={store.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Store Name */}
      <h4 style={{
        fontSize: '1.02rem',
        fontWeight: 800,
        color: 'var(--text-heading)',
        marginBottom: '0.35rem',
        letterSpacing: '-0.02em',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
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
      <span
        className="badge badge-code"
        style={{
          fontSize: '0.73rem',
          marginTop: 'auto',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          padding: '0.32rem 0.65rem',
          boxSizing: 'border-box',
          letterSpacing: '0.04em',
        }}
      >
        <Tag size={11} style={{ flexShrink: 0 }} /> {couponCount} {t('available_deals')}
      </span>
    </Link>
  );
}


