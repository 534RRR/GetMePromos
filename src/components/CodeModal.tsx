'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, X, ThumbsUp, ShieldCheck } from 'lucide-react';

interface ModalData {
  isOpen: boolean;
  couponId: string;
  storeName: string;
  storeLogo: string;
  title: string;
  couponCode?: string | null;
  affiliateUrl: string;
  discountValue: string;
  terms?: string | null;
}

declare global {
  interface Window {
    openCouponModal?: (data: Omit<ModalData, 'isOpen'>) => void;
  }
}

export default function CodeModal() {
  const [modal, setModal] = useState<ModalData>({
    isOpen: false,
    couponId: '',
    storeName: '',
    storeLogo: '',
    title: '',
    couponCode: '',
    affiliateUrl: '',
    discountValue: '',
  });

  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'none' | 'worked' | 'failed'>('none');

  useEffect(() => {
    window.openCouponModal = (data) => {
      setModal({ ...data, isOpen: true });
      setCopied(false);
      setFeedback('none');

      // Automatically open merchant website in a new tab
      if (data.affiliateUrl) {
        window.open(data.affiliateUrl, '_blank', 'noopener,noreferrer');
      }
    };
  }, []);

  if (!modal.isOpen) return null;

  const handleCopy = () => {
    if (modal.couponCode) {
      navigator.clipboard.writeText(modal.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        maxWidth: '520px',
        width: '100%',
        padding: '2rem',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        animation: 'fadeIn 0.25s ease-out',
      }}>
        {/* Close Button */}
        <button
          onClick={() => setModal(prev => ({ ...prev, isOpen: false }))}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-subtle)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Store & Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img
            src={modal.storeLogo}
            alt={modal.storeName}
            style={{
              width: '64px',
              height: '64px',
              objectFit: 'cover',
              borderRadius: 'var(--radius-md)',
              margin: '0 auto 0.75rem auto',
              border: '1px solid var(--border)',
            }}
          />
          <span className="badge badge-verified" style={{ marginBottom: '0.5rem' }}>
            <ShieldCheck size={14} /> Verified Offer
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.35rem' }}>{modal.discountValue}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            {modal.title}
          </p>
        </div>

        {/* Promo Code Box */}
        {modal.couponCode ? (
          <div style={{
            background: '#f8fafc',
            border: '2px dashed var(--primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            textAlign: 'center',
            marginBottom: '1.25rem',
          }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Copy this promo code & paste at checkout:
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.75rem' }}>
              <span style={{
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '1.65rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: 'var(--primary)',
              }}>
                {modal.couponCode}
              </span>
              <button
                onClick={handleCopy}
                className="btn btn-primary"
                style={{ padding: '0.6rem 1.1rem' }}
              >
                {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Code</>}
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'var(--primary-light)',
            color: 'var(--primary-hover)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem',
            textAlign: 'center',
            marginBottom: '1.25rem',
            fontWeight: 600,
          }}>
            🎉 No code required! Your discount has been activated in the store tab.
          </div>
        )}

        {/* Action Button */}
        <a
          href={modal.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
        >
          Continue to {modal.storeName} <ExternalLink size={16} />
        </a>

        {/* Feedback Section */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
        }}>
          <span>Did this coupon work for you?</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setFeedback('worked')}
              className={`btn btn-sm ${feedback === 'worked' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
            >
              <ThumbsUp size={12} /> Yes ({modal.couponCode ? '100%' : '98%'})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
