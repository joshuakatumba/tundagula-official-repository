"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '../context/LanguageContext';
import { useData } from '../DataContext';
import { 
  Home, Package, Carrot, Calendar, DollarSign, Smartphone, 
  User, Star, Settings, LogOut, MapPin
} from 'lucide-react';

export default function Sidebar() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const { profile, orders } = useData();
  const pendingOrdersCount = orders.filter((o: any) => o.status === 'PENDING').length;

  const isActive = (path: string) => pathname === path || pathname === `${path}/`;

  const navSections = [
    {
      label: t('nav_main'),
      items: [
        { href: '/dashboard', label: t('nav_dashboard'), icon: <Home size={18} /> },
        { href: '/dashboard/orders', label: t('nav_orders'), icon: <Package size={18} />, badge: pendingOrdersCount > 0 ? pendingOrdersCount : null },
        { href: '/dashboard/listings', label: t('nav_listings'), icon: <Carrot size={18} /> },
        { href: '/dashboard/calendar', label: t('nav_calendar'), icon: <Calendar size={18} /> },
      ]
    },
    {
      label: t('nav_finance'),
      items: [
        { href: '/dashboard/earnings', label: t('nav_earnings'), icon: <DollarSign size={18} /> },
        { href: '/dashboard/momo', label: t('nav_momo'), icon: <Smartphone size={18} /> },
      ]
    },
    {
      label: t('nav_profile_sec'),
      items: [
        { href: '/dashboard/profile', label: t('nav_farm_profile'), icon: <User size={18} /> },
        { href: '/dashboard/reviews', label: t('nav_reviews'), icon: <Star size={18} /> },
        { href: '/dashboard/settings', label: t('nav_settings'), icon: <Settings size={18} /> },
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-text">Tunda<span>Gula</span></div>
        <div className="logo-badge">{t('farmer_portal')}</div>
      </div>

      <div className="lang-switcher">
        <div className="lang-label">{t('language')}</div>
        <div className="lang-pills">
          <button className={`lang-pill ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
          <button className={`lang-pill ${lang === 'sw' ? 'active' : ''}`} onClick={() => setLang('sw')}>SW</button>
          <button className={`lang-pill ${lang === 'lg' ? 'active' : ''}`} onClick={() => setLang('lg')}>LG</button>
        </div>
      </div>

      <div className="sidebar-farmer">
        <div className="farmer-avatar">{profile?.name?.substring(0, 2).toUpperCase() || 'TG'}</div>
        <div>
          <div className="farmer-name">{profile?.name || 'Farmer'}</div>
          <div className="farmer-status"><span className="dot-green"></span> <span>{t('profile_active')}</span></div>
          <div className="farmer-region">
            <MapPin size={14} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline-block' }} />
            <span>{profile?.location || t('region_central')}</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navSections.map((section, idx) => (
          <React.Fragment key={idx}>
            <div className="nav-section-label">{section.label}</div>
            {section.items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              >
                {item.icon && <span className="nav-icon">{item.icon}</span>}
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </Link>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div style={{ padding: '12px 20px' }}>
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            borderRadius: '10px',
            background: 'rgba(244, 67, 54, 0.08)',
            color: '#f44336',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '700',
            transition: 'all 0.2s ease'
          }}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </a>
      </div>
      <div className="sidebar-footer">Tunda Gula v1.0 · Uganda</div>
    </aside>
  );
}
