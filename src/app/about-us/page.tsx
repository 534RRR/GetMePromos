import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, Users, Zap, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — GrabYourDealz Savings Mission & Editorial Policy',
  description:
    'Learn how GrabYourDealz helps millions of shoppers save money online with tested, verified coupon codes, exclusive sales, and transparent affiliate partnerships.',
};

export default function AboutUsPage() {
  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      <Breadcrumbs items={[{ name: 'About Us', url: '/about-us' }]} />

      {/* Hero */}
      <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto', textAlign: 'center' }}>
        <span className="badge badge-code" style={{ marginBottom: '1rem' }}>
          Our Mission
        </span>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: '1.2', marginBottom: '1.25rem' }}>
          We Help Millions of Smart Shoppers <span style={{ color: 'var(--primary)' }}>Save on Every Purchase</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          GrabYourDealz was founded with a singular purpose: eliminate fake, expired discount codes and provide online shoppers with 100% verified, tested coupon codes and real money-saving deals.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-6" style={{ marginBottom: '4.5rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>500+</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>Retail Partners</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Top global brands worldwide</p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4f46e5', marginBottom: '0.25rem' }}>20,000+</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>Verified Codes</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Tested &amp; updated round the clock</p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#059669', marginBottom: '0.25rem' }}>$1.2M+</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>Saved by Shoppers</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>In verified discounts &amp; perks</p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#d97706', marginBottom: '0.25rem' }}>8</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>Global Regions</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>US, UK, AU, CA, DE, FR, IT, NL</p>
        </div>
      </div>

      {/* Core Values / 3 Pillars */}
      <div style={{ maxWidth: '900px', margin: '0 auto 4.5rem auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem' }}>
          How GrabYourDealz Works For You
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>1. Manual Testing &amp; Verification</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                Our team tests codes at actual checkout before publishing. If a code fails to provide the promised discount or has expired, it is immediately flagged, updated, or archived.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>2. 100% Free &amp; Frictionless</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                We believe smart shopping should never require paid subscriptions or complex accounts. You can find, copy, and apply any promo code instantly with 1 click.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>3. Transparent Partnerships</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                When you make a purchase using our affiliate links, we may earn a small commission from the merchant at zero additional cost to you. This enables us to maintain our testing team and keep the platform 100% free.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        color: '#ffffff',
      }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Ready to Start Saving?
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
          Explore trending coupons and brand deals right now.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/coupons" className="btn btn-primary btn-lg">
            Explore Coupons <ArrowRight size={18} />
          </Link>
          <Link href="/stores" className="btn btn-secondary btn-lg" style={{ background: '#ffffff', color: 'var(--text-main)' }}>
            Browse Stores
          </Link>
        </div>
      </div>
    </div>
  );
}
