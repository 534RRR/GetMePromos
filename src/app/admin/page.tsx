import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import {
  Store,
  Tag,
  Globe,
  TrendingUp,
  Plus,
  ShieldCheck,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const [
    storeCount,
    couponCount,
    countryCount,
    clickCount,
    blogCount,
    reviewCount,
    recentStores,
    recentCoupons,
  ] = await Promise.all([
    prisma.store.count(),
    prisma.coupon.count({ where: { status: 'active' } }),
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
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
            CMS Dashboard Overview
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time analytics and content management for GetMePromos.com
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link href="/admin/stores/new" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            <Plus size={14} /> Store
          </Link>
          <Link href="/admin/coupons/new" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            <Plus size={14} /> Coupon
          </Link>
          <Link href="/admin/blogs/new" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            <Plus size={14} /> Guide
          </Link>
          <Link href="/admin/reviews/new" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
            <Plus size={14} /> Review
          </Link>
        </div>
      </div>

      {/* 6 Stat Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.25rem',
      }}>
        {/* Stores Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Store size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Stores</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)' }}>{storeCount}</div>
          </div>
        </div>

        {/* Coupons Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Tag size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Coupons</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)' }}>{couponCount}</div>
          </div>
        </div>

        {/* Guides / Blogs Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Guides</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)' }}>{blogCount}</div>
          </div>
        </div>

        {/* Reviews Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Reviews</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)' }}>{reviewCount}</div>
          </div>
        </div>

        {/* Countries Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Regions</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)' }}>{countryCount}</div>
          </div>
        </div>

        {/* Outbound Clicks Card */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'rgba(168, 85, 247, 0.12)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Clicks</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)' }}>{clickCount}</div>
          </div>
        </div>
      </div>

      {/* Two-Column Recent Content Grids */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.75rem' }}>
        
        {/* Recent Stores Panel */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)' }}>Managed Stores</h3>
            <Link href="/admin/stores" style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700 }}>
              View All ➔
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {recentStores.map((s) => (
              <div key={s.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <img
                    src={s.logoUrl}
                    alt={s.name}
                    style={{ width: '34px', height: '34px', objectFit: 'contain', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '2px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-heading)' }}>{s.name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {s._count.coupons} Coupons • {s._count.deals} Deals
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className={`badge ${s.status === 'active' ? 'badge-verified' : 'badge-amber'}`} style={{ fontSize: '0.68rem' }}>
                    {s.status}
                  </span>
                  <Link href={`/admin/stores/${s.id}`} className="btn btn-secondary btn-sm" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}>
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)' }}>Active Coupons</h3>
            <Link href="/admin/coupons" style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700 }}>
              View All ➔
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {recentCoupons.map((c) => (
              <div key={c.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.88rem' }}>{c.discountValue}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>• {c.store.name}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-heading)', marginTop: '0.15rem' }}>{c.title}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {c.couponCode && (
                    <code style={{ background: 'var(--bg-input)', padding: '0.15rem 0.35rem', borderRadius: '3px', border: '1px dashed var(--primary)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)' }}>
                      {c.couponCode}
                    </code>
                  )}
                  <Link href={`/admin/coupons/${c.id}`} className="btn btn-secondary btn-sm" style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}>
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
