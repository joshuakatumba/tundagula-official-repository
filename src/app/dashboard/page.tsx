"use client";

import React from 'react';
import { useData } from '../../DataContext';
import { useLang } from '../../context/LanguageContext';
import { updateHarvest } from '../actions';
import Link from 'next/link';
import { 
  Package, DollarSign, Carrot, Star, Plus, Calendar, User, Smartphone, Pencil, Check
} from 'lucide-react';

export default function DashboardPage() {
  const { listings, orders, harvests, profile, transactions, loading, refreshData } = useData();
  const { t } = useLang();

  if (loading) return <div style={{padding: '40px', textAlign: 'center'}}>Loading dynamic data...</div>;

  // ─── DYNAMIC CALCULATIONS ───
  const currentMonthEarnings = transactions
    .filter((t: any) => t.type === 'income' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((acc: number, t: any) => acc + parseInt(t.amount.replace(/[^0-9]/g, '')), 0);

  const completionTasks = [
    { label: 'Farm details updated', done: !!profile?.description },
    { label: `${listings.length} produce listings created`, done: listings.length >= 3 },
    { label: 'Location verified', done: !!profile?.location },
    { label: 'Harvest calendar updated', done: harvests.length > 0 }
  ];
  const completionRate = Math.round((completionTasks.filter(t => t.done).length / completionTasks.length) * 100);

  return (
    <>
      {/* ALERT */}
      {orders.length > 0 && orders[0].status === 'New' && (
        <div className="alert-banner">
          <div className="alert-icon" style={{display: 'flex', alignItems: 'center'}}><Package size={18} /></div>
          <div><strong>New order from {orders[0].customer}</strong> — {orders[0].quantity} {orders[0].produce} requested for {orders[0].delivery_date}. <Link href="/dashboard/orders" style={{color:'var(--leaf)', fontWeight:'700'}}>Review & Accept →</Link></div>
          <span className="alert-dismiss">×</span>
        </div>
      )}

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card green">
          <div className="stat-icon"><DollarSign size={24} /></div>
          <div className="stat-label">This Month's Earnings</div>
          <div className="stat-value">UGX {(currentMonthEarnings / 1000).toFixed(0)}K</div>
          <div className="stat-change up">↑ Updated live</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon"><Package size={24} /></div>
          <div className="stat-label">Active Orders</div>
          <div className="stat-value">{orders.filter((o: any) => o.status !== 'Delivered').length}</div>
          <div className="stat-change up">↑ {orders.filter((o: any) => o.status === 'New').length} new today</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon"><Carrot size={24} /></div>
          <div className="stat-label">Active Listings</div>
          <div className="stat-value">{listings.length}</div>
          <div className="stat-change">across categories</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon"><Star size={24} /></div>
          <div className="stat-label">Average Rating</div>
          <div className="stat-value">{profile?.rating || '0.0'}</div>
          <div className="stat-change up">from customer reviews</div>
        </div>
      </div>

      {/* TWO COLUMN */}
      <div className="two-col">

        {/* ORDERS */}
        <div className="box">
          <div className="box-header">
            <div className="box-title">Recent Orders</div>
            <Link href="/dashboard/orders" className="box-link">View all</Link>
          </div>
          <div className="box-body" style={{paddingTop:'8px'}}>
            {orders.slice(0, 5).map((order: any) => (
              <div key={order.id} className="order-row">
                <div className="order-avatar">{order.icon}</div>
                <div className="order-info">
                  <div className="order-name">{order.customer}</div>
                  <div className="order-detail">{order.quantity} {order.produce} · {order.delivery_date}</div>
                </div>
                <div className="order-amount">{order.amount}</div>
                <div className={`order-badge badge-${order.status?.toLowerCase().replace(' ', '-')}`}>
                  {order.status}
                </div>
              </div>
            ))}
            {orders.length === 0 && <div className="order-row">No orders found.</div>}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>

          {/* QUICK ACTIONS */}
          <div className="box">
            <div className="box-header">
              <div className="box-title">Quick Actions</div>
            </div>
            <div className="box-body">
              <div className="quick-actions">
                <Link href="/dashboard/listings" className="qa-btn">
                  <div className="qa-icon green" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Plus size={20} /></div>
                  <div><div className="qa-label">Add New Listing</div><div className="qa-sub">Post produce for sale</div></div>
                  <div className="qa-arrow">›</div>
                </Link>
                <Link href="/dashboard/calendar" className="qa-btn">
                  <div className="qa-icon gold" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Calendar size={20} /></div>
                  <div><div className="qa-label">Update Harvest Dates</div><div className="qa-sub">Let restaurants plan ahead</div></div>
                  <div className="qa-arrow">›</div>
                </Link>
                <Link href="/dashboard/profile" className="qa-btn">
                  <div className="qa-icon blue" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><User size={20} /></div>
                  <div><div className="qa-label">Edit Farm Profile</div><div className="qa-sub">Update your storefront</div></div>
                  <div className="qa-arrow">›</div>
                </Link>
                <Link href="/dashboard/momo" className="qa-btn">
                  <div className="qa-icon orange" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Smartphone size={20} /></div>
                  <div><div className="qa-label">Withdraw Earnings</div><div className="qa-sub">Send to MTN MoMo</div></div>
                  <div className="qa-arrow">›</div>
                </Link>
              </div>
            </div>
          </div>

          {/* PROFILE COMPLETION */}
          <div className="box">
            <div className="box-header">
              <div className="box-title">Profile Completion</div>
            </div>
            <div className="box-body" style={{paddingTop:'12px'}}>
              <div className="profile-progress-wrap">
                <div className="pp-header">
                  <span className="pp-title">Your profile is {completionRate}% complete</span>
                  <span className="pp-pct">{completionRate}%</span>
                </div>
                <div className="pp-bar-wrap"><div className="pp-bar-fill" style={{width: `${completionRate}%`}}></div></div>
                <div className="pp-tasks">
                  {completionTasks.map((task, idx) => (
                    <div key={idx} className={`pp-task ${task.done ? 'done' : ''}`}>
                      <div className="pp-task-dot" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{task.done ? <Check size={12} /> : ''}</div> {task.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* HARVEST CALENDAR PREVIEW */}
      <div className="box">
        <div className="box-header">
          <div className="box-title">Upcoming Harvests</div>
          <Link href="/dashboard/calendar" className="box-link">Manage Calendar</Link>
        </div>
        <div className="box-body" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))',gap:'0 24px',paddingTop:'8px'}}>
          {harvests.map((h: any) => (
            <div key={h.id} className="cal-row">
              <div className="cal-date"><div className="cal-month">{h.month}</div><div className="cal-day">{h.day}</div></div>
              <div>
                <div className="cal-produce">{h.produce}</div>
                <div className="cal-qty">Est. {h.quantity} available</div>
              </div>
              <div className="cal-icon" style={{cursor:'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-muted)'}} onClick={() => {
                const newQty = prompt("Update quantity for " + h.produce, h.quantity);
                if (newQty) updateHarvest(h.id, newQty).then(refreshData);
              }}>
                <Pencil size={16} />
              </div>
            </div>
          ))}
          {harvests.length === 0 && <div className="cal-row">No upcoming harvests.</div>}
        </div>
      </div>
    </>
  );
}
