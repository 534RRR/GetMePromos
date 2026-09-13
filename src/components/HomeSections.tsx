'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Store, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedCategoryName } from '@/lib/translations';
import CouponCard from '@/components/CouponCard';
import StoreCard from '@/components/StoreCard';
import BlogCard from '@/components/BlogCard';
import NewsletterBox from '@/components/NewsletterBox';

interface HomeSectionsProps {
  featuredCoupons: any[];
  popularStores: any[];
  featuredCategories: any[];
  latestBlogs: any[];
}

export default function HomeSections({
  featuredCoupons,
  popularStores,
  featuredCategories,
  latestBlogs,
}: HomeSectionsProps) {
  const { t, currentLang, formatRegionLink } = useLanguage();

  return (
    <>
      {/* =========================================================================
          2. FEATURED OFFERS SECTION
          ========================================================================= */}
      <section className="section-block" style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: '0.65rem' }}>
                <Sparkles size={12} /> {t('section_highlights_badge')}
              </span>
              <h2
                className="section-heading"
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                }}
              >
                {t('section_featured_deals_title')}
              </h2>
            </div>
            <Link
              href={formatRegionLink('/coupons')}
              className="btn btn-secondary btn-sm"
              style={{ fontWeight: 700 }}
            >
              {t('view_all_offers')} {featuredCoupons.length * 10}+ <ArrowRight size={14} />
            </Link>
          </div>

          <div
            className="grid grid-cols-3 gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
          >
            {featuredCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. POPULAR STORES & RETAILERS
          ========================================================================= */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: '0.65rem' }}>
                <Store size={12} /> {t('section_partner_retailers')}
              </span>
              <h2
                className="section-heading"
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                }}
              >
                {t('section_top_stores_title')}
              </h2>
            </div>
            <Link
              href={formatRegionLink('/stores')}
              className="btn btn-secondary btn-sm"
              style={{ fontWeight: 700 }}
            >
              {t('all_stores_directory')} <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(195px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {popularStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. POPULAR CATEGORIES
          ========================================================================= */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: '0.65rem' }}>
                <TrendingUp size={12} /> {t('section_browse_departments')}
              </span>
              <h2
                className="section-heading"
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                }}
              >
                {t('section_popular_categories_title')}
              </h2>
            </div>
            <Link
              href={formatRegionLink('/categories')}
              className="btn btn-secondary btn-sm"
              style={{ fontWeight: 700 }}
            >
              {t('all_categories')} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={formatRegionLink(`/categories/${category.slug}`)}
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
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: 'var(--text-heading)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {getLocalizedCategoryName(category.name, currentLang)}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--text-muted)',
                      fontWeight: 600,
                    }}
                  >
                    {category._count.storeCategories} {t('stores_available')}
                  </span>
                </div>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
          5. EDITORIAL GUIDES & TIPS
          ========================================================================= */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: '0.65rem' }}>
                <Sparkles size={12} /> {t('section_editorial_insights')}
              </span>
              <h2
                className="section-heading"
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                }}
              >
                {t('section_smart_guides_title')}
              </h2>
            </div>
            <Link
              href={formatRegionLink('/blogs')}
              className="btn btn-secondary btn-sm"
              style={{ fontWeight: 700 }}
            >
              {t('read_all_guides')} <ArrowRight size={14} />
            </Link>
          </div>

          <div
            className="grid grid-cols-3 gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
          >
            {latestBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. NEWSLETTER SUBSCRIPTION
          ========================================================================= */}
      <section style={{ padding: '2rem 0 5rem 0' }}>
        <div className="container">
          <NewsletterBox />
        </div>
      </section>
    </>
  );
}
