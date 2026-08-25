'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Shield, Menu, X, Tag, Heart } from 'lucide-react';
import GlobalSearchModal from './GlobalSearchModal';

const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
];

export default function Header() {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [showCountryMenu, setShowCountryMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const savedCountry = localStorage.getItem('gyd_country');
    if (savedCountry) {
      setSelectedCountry(savedCountry);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCountry = (code: string) => {
    setSelectedCountry(code);
    localStorage.setItem('gyd_country', code);
    document.cookie = `gyd_country=${code}; path=/; max-age=31536000`;
    setShowCountryMenu(false);
  };

  const currentCountry = COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];

  return (
    <>
      <header className="header-nav">
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          
          {/* Brand Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              background: 'linear-gradient(135deg, #059669 0%, #4f46e5 100%)',
              color: '#fff',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <Tag size={20} />
            </div>
            <div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
                GrabYour<span style={{ color: 'var(--primary)' }}>Dealz</span>
              </span>
            </div>
          </Link>

          {/* Center Desktop Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
            <Link href="/coupons" className="nav-link">Coupons</Link>
            <Link href="/stores" className="nav-link">Stores</Link>
            <Link href="/categories" className="nav-link">Categories</Link>
            <Link href="/blogs" className="nav-link">Blogs</Link>
            <Link href="/reviews" className="nav-link">Reviews</Link>
            <Link href="/about-us" className="nav-link">About</Link>
          </nav>

          {/* Right Utility Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.85rem',
                color: 'var(--text-muted)',
              }}
              title="Search coupons & stores (Ctrl+K)"
            >
              <Search size={16} />
              <span style={{ display: 'inline-block', fontSize: '0.85rem' }}>Search...</span>
              <kbd style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '0.1rem 0.35rem',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                marginLeft: '0.25rem',
              }}>
                ⌘K
              </kbd>
            </button>

            {/* Country Selector Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowCountryMenu(!showCountryMenu)}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.65rem' }}
                title="Select your country"
              >
                <span>{currentCountry.flag}</span>
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{currentCountry.code}</span>
              </button>

              {showCountryMenu && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '180px',
                  background: '#ffffff',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '0.5rem',
                  zIndex: 100,
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>
                    Select Region
                  </div>
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleSelectCountry(c.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '0.5rem',
                        background: selectedCountry === c.code ? 'var(--primary-light)' : 'transparent',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: selectedCountry === c.code ? 700 : 500,
                        fontSize: '0.88rem',
                        color: selectedCountry === c.code ? 'var(--primary-hover)' : 'var(--text-main)',
                      }}
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin CMS Access */}
            <Link href="/admin" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Shield size={14} />
              <span>Admin</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem', display: 'none' }}
              id="mobile-menu-btn"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: '#ffffff',
            borderTop: '1px solid var(--border)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <Link href="/coupons" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Coupons</Link>
            <Link href="/stores" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Stores</Link>
            <Link href="/categories" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
            <Link href="/blogs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Blogs</Link>
            <Link href="/reviews" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Reviews</Link>
            <Link href="/about-us" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
