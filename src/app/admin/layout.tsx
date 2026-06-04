import React from 'react';
import Sidebar from '@/components/admin/Sidebar';

export const metadata = {
  title: 'Tunda Gula Admin',
  description: 'Admin Portal for Tunda Gula',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-theme">
      <Sidebar />
      <div className="main" style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', marginLeft: 'var(--sw)' }}>
        {children}
      </div>
    </div>
  );
}
