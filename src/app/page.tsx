import React from 'react';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import HomeHero from '@/components/HomeHero';
import HomeSections from '@/components/HomeSections';
import { generateWebsiteSchema, safeJsonLd, SITE_URL, getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'RefPromos — Verified Promo Codes, Daily Deals & Discount Vouchers',
  description:
    'Save real money with 100% verified promo codes, exclusive store coupons, and daily sales from over 500+ top online merchants.',
  alternates: {
    canonical: getCanonicalUrl('/'),
    languages: {
      'en-US': `${SITE_URL}/us`,
      'en-GB': `${SITE_URL}/uk`,
      'en-CA': `${SITE_URL}/ca`,
      'en-AU': `${SITE_URL}/au`,
      'de-DE': `${SITE_URL}/de`,
      'fr-FR': `${SITE_URL}/fr`,
      'it-IT': `${SITE_URL}/it`,
      'nl-NL': `${SITE_URL}/nl`,
    },
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

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
      />

      {/* 1. EXACT HERO SECTION */}
      <HomeHero />

      {/* 2-6. DYNAMIC LOCALIZED HOME SECTIONS */}
      <HomeSections
        featuredCoupons={featuredCoupons}
        popularStores={popularStores}
        featuredCategories={featuredCategories}
        latestBlogs={latestBlogs}
      />
    </main>
  );
}
