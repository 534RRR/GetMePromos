'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Users,
  Crown,
} from 'lucide-react';
import { AdminPayload } from '@/lib/auth';

interface AdminSidebarProps {
  session: AdminPayload;
}

export default function AdminSidebar({ session }: AdminSidebarProps) {
  const pathname = usePathname();

  const isNavActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const navItems = [
    {
      group: null,
      items: [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      group: 'Marketplace',
      items: [
        { name: 'Stores & Brands', href: '/admin/stores', icon: Store },
        { name: 'Coupons & Deals', href: '/admin/coupons', icon: Tag },
      ],
    },
    {
      group: 'Taxonomies',
      items: [
        { name: 'Countries / Regions', href: '/admin/countries', icon: Globe },
        { name: 'Categories', href: '/admin/categories', icon: FolderTree },
      ],
    },
    {
      group: 'Editorial & Content',
      items: [
        { name: 'Blogs & Guides', href: '/admin/blogs', icon: FileText },
        { name: 'Store Reviews', href: '/admin/reviews', icon: Star },
      ],
    },
    {
      group: 'System & Access',
      items: [
        ...(session.role === 'super_admin'
          ? [{ name: 'Admin Users', href: '/admin/users', icon: Users }]
          : []),
        { name: 'Site Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className="admin-layout-sidebar"
      style={{
        width: '260px',
        background: 'var(--slate-950)',
        color: 'var(--slate-400)',
        borderRight: '1px solid var(--slate-800)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem 1rem',
        flexShrink: 0,
        height: 'calc(100vh - var(--header-height))',
        position: 'sticky',
        top: 'var(--header-height)',
      }}
    >
      {/* Admin Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0 0.5rem', marginBottom: '1.75rem' }}>
        <div
          style={{
            background: 'var(--primary)',
            color: '#fff',
            width: '34px',
            height: '34px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px var(--primary-glow)',
          }}
        >
          <Shield size={18} />
        </div>
        <div>
          <div style={{ color: '#ffffff', fontWeight: 900, fontSize: '1.02rem', letterSpacing: '-0.02em' }}>
            CMS Engine
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--slate-500)' }}>RefPromos Control</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }}>
        {navItems.map((section, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {section.group && (
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--slate-500)',
                  padding: '1rem 0.8rem 0.35rem',
                }}
              >
                {section.group}
              </div>
            )}

            {section.items.map((item) => {
              const active = isNavActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    color: active ? '#ffffff' : 'var(--slate-400)',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    background: active
                      ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%)'
                      : 'transparent',
                    borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                  className={active ? '' : 'hover-admin-nav'}
                >
                  <Icon
                    size={16}
                    color={active ? 'var(--primary)' : 'currentColor'}
                    style={{ flexShrink: 0 }}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        ))}

        {/* Public Website Link */}
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--slate-800)' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              color: '#34d399',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
            className="hover-admin-nav"
          >
            <ExternalLink size={16} style={{ flexShrink: 0 }} />
            <span>View Live Website</span>
          </Link>
        </div>
      </nav>

      {/* User Info & Logout Button */}
      <div
        style={{
          paddingTop: '1rem',
          borderTop: '1px solid var(--slate-800)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: '0.25rem' }}>
            <span
              style={{
                background: session.role === 'super_admin' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(5, 150, 105, 0.2)',
                color: session.role === 'super_admin' ? '#f59e0b' : '#34d399',
                border: `1px solid ${session.role === 'super_admin' ? '#f59e0b' : '#059669'}`,
                fontSize: '0.65rem',
                fontWeight: 800,
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              {session.role === 'super_admin' && <Crown size={10} />}
              {session.role === 'super_admin' ? 'Super Admin' : 'Admin'}
            </span>
          </div>
          <div style={{ color: 'var(--slate-400)', fontSize: '0.75rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {session.email}
          </div>
        </div>

        <form action="/api/admin/auth/logout" method="POST">
          <button
            type="submit"
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#ef4444',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
            title="Sign Out of CMS"
          >
            <LogOut size={16} />
          </button>
        </form>
      </div>
    </aside>
  );
}
