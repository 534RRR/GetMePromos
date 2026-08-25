import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms and Conditions | GrabYourDealz',
  description:
    'Review the terms of service and user agreements for GrabYourDealz.com.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem', maxWidth: '900px' }}>
      <Breadcrumbs items={[{ name: 'Terms and Conditions', url: '/terms-and-conditions' }]} />

      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-code" style={{ marginBottom: '0.75rem' }}>
          Terms of Service
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Terms and Conditions
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Last Updated: August 25, 2026
        </p>
      </div>

      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-sm)',
          fontSize: '1rem',
          lineHeight: '1.75',
          color: 'var(--text-main)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or browsing GrabYourDealz (the &ldquo;Website&rdquo;), you agree to comply with and be bound by these Terms and Conditions. If you disagree with any portion of these terms, please discontinue use of our services immediately.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            2. Nature of Deals &amp; Coupon Codes
          </h2>
          <p>
            GrabYourDealz publishes promotional coupons, discount codes, and sales aggregated from merchants and brand partners. While we take rigorous measures to test and verify every offer before publication:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Merchant coupon validity, discount percentage, pricing, and expiration dates are subject to change at the sole discretion of the retailer without prior notice.</li>
            <li>We do not guarantee that all third-party discounts will be honored by the merchant at all times.</li>
            <li>All transactions occur directly on the respective merchant&apos;s website. GrabYourDealz does not process payments or handle fulfillment.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            3. Intellectual Property Rights
          </h2>
          <p>
            All original content, design layouts, logos, and software code on GrabYourDealz are protected by international copyright and trademark laws. Third-party brand names, logos, and trademarks (e.g. Nike, Amazon, Sephora) belong to their respective owners and are used solely for identification and referral purposes.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            4. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, GrabYourDealz and its affiliates shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use any promotional offer listed on the site.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            5. Contact Information
          </h2>
          <p>
            For legal inquiries or notices regarding these terms, please email:
            <br />
            <strong>Email:</strong> <a href="mailto:legal@grabyourdealz.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>legal@grabyourdealz.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
