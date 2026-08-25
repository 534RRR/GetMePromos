import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, Lock, Eye, Cookie, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Affiliate Disclosure | GrabYourDealz',
  description:
    'Read the GrabYourDealz privacy policy, cookie guidelines, data protection standards, and transparent affiliate disclosure.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem', maxWidth: '900px' }}>
      <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy-policy' }]} />

      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-code" style={{ marginBottom: '0.75rem' }}>
          Legal &amp; Compliance
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Privacy Policy &amp; Affiliate Disclosure
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
            1. Introduction &amp; Scope
          </h2>
          <p>
            Welcome to GrabYourDealz (referred to as &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We are committed to safeguarding your privacy and ensuring transparent information practices when you use our website (<code>grabyourdealz.com</code>) and services. This Privacy Policy explains what information we collect, how it is used, and your rights regarding your data.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            2. Affiliate Disclosure (FTC Compliance)
          </h2>
          <p>
            GrabYourDealz is a free online deals and coupon resource supported by affiliate partnerships. When you click on coupon codes, deals, or store links on our website and make a subsequent purchase at the merchant&apos;s site, we may receive an affiliate commission from the retailer at <strong>no extra cost to you</strong>.
          </p>
          <p>
            Our editorial integrity is paramount: our coupon verification processes, store ratings, and review opinions remain independent of affiliate commissions.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            3. Information We Collect
          </h2>
          <p>
            We adhere to strict data minimization principles:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>Non-Personal &amp; Analytical Data:</strong> Browser type, operating system, referring URL, country/region preferences, and anonymized click timestamps.</li>
            <li><strong>IP Addresses:</strong> Processed through one-way cryptographic SHA-256 hashing to prevent duplicate click fraud without identifying individuals.</li>
            <li><strong>Voluntary Submissions:</strong> Your name and email address when you voluntarily contact our support desk or subscribe to our newsletter.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            4. Cookies &amp; Tracking Technologies
          </h2>
          <p>
            We use essential cookies and lightweight analytics cookies to remember your selected geographic region (e.g. US, UK, AU) and track outbound merchant referrals. You may disable cookies at any time through your browser settings without losing access to our core website.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            5. Contact Us Regarding Privacy
          </h2>
          <p>
            For questions or requests regarding your personal information, contact our Data Protection Officer at:
            <br />
            <strong>Email:</strong> <a href="mailto:privacy@grabyourdealz.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>privacy@grabyourdealz.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
