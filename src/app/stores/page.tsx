import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
import { Search, Store, Tag, Sparkles, ArrowRight } from 'lucide-react';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'All Stores & Brands — Verified Coupon Codes & Discounts | RefPromos',
  description:
    'Browse all partner stores and top online retail brands. Find verified discount promo codes, coupons, and flash deals across 500+ top retailers.',
  alternates: {
    canonical: getCanonicalUrl('/stores'),
  },
};

const ALPHABET = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), '#'];

interface StoresPageProps {
  searchParams: {
    letter?: string;
    category?: string;
    search?: string;
  };
}

export default async function StoresDirectoryPage({ searchParams }: StoresPageProps) {
  const selectedLetter = (searchParams.letter || 'ALL').toUpperCase();
  const selectedCategory = searchParams.category || '';
  const searchQuery = searchParams.search || '';

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true, slug: true },
  });

  const featuredStores = await prisma.store.findMany({
    where: { status: 'active', isFeatured: true },
    take: 6,
    include: {
      _count: {
        select: { coupons: true, deals: true },
      },
    },
  });

  const whereCondition: any = {
    status: 'active',
  };

  if (searchQuery) {
    whereCondition.OR = [
      { name: { contains: searchQuery } },
      { slug: { contains: searchQuery } },
    ];
  }

  if (selectedCategory) {
    whereCondition.storeCategories = {
      some: {
        category: {
          slug: selectedCategory,
        },
      },
    };
  }

  if (selectedLetter !== 'ALL') {
    if (selectedLetter === '#') {
      whereCondition.name = { startsWith: '0' };
    } else {
      whereCondition.name = { startsWith: selectedLetter };
    }
  }

  const allStores = await prisma.store.findMany({
    where: whereCondition,
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { coupons: true, deals: true },
      },
      storeCategories: {
        include: { category: true },
      },
    },
  });

  const groupedStores: { [key: string]: typeof allStores } = {};
  allStores.forEach((store) => {
    const firstChar = store.name.charAt(0).toUpperCase();
    const key = /[A-Z]/.test(firstChar) ? firstChar : '#';
    if (!groupedStores[key]) {
      groupedStores[key] = [];
    }
    groupedStores[key].push(store);
  });

  const sortedGroupKeys = Object.keys(groupedStores).sort();

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      <Breadcrumbs items={[{ name: 'Stores', url: '/stores' }]} />

      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="eyebrow-pill" style={{ marginBottom: '0.85rem' }}>
          <Store size={13} /> Retailers Directory
        </span>
        <h1 className="page-title" style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          All Partner Stores &amp; Brands
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px' }}>
          Discover verified promo codes, seasonal sales, and cashback deals from top retailers worldwide.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="store-filter-bar" style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-2xl)',
        padding: '1.25rem 1.5rem',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '2.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Search Input */}
        <form action="/stores" method="GET" style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '280px', position: 'relative' }}>
          {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
          {selectedLetter !== 'ALL' && <input type="hidden" name="letter" value={selectedLetter} />}
          <Search size={18} color="var(--slate-400)" style={{ position: 'absolute', left: '1.1rem' }} />
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search stores by brand name..."
            style={{
              width: '100%',
              padding: '0.8rem 1rem 0.8rem 2.8rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
              background: 'var(--bg-input)',
              color: 'var(--text-main)',
              outline: 'none',
              fontSize: '0.94rem',
            }}
          />
        </form>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          <Link
            href={`/stores${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}
            className={`btn btn-sm ${!selectedCategory ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Categories
          </Link>
          {categories.slice(0, 5).map((cat) => (
            <Link
              key={cat.id}
              href={`/stores?category=${cat.slug}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
              className={`btn btn-sm ${selectedCategory === cat.slug ? 'btn-primary' : 'btn-secondary'}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Stores Strip */}
      {!searchQuery && !selectedCategory && selectedLetter === 'ALL' && featuredStores.length > 0 && (
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-heading)' }}>
              <Sparkles size={18} color="var(--primary)" /> Top Featured Brands
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))',
            gap: '1.5rem',
          }}>
            {featuredStores.map((store) => (
              <StoreCard key={store.id} store={store as any} />
            ))}
          </div>
        </section>
      )}

      {/* Alphabetical A-Z Filter Bar */}
      <div className="alphabet-bar" style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '0.75rem 1rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.35rem',
        flexWrap: 'wrap',
        boxShadow: 'var(--shadow-xs)',
      }}>
        {ALPHABET.map((letter) => {
          const isActive = selectedLetter === letter;
          const href = `/stores?letter=${letter}${selectedCategory ? `&category=${selectedCategory}` : ''}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`;

          return (
            <Link
              key={letter}
              href={href}
              style={{
                minWidth: letter === 'ALL' ? '48px' : '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 800,
                fontSize: '0.84rem',
                textDecoration: 'none',
                background: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              {letter}
            </Link>
          );
        })}
      </div>

      {/* Stores List Grouped by Letter */}
      {sortedGroupKeys.length === 0 ? (
        <div style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
        }}>
          <Store size={44} color="var(--primary)" style={{ margin: '0 auto 1.25rem auto' }} />
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
            No Stores Found
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '1.5rem', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
            We couldn&apos;t find any stores matching your current filter criteria.
          </p>
          <Link href="/stores" className="btn btn-primary">
            Reset Store Filters
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {sortedGroupKeys.map((letter) => (
            <div
              key={letter}
              id={`letter-${letter}`}
              className="store-letter-group"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-2xl)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontWeight: 900,
                fontSize: '1.2rem',
                marginBottom: '1.25rem',
                border: '1px solid var(--primary-border)',
              }}>
                {letter}
              </div>

              <div className="store-dir-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1rem',
              }}>
                {groupedStores[letter].map((store) => {
                  const offerCount = store._count.coupons + store._count.deals;

                  return (
                    <Link
                      key={store.id}
                      href={`/stores/${store.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        padding: '0.75rem 0.95rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        textDecoration: 'none',
                        transition: 'all 0.18s ease',
                        background: 'var(--bg-card)',
                      }}
                      className="store-dir-item hover-bg"
                    >
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)',
                        padding: '4px',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <img
                          src={store.logoUrl}
                          alt={store.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{
                          fontWeight: 800,
                          fontSize: '0.92rem',
                          color: 'var(--text-heading)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {store.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Tag size={11} color="var(--primary)" />
                          <span>{offerCount} {offerCount === 1 ? 'Offer' : 'Offers'}</span>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--slate-400)" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
