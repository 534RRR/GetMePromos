'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Folder, BookOpen, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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
    }, 180);

    return () => clearTimeout(timeout);
  }, [query]);

  const { formatRegionLink } = useLanguage();

  if (!isOpen) return null;

  const handleSelect = (url: string) => {
    onClose();
    const finalUrl = formatRegionLink(url);
    router.push(finalUrl);
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
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '5rem 1rem 2rem 1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-2xl)',
          maxWidth: '640px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out',
          border: '1px solid var(--border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1.2rem 1.4rem',
            borderBottom: '1px solid var(--border)',
            gap: '0.85rem',
          }}
        >
          <Search size={22} color="var(--primary)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search stores, coupons, categories, guides..."
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
              color: 'var(--text-heading)',
              background: 'transparent',
              fontWeight: 600,
            }}
          />
          {loading && <Loader2 size={18} className="animate-spin" color="var(--primary)" />}
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ color: 'var(--text-muted)', padding: '0.25rem', cursor: 'pointer' }}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '440px', overflowY: 'auto', padding: '0.85rem' }}>
          {query.length >= 2 && !loading && !hasAnyResults && (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-heading)' }}>No results found for &ldquo;{query}&rdquo;</p>
              <p style={{ fontSize: '0.84rem', marginTop: '0.35rem' }}>Try searching for a brand like Nike, Amazon, or a category like Fashion.</p>
            </div>
          )}

          {results && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Stores Results */}
              {results.stores.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', padding: '0.35rem 0.65rem' }}>
                    Stores ({results.stores.length})
                  </div>
                  {results.stores.map((store) => (
                    <button
                      key={store.id}
                      onClick={() => handleSelect(`/stores/${store.slug}`)}
                      className="hover-bg"
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.6rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'left',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={store.logoUrl}
                          alt={store.name}
                          style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'contain', background: '#ffffff', padding: '3px', border: '1px solid var(--border)' }}
                        />
                        <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-heading)' }}>{store.name}</span>
                      </div>
                      <span className="badge badge-code" style={{ fontSize: '0.72rem' }}>
                        {store._count ? store._count.coupons + store._count.deals : 0} Deals
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Coupons Results */}
              {results.coupons.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', padding: '0.35rem 0.65rem' }}>
                    Coupons &amp; Deals ({results.coupons.length})
                  </div>
                  {results.coupons.map((coupon) => (
                    <button
                      key={coupon.id}
                      onClick={() => handleSelect(`/stores/${coupon.store.slug}`)}
                      className="hover-bg"
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.6rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'left',
                        gap: '0.75rem',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                        <span style={{ fontWeight: 900, color: 'var(--primary)', fontSize: '0.88rem', flexShrink: 0 }}>
                          {coupon.discountValue}
                        </span>
                        <span style={{ fontSize: '0.88rem', color: 'var(--text-main)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 600 }}>
                          {coupon.title}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                        {coupon.store.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Categories Results */}
              {results.categories.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', padding: '0.35rem 0.65rem' }}>
                    Categories ({results.categories.length})
                  </div>
                  {results.categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelect(`/categories/${cat.slug}`)}
                      className="hover-bg"
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'left',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <Folder size={18} color="var(--primary)" />
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>{cat.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Blogs Results */}
              {results.blogs.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', padding: '0.35rem 0.65rem' }}>
                    Shopping Guides ({results.blogs.length})
                  </div>
                  {results.blogs.map((blog) => (
                    <button
                      key={blog.id}
                      onClick={() => handleSelect(`/blogs/${blog.slug}`)}
                      className="hover-bg"
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.6rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'left',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <BookOpen size={18} color="var(--primary)" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>{blog.title}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{blog.readingTime}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!query && (
            <div style={{ padding: '1.25rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
              <p style={{ fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.65rem', fontSize: '0.88rem' }}>Popular Searches:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {['Nike', 'Amazon', 'ASOS', 'Fashion', 'Electronics', 'Free Shipping'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={{
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div style={{
          padding: '0.75rem 1.25rem',
          background: 'var(--bg-subtle)',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
        }}>
          <span>Press <kbd style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '0.1rem 0.35rem', borderRadius: '4px', color: 'var(--text-main)' }}>ESC</kbd> to exit</span>
          <span>Press <kbd style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '0.1rem 0.35rem', borderRadius: '4px', color: 'var(--text-main)' }}>↵</kbd> to search all</span>
        </div>
      </div>
    </div>
  );
}
