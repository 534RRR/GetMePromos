import React from 'react';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth';
import {
  LayoutDashboard,
  Store,
  Tag,
  FolderTree,
  Globe,
  FileText,
  Star,
  Settings,
  ExternalLink,
  Shield,
  LogOut,
} from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--header-height))', background: '#f8fafc' }}>
      
      {/* CMS Sidebar */}
      <aside style={{
        width: '260px',
        background: '#0f172a',
        color: '#94a3b8',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem 1rem',
      }}>
        
        {/* Admin Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0 0.5rem', marginBottom: '2rem' }}>
          <div style={{
            background: 'var(--primary)',
            color: '#fff',
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Shield size={18} />
          </div>
          <div>
            <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.05rem' }}>CMS Engine</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>GrabYourDealz v1.0</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
          <Link
            href="/admin"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              color: '#e2e8f0',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', padding: '1rem 0.85rem 0.35rem' }}>
            Marketplace
          </div>

          <Link
            href="/admin/stores"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              color: '#cbd5e1',
              fontWeight: 500,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <Store size={18} />
            <span>Stores & Brands</span>
          </Link>

          <Link
            href="/admin/coupons"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              color: '#cbd5e1',
              fontWeight: 500,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <Tag size={18} />
            <span>Coupons & Deals</span>
          </Link>

          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', padding: '1rem 0.85rem 0.35rem' }}>
            Taxonomies
          </div>

          <Link
            href="/admin/countries"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              color: '#cbd5e1',
              fontWeight: 500,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <Globe size={18} />
            <span>Countries / Regions</span>
          </Link>

          <Link
            href="/admin/categories"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              color: '#cbd5e1',
              fontWeight: 500,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <FolderTree size={18} />
            <span>Categories</span>
          </Link>

          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', padding: '1rem 0.85rem 0.35rem' }}>
            Content & System
          </div>

          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              color: '#34d399',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={18} />
            <span>View Live Website</span>
          </Link>
        </nav>

        {/* User Info & Logout */}
        <div style={{
          paddingTop: '1rem',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 700 }}>
              {session?.name || 'Administrator'}
            </div>
            <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
              {session?.email || 'admin@grabyourdealz.com'}
            </div>
          </div>

          <form action="/api/admin/auth/logout" method="POST">
            <button
              type="submit"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ef4444',
                cursor: 'pointer',
                padding: '0.4rem',
                borderRadius: 'var(--radius-sm)',
              }}
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </form>
        </div>

      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
        {children}
      </main>

    </div>
  );
}
