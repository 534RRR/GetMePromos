import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import RatingStars from '@/components/RatingStars';
import CouponCard from '@/components/CouponCard';
import FaqAccordion from '@/components/FaqAccordion';
import StoreCard from '@/components/StoreCard';
import { generateStoreSchema, SITE_URL } from '@/lib/seo';
import {
  ExternalLink,
  ShieldCheck,
  Tag,
  Clock,
  Check,
  X,
  Sparkles,
  Info,
  HelpCircle,
  ThumbsUp,
  Store as StoreIcon,
  ChevronDown,
} from 'lucide-react';

interface StorePageProps {
  params: { slug: string };
  searchParams: { type?: string };
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const store = await prisma.store.findUnique({
    where: { slug: params.slug },
    include: {
      _count: {
        select: { coupons: { where: { status: 'active' } } },
      },
    },
  });

  if (!store) {
    return { title: 'Store Not Found — GrabYourDealz' };
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

export default async function StoreDetailPage({ params, searchParams }: StorePageProps) {
  const currentType = searchParams.type || 'all';

  // 1. Fetch store with relations
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

  // 2. Fetch related stores in same category
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

  // Separate active and expired coupons
  const activeCoupons = store.coupons.filter((c) => c.status === 'active');
  const expiredCoupons = store.coupons.filter((c) => c.status === 'expired');

  // Filter active coupons by tab
  const filteredActiveCoupons = activeCoupons.filter((coupon) => {
    if (currentType === 'codes') return Boolean(coupon.couponCode);
    if (currentType === 'deals') return !coupon.couponCode;
    return true;
  });

  // Pros & Cons JSON parse
  let reviewPros: string[] = [];
  let reviewCons: string[] = [];
  if (store.review) {
    try {
      if (store.review.prosJson) reviewPros = JSON.parse(store.review.prosJson);
      if (store.review.consJson) reviewCons = JSON.parse(store.review.consJson);
    } catch {}
  }

  // Schema generation
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

  // Default FAQs if none exist in DB
  const defaultFaqs = [
    {
      question: `How many active coupons are available for ${store.name}?`,
      answer: `Currently, there are ${activeCoupons.length} verified discount codes and promotional deals available for ${store.name} on GrabYourDealz.`,
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
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
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
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
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
              width: '100px',
              height: '100px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <img
              src={store.logoUrl}
              alt={store.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                {store.name} Promo Codes &amp; Coupons
              </h1>
              <span className="badge badge-verified">
                <ShieldCheck size={13} /> Verified Store
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <RatingStars score={store.ratingScore} count={store.ratingCount} size={17} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>•</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {activeCoupons.length} Active Offers Today
              </span>
            </div>

            {/* Category and Region Badges */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {store.storeCategories.map(({ category }) => (
                <Link key={category.id} href={`/categories/${category.slug}`} className="badge badge-deal">
                  <Tag size={11} /> {category.name}
                </Link>
              ))}
              {store.storeCountries.map(({ country }) => (
                <span key={country.id} className="badge">
                  {country.flagIcon} {country.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA to Merchant URL via Outbound Tracking */}
        <div>
          <a
            href={`/out/store/${store.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
            style={{ padding: '0.9rem 1.75rem', fontSize: '1rem', whiteSpace: 'nowrap' }}
          >
            Visit {store.name} <ExternalLink size={18} />
          </a>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.4rem' }}>
            Opens merchant site in a new tab
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID (2 COLUMNS: COUPONS ON LEFT, STORE INFO ON RIGHT) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: ACTIVE OFFERS & EXPIRED OFFERS */}
        <div>
          
          {/* Offer Filter Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderBottom: '2px solid var(--border)',
              paddingBottom: '0.75rem',
              marginBottom: '1.75rem',
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
                padding: '3rem 2rem',
                textAlign: 'center',
                background: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border)',
                marginBottom: '2rem',
              }}
            >
              <Tag size={40} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.35rem' }}>No Offers in this tab</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Try viewing &ldquo;All Offers&rdquo; to see all active discounts.
              </p>
              <Link href={`/stores/${store.slug}`} className="btn btn-primary btn-sm">
                View All {store.name} Offers
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
              {filteredActiveCoupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon as any} />
              ))}
            </div>
          )}

          {/* COLLAPSIBLE RECENTLY EXPIRED COUPONS (SEO PRESERVATION) */}
          {expiredCoupons.length > 0 && (
            <details
              style={{
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.5rem',
                marginBottom: '3rem',
              }}
            >
              <summary
                style={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>🕒 Recently Expired Coupons for {store.name} ({expiredCoupons.length})</span>
              </summary>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem', marginBottom: '1rem' }}>
                These codes have expired recently but might still work on occasion.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.75 }}>
                {expiredCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon as any} />
                ))}
              </div>
            </details>
          )}

          {/* STORE REVIEW & PROS/CONS */}
          {store.review && (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '3rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {store.name} In-Depth Review
                </h3>
                <RatingStars score={store.review.rating} size={18} />
              </div>

              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {store.review.summary || store.longDescription}
              </p>

              {/* Side-by-side Pros & Cons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {reviewPros.length > 0 && (
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#166534', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={18} /> What Shoppers Love
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#15803d', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
                      {reviewPros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {reviewCons.length > 0 && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, color: '#991b1b', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <X size={18} /> Things to Keep in Mind
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#b91c1c', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
                      {reviewCons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {store.review.verdict && (
                <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', borderLeft: '4px solid var(--primary)' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.92rem', display: 'block', marginBottom: '0.25rem' }}>
                    Our Editorial Verdict:
                  </span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                    {store.review.verdict}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STORE FAQS ACCORDION */}
          <FaqAccordion
            title={`${store.name} Coupon FAQs`}
            subtitle={`Got questions about redeeming promo codes on ${store.name}? Here are answers to common questions.`}
            faqs={displayFaqs}
          />
        </div>

        {/* RIGHT COLUMN: STORE SIDEBAR & DETAILS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* About Store Card */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Info size={18} color="var(--primary)" /> About {store.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              {store.shortDescription || store.longDescription || `${store.name} is a top merchant partner on GrabYourDealz.`}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--border)', paddingTop: '1rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Official Website:</span>
                <a href={`/out/store/${store.id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                  {store.name.toLowerCase().replace(/\s+/g, '')}.com ↗
                </a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Avg Savings:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>25% OFF</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Verified Offers:</span>
                <span style={{ fontWeight: 700, color: '#059669' }}>{activeCoupons.length} Active</span>
              </div>
            </div>
          </div>

          {/* Money Saving Tips */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
              border: '1px solid #a7f3d0',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
            }}
          >
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#065f46', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={18} color="#059669" /> Saving Tips for {store.name}
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#047857', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', lineHeight: '1.5' }}>
              <li>Always copy the verified promo code above before checkout.</li>
              <li>Check for seasonal sales, clearance events, and student discounts.</li>
              <li>Stack promo codes with free shipping offers when eligible.</li>
            </ul>
          </div>

          {/* Related Stores */}
          {relatedStores.length > 0 && (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <StoreIcon size={18} color="var(--primary)" /> Similar Stores
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
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      transition: 'background 0.15s ease',
                    }}
                    className="hover-bg"
                  >
                    <img
                      src={relStore.logoUrl}
                      alt={relStore.name}
                      style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid var(--border)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        {relStore.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
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
