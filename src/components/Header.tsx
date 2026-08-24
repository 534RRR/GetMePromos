'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Globe, Heart, Shield, Menu, X, Tag } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');

  const currentCountry = COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];

  return (
    <header className="header-nav">
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Country Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowCountryMenu(!showCountryMenu)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.65rem' }}
              title="Select your country"
            >
              <span>{currentCountry.flag}</span>
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{currentCountry.code}</span>
            </button>

            {showCountryMenu && (
              <div style={{
                position: 'absolute',
                top: '110%',
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
                    onClick={() => {
                      setSelectedCountry(c.code);
                      setShowCountryMenu(false);
                    }}
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
            <span>Admin CMS</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
