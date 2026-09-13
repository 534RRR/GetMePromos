'use client';

import React from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Gift,
  ShieldCheck,
  Tag,
  Store,
  Star,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeHero() {
  const { currentRegion, t, formatRegionLink } = useLanguage();

  const trendingSearches = [
    { label: 'Nike 20% Off', href: '/stores/nike' },
    { label: 'Amazon Promo Codes', href: '/stores/amazon' },
    { label: 'Sephora Beauty Deals', href: '/stores/sephora' },
    { label: 'Apple Student Discount', href: '/stores/apple' },
    { label: 'ASOS Summer Sale', href: '/stores/asos' },
  ];

  const brandLogos = [
    { name: 'NIKE', slug: 'nike' },
    { name: 'amazon', slug: 'amazon' },
    { name: 'SEPHORA', slug: 'sephora' },
    { name: 'asos', slug: 'asos' },
    { name: 'Apple', slug: 'apple' },
    { name: 'PUMA', slug: 'puma' },
    { name: 'SAMSUNG', slug: 'samsung' },
    { name: 'BEST BUY', slug: 'best-buy' },
  ];

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        padding: '3.5rem 0 3rem 0',
        overflow: 'hidden',
        background: 'var(--hero-bg-gradient)',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* HERO TOP: 2-Column Split */}
        <div
          className="hero-split-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.95fr)',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '3.5rem',
          }}
        >
          {/* LEFT COLUMN: Eyebrow, Headline, Subtitle, Search Pill, Trending */}
          <div>
            {/* Eyebrow badge */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span
                className="eyebrow-pill"
                style={{
                  boxShadow: '0 2px 8px var(--primary-glow)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <CheckCircle2 size={14} color="var(--primary)" />
                {t('hero_badge')}
              </span>
            </div>

            {/* High-Impact Display Headline */}
            <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
              {t('hero_title_1')}{' '}
              <span className="hero-gradient-text">{t('hero_title_2')}</span>
              <br />
              {t('hero_title_3')}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '1.12rem',
                color: 'var(--text-muted)',
                lineHeight: '1.65',
                maxWidth: '540px',
                marginBottom: '2rem',
                fontWeight: 400,
              }}
            >
              {t('hero_desc')}
            </p>

            {/* Hero Search Box */}
            <form
              action={formatRegionLink('/coupons')}
              method="GET"
              className="hero-search-form"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-full)',
                padding: '0.45rem 0.55rem 0.45rem 1.5rem',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border)',
                maxWidth: '680px',
                marginBottom: '1.5rem',
                transition: 'all 0.2s ease',
              }}
            >
              <Search
                size={20}
                color="var(--slate-400)"
                style={{ flexShrink: 0 }}
              />
              <input
                type="text"
                name="search"
                className="hero-search-input"
                placeholder={t('hero_search_input')}
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                  fontSize: '0.95rem',
                  color: 'var(--text-heading)',
                  fontWeight: 500,
                  paddingRight: '1rem',
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: '0.75rem 1.6rem',
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-full)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                {t('hero_btn_find')} <ArrowRight size={16} />
              </button>
            </form>

            {/* Trending chips */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--slate-400)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {t('hero_trending')}
              </span>
              {trendingSearches.map((chip, idx) => (
                <Link
                  key={idx}
                  href={formatRegionLink(chip.href)}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: 'var(--shadow-xs)',
                    transition: 'all 0.18s ease',
                  }}
                  className="hover-bg"
                >
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Glowing Emerald Deal Tag Graphic & Floating Badges */}
          <div
            className="hero-right-col"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '440px',
            }}
          >
            {/* Radial glow aura */}
            <div
              className="hero-glow-aura"
              style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                background: 'var(--hero-tag-glow)',
                filter: 'blur(35px)',
                pointerEvents: 'none',
              }}
            />

            {/* 3D Floating Tag Render */}
            <div
              className="hero-tag-image"
              style={{
                position: 'relative',
                width: '360px',
                height: '360px',
                borderRadius: 'var(--radius-2xl)',
                overflow: 'hidden',
                boxShadow:
                  '0 24px 60px -12px var(--primary-glow-strong), 0 10px 30px rgba(0, 0, 0, 0.15)',
                animation: 'floatTag 5s ease-in-out infinite',
                border: '1px solid var(--border)',
              }}
            >
              <img
                src="/images/hero-tag.jpg"
                alt="3D Glowing Emerald Discount Ticket"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Floating Glass Discount Pill 1 (Top Left) */}
            <div
              style={{
                position: 'absolute',
                top: '12%',
                left: '-4%',
                background: 'var(--hero-pill-bg)',
                border: '1px solid var(--hero-pill-border)',
                backdropFilter: 'blur(16px)',
                padding: '0.6rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                animation: 'floatTag 4s ease-in-out infinite 0.5s',
              }}
            >
              <span
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: 'var(--hero-pill-text)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                25% OFF
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Sitewide
              </span>
            </div>

            {/* Floating Glass Discount Pill 2 (Top Right) */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                right: '-6%',
                background: 'var(--hero-pill-bg)',
                border: '1px solid var(--hero-pill-border)',
                backdropFilter: 'blur(16px)',
                padding: '0.65rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                animation: 'floatTag 4.5s ease-in-out infinite 1.2s',
              }}
            >
              <Sparkles size={16} color="var(--primary)" />
              <span
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: 'var(--hero-pill-text)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                40% OFF
              </span>
            </div>

            {/* Floating Glass Discount Pill 3 (Bottom Right) */}
            <div
              style={{
                position: 'absolute',
                bottom: '8%',
                right: '0%',
                background: 'var(--hero-pill-bg)',
                border: '1px solid var(--hero-pill-border)',
                backdropFilter: 'blur(16px)',
                padding: '0.55rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                animation: 'floatTag 3.8s ease-in-out infinite 0.8s',
              }}
            >
              <Gift size={15} color="var(--primary)" />
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--hero-pill-text)' }}>
                15% OFF + Free Ship
              </span>
            </div>
          </div>
        </div>

        {/* 4-COLUMN TRUST STATS BAR */}
        <div
          className="trust-stats-bar"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-2xl)',
            padding: '1.75rem 2rem',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '3rem',
          }}
        >
          <div className="grid grid-cols-4 gap-6 trust-stats-grid" style={{ alignItems: 'center' }}>
            {/* Stat 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                className="trust-stat-icon"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                  border: '1px solid var(--primary-border)',
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <div
                  className="trust-stat-value"
                  style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: 1.1 }}
                >
                  100%
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Verified Coupons
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                className="trust-stat-icon"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                  border: '1px solid var(--primary-border)',
                }}
              >
                <Tag size={22} />
              </div>
              <div>
                <div
                  className="trust-stat-value"
                  style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: 1.1 }}
                >
                  50,000+
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Promo Codes
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                className="trust-stat-icon"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                  border: '1px solid var(--primary-border)',
                }}
              >
                <Store size={22} />
              </div>
              <div>
                <div
                  className="trust-stat-value"
                  style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: 1.1 }}
                >
                  500+
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Top Brands
                </div>
              </div>
            </div>

            {/* Stat 4 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                className="trust-stat-icon"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                  border: '1px solid var(--primary-border)',
                }}
              >
                <Star size={22} />
              </div>
              <div>
                <div
                  className="trust-stat-value"
                  style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: 1.1 }}
                >
                  4.9 / 5
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  User Rating
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL PROOF BRAND LOGO STRIP */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1.25rem',
            }}
          >
            Trusted by shoppers of top brands
          </div>

          <div
            className="brand-logo-strip"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            {brandLogos.map((brand, idx) => (
              <Link
                key={idx}
                href={formatRegionLink(`/stores/${brand.slug}`)}
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                }}
                className="brand-logo-item hover-bg"
              >
                {brand.name}
              </Link>
            ))}
            <Link
              href={formatRegionLink('/stores')}
              style={{
                fontSize: '0.86rem',
                fontWeight: 800,
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              +500 more <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
