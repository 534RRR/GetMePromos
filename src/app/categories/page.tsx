import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  Folder,
  Tag,
  Store,
  Shirt,
  Laptop,
  Sparkles,
  Home,
  Plane,
  Activity,
  Utensils,
  Code,
  Percent,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Coupons & Deals by Category | GrabYourDealz',
  description:
    'Find money-saving promo codes, sales, and verified discounts categorized by Fashion, Electronics, Beauty, Home, Travel, and more.',
  openGraph: {
    title: 'Browse Shopping Categories — GrabYourDealz',
    description: 'Explore verified promo codes across all shopping categories.',
  },
};

function getCategoryIcon(iconName?: string | null) {
  switch (iconName) {
    case 'Shirt': return <Shirt size={28} />;
    case 'Laptop': return <Laptop size={28} />;
    case 'Sparkles': return <Sparkles size={28} />;
    case 'Home': return <Home size={28} />;
    case 'Plane': return <Plane size={28} />;
    case 'Activity': return <Activity size={28} />;
    case 'Utensils': return <Utensils size={28} />;
    case 'Code': return <Code size={28} />;
    default: return <Percent size={28} />;
  }
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: { storeCategories: true },
      },
    },
  });

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      <Breadcrumbs items={[{ name: 'Categories', url: '/categories' }]} />

      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <Folder size={18} /> Shopping Categories
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          All Shopping Categories
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px' }}>
          Find active discount codes, cash saving coupons, and seasonal sales curated by your favorite shopping department.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-4 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.75rem',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <div>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                {getCategoryIcon(cat.icon)}
              </div>

              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.45rem' }}>
                {cat.name}
              </h2>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                {cat.description || `Browse top verified discounts and merchant deals in ${cat.name}.`}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border)',
              paddingTop: '1rem',
              fontSize: '0.82rem',
            }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Store size={14} /> {cat._count.storeCategories} Stores
              </span>

              <span style={{ color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Browse Deals <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
