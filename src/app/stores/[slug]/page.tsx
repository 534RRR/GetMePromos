import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import RatingStars from '@/components/RatingStars';
import CouponCard from '@/components/CouponCard';
import FaqAccordion from '@/components/FaqAccordion';
import { generateStoreSchema, safeJsonLd, SITE_URL } from '@/lib/seo';
import {
  ExternalLink,
  ShieldCheck,
  Tag,
  Check,
  X,
  Sparkles,
  Info,
  Store as StoreIcon,
} from 'lucide-react';

interface StorePageProps {
  params: Promise<{ slug: string }> | { slug: string };
  searchParams: Promise<{ type?: string }> | { type?: string };
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const params = await Promise.resolve(props.params);
  const store = await prisma.store.findUnique({
    where: { slug: params.slug },
    include: {
      _count: {
        select: { coupons: { where: { status: 'active' } } },
      },
    },
  });

  if (!store) {
    return { title: 'Store Not Found — RefPromos' };
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const count = store._count.coupons;

  const title =
    store.seoTitle ||
    `${store.name} Promo Codes & Coupons (${currentMonth} ${currentYear}) — ${count} Verified Offers`;
  const description =
    store.metaDescription ||
    `Save with ${count} verified ${store.name} discount codes, daily deals, and free shipping promos for ${currentMonth} ${currentYear}. Manually tested today.`;

  return {
    title,
    description,
    alternates: {
      canonical: store.canonicalUrl || `${SITE_URL}/stores/${store.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/stores/${store.slug}`,
      images: [store.logoUrl],
      type: 'website',
    },
  };
}

export default async function StoreDetailPage(props: StorePageProps) {
  const params = await Promise.resolve(props.params);
  const searchParams = (await Promise.resolve(props.searchParams)) || {};
  const currentType = searchParams.type || 'all';

  const store = await prisma.store.findUnique({
    where: { slug: params.slug },
    include: {
      storeCategories: {
        include: { category: true },
      },
      storeCountries: {
        include: { country: true },
      },
      review: true,
      faqs: {
        orderBy: { sortOrder: 'asc' },
      },
      coupons: {
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
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
      },
    },
  });

  if (!store) {
    notFound();
  }

  const primaryCategoryId = store.storeCategories[0]?.categoryId;
  const relatedStores = await prisma.store.findMany({
    where: {
      status: 'active',
      id: { not: store.id },
      ...(primaryCategoryId && {
        storeCategories: {
          some: { categoryId: primaryCategoryId },
        },
      }),
    },
    take: 4,
    include: {
      _count: { select: { coupons: true, deals: true } },
    },
  });

  const activeCoupons = store.coupons.filter((c) => c.status === 'active');
  const expiredCoupons = store.coupons.filter((c) => c.status === 'expired');

  const filteredActiveCoupons = activeCoupons.filter((coupon) => {
    if (currentType === 'codes') return Boolean(coupon.couponCode);
    if (currentType === 'deals') return !coupon.couponCode;
    return true;
  });

  let reviewPros: string[] = [];
  let reviewCons: string[] = [];
  if (store.review) {
    try {
      if (store.review.prosJson) reviewPros = JSON.parse(store.review.prosJson);
      if (store.review.consJson) reviewCons = JSON.parse(store.review.consJson);
    } catch {}
  }

  const storeSchema = generateStoreSchema(
    {
      name: store.name,
      slug: store.slug,
      logoUrl: store.logoUrl,
      shortDescription: store.shortDescription,
      ratingScore: store.ratingScore,
      ratingCount: store.ratingCount,
      merchantUrl: store.merchantUrl,
    },
    activeCoupons
  );

  const defaultFaqs = [
    {
      question: `How many active coupons are available for ${store.name}?`,
      answer: `Currently, there are ${activeCoupons.length} verified discount codes and promotional deals available for ${store.name} on RefPromos.`,
    },
    {
      question: `How do I redeem a ${store.name} promo code?`,
      answer: `Click on 'Get Code' on the offer of your choice. Copy the revealed code and proceed to ${store.name}. Paste the code in the 'Promo Code' or 'Discount' box during checkout to apply your savings.`,
    },
    {
      question: `Does ${store.name} offer free shipping?`,
      answer: `Yes, ${store.name} frequently offers free standard shipping on orders meeting their minimum order threshold. Check our active deals for the latest free delivery promotions.`,
    },
  ];

  const displayFaqs = store.faqs.length > 0 ? store.faqs : defaultFaqs;

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(storeSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Stores', url: '/stores' },
          { name: store.name, url: `/stores/${store.slug}` },
        ]}
      />

