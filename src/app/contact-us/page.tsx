'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Mail, MessageSquare, ShieldCheck, CheckCircle2, Send, Clock, MapPin } from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      <Breadcrumbs items={[{ name: 'Contact Us', url: '/contact-us' }]} />

      {/* Header */}
      <div style={{ maxWidth: '700px', marginBottom: '3rem' }}>
        <span className="badge badge-code" style={{ marginBottom: '0.75rem' }}>
          Get In Touch
        </span>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          We&apos;d Love to Hear From You
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          Have a question about a discount code, want to submit a merchant deal, or explore an affiliate partnership? Send us a message.
        </p>
      </div>

      {/* 2-Column Contact Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
        
        {/* Contact Form */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '60px', height: '60px', background: '#ecfdf5', color: '#059669', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Message Sent Successfully!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Thank you for reaching out to GrabYourDealz. Our support team typically replies within 24 business hours.
              </p>
              <button onClick={() => setStatus('idle')} className="btn btn-primary">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    outline: 'none',
                    fontSize: '0.95rem',
                    background: '#ffffff',
                  }}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Report Broken Coupon">Report an Expired / Broken Coupon</option>
                  <option value="Merchant Partnership">Merchant / Brand Partnership</option>
                  <option value="Press / Editorial">Press / Editorial Inquiry</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your question or feedback..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    outline: 'none',
                    fontSize: '0.95rem',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {errorMessage && (
                <div style={{ color: '#ef4444', fontSize: '0.88rem', fontWeight: 600 }}>
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary btn-lg"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
              >
                {status === 'loading' ? 'Sending...' : <>Send Message <Send size={16} /></>}
              </button>
            </form>
          )}
        </div>

        {/* Info Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={20} color="var(--primary)" /> Email Support
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
              Direct email for general questions and customer support:
            </p>
            <a href="mailto:support@grabyourdealz.com" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>
              support@grabyourdealz.com
            </a>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="#4f46e5" /> Response Times
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
              Our editorial and verification desk operates Monday through Friday, 9:00 AM – 6:00 PM EST. Inquiries are reviewed in the order received.
            </p>
          </div>

          <div style={{ background: 'var(--primary-light)', border: '1px solid #a7f3d0', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#065f46', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} color="#059669" /> For Merchant Partners
            </h3>
            <p style={{ color: '#047857', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
              Want your brand listed on GrabYourDealz or wish to provide exclusive discount codes for our community? Contact <strong style={{ textDecoration: 'underline' }}>partners@grabyourdealz.com</strong>.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
