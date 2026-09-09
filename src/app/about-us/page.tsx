import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, Zap, Award, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — RefPromos Savings Mission & Editorial Policy',
  description:
    'Learn how RefPromos helps millions of shoppers save money online with tested, verified coupon codes, exclusive sales, and transparent affiliate partnerships.',
};

export default function AboutUsPage() {
  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      <Breadcrumbs items={[{ name: 'About Us', url: '/about-us' }]} />

      {/* Hero */}
      <div style={{ maxWidth: '780px', margin: '0 auto 3.5rem auto', textAlign: 'center' }}>
        <span className="eyebrow-pill" style={{ marginBottom: '1.25rem' }}>
          Our Mission
        </span>
        <h1 className="page-title" style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em', lineHeight: '1.15', marginBottom: '1.25rem' }}>
          We Help Millions of Smart Shoppers <span className="hero-gradient-text">Save on Every Purchase</span>
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
          RefPromos was founded to eliminate expired discount codes and provide online shoppers with 100% verified, tested coupon codes and real deals.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="about-metrics-grid grid grid-cols-4 gap-5" style={{ marginBottom: '4rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '2rem 1.25rem' }}>
          <div className="about-metric-value" style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.25rem', lineHeight: 1.1 }}>500+</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-heading)' }}>Retail Partners</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Top global brands worldwide</p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '2rem 1.25rem' }}>
          <div className="about-metric-value" style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.25rem', lineHeight: 1.1 }}>20,000+</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-heading)' }}>Verified Codes</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Tested &amp; updated daily</p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '2rem 1.25rem' }}>
          <div className="about-metric-value" style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.25rem', lineHeight: 1.1 }}>$1.2M+</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-heading)' }}>Shopper Savings</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>In verified discounts</p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '2rem 1.25rem' }}>
          <div className="about-metric-value" style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.25rem', lineHeight: 1.1 }}>8</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-heading)' }}>Global Regions</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>US, UK, AU, CA, DE, FR, IT, NL</p>
        </div>
      </div>

      {/* Core Values / 3 Pillars */}
      <div style={{ maxWidth: '860px', margin: '0 auto 4rem auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, textAlign: 'center', marginBottom: '2rem', color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
          How RefPromos Works For You
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="about-pillar-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', border: '1px solid var(--border)', borderRadius: 'var(--radius-2xl)', padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--primary-border)' }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.4rem', color: 'var(--text-heading)' }}>1. Manual Testing &amp; Verification</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.65', fontSize: '0.92rem', margin: 0 }}>
                Our team tests codes at actual checkout before publishing. If a code fails to provide the promised discount or has expired, it is immediately flagged or archived.
              </p>
            </div>
          </div>

          <div className="about-pillar-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', border: '1px solid var(--border)', borderRadius: 'var(--radius-2xl)', padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
              <Zap size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.4rem', color: 'var(--text-heading)' }}>2. 100% Free &amp; Frictionless</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.65', fontSize: '0.92rem', margin: 0 }}>
                We believe smart shopping should never require paid subscriptions or complex accounts. You can find, copy, and apply any promo code instantly with 1 click.
              </p>
            </div>
          </div>

          <div className="about-pillar-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', border: '1px solid var(--border)', borderRadius: 'var(--radius-2xl)', padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--primary-border)' }}>
              <Award size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.4rem', color: 'var(--text-heading)' }}>3. Transparent Partnerships</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.65', fontSize: '0.92rem', margin: 0 }}>
                When you make a purchase using our affiliate links, we may earn a small commission from the merchant at zero additional cost to you, enabling us to keep the platform free.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="cta-box" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: 'var(--radius-2xl)',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        color: '#ffffff',
        boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.25)',
      }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Ready to Start Saving?
        </h2>
        <p style={{ color: 'var(--slate-300)', fontSize: '0.98rem', maxWidth: '480px', margin: '0 auto 2rem auto' }}>
          Explore trending coupons and brand deals right now.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/coupons" className="btn btn-primary btn-lg">
            Explore Coupons <ArrowRight size={16} />
          </Link>
          <Link href="/stores" className="btn btn-secondary btn-lg" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
            Browse Stores
          </Link>
        </div>
      </div>
    </div>
  );
}
