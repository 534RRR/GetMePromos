'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Store, Tag, Folder, BookOpen, ArrowRight, Loader2 } from 'lucide-react';

interface SearchResult {
  stores: Array<{
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
    ratingScore: number;
    _count: { coupons: number; deals: number };
  }>;
  coupons: Array<{
    id: string;
    title: string;
    discountValue: string;
    couponCode?: string | null;
    store: { name: string; slug: string; logoUrl: string };
  }>;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    icon?: string | null;
  }>;
  blogs: Array<{
    id: string;
    title: string;
    slug: string;
    readingTime: string;
    featuredImage?: string | null;
  }>;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults(null);
    }
  }, [isOpen]);

  // Debounced search query
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error('Search fetch error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  const hasAnyResults = results && (
    results.stores.length > 0 ||
    results.coupons.length > 0 ||
    results.categories.length > 0 ||
    results.blogs.length > 0
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '5rem 1rem 2rem 1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '640px',
          width: '100%',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border)',
            gap: '0.75rem',
          }}
        >
          <Search size={22} color="var(--primary)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search stores, coupons, categories, blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'Enter' && query) {
                handleSelect(`/coupons?search=${encodeURIComponent(query)}`);
              }
            }}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              color: 'var(--text-main)',
            }}
          />
          {loading && <Loader2 size={18} className="animate-spin" color="var(--text-muted)" />}
          {query && !loading && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={18} />
            </button>
          )}
          <kbd
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.2rem 0.45rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '1rem' }}>
          {!query && (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>Type to search brands, promo codes, or guides</p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <span className="badge" style={{ cursor: 'pointer' }} onClick={() => setQuery('Nike')}>Nike</span>
                <span className="badge" style={{ cursor: 'pointer' }} onClick={() => setQuery('Amazon')}>Amazon</span>
                <span className="badge" style={{ cursor: 'pointer' }} onClick={() => setQuery('Fashion')}>Fashion</span>
                <span className="badge" style={{ cursor: 'pointer' }} onClick={() => setQuery('Electronics')}>Electronics</span>
              </div>
            </div>
          )}

          {query && !loading && !hasAnyResults && (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p style={{ fontSize: '0.85rem' }}>Try searching by brand name, discount value, or category.</p>
            </div>
          )}

          {results && hasAnyResults && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Stores */}
              {results.stores.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Store size={14} /> Stores ({results.stores.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {results.stores.map((store) => (
                      <div
                        key={store.id}
                        onClick={() => handleSelect(`/stores/${store.slug}`)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          background: 'transparent',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <img
                            src={store.logoUrl}
                            alt={store.name}
                            style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }}
                          />
                          <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                            {store.name}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>
                          {store._count.coupons + store._count.deals} Offers ➔
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coupons */}
              {results.coupons.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Tag size={14} /> Coupons & Deals ({results.coupons.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {results.coupons.map((coupon) => (
                      <div
                        key={coupon.id}
                        onClick={() => handleSelect(`/stores/${coupon.store.slug}`)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', overflow: 'hidden' }}>
                          <span className="badge badge-code" style={{ flexShrink: 0 }}>
                            {coupon.discountValue}
                          </span>
                          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {coupon.title} ({coupon.store.name})
                          </span>
                        </div>
                        <ArrowRight size={14} color="var(--text-muted)" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {results.categories.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Folder size={14} /> Categories ({results.categories.length})
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {results.categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelect(`/categories/${cat.slug}`)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
                      >
                        {cat.name} ➔
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs */}
              {results.blogs.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <BookOpen size={14} /> Shopping Guides ({results.blogs.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {results.blogs.map((blog) => (
                      <div
                        key={blog.id}
                        onClick={() => handleSelect(`/blogs/${blog.slug}`)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                          {blog.title}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{blog.readingTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            background: 'var(--bg-subtle)',
            padding: '0.65rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <span>Press <strong>Enter</strong> to see all results</span>
          <span><strong>GrabYourDealz</strong> Global Instant Search</span>
        </div>
      </div>
    </div>
  );
}
