'use client';

import { useEffect, useState } from 'react';

export default function InitialPreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hidePreloader = () => setVisible(false);
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    if (document.readyState === 'complete') {
      hidePreloader();
      document.body.style.overflow = previousOverflow;
      return undefined;
    }

    window.addEventListener('load', hidePreloader, { once: true });
    return () => {
      window.removeEventListener('load', hidePreloader);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading RefPromos"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'grid',
        placeItems: 'center',
        background: '#050807',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <style>{`
        // @keyframes refpromos-initial-spin {
        //   to { transform: rotate(360deg); }
        // }
        @keyframes refpromos-initial-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
      <div style={{ display: 'grid', justifyItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            aria-hidden="true"
            style={{
              width: '42px',
              height: '42px',
              display: 'grid',
              placeItems: 'center',
              background: '#00e575',
              borderRadius: '10px',
              transform: 'rotate(-4deg)',
              boxShadow: '0 4px 18px rgba(0, 229, 117, .3)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z" fill="#050807" />
              <circle cx="7.5" cy="7.5" r="1.75" fill="#00e575" />
            </svg>
          </div>
          <span style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.04em' }}>
            Ref<span style={{ color: '#00e575' }}>Promos</span>
          </span>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: '180px',
            height: '4px',
            overflow: 'hidden',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, .16)',
          }}
        >
          <div
            style={{
              width: '42%',
              height: '100%',
              borderRadius: 'inherit',
              background: '#00e575',
              animation: 'refpromos-initial-progress 1.2s ease-in-out infinite',
            }}
          />
        </div>

        {/* <div
          aria-hidden="true"
          style={{
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255, 255, 255, .2)',
            borderTopColor: '#00e575',
            borderRadius: '50%',
            animation: 'refpromos-initial-spin .8s linear infinite',
          }}
        /> */}
      </div>
    </div>
  );
}