      {/* 1. STORE HERO BANNER */}
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border)',
          padding: '2.25rem 2rem',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '90px',
              height: '90px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              background: '#ffffff',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-xs)',
              flexShrink: 0,
            }}
          >
            <img
              src={store.logoUrl}
              alt={store.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em' }}>
                {store.name} Promo Codes
              </h1>
              <span className="badge badge-verified">
                <ShieldCheck size={12} /> Verified Merchant
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <RatingStars score={store.ratingScore} count={store.ratingCount} size={16} />
              <span style={{ color: 'var(--slate-300)' }}>•</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--primary)', fontWeight: 700 }}>
                {activeCoupons.length} Active Offers Today
              </span>
            </div>

            {/* Category and Region Badges */}
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {store.storeCategories.map(({ category }) => (
                <Link key={category.id} href={`/categories/${category.slug}`} className="badge badge-deal">
                  <Tag size={11} /> {category.name}
                </Link>
              ))}
              {store.storeCountries.map(({ country }) => (
                <span key={country.id} className="badge badge-deal">
                  {country.flagIcon} {country.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA to Merchant URL */}
        <div>
          <a
            href={`/out/store/${store.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
            style={{ padding: '0.85rem 1.8rem', fontSize: '0.96rem' }}
          >
            Visit {store.name} <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="store-page-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: ACTIVE OFFERS & EXPIRED ARCHIVE */}
        <div>
          
          {/* Offer Filter Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '1rem',
              marginBottom: '2rem',
            }}
          >
            <Link
              href={`/stores/${store.slug}?type=all`}
              className={`btn btn-sm ${currentType === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontWeight: 700 }}
            >
              All Offers ({activeCoupons.length})
            </Link>
            <Link
              href={`/stores/${store.slug}?type=codes`}
              className={`btn btn-sm ${currentType === 'codes' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontWeight: 700 }}
            >
              Promo Codes ({activeCoupons.filter((c) => Boolean(c.couponCode)).length})
            </Link>
            <Link
              href={`/stores/${store.slug}?type=deals`}
              className={`btn btn-sm ${currentType === 'deals' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontWeight: 700 }}
            >
              Deals &amp; Sales ({activeCoupons.filter((c) => !c.couponCode).length})
            </Link>
          </div>

          {/* Coupons List */}
          {filteredActiveCoupons.length === 0 ? (
            <div
              style={{
                padding: '3.5rem 2rem',
                textAlign: 'center',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)',
                marginBottom: '2rem',
              }}
            >
              <Tag size={40} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.4rem' }}>No offers in this tab</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Select &ldquo;All Offers&rdquo; to view all available discounts.
              </p>
              <Link href={`/stores/${store.slug}`} className="btn btn-primary btn-sm">
                View All {store.name} Offers
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', marginBottom: '3rem' }}>
              {filteredActiveCoupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon as any} />
              ))}
            </div>
          )}

          {/* Recently Expired Coupons */}
          {expiredCoupons.length > 0 && (
            <details
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-2xl)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-xs)',
                marginBottom: '3rem',
              }}
            >
              <summary
                style={{
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  color: 'var(--text-heading)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>🕒 Recently Expired Coupons for {store.name} ({expiredCoupons.length})</span>
              </summary>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                These codes recently expired but might still work on occasion.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', opacity: 0.75 }}>
                {expiredCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon as any} />
                ))}
              </div>
            </details>
          )}

          {/* Store Review & Pros/Cons */}
          {store.review && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-2xl)',
                padding: '2rem',
                boxShadow: 'var(--shadow-card)',
                marginBottom: '3rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-heading)' }}>
                  {store.name} Editorial Review
                </h3>
                <RatingStars score={store.review.rating} size={16} />
              </div>

              <p style={{ color: 'var(--text-main)', fontSize: '0.94rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                {store.review.summary || store.longDescription}
              </p>

              {/* Pros & Cons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {reviewPros.length > 0 && (
                  <div style={{ background: 'var(--primary-light)', border: '1px solid var(--primary-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={16} strokeWidth={3} /> What Shoppers Love
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.86rem' }}>
                      {reviewPros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {reviewCons.length > 0 && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#ef4444', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <X size={16} strokeWidth={3} /> Things to Note
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.86rem' }}>
                      {reviewCons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {store.review.verdict && (
                <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', borderLeft: '3px solid var(--primary)' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-heading)', fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>
                    Editorial Verdict:
                  </span>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                    {store.review.verdict}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Store FAQs */}
          <FaqAccordion
            title={`${store.name} Coupon FAQs`}
            subtitle={`Got questions about redeeming promo codes on ${store.name}? Here are answers to common questions.`}
            faqs={displayFaqs}
          />
        </div>

        {/* RIGHT COLUMN: STORE SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* About Store Card */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-2xl)',
              padding: '1.6rem',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-heading)' }}>
              <Info size={17} color="var(--primary)" /> About {store.name}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              {store.shortDescription || store.longDescription || `${store.name} is a top merchant partner on RefPromos.`}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--border)', paddingTop: '0.95rem', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Official Site:</span>
                <a href={`/out/store/${store.id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  {store.name.toLowerCase().replace(/\s+/g, '')}.com ↗
                </a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Avg Savings:</span>
                <span style={{ fontWeight: 800, color: 'var(--text-heading)' }}>25% OFF</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Active Coupons:</span>
                <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{activeCoupons.length} Active</span>
              </div>
            </div>
          </div>

          {/* Saving Tips */}
          <div
            style={{
              background: 'var(--primary-light)',
              border: '1px solid var(--primary-border)',
              borderRadius: 'var(--radius-2xl)',
              padding: '1.6rem',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} color="var(--primary)" /> Saving Tips for {store.name}
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem', lineHeight: '1.5' }}>
              <li>Copy verified promo codes above prior to payment.</li>
              <li>Look for seasonal clearance events and newsletter signup perks.</li>
              <li>Stack discount codes with free delivery offers when available.</li>
            </ul>
          </div>

          {/* Similar Stores */}
          {relatedStores.length > 0 && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-2xl)',
                padding: '1.6rem',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-heading)' }}>
                <StoreIcon size={17} color="var(--primary)" /> Similar Stores
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {relatedStores.map((relStore) => (
                  <Link
                    key={relStore.id}
                    href={`/stores/${relStore.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.55rem 0.65rem',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                    }}
                    className="hover-bg"
                  >
                    <img
                      src={relStore.logoUrl}
                      alt={relStore.name}
                      style={{ width: '34px', height: '34px', borderRadius: 'var(--radius-sm)', objectFit: 'contain', background: '#ffffff', padding: '3px', border: '1px solid var(--border)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-heading)' }}>
                        {relStore.name}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        {relStore._count.coupons + relStore._count.deals} Offers
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
