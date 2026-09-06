import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy & Affiliate Disclosure | GetMePromos',
  description:
    'Read the GetMePromos privacy policy, cookie guidelines, data protection standards, and transparent affiliate disclosure.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '880px' }}>
      <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy-policy' }]} />

      <div style={{ marginBottom: '2.5rem' }}>
        <span className="eyebrow-pill" style={{ marginBottom: '0.85rem' }}>
          Legal &amp; Compliance
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
          Privacy Policy &amp; Affiliate Disclosure
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
            1. Introduction &amp; Scope
          </h2>
          <p>
            Welcome to GetMePromos (referred to as &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We are committed to safeguarding your privacy and ensuring transparent information practices when you use our website (<code>getmepromos.com</code>) and services. This Privacy Policy explains what information we collect, how it is used, and your rights regarding your data.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            2. Affiliate Disclosure (FTC Compliance)
          </h2>
          <p style={{ marginBottom: '0.85rem' }}>
            GetMePromos is a free online deals and coupon resource supported by affiliate partnerships. When you click on coupon codes, deals, or store links on our website and make a subsequent purchase at the merchant&apos;s site, we may receive an affiliate commission from the retailer at <strong style={{ color: 'var(--primary)' }}>no extra cost to you</strong>.
          </p>
          <p>
            Our editorial integrity is paramount: our coupon verification processes, store ratings, and review opinions remain independent of affiliate commissions.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            3. Information We Collect
          </h2>
          <p style={{ marginBottom: '0.85rem' }}>
            We adhere to strict data minimization principles:
          </p>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <li><strong style={{ color: 'var(--text-heading)' }}>Non-Personal &amp; Analytical Data:</strong> Browser type, operating system, referring URL, country/region preferences, and anonymized click timestamps.</li>
            <li><strong style={{ color: 'var(--text-heading)' }}>IP Addresses:</strong> Processed through one-way cryptographic SHA-256 hashing to prevent duplicate click fraud without identifying individuals.</li>
            <li><strong style={{ color: 'var(--text-heading)' }}>Voluntary Submissions:</strong> Your name and email address when you voluntarily contact our support desk or subscribe to our newsletter.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            4. Cookies &amp; Tracking Technologies
          </h2>
          <p>
            We use essential cookies and lightweight analytics cookies to remember your selected geographic region (e.g. US, UK, AU, NL) and track outbound merchant referrals. You may disable cookies at any time through your browser settings without losing access to our core website.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            5. Your Privacy Rights &amp; Data Erasure (GDPR &amp; CCPA Compliance)
          </h2>
          <p style={{ marginBottom: '0.85rem' }}>
            Under global privacy frameworks including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), you retain full sovereignty over your personal data:
          </p>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1rem' }}>
            <li><strong style={{ color: 'var(--text-heading)' }}>Right to Access:</strong> Request a copy of any personal data or communications held in our systems.</li>
            <li><strong style={{ color: 'var(--text-heading)' }}>Right to Erasure (Right to be Forgotten):</strong> Request the permanent deletion of your email, account records, and associated click telemetry.</li>
            <li><strong style={{ color: 'var(--text-heading)' }}>Right to Opt-Out:</strong> Opt out of marketing digests or telemetry tracking at any time without penalty.</li>
          </ul>
          <p>
            To initiate an automated data deletion request, you can submit an erasure request to our privacy endpoint at <code>/api/privacy/delete-data</code> with your registered email, or email our Data Protection Desk directly at <a href="mailto:privacy@getmepromos.com" style={{ color: 'var(--primary)', fontWeight: 700 }}>privacy@getmepromos.com</a>. Requests are processed within 48 hours.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            6. Data Security &amp; Storage Architecture
          </h2>
          <p>
            We implement defense-in-depth security measures to protect user telemetry and credentials:
          </p>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: '0.65rem' }}>
            <li><strong style={{ color: 'var(--text-heading)' }}>Salted Hashing:</strong> Raw visitor IP addresses are never saved to disk; they are immediately hashed using SHA-256 with an isolated server-side salt.</li>
            <li><strong style={{ color: 'var(--text-heading)' }}>Password Encryption:</strong> All staff and administrator passwords use bcrypt hashing with a minimum work factor of 10. Plaintext passwords are never logged, stored, or transmitted.</li>
            <li><strong style={{ color: 'var(--text-heading)' }}>Secure Cookies:</strong> Session tokens are stored exclusively in HTTP-only, Secure, SameSite cookies inaccessible to client-side scripts. Client-side local storage contains zero personal identifying information (PII).</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
            7. Contact Us Regarding Privacy
          </h2>
          <p>
            For questions, data access inquiries, or deletion requests regarding your personal information, contact our Data Protection Officer at:
            <br />
            <strong style={{ color: 'var(--text-heading)' }}>Email:</strong> <a href="mailto:privacy@getmepromos.com" style={{ color: 'var(--primary)', fontWeight: 700 }}>privacy@getmepromos.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
