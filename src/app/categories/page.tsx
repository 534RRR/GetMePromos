import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  Folder,
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
  title: 'Browse Coupons & Deals by Category | RefPromos',
  description:
    'Find money-saving promo codes, sales, and verified discounts categorized by Fashion, Electronics, Beauty, Home, Travel, and more.',
};

function getCategoryIcon(iconName?: string | null) {
  switch (iconName) {
    case 'Shirt': return <Shirt size={24} />;
    case 'Laptop': return <Laptop size={24} />;
    case 'Sparkles': return <Sparkles size={24} />;
    case 'Home': return <Home size={24} />;
    case 'Plane': return <Plane size={24} />;
    case 'Activity': return <Activity size={24} />;
    case 'Utensils': return <Utensils size={24} />;
    case 'Code': return <Code size={24} />;
    default: return <Percent size={24} />;
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
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      <Breadcrumbs items={[{ name: 'Categories', url: '/categories' }]} />

      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="eyebrow-pill" style={{ marginBottom: '0.85rem' }}>
          <Folder size={13} /> Categories Hub
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          All Shopping Categories
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px' }}>
          Explore discounts, promo codes, and daily sales organized by product department.
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
            }}
          >
            <div>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  border: '1px solid var(--primary-border)',
                }}
              >
                {getCategoryIcon(cat.icon)}
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                {cat.name}
              </h2>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.55', marginBottom: '1.5rem' }}>
                {cat.description || `Browse top verified discounts and merchant deals in ${cat.name}.`}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border)',
              paddingTop: '0.95rem',
              fontSize: '0.84rem',
            }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Store size={14} color="var(--primary)" /> {cat._count.storeCategories} Stores
              </span>

              <span style={{ color: 'var(--primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                Browse Deals <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
