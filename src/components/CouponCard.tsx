'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Tag, Clock, ArrowRight } from 'lucide-react';

interface CouponCardProps {
  coupon: {
    id: string;
    title: string;
    description?: string | null;
    couponCode?: string | null;
    discountValue: string;
    discountType: string;
    couponType: string;
    ctaText: string;
    affiliateUrlOverride?: string | null;
    isVerified: boolean;
    successRate: number;
    expiryDate?: Date | string | null;
    store: {
      id: string;
      name: string;
      slug: string;
      logoUrl: string;
      affiliateUrl: string;
    };
  };
}

export default function CouponCard({ coupon }: CouponCardProps) {
  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && window.openCouponModal) {
      window.openCouponModal({
        couponId: coupon.id,
        storeName: coupon.store.name,
        storeLogo: coupon.store.logoUrl,
        title: coupon.title,
        couponCode: coupon.couponCode,
        discountValue: coupon.discountValue,
        affiliateUrl: `/out/coupon/${coupon.id}`,
      });
    }
  };

  const isCode = Boolean(coupon.couponCode);

  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top Header & Store Info */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Link href={`/stores/${coupon.store.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img
              src={coupon.store.logoUrl}
              alt={coupon.store.name}
              style={{
                width: '42px',
                height: '42px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
              }}
            />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
              {coupon.store.name}
            </span>
          </Link>

          <span className={`badge ${isCode ? 'badge-code' : 'badge-deal'}`}>
            <Tag size={12} /> {isCode ? 'Code' : 'Deal'}
          </span>
        </div>

        {/* Discount Value */}
        <h3 style={{
          fontSize: '1.45rem',
          fontWeight: 800,
          color: 'var(--primary)',
          letterSpacing: '-0.02em',
          marginBottom: '0.35rem',
        }}>
          {coupon.discountValue}
        </h3>

        {/* Title */}
        <p style={{
          fontSize: '0.92rem',
          color: 'var(--text-main)',
          fontWeight: 600,
          lineHeight: '1.45',
          marginBottom: '1rem',
          minHeight: '2.8rem',
        }}>
          {coupon.title}
        </p>

        {/* Verification & Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          {coupon.isVerified && (
            <span className="badge badge-verified">
              <ShieldCheck size={13} /> Verified
            </span>
          )}
          <span>{coupon.successRate}% Success</span>
        </div>
      </div>

      {/* Code Display & CTA Button */}
      <div style={{
        paddingTop: '1rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
      }}>
        {isCode ? (
          <div className="code-pill" style={{ flex: 1, padding: '0.45rem 0.5rem', fontSize: '0.85rem' }}>
            {coupon.couponCode}
          </div>
        ) : (
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--secondary)' }}>
            No Code Needed
          </span>
        )}

        <button
          onClick={handleCtaClick}
          className={`btn ${isCode ? 'btn-primary' : 'btn-indigo'} btn-sm`}
          style={{ padding: '0.55rem 1rem', fontSize: '0.88rem' }}
        >
          {coupon.ctaText || (isCode ? 'Get Code' : 'Get Deal')}
        </button>
      </div>
    </div>
  );
}
