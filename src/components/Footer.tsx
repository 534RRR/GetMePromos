'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const pathname = usePathname();
  const { currentRegion, t, formatRegionLink } = useLanguage();

  // Do not render the public footer on admin panel pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="footer-main">
      <div className="container">
        {/* Trust Value Propositions Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            paddingBottom: '2.5rem',
            marginBottom: '3.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
            <div
              style={{
                background: 'rgba(5, 150, 105, 0.15)',
                color: '#34d399',
                padding: '0.7rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(5, 150, 105, 0.3)',
                boxShadow: '0 0 16px rgba(5, 150, 105, 0.2)',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                {t('footer_trust_1_title')}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--slate-400)', lineHeight: '1.5' }}>
                {t('footer_trust_1_desc')}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                padding: '0.7rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                flexShrink: 0,
              }}
            >
              <Lock size={22} color="#34d399" />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                {t('footer_trust_2_title')}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--slate-400)', lineHeight: '1.5' }}>
                {t('footer_trust_2_desc')}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                padding: '0.7rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                flexShrink: 0,
              }}
            >
              <CheckCircle2 size={22} color="#34d399" />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                {t('footer_trust_3_title')}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--slate-400)', lineHeight: '1.5' }}>
                {t('footer_trust_3_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Multi-Column Directory Grid */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '3.5rem',
          }}
        >
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 1.5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 14px rgba(5, 150, 105, 0.4)',
                  transform: 'rotate(-4deg)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z"
                    fill="#ffffff"
                  />
                  <circle cx="7.5" cy="7.5" r="1.75" fill="#059669" />
                </svg>
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Ref<span style={{ color: '#34d399' }}>Promos</span>
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--slate-400)', maxWidth: '340px' }}>
              {t('footer_tagline')}
            </p>
          </div>

          {/* Column: Navigation */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 800,
                marginBottom: '1.1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {t('footer_quick_links')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <Link href={formatRegionLink('/coupons')} className="footer-link">
                {t('nav_coupons')}
              </Link>
              <Link href={formatRegionLink('/coupons?type=code')} className="footer-link">
                {t('footer_promo_codes')}
              </Link>
              <Link href={formatRegionLink('/coupons?type=free_shipping')} className="footer-link">
                {t('footer_free_shipping')}
              </Link>
              <Link href={formatRegionLink('/stores')} className="footer-link">
                {t('nav_stores')}
              </Link>
              <Link href={formatRegionLink('/categories')} className="footer-link">
                {t('nav_categories')}
              </Link>
            </div>
          </div>

          {/* Column: Guides & Reviews */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 800,
                marginBottom: '1.1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {t('nav_reviews')} &amp; {t('nav_guides')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <Link href={formatRegionLink('/reviews')} className="footer-link">
                {t('nav_reviews')}
              </Link>
              <Link href={formatRegionLink('/blogs')} className="footer-link">
                {t('nav_guides')}
              </Link>
              <Link href={formatRegionLink('/stores/nike')} className="footer-link">
                {t('footer_nike_codes')}
              </Link>
              <Link href={formatRegionLink('/stores/amazon')} className="footer-link">
                {t('footer_amazon_deals')}
              </Link>
              <Link href={formatRegionLink('/stores/sephora')} className="footer-link">
                {t('footer_sephora_coupons')}
              </Link>
            </div>
          </div>


          {/* Column: Legal & Company */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 800,
                marginBottom: '1.1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {t('footer_legal')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <Link href={formatRegionLink('/about-us')} className="footer-link">
                {t('nav_about')}
              </Link>
              <Link href={formatRegionLink('/contact-us')} className="footer-link">
                {t('nav_contact')}
              </Link>
              <Link href={formatRegionLink('/privacy-policy')} className="footer-link">
                {t('footer_privacy')}
              </Link>
              <Link href={formatRegionLink('/terms-and-conditions')} className="footer-link">
                {t('footer_terms')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div
          className="footer-bottom-flex"
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--slate-500)',
          }}
        >
          <p>© {new Date().getFullYear()} RefPromos.com. {t('footer_rights')}</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#34d399',
                display: 'inline-block',
                boxShadow: '0 0 8px #34d399',
              }}
            ></span>
            {currentRegion.name} · Multi-Region Verified Savings Engine.
          </p>
        </div>
      </div>
    </footer>
  );
}
