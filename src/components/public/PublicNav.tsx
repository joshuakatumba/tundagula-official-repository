"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/landing', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Tunda Gula' },
  { href: '/about', label: 'About' },
];

export default function PublicNav() {
  const pathname = usePathname();

  return (
    <nav className="public-nav">
      <Link href="/landing" className="nav-logo">Tunda<span>Gula</span></Link>
      <div className="nav-page-tabs">
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} className={`ntab ${pathname === t.href ? 'active' : ''}`}>
            {t.label}
          </Link>
        ))}
      </div>
      <div style={{display: 'flex', gap: '24px', alignItems: 'center'}}>
        <Link href="/login" className="nav-login" style={{fontWeight: 700, color: '#1a1a1a', textDecoration: 'none'}}>Login</Link>
        <Link href="/registration" className="nav-cta" style={{textDecoration: 'none'}}>Register Your Farm →</Link>
      </div>
    </nav>
  );
}
