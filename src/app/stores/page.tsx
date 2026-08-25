import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
import { Search, Store, Tag, Sparkles, Filter, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Stores & Brands — Verified Coupon Codes & Discounts | GrabYourDealz',
  description:
    'Browse all partner stores and top online retail brands. Find verified discount promo codes, coupons, and flash deals across 500+ top retailers.',
  openGraph: {
    title: 'All Stores & Brands Directory — GrabYourDealz',
    description: 'Find verified discount promo codes and daily deals for top retailers.',
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

  // 1. Fetch Categories for filter
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true, slug: true },
  });

  // 2. Fetch featured popular stores
  const featuredStores = await prisma.store.findMany({
    where: { status: 'active', isFeatured: true },
    take: 6,
    include: {
      _count: {
        select: { coupons: true, deals: true },
      },
    },
  });

  // 3. Build where conditions for stores directory
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
      whereCondition.name = {
        startsWith: '0', // Or general non-alphabet handled in sorting
      };
    } else {
      whereCondition.name = {
        startsWith: selectedLetter,
      };
    }
  }

  // 4. Fetch all matching stores
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

  // Group stores by first letter for the A-Z index view
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
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      <Breadcrumbs items={[{ name: 'Stores', url: '/stores' }]} />

      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <Store size={18} /> Store Directory
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          All Stores &amp; Online Brands
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px' }}>
          Browse verified coupon codes, promotions, and cash-saving deals from thousands of top online retailers worldwide.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '2.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Search Input */}
        <form action="/stores" method="GET" style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '260px', position: 'relative' }}>
          {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
          {selectedLetter !== 'ALL' && <input type="hidden" name="letter" value={selectedLetter} />}
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem' }} />
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search stores by brand name (e.g. Nike, Sephora)..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              outline: 'none',
              fontSize: '0.92rem',
            }}
          />
        </form>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} color="var(--primary)" /> Featured Top Stores
            </h2>
          </div>
          <div className="grid grid-cols-6 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
            {featuredStores.map((store) => (
              <StoreCard key={store.id} store={store as any} />
            ))}
          </div>
        </section>
      )}

      {/* Alphabetical A-Z Filter Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '0.75rem 1rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.35rem',
        flexWrap: 'wrap',
      }}>
        {ALPHABET.map((letter) => {
          const isActive = selectedLetter === letter;
          const href = `/stores?letter=${letter}${selectedCategory ? `&category=${selectedCategory}` : ''}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`;

          return (
            <Link
              key={letter}
              href={href}
              style={{
                width: letter === 'ALL' ? '48px' : '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                background: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-main)',
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
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
        }}>
          <Store size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            No Stores Found
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            We couldn&apos;t find any stores matching your current filter criteria.
          </p>
          <Link href="/stores" className="btn btn-primary">
            Reset Store Filters
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {sortedGroupKeys.map((letter) => (
            <div
              key={letter}
              id={`letter-${letter}`}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Letter Heading Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontWeight: 800,
                fontSize: '1.25rem',
                marginBottom: '1.25rem',
              }}>
                {letter}
              </div>

              {/* Stores Grid */}
              <div className="grid grid-cols-4 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
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
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                        background: '#ffffff',
                      }}
                      className="store-dir-item"
                    >
                      <img
                        src={store.logoUrl}
                        alt={store.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-md)',
                          objectFit: 'cover',
                          border: '1px solid var(--border)',
                        }}
                      />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          color: 'var(--text-main)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {store.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Tag size={12} color="var(--primary)" />
                          <span>{offerCount} {offerCount === 1 ? 'Offer' : 'Offers'}</span>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--text-muted)" />
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
