import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import CouponCard from '@/components/CouponCard';
import { Search, Tag, Filter, ShieldCheck, ArrowRight, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Verified Coupons, Promo Codes & Discounts | GrabYourDealz',
  description:
    'Search and filter thousands of tested, working discount coupons, promo codes, and flash sales across top shopping categories and stores.',
  openGraph: {
    title: 'All Verified Coupons & Promo Codes — GrabYourDealz',
    description: '100% working discount promo codes and cash saving deals updated 24/7.',
  },
};

interface CouponsPageProps {
  searchParams: {
    search?: string;
    category?: string;
    store?: string;
    type?: string; // "all", "code", "deal", "free_shipping"
    sort?: string; // "popular", "newest", "expiring"
  };
}

export default async function CouponsHubPage({ searchParams }: CouponsPageProps) {
  const searchQuery = searchParams.search || '';
  const selectedCategory = searchParams.category || '';
  const selectedStore = searchParams.store || '';
  const selectedType = searchParams.type || 'all';
  const selectedSort = searchParams.sort || 'popular';

  // 1. Fetch Categories & Stores for sidebar filter lists
  const [categories, stores] = await Promise.all([
    prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: { select: { storeCategories: true } },
      },
    }),
    prisma.store.findMany({
      where: { status: 'active' },
      take: 15,
      orderBy: { name: 'asc' },
      select: { id: true, name: true, slug: true, logoUrl: true },
    }),
  ]);

  // 2. Build where filter for coupons
  const whereCondition: any = {
    status: 'active',
  };

  if (searchQuery) {
    whereCondition.OR = [
      { title: { contains: searchQuery } },
      { couponCode: { contains: searchQuery } },
      { discountValue: { contains: searchQuery } },
      { store: { name: { contains: searchQuery } } },
    ];
  }

  if (selectedStore) {
    whereCondition.store = {
      slug: selectedStore,
    };
  }

  if (selectedCategory) {
    whereCondition.store = {
      ...(whereCondition.store || {}),
      storeCategories: {
        some: {
          category: {
            slug: selectedCategory,
          },
        },
      },
    };
  }

  if (selectedType === 'code') {
    whereCondition.couponCode = { not: null };
  } else if (selectedType === 'deal') {
    whereCondition.couponCode = null;
  } else if (selectedType === 'free_shipping') {
    whereCondition.discountType = 'free_shipping';
  }

  // 3. Build sorting order
  let orderBy: any = [{ isFeatured: 'desc' }, { createdAt: 'desc' }];
  if (selectedSort === 'newest') {
    orderBy = { createdAt: 'desc' };
  } else if (selectedSort === 'expiring') {
    orderBy = { expiryDate: 'asc' };
  } else if (selectedSort === 'popular') {
    orderBy = [{ isFeatured: 'desc' }, { usedCount: 'desc' }];
  }

  // 4. Fetch matching coupons
  const coupons = await prisma.coupon.findMany({
    where: whereCondition,
    orderBy,
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

  const totalCouponsCount = coupons.length;

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      <Breadcrumbs items={[{ name: 'Coupons', url: '/coupons' }]} />

      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <Tag size={18} /> Coupon Directory
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Verified Promo Codes &amp; Coupons
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px' }}>
          Browse {totalCouponsCount} active discount codes, exclusive retailer vouchers, and flash savings tested today.
        </p>
      </div>

      {/* Top Filter Bar */}
      <div
        style={{
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
        }}
      >
        {/* Search Box */}
        <form action="/coupons" method="GET" style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '260px', position: 'relative' }}>
          {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
          {selectedStore && <input type="hidden" name="store" value={selectedStore} />}
          {selectedType !== 'all' && <input type="hidden" name="type" value={selectedType} />}
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem' }} />
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search by store or code (e.g. Nike, SAVE20)..."
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

        {/* Offer Type Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <Link
            href={`/coupons?type=all${selectedCategory ? `&category=${selectedCategory}` : ''}${selectedStore ? `&store=${selectedStore}` : ''}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
            className={`btn btn-sm ${selectedType === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Offers
          </Link>
          <Link
            href={`/coupons?type=code${selectedCategory ? `&category=${selectedCategory}` : ''}${selectedStore ? `&store=${selectedStore}` : ''}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
            className={`btn btn-sm ${selectedType === 'code' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Promo Codes
          </Link>
          <Link
            href={`/coupons?type=deal${selectedCategory ? `&category=${selectedCategory}` : ''}${selectedStore ? `&store=${selectedStore}` : ''}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
            className={`btn btn-sm ${selectedType === 'deal' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Sales &amp; Deals
          </Link>
          <Link
            href={`/coupons?type=free_shipping${selectedCategory ? `&category=${selectedCategory}` : ''}${selectedStore ? `&store=${selectedStore}` : ''}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
            className={`btn btn-sm ${selectedType === 'free_shipping' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Free Shipping
          </Link>
        </div>
      </div>

      {/* Active Filter Tags */}
      {(searchQuery || selectedCategory || selectedStore || selectedType !== 'all') && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Active Filters:</span>
          {searchQuery && (
            <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Query: &ldquo;{searchQuery}&rdquo;
              <Link href={`/coupons?category=${selectedCategory}&store=${selectedStore}&type=${selectedType}`}><X size={12} /></Link>
            </span>
          )}
          {selectedCategory && (
            <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Category: {selectedCategory}
              <Link href={`/coupons?search=${searchQuery}&store=${selectedStore}&type=${selectedType}`}><X size={12} /></Link>
            </span>
          )}
          {selectedStore && (
            <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Store: {selectedStore}
              <Link href={`/coupons?search=${searchQuery}&category=${selectedCategory}&type=${selectedType}`}><X size={12} /></Link>
            </span>
          )}
          <Link href="/coupons" style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, marginLeft: '0.5rem' }}>
            Clear All
          </Link>
        </div>
      )}

      {/* 2-COLUMN LAYOUT (SIDEBAR ON LEFT, COUPONS GRID ON RIGHT) */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* SIDEBAR FILTERS */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Categories Filter */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
              Categories
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <Link
                href={`/coupons?store=${selectedStore}&type=${selectedType}&search=${searchQuery}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.45rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: !selectedCategory ? 700 : 500,
                  background: !selectedCategory ? 'var(--primary-light)' : 'transparent',
                  color: !selectedCategory ? 'var(--primary-hover)' : 'var(--text-main)',
                }}
              >
                <span>All Categories</span>
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/coupons?category=${cat.slug}&store=${selectedStore}&type=${selectedType}&search=${searchQuery}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.45rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: selectedCategory === cat.slug ? 700 : 500,
                    background: selectedCategory === cat.slug ? 'var(--primary-light)' : 'transparent',
                    color: selectedCategory === cat.slug ? 'var(--primary-hover)' : 'var(--text-main)',
                  }}
                >
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Stores Filter */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
              Top Stores
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <Link
                href={`/coupons?category=${selectedCategory}&type=${selectedType}&search=${searchQuery}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.45rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: !selectedStore ? 700 : 500,
                  background: !selectedStore ? 'var(--primary-light)' : 'transparent',
                  color: !selectedStore ? 'var(--primary-hover)' : 'var(--text-main)',
                }}
              >
                <span>All Stores</span>
              </Link>
              {stores.map((st) => (
                <Link
                  key={st.id}
                  href={`/coupons?store=${st.slug}&category=${selectedCategory}&type=${selectedType}&search=${searchQuery}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: selectedStore === st.slug ? 700 : 500,
                    background: selectedStore === st.slug ? 'var(--primary-light)' : 'transparent',
                    color: selectedStore === st.slug ? 'var(--primary-hover)' : 'var(--text-main)',
                  }}
                >
                  <img src={st.logoUrl} alt={st.name} style={{ width: '20px', height: '20px', borderRadius: '4px', objectFit: 'cover' }} />
                  <span>{st.name}</span>
                </Link>
              ))}
            </div>
          </div>

        </aside>

        {/* MAIN COUPON LIST */}
        <main>
          {coupons.length === 0 ? (
            <div style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border)',
            }}>
              <Tag size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>No Coupons Found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                We couldn&apos;t find any verified offers matching your current filter selection.
              </p>
              <Link href="/coupons" className="btn btn-primary">
                View All Coupons
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
              {coupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon as any} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
