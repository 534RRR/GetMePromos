import React from 'react';
import Link from 'next/link';
import { Tag, ShieldCheck, Lock, Headphones, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="container">
        
        {/* Trust Badges Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '2.5rem',
          marginBottom: '2.5rem',
          borderBottom: '1px solid #1e293b',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: '#1e293b', padding: '0.65rem', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700 }}>100% Verified Coupons</h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Tested and verified daily by our savings team.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: '#1e293b', padding: '0.65rem', borderRadius: 'var(--radius-md)', color: 'var(--secondary)' }}>
              <Lock size={24} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700 }}>Secure & 100% Free</h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Zero fees, no sign-up required to redeem codes.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: '#1e293b', padding: '0.65rem', borderRadius: 'var(--radius-md)', color: 'var(--accent)' }}>
              <Headphones size={24} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700 }}>Affiliate Transparency</h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>We may earn a small commission on qualifying orders.</p>
            </div>
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          paddingBottom: '3rem',
        }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--primary)', color: '#fff', width: '30px', height: '30px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Tag size={16} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>GrabYour<span style={{ color: 'var(--primary)' }}>Dealz</span></span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#94a3b8', marginBottom: '1rem' }}>
              The multi-region discovery engine for tested coupons, discount promo codes, and daily store deals.
            </p>
          </div>

          {/* Column: About */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>About Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/about-us" className="footer-link">About GrabYourDealz</Link>
              <Link href="/contact-us" className="footer-link">Contact Support</Link>
              <Link href="/terms-and-conditions" className="footer-link">Terms & Conditions</Link>
              <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
            </div>
          </div>

          {/* Column: Coupons */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Coupons</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/coupons" className="footer-link">All Active Coupons</Link>
              <Link href="/coupons?type=coupon_code" className="footer-link">Promo Codes</Link>
              <Link href="/coupons?type=free_shipping" className="footer-link">Free Shipping</Link>
              <Link href="/coupons?sort=expiring" className="footer-link">Expiring Soon</Link>
            </div>
          </div>

          {/* Column: Stores */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top Stores</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/stores/nike" className="footer-link">Nike Coupons</Link>
              <Link href="/stores/amazon" className="footer-link">Amazon Deals</Link>
              <Link href="/stores/asos" className="footer-link">ASOS Promo Codes</Link>
              <Link href="/stores" className="footer-link">A-Z Store Directory</Link>
            </div>
          </div>

          {/* Column: Categories */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/categories/fashion" className="footer-link">Fashion & Apparel</Link>
              <Link href="/categories/electronics" className="footer-link">Electronics & Tech</Link>
              <Link href="/categories/beauty" className="footer-link">Beauty & Skincare</Link>
              <Link href="/categories" className="footer-link">Browse All Categories</Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
        }}>
          <p>© {new Date().getFullYear()} GrabYourDealz.com. All rights reserved.</p>
          <p style={{ color: '#64748b' }}>Designed for Savvy Shoppers Worldwide.</p>
        </div>

      </div>
    </footer>
  );
}
