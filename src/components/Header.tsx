'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ChevronDown, Check, Globe } from 'lucide-react';
import GlobalSearchModal from './GlobalSearchModal';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { currentRegion, changeRegion, t, regions, formatRegionLink } = useLanguage();
  const [showCountryMenu, setShowCountryMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const countryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (countryMenuRef.current && !countryMenuRef.current.contains(e.target as Node)) {
        setShowCountryMenu(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectCountry = (code: string) => {
    changeRegion(code);
    setShowCountryMenu(false);
    // Force a full page reload so ALL content reflects the new region/language
    // We'll let changeRegion set the cookie first, then navigate
  };


  return (
    <>
      <header className="header-nav">
        <div
          className="container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
          }}
        >
          {/* Brand Logo — always navigates to root '/' and strips any region slug */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              // Comprehensive cleanup of Google Translate cookies
              const host = window.location.hostname;
              const domains = ['', host, `.${host}`];
              const paths = ['/', '/en'];
              domains.forEach((d) => {
                paths.forEach((p) => {
                  const domainAttr = d ? `; domain=${d}` : '';
                  const pathAttr = p ? `; path=${p}` : '; path=/';
                  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC${pathAttr}${domainAttr}`;
                });
              });
              // Reset stored region to US / English
              localStorage.setItem('gmp_country', 'US');
              document.cookie = 'gmp_country=US; path=/; max-age=31536000; SameSite=Lax;';

              if (window.location.pathname === '/' && !window.location.search && !window.location.hash) {
                window.location.reload();
              } else {
                window.location.href = '/';
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
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
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z"
                  fill="#ffffff"
                />
                <circle cx="7.5" cy="7.5" r="1.75" fill="var(--primary)" />
              </svg>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                className="header-logo-text"
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                }}
              >
                Ref<span style={{ color: 'var(--primary)' }}>Promos</span>
              </span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
            <Link href={formatRegionLink('/coupons')} className="nav-link">
              {t('nav_coupons')}
            </Link>
            <Link href={formatRegionLink('/stores')} className="nav-link">
              {t('nav_stores')}
            </Link>
            <Link href={formatRegionLink('/categories')} className="nav-link">
              {t('nav_categories')}
            </Link>
            <Link href={formatRegionLink('/blogs')} className="nav-link">
              {t('nav_guides')}
            </Link>
            <Link href={formatRegionLink('/reviews')} className="nav-link">
              {t('nav_reviews')}
            </Link>
            <Link href={formatRegionLink('/about-us')} className="nav-link">
              {t('nav_about')}
            </Link>
          </nav>

          {/* Right Utility Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
            {/* Search Input Trigger */}
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
              <span className="search-text" style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--slate-600)' }}>
                {t('search_placeholder')}
              </span>
            </button>

            {/* Country Selector Dropdown */}
            <div style={{ position: 'relative' }} ref={countryMenuRef}>
              <button
                onClick={() => setShowCountryMenu(!showCountryMenu)}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
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
                title={t('select_region')}
                aria-expanded={showCountryMenu}
              >
                <Globe size={15} color="var(--primary)" />
                <span>{currentRegion.name}</span>
                <ChevronDown size={14} color="var(--slate-400)" />
              </button>

              {showCountryMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '180px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '0.45rem',
                    zIndex: 100,
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--slate-400)',
                      padding: '0.35rem 0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {t('select_region')}
                  </div>
                  {regions.map((c) => {
                    const isSelected = currentRegion.code === c.code;
                    return (
                      <button
                        key={c.code}
                        onClick={() => handleSelectCountry(c.code)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '0.5rem 0.75rem',
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
                        <span>{c.name}</span>
                        {isSelected && <Check size={14} color="var(--primary)" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />

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
          <div
            style={{
              background: 'var(--bg-card)',
              borderTop: '1px solid var(--border)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <Link
              href={formatRegionLink('/coupons')}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              🎟️ {t('nav_coupons')}
            </Link>
            <Link
              href={formatRegionLink('/stores')}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏬 {t('nav_stores')}
            </Link>
            <Link
              href={formatRegionLink('/categories')}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              📁 {t('nav_categories')}
            </Link>
            <Link
              href={formatRegionLink('/blogs')}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              📖 {t('nav_guides')}
            </Link>
            <Link
              href={formatRegionLink('/reviews')}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              ⭐ {t('nav_reviews')}
            </Link>
            <Link
              href={formatRegionLink('/about-us')}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              ℹ️ {t('nav_about')}
            </Link>
            <Link
              href={formatRegionLink('/contact-us')}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✉️ {t('nav_contact')}
            </Link>
          </div>
        )}
      </header>

      {/* Global Instant Search Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
