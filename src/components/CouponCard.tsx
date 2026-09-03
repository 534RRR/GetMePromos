'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Tag, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="coupon-card" style={{ padding: '1.6rem', justifyContent: 'space-between' }}>
      <div>
        {/* Merchant & Badge Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <Link
            href={`/stores/${coupon.store.slug}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: 'var(--shadow-xs)',
            }}>
              <img
                src={coupon.store.logoUrl}
                alt={coupon.store.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '3px' }}
              />
            </div>
            <span style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--text-heading)' }}>
              {coupon.store.name}
            </span>
          </Link>

          <span className={`badge ${isCode ? 'badge-code' : 'badge-deal'}`}>
            <Tag size={11} /> {isCode ? 'Promo Code' : 'Direct Deal'}
          </span>
        </div>

        {/* Discount Amount */}
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '1.85rem',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'var(--primary)',
            lineHeight: 1.1,
          }}>
            {coupon.discountValue}
          </span>
        </div>

        {/* Title */}
        <p style={{
          fontSize: '0.94rem',
          color: 'var(--text-main)',
          fontWeight: 700,
          lineHeight: '1.45',
          marginBottom: '1rem',
          minHeight: '2.7rem',
        }}>
          {coupon.title}
        </p>

        {/* Verification Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          {coupon.isVerified && (
            <span className="badge badge-verified">
              <ShieldCheck size={12} /> Verified Today
            </span>
          )}
          <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{coupon.successRate}% Success</span>
        </div>
      </div>

      {/* Ticket Footer & CTA Section */}
      <div style={{
        paddingTop: '1.1rem',
        borderTop: '1px dashed var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
      }}>
        {isCode ? (
          <div className="code-pill" style={{ flex: 1, padding: '0.45rem 0.65rem', fontSize: '0.84rem' }}>
            {coupon.couponCode}
          </div>
        ) : (
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Automatic at checkout
          </span>
        )}

        <button
          onClick={handleCtaClick}
          className={`btn ${isCode ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          style={{ padding: '0.55rem 1.05rem', fontSize: '0.86rem' }}
        >
          {coupon.ctaText || (isCode ? 'Get Code' : 'Get Deal')}
        </button>
      </div>
    </div>
  );
}
