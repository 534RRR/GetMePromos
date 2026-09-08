'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Do not render the public footer on admin panel pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="footer-main">
      <div className="container">
        
        {/* Trust Value Propositions Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem',
          paddingBottom: '2.5rem',
          marginBottom: '3.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
            <div style={{
              background: 'rgba(5, 150, 105, 0.15)',
              color: '#34d399',
              padding: '0.7rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(5, 150, 105, 0.3)',
              boxShadow: '0 0 16px rgba(5, 150, 105, 0.2)',
              flexShrink: 0,
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.25rem' }}>100% Tested Daily</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--slate-400)', lineHeight: '1.5' }}>Every coupon code is verified before listing to guarantee real savings at checkout.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              padding: '0.7rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              flexShrink: 0,
            }}>
              <Lock size={22} color="#34d399" />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.25rem' }}>Free &amp; No Sign-Up Needed</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--slate-400)', lineHeight: '1.5' }}>Instant 1-click access to discount codes and deals with zero registration hurdles.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              padding: '0.7rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              flexShrink: 0,
            }}>
              <CheckCircle2 size={22} color="#34d399" />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.25rem' }}>Affiliate Transparency</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--slate-400)', lineHeight: '1.5' }}>We partner with trusted retailers and may earn a commission when you redeem offers.</p>
            </div>
          </div>
        </div>

        {/* Multi-Column Directory Grid */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '3.5rem',
        }}>
          
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 1.5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 14px rgba(5, 150, 105, 0.4)',
                transform: 'rotate(-4deg)',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z" fill="#ffffff" />
                  <circle cx="7.5" cy="7.5" r="1.75" fill="#059669" />
                </svg>
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                GetMe<span style={{ color: '#34d399' }}>Promos</span>
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', lineHeight: '1.6', color: 'var(--slate-400)', maxWidth: '340px' }}>
              Your smart shopping companion. Discover verified promo codes, exclusive discounts, and hand-tested deals from 500+ trusted retailers across the globe.
            </p>
          </div>

          {/* Column: Navigation */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.86rem', fontWeight: 800, marginBottom: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Explore Deals
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <Link href="/coupons" className="footer-link">All Active Coupons</Link>
              <Link href="/coupons?type=code" className="footer-link">Exclusive Promo Codes</Link>
              <Link href="/coupons?type=free_shipping" className="footer-link">Free Shipping Offers</Link>
              <Link href="/stores" className="footer-link">A-Z Store Directory</Link>
              <Link href="/categories" className="footer-link">Browse Categories</Link>
            </div>
          </div>

          {/* Column: Guides & Reviews */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.86rem', fontWeight: 800, marginBottom: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Reviews &amp; Guides
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <Link href="/reviews" className="footer-link">Store Ratings &amp; Reviews</Link>
              <Link href="/blogs" className="footer-link">Shopping Guides &amp; Tips</Link>
              <Link href="/stores/nike" className="footer-link">Nike Promo Codes</Link>
              <Link href="/stores/amazon" className="footer-link">Amazon Deals</Link>
              <Link href="/stores/sephora" className="footer-link">Sephora Beauty Coupons</Link>
            </div>
          </div>

          {/* Column: Legal & Company */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.86rem', fontWeight: 800, marginBottom: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Company &amp; Legal
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <Link href="/about-us" className="footer-link">About GetMePromos</Link>
              <Link href="/contact-us" className="footer-link">Contact Support</Link>
              <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="footer-link">Terms &amp; Conditions</Link>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom-flex" style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
          color: 'var(--slate-500)',
        }}>
          <p>© {new Date().getFullYear()} GetMePromos.com. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', display: 'inline-block', boxShadow: '0 0 8px #34d399' }}></span>
            Multi-Region Verified Savings Engine.
          </p>
        </div>

      </div>
    </footer>
  );
}
