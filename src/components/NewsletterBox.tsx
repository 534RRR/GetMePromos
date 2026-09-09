'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface NewsletterBoxProps {
  title?: string;
  subtitle?: string;
}

export default function NewsletterBox({
  title = 'Get Verified Deals Delivered Weekly',
  subtitle = 'Join 50,000+ smart shoppers and receive our curated weekly digest of tested promo codes and price drops.',
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
    }, 500);
  };

  return (
    <div
      className="newsletter-box"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: 'var(--radius-2xl)',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        color: '#ffffff',
        boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.25)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--slate-800)',
      }}
    >
      {/* Background Radial Glow */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(5, 150, 105, 0.25) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '580px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{
          width: '52px',
          height: '52px',
          background: 'rgba(5, 150, 105, 0.16)',
          color: '#34d399',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          border: '1px solid rgba(5, 150, 105, 0.35)',
          boxShadow: '0 0 20px rgba(5, 150, 105, 0.25)',
        }}>
          <Mail size={24} />
        </div>

        <h2 className="newsletter-title" style={{ fontSize: '2.1rem', fontWeight: 900, marginBottom: '0.85rem', lineHeight: '1.2', letterSpacing: '-0.03em', color: '#ffffff' }}>
          {title}
        </h2>
        <p className="newsletter-subtitle" style={{ color: 'var(--slate-300)', fontSize: '0.96rem', lineHeight: '1.6', marginBottom: '2.25rem' }}>
          {subtitle}
        </p>

        {status === 'success' ? (
          <div style={{
            background: 'rgba(5, 150, 105, 0.2)',
            border: '1px solid #34d399',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            fontWeight: 700,
            fontSize: '0.94rem',
          }}>
            <CheckCircle2 size={22} />
            <span>🎉 Thank you for subscribing! Your first weekly deal roundup is on its way.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-form" style={{
            display: 'flex',
            maxWidth: '480px',
            margin: '0 auto',
            gap: '0.5rem',
            background: '#ffffff',
            padding: '0.4rem',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              style={{
                flex: 1,
                padding: '0.75rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: 'transparent',
                color: 'var(--slate-900)',
                outline: 'none',
                fontSize: '0.94rem',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}
            >
              {status === 'loading' ? 'Subscribing...' : <>Subscribe Free <ArrowRight size={16} /></>}
            </button>
          </form>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', marginTop: '1.5rem', color: 'var(--slate-400)', fontSize: '0.8rem' }}>
          <ShieldCheck size={15} color="#34d399" />
          <span>Zero spam. Unsubscribe at any time with 1 click.</span>
        </div>
      </div>
    </div>
  );
}
