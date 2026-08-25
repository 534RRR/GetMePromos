import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
import CouponCard from '@/components/CouponCard';
import { Folder, Store, Tag, ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) return { title: 'Category Not Found — GrabYourDealz' };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

  const title =
    category.seoTitle ||
    `Best ${category.name} Coupons & Promo Codes (${currentMonth} ${currentYear}) | GrabYourDealz`;
  const description =
    category.metaDescription ||
    `Discover verified ${category.name} discount codes, deals, and daily promotions across top online retailers for ${currentMonth} ${currentYear}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      storeCategories: {
        include: {
          store: {
            include: {
              _count: { select: { coupons: true, deals: true } },
            },
          },
        },
      },
    },
  });

  if (!category) notFound();

  // Fetch all active coupons for stores in this category
  const storeIds = category.storeCategories.map((sc) => sc.store.id);

  const coupons = await prisma.coupon.findMany({
    where: {
      status: 'active',
      storeId: { in: storeIds },
    },
    take: 12,
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
  });

  const stores = category.storeCategories.map((sc) => sc.store).filter((s) => s.status === 'active');

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      <Breadcrumbs
        items={[
          { name: 'Categories', url: '/categories' },
          { name: category.name, url: `/categories/${category.slug}` },
        ]}
      />

      {/* Category Hero */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '3rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <Folder size={18} /> Category Deals
        </div>
        <h1 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.65rem' }}>
          {category.name} Coupons &amp; Deals
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px', marginBottom: '1.5rem' }}>
          {category.description || `Browse verified promo codes and sales across all ${category.name} stores.`}
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="badge badge-code">
            <Store size={13} /> {stores.length} Partner Stores
          </span>
          <span className="badge badge-verified">
            <Tag size={13} /> {coupons.length} Active Offers
          </span>
        </div>
      </div>

      {/* Top Stores in Category */}
      {stores.length > 0 && (
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Top {category.name} Stores
            </h2>
            <Link href={`/stores?category=${category.slug}`} className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
              View All Stores <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-6 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
            {stores.slice(0, 6).map((store) => (
              <StoreCard key={store.id} store={store as any} />
            ))}
          </div>
        </section>
      )}

      {/* Active Coupons in Category */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Verified {category.name} Coupons
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Hand-tested promo codes and instant discounts for online checkout.
            </p>
          </div>
          <Link href={`/coupons?category=${category.slug}`} className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            View All Offers <ArrowRight size={16} />
          </Link>
        </div>

        {coupons.length === 0 ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center', background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
            <Tag size={40} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.35rem' }}>No Coupons in this category</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Check back soon for newly added promo codes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon as any} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
