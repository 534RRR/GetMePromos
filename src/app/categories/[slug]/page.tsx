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
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const params = await Promise.resolve(props.params);
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) return { title: 'Category Not Found — GetMePromos' };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

  const title =
    category.seoTitle ||
    `Best ${category.name} Coupons & Promo Codes (${currentMonth} ${currentYear}) | GetMePromos`;
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

export default async function CategoryDetailPage(props: CategoryPageProps) {
  const params = await Promise.resolve(props.params);
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
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      <Breadcrumbs
        items={[
          { name: 'Categories', url: '/categories' },
          { name: category.name, url: `/categories/${category.slug}` },
        ]}
      />

      {/* Category Hero */}
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border)',
          padding: '2.25rem 2rem',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '3rem',
        }}
      >
        <span className="eyebrow-pill" style={{ marginBottom: '0.75rem' }}>
          <Folder size={12} /> Category Deals
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          {category.name} Coupons &amp; Deals
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '680px', marginBottom: '1.5rem' }}>
          {category.description || `Browse verified promo codes and sales across all ${category.name} stores.`}
        </p>

        <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
          <span className="badge badge-code">
            <Store size={12} /> {stores.length} Partner Stores
          </span>
          <span className="badge badge-verified">
            <Tag size={12} /> {coupons.length} Active Offers
          </span>
        </div>
      </div>

      {/* Top Stores in Category */}
      {stores.length > 0 && (
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)' }}>
              Top {category.name} Stores
            </h2>
            <Link href={`/stores?category=${category.slug}`} className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
              View All Stores <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.35rem',
          }}>
            {stores.slice(0, 6).map((store) => (
              <StoreCard key={store.id} store={store as any} />
            ))}
          </div>
        </section>
      )}

      {/* Active Coupons in Category */}
      <section>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)' }}>
              Verified {category.name} Offers
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Hand-tested promo codes and instant discounts for online checkout.
            </p>
          </div>
          <Link href={`/coupons?category=${category.slug}`} className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            View All Offers <ArrowRight size={14} />
          </Link>
        </div>

        {coupons.length === 0 ? (
          <div style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)',
          }}>
            <Tag size={40} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-heading)' }}>No Coupons in this category</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Check back soon for newly added promo codes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))' }}>
            {coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon as any} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
