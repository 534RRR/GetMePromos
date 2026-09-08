import React from 'react';
import { getAdminSession } from '@/lib/auth';
import AdminSidebar from '@/components/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If unauthenticated (e.g. on login page), render clean standalone layout
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--header-height))', background: 'var(--bg-main)' }}>
      {/* Dynamic CMS Sidebar with active route highlighting */}
      <AdminSidebar session={session} />

      {/* Main Content Area */}
      <main className="admin-layout-main" style={{ flex: 1, padding: '2.5rem', overflowY: 'auto', minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
