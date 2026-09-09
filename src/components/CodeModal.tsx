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
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div className="code-modal-content" style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-2xl)',
        maxWidth: '520px',
        width: '100%',
        padding: '2.5rem 2.25rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        animation: 'fadeIn 0.2s ease-out',
        border: '1px solid var(--border)',
      }}>
        {/* Close Button */}
        <button
          onClick={() => setModal(prev => ({ ...prev, isOpen: false }))}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-full)',
            width: '34px',
            height: '34px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            transition: 'all 0.15s ease',
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Store & Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            margin: '0 auto 1rem auto',
            padding: '8px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <img
              src={modal.storeLogo}
              alt={modal.storeName}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          <span className="badge badge-verified" style={{ marginBottom: '0.65rem' }}>
            <ShieldCheck size={13} /> Verified Offer
          </span>
          <h3 className="code-modal-discount" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)', marginTop: '0.4rem', letterSpacing: '-0.03em' }}>
            {modal.discountValue}
          </h3>
          <p style={{ color: 'var(--text-heading)', fontSize: '0.94rem', marginTop: '0.4rem', lineHeight: '1.45', fontWeight: 600 }}>
            {modal.title}
          </p>
        </div>

        {/* Promo Code Box */}
        {modal.couponCode ? (
          <div className="code-modal-code-box" style={{
            background: 'var(--primary-subtle)',
            border: '1.5px dashed var(--primary)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '1.75rem',
          }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Copy this promo code &amp; apply at checkout:
            </p>
            <div className="code-modal-code-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', marginTop: '0.85rem' }}>
              <span className="code-modal-code" style={{
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '1.75rem',
                fontWeight: 900,
                letterSpacing: '0.12em',
                color: 'var(--primary)',
              }}>
                {modal.couponCode}
              </span>
              <button
                onClick={handleCopy}
                className="btn btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
              >
                {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Code</>}
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.1rem',
            textAlign: 'center',
            marginBottom: '1.75rem',
            fontWeight: 700,
            fontSize: '0.94rem',
            border: '1px solid var(--primary-border)',
          }}>
            🎉 No promo code needed! Your discount has been activated in the store tab.
          </div>
        )}

        {/* Action Button */}
        <a
          href={modal.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}
        >
          <span>Continue to {modal.storeName}</span>
          <ExternalLink size={16} />
        </a>

        {/* Feedback Section */}
        <div className="code-modal-feedback" style={{
          paddingTop: '1.1rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.84rem',
          color: 'var(--text-muted)',
        }}>
          <span>Did this code work?</span>
          <button
            onClick={() => setFeedback('worked')}
            className={`btn btn-sm ${feedback === 'worked' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
          >
            <ThumbsUp size={13} /> Yes ({modal.couponCode ? '100%' : '98%'})
          </button>
        </div>
      </div>
    </div>
  );
}
