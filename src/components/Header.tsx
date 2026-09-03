'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ChevronDown, Check, CircleDot } from 'lucide-react';
import GlobalSearchModal from './GlobalSearchModal';
import ThemeToggle from './ThemeToggle';

const COUNTRIES = [
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
];

export default function Header() {
  const [selectedCountry, setSelectedCountry] = useState('NL');
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
    const secureFlag = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `gyd_country=${code}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
    setShowCountryMenu(false);
  };

  const currentCountry = COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];

  return (
    <>
      <header className="header-nav">
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem' }}>
          
          {/* Brand Logo with Deal Tag Icon */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px var(--primary-glow)',
              transform: 'rotate(-4deg)',
              flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z" fill="#ffffff" />
                <circle cx="7.5" cy="7.5" r="1.75" fill="var(--primary)" />
              </svg>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-heading)' }}>
                GrabYour<span style={{ color: 'var(--primary)' }}>Dealz</span>
              </span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
            <Link href="/coupons" className="nav-link">Coupons</Link>
            <Link href="/stores" className="nav-link">Stores</Link>
            <Link href="/categories" className="nav-link">Categories</Link>
            <Link href="/blogs" className="nav-link">Guides</Link>
            <Link href="/reviews" className="nav-link">Reviews</Link>
            <Link href="/about-us" className="nav-link">About</Link>
          </nav>

          {/* Right Utility Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
            
            {/* Search Input Trigger (Without Ctrl K badge) */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="btn-secondary header-search-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.55rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--slate-600)',
                cursor: 'pointer',
                fontSize: '0.88rem',
                boxShadow: 'var(--shadow-xs)',
                transition: 'all 0.2s ease',
              }}
              title="Search deals & stores"
            >
              <Search size={16} color="var(--slate-400)" />
              <span className="search-text" style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--slate-600)' }}>Search deals...</span>
            </button>

            {/* Country Selector Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowCountryMenu(!showCountryMenu)}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-heading)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-xs)',
                }}
                title="Select country"
                aria-expanded={showCountryMenu}
              >
                <span>{currentCountry.code}</span>
                <ChevronDown size={14} color="var(--slate-400)" />
              </button>

              {showCountryMenu && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '190px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '0.4rem',
                  zIndex: 100,
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--slate-400)', padding: '0.35rem 0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Select Region
                  </div>
                  {COUNTRIES.map((c) => {
                    const isSelected = selectedCountry === c.code;
                    return (
                      <button
                        key={c.code}
                        onClick={() => handleSelectCountry(c.code)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '0.45rem 0.6rem',
                          background: isSelected ? 'var(--primary-light)' : 'transparent',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '0.85rem',
                          color: isSelected ? 'var(--primary-hover)' : 'var(--text-main)',
                          transition: 'background 0.15s ease',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </span>
                        {isSelected && <Check size={14} color="var(--primary)" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Theme Toggle Button (Light / Dark Switcher) */}
            <ThemeToggle />

            {/* Admin Shortcut Button */}
            <Link
              href="/admin"
              className="btn btn-secondary header-admin-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.86rem',
                fontWeight: 700,
                color: 'var(--text-heading)',
              }}
            >
              <CircleDot size={13} color="var(--primary)" />
              <span className="admin-text">Admin</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-secondary btn-sm mobile-toggle-btn"
              style={{ padding: '0.5rem 0.65rem', borderRadius: 'var(--radius-full)' }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <Link href="/coupons" className="nav-link" onClick={() => setMobileMenuOpen(false)}>🎟️ Promo Codes &amp; Coupons</Link>
            <Link href="/stores" className="nav-link" onClick={() => setMobileMenuOpen(false)}>🏬 All Stores &amp; Brands</Link>
            <Link href="/categories" className="nav-link" onClick={() => setMobileMenuOpen(false)}>📁 Browse Categories</Link>
            <Link href="/blogs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>📖 Shopping Guides</Link>
            <Link href="/reviews" className="nav-link" onClick={() => setMobileMenuOpen(false)}>⭐ Store Reviews &amp; Ratings</Link>
            <Link href="/about-us" className="nav-link" onClick={() => setMobileMenuOpen(false)}>ℹ️ About Us</Link>
            <Link href="/contact-us" className="nav-link" onClick={() => setMobileMenuOpen(false)}>✉️ Contact &amp; Support</Link>
          </div>
        )}
      </header>

      {/* Global Instant Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
