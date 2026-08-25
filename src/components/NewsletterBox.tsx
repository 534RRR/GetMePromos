'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface NewsletterBoxProps {
  title?: string;
  subtitle?: string;
}

export default function NewsletterBox({
  title = 'Get Exclusive Deals Delivered to Your Inbox',
  subtitle = 'Join 50,000+ smart shoppers and never miss a verified promo code, flash sale, or clearance alert.',
}: NewsletterBoxProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        color: '#ffffff',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{
          width: '52px',
          height: '52px',
          background: 'rgba(16, 185, 129, 0.15)',
          color: '#34d399',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto',
        }}>
          <Mail size={26} />
        </div>

        <h2 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: '1.2' }}>
          {title}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.5', marginBottom: '2rem' }}>
          {subtitle}
        </p>

        {status === 'success' ? (
          <div style={{
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid #059669',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            fontWeight: 600,
          }}>
            <CheckCircle2 size={20} />
            <span>🎉 Thank you for subscribing! Check your inbox for your first weekly deal roundup.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', maxWidth: '480px', margin: '0 auto', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              style={{
                flex: 1,
                minWidth: '240px',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #334155',
                background: '#0f172a',
                color: '#ffffff',
                outline: 'none',
                fontSize: '0.95rem',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn btn-primary btn-lg"
              style={{ padding: '0.85rem 1.75rem', whiteSpace: 'nowrap' }}
            >
              {status === 'loading' ? 'Subscribing...' : <>Subscribe Free <ArrowRight size={16} /></>}
            </button>
          </form>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem', color: '#64748b', fontSize: '0.78rem' }}>
          <ShieldCheck size={14} />
          <span>Zero spam. Unsubscribe at any time with 1 click.</span>
        </div>
      </div>
    </div>
  );
}
