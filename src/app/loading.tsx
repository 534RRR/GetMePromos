export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading RefPromos"
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
        background: '#050807',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <style>{`
        @keyframes refpromos-loader-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes refpromos-loader-pulse {
          0%, 100% { opacity: .45; }
          50% { opacity: 1; }
        }
      `}</style>
      <div style={{ display: 'grid', justifyItems: 'center', gap: '1rem' }}>
        <div
          aria-hidden="true"
          style={{
            width: '42px',
            height: '42px',
            border: '3px solid rgba(255, 255, 255, .18)',
            borderTopColor: '#00e575',
            borderRadius: '50%',
            animation: 'refpromos-loader-spin .8s linear infinite',
          }}
        />
        <span
          style={{
            color: '#00e575',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            animation: 'refpromos-loader-pulse 1.4s ease-in-out infinite',
          }}
        >
          Finding today&apos;s best deals
        </span>
      </div>
    </div>
  );
}