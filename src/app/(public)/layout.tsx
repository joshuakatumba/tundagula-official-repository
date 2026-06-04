import React from 'react';
import PublicNav from '@/components/public/PublicNav';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="public-theme">
      <PublicNav />
      <main style={{ paddingTop: 64 }}>
        {children}
      </main>
    </div>
  );
}
