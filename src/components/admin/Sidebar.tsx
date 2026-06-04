"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BarChart2, Map, Users, Utensils, ShieldCheck, 
  Package, AlertTriangle, Truck, CreditCard, DollarSign, FileText, 
  Settings, ClipboardList 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navSections = [
    {
      label: 'Platform',
      items: [
        { href: '/admin', label: 'Overview', icon: <LayoutDashboard size={18} /> },
        { href: '/admin/analytics', label: 'Analytics', icon: <BarChart2 size={18} /> },
        { href: '#', label: 'District Map', icon: <Map size={18} /> },
      ]
    },
    {
      label: 'Users',
      items: [
        { href: '#', label: 'Farmers', icon: <Users size={18} />, badge: { text: '7 pending', color: 'amber' } },
        { href: '#', label: 'Restaurants', icon: <Utensils size={18} /> },
        { href: '/admin/verification', label: 'Verification Queue', icon: <ShieldCheck size={18} />, badge: { text: '5', color: 'red' } },
      ]
    },
    {
      label: 'Operations',
      items: [
        { href: '#', label: 'Orders', icon: <Package size={18} /> },
        { href: '#', label: 'Disputes', icon: <AlertTriangle size={18} />, badge: { text: '2', color: 'red' } },
        { href: '#', label: 'Logistics', icon: <Truck size={18} /> },
        { href: '#', label: 'Escrow & Payments', icon: <CreditCard size={18} /> },
      ]
    },
    {
      label: 'Finance',
      items: [
        { href: '#', label: 'Revenue', icon: <DollarSign size={18} /> },
        { href: '#', label: 'Invoices', icon: <FileText size={18} /> },
      ]
    },
    {
      label: 'System',
      items: [
        { href: '#', label: 'Settings', icon: <Settings size={18} /> },
        { href: '#', label: 'Audit Log', icon: <ClipboardList size={18} /> },
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sb-logo">
        <div className="sb-logo-text">// TUNDA GULA</div>
        <div className="sb-logo-sub">Admin Console v1.0</div>
      </div>
      <div className="sb-admin">
        <div className="sb-admin-dot" />
        <div>
          <div className="sb-admin-name">David Onyango</div>
          <div className="sb-admin-role">SUPER_ADMIN</div>
        </div>
      </div>
      <nav className="sb-nav">
        {navSections.map((section, idx) => (
          <React.Fragment key={idx}>
            <div className="sb-section">{section.label}</div>
            {section.items.map((item, i) => (
              <Link 
                key={i} 
                href={item.href} 
                className={`sb-link ${isActive(item.href) ? 'active' : ''}`}
              >
                <span className="sb-icon">{item.icon}</span> 
                {item.label}
                {item.badge && (
                  <span className={`sb-badge ${item.badge.color}`}>
                    {item.badge.text}
                  </span>
                )}
              </Link>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div className="sb-footer">v1.0.0 · UG · 01 Apr 2026</div>
    </aside>
  );
}
