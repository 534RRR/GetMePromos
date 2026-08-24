import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import CouponCard from '@/components/CouponCard';
import StoreCard from '@/components/StoreCard';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Percent,
  CheckCircle2,
  Users,
  ArrowRight,
  TrendingUp,
  Shirt,
  Laptop,
  Home,
  Plane,
  Activity,
  Utensils,
  Code,
} from 'lucide-react';

// Category Icon Helper
function getCategoryIcon(iconName?: string | null) {
  switch (iconName) {
    case 'Shirt': return <Shirt size={22} />;
    case 'Laptop': return <Laptop size={22} />;
    case 'Sparkles': return <Sparkles size={22} />;
    case 'Home': return <Home size={22} />;
    case 'Plane': return <Plane size={22} />;
    case 'Activity': return <Activity size={22} />;
    case 'Utensils': return <Utensils size={22} />;
    case 'Code': return <Code size={22} />;
    default: return <Percent size={22} />;
  }
}

export default async function HomePage() {
  // 1. Fetch featured data from Prisma DB
  const [featuredCoupons, popularStores, categories, latestBlogs] = await Promise.all([
    prisma.coupon.findMany({
      where: { status: 'active', isFeatured: true },
      take: 4,
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
      orderBy: { createdAt: 'desc' },
    }),
    prisma.store.findMany({
      where: { status: 'active', isPopular: true },
      take: 6,
      include: {
        _count: {
          select: { coupons: true, deals: true },
        },
      },
    }),
    prisma.category.findMany({
      where: { isFeatured: true },
      take: 8,
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.blog.findMany({
      where: { status: 'published' },
      take: 3,
      orderBy: { publishedAt: 'desc' },
      include: { category: true },
    }),
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '4rem' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
        color: '#ffffff',
        paddingTop: '4.5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle decorative glow */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}>
            
            {/* Left Hero Graphic / Featured Banner */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
            }}>
              <span className="badge badge-verified" style={{ marginBottom: '1rem', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderColor: '#059669' }}>
                <Sparkles size={14} /> Today&apos;s Featured Savings
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: '1.2', marginBottom: '0.75rem', color: '#ffffff' }}>
                Up to <span style={{ color: '#34d399' }}>70% OFF</span> Top Brands
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Tested & working discount codes for Nike, Amazon, ASOS, Sephora & 500+ stores.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                <Link href="/coupons" className="btn btn-primary btn-lg">
                  Explore Coupons <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right Headline & Prominent Search */}
            <div>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#34d399',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.75rem',
              }}>
                <TrendingUp size={16} /> #1 Deals & Coupons Discovery
              </span>
              <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: '1.15', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                Save More with <span style={{ color: '#10b981' }}>GrabYourDealz</span>
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Verified promo codes, flash sales, and exclusive money-saving offers updated round the clock.
              </p>

              {/* Global Search Input Box */}
              <form action="/coupons" method="GET" style={{
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '0.4rem',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                maxWidth: '560px',
              }}>
                <div style={{ paddingLeft: '1rem', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                  <Search size={22} />
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search for stores (e.g. Nike, Amazon) or categories..."
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '0.85rem 1rem',
                    fontSize: '1rem',
                    color: 'var(--text-main)',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                <button type="submit" className="btn btn-primary btn-lg" style={{ padding: '0.85rem 1.75rem' }}>
                  Search
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TODAY'S POPULAR OFFERS */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>Today&apos;s Popular Offers</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Hand-picked verified coupons with the highest savings right now.</p>
          </div>
          <Link href="/coupons" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            View All Offers <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {featuredCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon as any} />
          ))}
        </div>
      </section>

      {/* 3. POPULAR STORES */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>Popular Stores</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Browse exclusive discounts from top featured retailers.</p>
          </div>
          <Link href="/stores" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            View All Stores <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-6 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
          {popularStores.map((store) => (
            <StoreCard key={store.id} store={store as any} />
          ))}
        </div>
      </section>

      {/* 4. TOP CATEGORIES */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>Top Categories</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Find coupons tailored to what you are shopping for.</p>
          </div>
          <Link href="/categories" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/coupons?category=${cat.slug}`}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem',
                textDecoration: 'none',
              }}
            >
              <div style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {getCategoryIcon(cat.icon)}
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{cat.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Explore deals ➔</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. WHY SHOP WITH US? (4 Trust Columns) */}
      <section style={{ background: '#ffffff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-code" style={{ marginBottom: '0.75rem' }}>Trusted Savings</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>Why Shop With GrabYourDealz?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>
              We simplify smart online shopping with validated coupons and zero hassle.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Verified Coupons</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                We manually test and verify promo codes daily to ensure 100% working discounts.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--secondary-light)', color: 'var(--secondary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <TrendingUp size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Huge Savings</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Save up to 70% with exclusive promotional deals and clearance sale alerts.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', background: '#ecfdf5', color: '#059669', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <CheckCircle2 size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>100% Free Forever</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Always free to use. No sign-up required, no hidden costs or fees.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', background: '#fffbeb', color: '#d97706', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Trusted by Shoppers</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Thousands of smart shoppers save every day across our global network of stores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED SHOPPING GUIDES & BLOGS */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>Latest Shopping Guides & Tips</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Expert advice and strategies to stretch your budget further.</p>
          </div>
          <Link href="/blogs" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            Read All Guides <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {latestBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
                overflow: 'hidden',
                textDecoration: 'none',
              }}
            >
              {blog.featuredImage && (
                <div style={{ height: '190px', width: '100%', overflow: 'hidden' }}>
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span className="badge badge-amber" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
                  {blog.category?.name || 'Guide'}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.4', marginBottom: '0.5rem' }}>
                  {blog.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.25rem', flex: 1 }}>
                  {blog.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '0.85rem' }}>
                  <span>{blog.readingTime}</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Read Article ➔</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. NEWSLETTER / EMAIL SIGNUP */}
      <section className="container">
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          color: '#ffffff',
          boxShadow: 'var(--shadow-md)',
        }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Get Exclusive Deals Delivered to Your Inbox
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto 2rem auto' }}>
            Join 50,000+ smart shoppers and never miss a flash sale, seasonal clearance, or verified promo code.
          </p>

          <form style={{ display: 'flex', maxWidth: '480px', margin: '0 auto', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              style={{
                flex: 1,
                minWidth: '240px',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #334155',
                background: '#0f172a',
                color: '#ffffff',
                outline: 'none',
              }}
            />
            <button type="button" className="btn btn-primary btn-lg" style={{ padding: '0.85rem 1.75rem' }}>
              Subscribe Free
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
