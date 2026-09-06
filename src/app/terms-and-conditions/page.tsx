import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms and Conditions | GetMePromos',
  description:
    'Review the terms of service and user agreements for GetMePromos.com.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '880px' }}>
      <Breadcrumbs items={[{ name: 'Terms and Conditions', url: '/terms-and-conditions' }]} />

      <div style={{ marginBottom: '2.5rem' }}>
        <span className="eyebrow-pill" style={{ marginBottom: '0.85rem' }}>
          Terms of Service
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
          Terms and Conditions
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
          Last Updated: August 2026
        </p>
      </div>

      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border)',
          padding: '2.5rem 2.25rem',
          boxShadow: 'var(--shadow-card)',
          fontSize: '1rem',
          lineHeight: '1.75',
          color: 'var(--text-main)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.25rem',
        }}
      >
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or browsing GetMePromos (the &ldquo;Website&rdquo;), you agree to comply with and be bound by these Terms and Conditions. If you disagree with any portion of these terms, please discontinue use of our services immediately.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            2. Nature of Deals &amp; Coupon Codes
          </h2>
          <p style={{ marginBottom: '0.85rem' }}>
            GetMePromos publishes promotional coupons, discount codes, and sales aggregated from merchants and brand partners. While we take rigorous measures to test and verify every offer before publication:
          </p>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <li>Merchant coupon validity, discount percentage, pricing, and expiration dates are subject to change at the sole discretion of the retailer without prior notice.</li>
            <li>We do not guarantee that all third-party discounts will be honored by the merchant at all times.</li>
            <li>All transactions occur directly on the respective merchant&apos;s website. GetMePromos does not process payments or handle order fulfillment.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            3. Intellectual Property Rights
          </h2>
          <p>
            All original content, design layouts, logos, and software code on GetMePromos are protected by international copyright and trademark laws. Third-party brand names, logos, and trademarks (e.g. Nike, Amazon, Sephora) belong to their respective owners and are used solely for identification and referral purposes.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            4. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, GetMePromos and its affiliates shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use any promotional offer listed on the site.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            5. Contact Information
          </h2>
          <p>
            For legal inquiries or notices regarding these terms, please email:
            <br />
            <strong style={{ color: 'var(--text-heading)' }}>Email:</strong> <a href="mailto:legal@getmepromos.com" style={{ color: 'var(--primary)', fontWeight: 700 }}>legal@getmepromos.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
