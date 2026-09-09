import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import CouponCard from '@/components/CouponCard';
import StoreCard from '@/components/StoreCard';
import BlogCard from '@/components/BlogCard';
import NewsletterBox from '@/components/NewsletterBox';
import { generateWebsiteSchema, safeJsonLd, SITE_URL } from '@/lib/seo';
import {
  Tag,
  Store,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Search,
  Users,
  Star,
  CheckCircle2,
  Gift,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'RefPromos — Verified Promo Codes, Daily Deals & Discount Vouchers',
  description:
    'Save real money with 100% verified promo codes, exclusive store coupons, and daily sales from over 500+ top online merchants.',
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function HomePage() {
  const featuredCoupons = await prisma.coupon.findMany({
    where: { status: 'active', isFeatured: true },
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: {
      store: {
        select: {
          id: true,
          name: true,
          slug: true,
          logoUrl: true,
          affiliateUrl: true,
        },
      },
    },
  });

  const popularStores = await prisma.store.findMany({
    where: { status: 'active', isPopular: true },
    take: 10,
    orderBy: { ratingScore: 'desc' },
    include: {
      _count: {
        select: { coupons: { where: { status: 'active' } }, deals: true },
      },
    },
  });

  const featuredCategories = await prisma.category.findMany({
    where: { isFeatured: true },
    take: 6,
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: { storeCategories: true },
      },
    },
  });

  const latestBlogs = await prisma.blog.findMany({
    where: { status: 'published' },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    include: {
      category: true,
    },
  });

  const websiteSchema = generateWebsiteSchema();

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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
      />

      {/* =========================================================================
          1. EXACT HERO SECTION (2-Column Split Hero with 3D Deal Tag)
          ========================================================================= */}
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
                  VERIFIED PROMO CODES &amp; DAILY DEALS
                </span>
              </div>

              {/* High-Impact Display Headline */}
              <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                Unlock{' '}
                <span className="hero-gradient-text">Smarter Savings.</span>
                <br />
                Every Day.
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
                Access 50,000+ hand-tested promo codes, discount vouchers, and exclusive savings across 500+ top verified retailers.
              </p>

              {/* Hero Search Box */}
              <form
                action="/coupons"
                method="GET"
                className="hero-search-form"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.45rem 0.5rem 0.45rem 1.4rem',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--border)',
                  maxWidth: '560px',
                  marginBottom: '1.5rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <Search size={20} color="var(--slate-400)" style={{ flexShrink: 0, marginRight: '0.75rem' }} />
                <input
                  type="text"
                  name="search"
                  placeholder="Search stores, brands, or coupon codes..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.96rem',
                    color: 'var(--text-heading)',
                    fontWeight: 500,
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
                  }}
                >
                  Find Deals <ArrowRight size={16} />
                </button>
              </form>

              {/* Trending chips */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Trending:
                </span>
                {trendingSearches.map((chip, idx) => (
                  <Link
                    key={idx}
                    href={chip.href}
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
                  boxShadow: '0 24px 60px -12px var(--primary-glow-strong), 0 10px 30px rgba(0, 0, 0, 0.15)',
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
                <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--hero-pill-text)', fontFamily: 'Space Grotesk, sans-serif' }}>
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
                <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--hero-pill-text)', fontFamily: 'Space Grotesk, sans-serif' }}>
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
            <div
              className="grid grid-cols-4 gap-6 trust-stats-grid"
              style={{ alignItems: 'center' }}
            >
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
                  <Store size={22} />
                </div>
                <div>
                  <div className="trust-stat-value" style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: 1.1 }}>
                    500+
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Verified Retailers
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
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
                  <div className="trust-stat-value" style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: 1.1 }}>
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
                  <Users size={22} />
                </div>
                <div>
                  <div className="trust-stat-value" style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: 1.1 }}>
                    1M+
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Happy Shoppers
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
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
                  <div className="trust-stat-value" style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: 1.1 }}>
                    4.8 / 5
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
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
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
                  href={`/stores/${brand.slug}`}
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
                href="/stores"
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

      {/* =========================================================================
          2. FEATURED OFFERS SECTION
          ========================================================================= */}
      <section className="section-block" style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: '0.65rem' }}>
                <Sparkles size={12} /> Today&apos;s Highlights
              </span>
              <h2 className="section-heading" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-heading)' }}>
                Featured Deals &amp; Exclusive Promo Codes
              </h2>
            </div>
            <Link href="/coupons" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
              View All {featuredCoupons.length * 10}+ Offers <ArrowRight size={14} />
            </Link>
          </div>

          <div
            className="grid grid-cols-3 gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
          >
            {featuredCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon as any} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. POPULAR STORES & RETAILERS
          ========================================================================= */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: '0.65rem' }}>
                <Store size={12} /> Partner Retailers
              </span>
              <h2 className="section-heading" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-heading)' }}>
                Top Stores with Verified Coupons
              </h2>
            </div>
            <Link href="/stores" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
              All Stores Directory <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {popularStores.map((store) => (
              <StoreCard key={store.id} store={store as any} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. POPULAR CATEGORIES
          ========================================================================= */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: '0.65rem' }}>
                <TrendingUp size={12} /> Browse Departments
              </span>
              <h2 className="section-heading" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-heading)' }}>
                Popular Shopping Categories
              </h2>
            </div>
            <Link href="/categories" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
              All Categories <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  textDecoration: 'none',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.25rem' }}>
                    {category.name}
                  </h3>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {category._count.storeCategories} Stores Available
                  </span>
                </div>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    flexShrink: 0,
                  }}
                >
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. EXPERT SHOPPING GUIDES & SAVING TIPS
          ========================================================================= */}
      {latestBlogs.length > 0 && (
        <section style={{ padding: '3.5rem 0' }}>
          <div className="container">
            <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="eyebrow-pill" style={{ marginBottom: '0.65rem' }}>
                  <ShieldCheck size={12} /> Editorial Insights
                </span>
                <h2 className="section-heading" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-heading)' }}>
                  Smart Shopping Guides &amp; Hacks
                </h2>
              </div>
              <Link href="/blogs" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
                Read All Guides <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {latestBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog as any} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          6. NEWSLETTER SUBSCRIPTION
          ========================================================================= */}
      <section style={{ padding: '3.5rem 0 5rem 0' }}>
        <div className="container">
          <NewsletterBox />
        </div>
      </section>
    </main>
  );
}
