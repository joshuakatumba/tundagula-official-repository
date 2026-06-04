"use client";

import React from 'react';
import { useLang } from '../context/LanguageContext';
import { useData } from '../DataContext';
import Link from 'next/link';
import { IconMapPin } from './Icons';

export default function Topbar() {
  const { t } = useLang();
  const { notifications, profile, orders } = useData();
  const pendingOrdersCount = orders.filter((o: any) => o.status === 'PENDING').length;
  const unreadNotifs = notifications.filter((n: any) => !n.is_read).length;
  
  // Total alerts = pending orders + unread notifications
  const totalAlerts = pendingOrdersCount + unreadNotifs;

  const hour = new Date().getHours();
  let greetingKey = 'greeting_morning';
  if (hour >= 12 && hour < 18) greetingKey = 'greeting_afternoon';
  if (hour >= 18) greetingKey = 'greeting_evening';

  return (
    <div className="topbar">
      <div className="topbar-title">{t(greetingKey)}, {profile?.name || 'Farmer'}</div>
      <div className="topbar-right">
        <Link href="/dashboard/profile" className="topbar-region-badge" style={{textDecoration:'none', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '6px'}}>
          📍
          <span>{profile?.location || t('region_central')}</span>
        </Link>
        <Link href="/dashboard/orders" className="notif-btn" style={{position: 'relative', textDecoration:'none'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--text-soft-public)'}}>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          {totalAlerts > 0 && (
            <span className="notif-dot" style={{
              position: 'absolute', 
              top: '4px', 
              right: '4px', 
              backgroundColor: '#f44336', 
              color: 'white', 
              fontSize: '9px', 
              fontWeight: '800',
              padding: '1px 4px', 
              borderRadius: '10px',
              border: '2px solid white',
              lineHeight: '1'
            }}>
              {totalAlerts}
            </span>
          )}
        </Link>
        <Link href="/dashboard/orders" className="btn-order-now" style={{textDecoration:'none'}}>
          {t('nav_orders')}
        </Link>
      </div>
    </div>
  );
}
