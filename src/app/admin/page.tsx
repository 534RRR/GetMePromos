import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import {
  Store,
  Tag,
  Globe,
  TrendingUp,
  Plus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  // Fetch platform metrics from DB
  const [
    storeCount,
    couponCount,
    dealCount,
    countryCount,
    clickCount,
    blogCount,
    reviewCount,
    recentStores,
    recentCoupons,
  ] = await Promise.all([
    prisma.store.count(),
    prisma.coupon.count({ where: { status: 'active' } }),
    prisma.deal.count({ where: { status: 'active' } }),
    prisma.country.count({ where: { isActive: true } }),
    prisma.clickLog.count(),
    prisma.blog.count(),
    prisma.review.count(),
    prisma.store.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { coupons: true, deals: true } },
      },
    }),
    prisma.coupon.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { store: true },
    }),
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header & Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            CMS Dashboard Overview
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Real-time analytics and content management for GrabYourDealz.com
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <Link href="/admin/stores/new" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            <Plus size={15} /> Store
          </Link>
          <Link href="/admin/coupons/new" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            <Plus size={15} /> Coupon
          </Link>
          <Link href="/admin/blogs/new" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            <Plus size={15} /> Guide
          </Link>
          <Link href="/admin/reviews/new" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
            <Plus size={15} /> Review
          </Link>
        </div>
      </div>

      {/* 6 Stat Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
      }}>
        {/* Stores Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Store size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Stores</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)' }}>{storeCount}</div>
          </div>
        </div>

        {/* Coupons Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Tag size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Coupons</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)' }}>{couponCount}</div>
          </div>
        </div>

        {/* Guides / Blogs Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Guides</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)' }}>{blogCount}</div>
          </div>
        </div>

        {/* Reviews Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reviews</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)' }}>{reviewCount}</div>
          </div>
        </div>

        {/* Countries Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Regions</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)' }}>{countryCount}</div>
          </div>
        </div>

        {/* Outbound Clicks Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Clicks</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)' }}>{clickCount}</div>
          </div>
        </div>
      </div>

      {/* Two-Column Recent Content Grids */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        
        {/* Recent Stores Panel */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Managed Stores</h3>
            <Link href="/admin/stores" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
              View All ➔
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {recentStores.map((s) => (
              <div key={s.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={s.logoUrl}
                    alt={s.name}
                    style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{s.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {s._count.coupons} Coupons • {s._count.deals} Deals
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`badge ${s.status === 'active' ? 'badge-verified' : 'badge-amber'}`}>
                    {s.status}
                  </span>
                  <Link href={`/admin/stores/${s.id}`} className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.65rem' }}>
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Coupons Panel */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Active Coupons</h3>
            <Link href="/admin/coupons" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
              View All ➔
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {recentCoupons.map((c) => (
              <div key={c.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.92rem' }}>{c.discountValue}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• {c.store.name}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, marginTop: '0.15rem' }}>{c.title}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {c.couponCode && (
                    <code style={{ background: '#ffffff', padding: '0.2rem 0.4rem', borderRadius: '4px', border: '1px dashed var(--primary)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>
                      {c.couponCode}
                    </code>
                  )}
                  <Link href={`/admin/coupons/${c.id}`} className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.65rem' }}>
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
