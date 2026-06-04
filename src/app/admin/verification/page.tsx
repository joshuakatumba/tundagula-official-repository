"use client";
import React, { useState } from 'react';
import Topbar from '@/components/admin/Topbar';
import {
  verificationStats, verificationFilterTabs, farmerCards,
  farmerDetailPanels
} from '@/lib/adminData';

export default function VerificationPage() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [selectedFarmer, setSelectedFarmer] = useState('RK');
  const detail = farmerDetailPanels[selectedFarmer];

  return (
    <>
      <Topbar title="users / verification_queue" />
      <div className="content">
        {/* Queue Stats */}
        <div className="queue-stats">
          {verificationStats.map((s, i) => (
            <div key={i} className="qs-card">
              <div className="qs-label">{s.label}</div>
              <div className={`qs-val ${s.valueColor}`}>{s.value}</div>
              <div className="qs-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filter-row">
          <div className="filter-tabs">
            {verificationFilterTabs.map((tab, i) => (
              <button
                key={i}
                className={`ftab ${activeFilter === i ? 'active' : ''}`}
                onClick={() => setActiveFilter(i)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="filter-spacer" />
          <div className="search-box">
            🔍 <input placeholder="Search farmer name or district..." />
          </div>
          <select className="sort-sel" defaultValue="Sort: Oldest first">
            <option>Sort: Oldest first</option>
            <option>Sort: Newest first</option>
            <option>Sort: District</option>
          </select>
        </div>

        {/* Layout: List + Detail */}
        <div className="verify-layout">
          <div className="queue-list">
            {farmerCards.map((f) => (
              <div
                key={f.id}
                className={`farmer-card ${selectedFarmer === f.id ? 'selected' : ''}`}
                onClick={() => setSelectedFarmer(f.id)}
              >
                <div className="fc-head">
                  <div className="fc-avatar">{f.initials}</div>
                  <div>
                    <div className="fc-name">{f.name}</div>
                    <div className="fc-meta">{f.contact} · {f.email}</div>
                  </div>
                  <div className="fc-status">
                    <span className={`badge ${f.statusColor}`}>{f.status}</span>
                    <div className="fc-submitted">{f.submitted}</div>
                  </div>
                </div>
                <div className="fc-body">
                  <div className="fc-field">
                    <div className="fc-field-label">District</div>
                    <div className="fc-field-val"><strong>{f.district}</strong></div>
                  </div>
                  <div className="fc-field">
                    <div className="fc-field-label">Farm Type</div>
                    <div className="fc-field-val">{f.farmType}</div>
                  </div>
                  <div className="fc-field">
                    <div className="fc-field-label">Farm Size</div>
                    <div className="fc-field-val">{f.farmSize}</div>
                  </div>
                  <div className="fc-field">
                    <div className="fc-field-label">Plan</div>
                    <div className="fc-field-val">{f.plan}</div>
                  </div>
                </div>
                <div className="fc-docs">
                  {f.docs.map((d, j) => (
                    <div key={j} className={`doc-chip ${d.missing ? 'missing' : ''}`}>
                      {d.icon} {d.label}
                    </div>
                  ))}
                </div>
                <div className="fc-actions">
                  <button className="act-btn approve">✓ Approve</button>
                  <button className="act-btn reject">✗ Reject</button>
                  <button className="act-btn review">⏸ Hold</button>
                  <button className="act-btn contact">✉ Contact</button>
                </div>
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          {detail && (
            <div className="detail-panel">
              <div className="dp-header">
                <div className="dp-title">// FARMER REVIEW</div>
                <div className="dp-subtitle">{detail.subtitle}</div>
              </div>
              <div className="dp-body">
                <div className="dp-section">
                  <div className="dp-section-title">Profile Details</div>
                  {detail.fields.map((f, i) => (
                    <div key={i} className="dp-field">
                      <div className="dp-field-key">{f.key}</div>
                      <div className="dp-field-val" style={f.mono ? { fontFamily: 'var(--mono)', fontSize: 12 } : undefined}>
                        {f.badge ? <span className={`badge ${f.badgeColor}`}>{f.value}</span> : f.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dp-section">
                  <div className="dp-section-title">Verification Checklist</div>
                  <div className="checklist">
                    {detail.checklist.map((c, i) => (
                      <div key={i} className="check-item">
                        <div className={`check-icon ${c.icon}`}>{c.iconChar}</div>
                        <div className="check-label" dangerouslySetInnerHTML={{ __html: c.label }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="dp-section">
                  <div className="dp-section-title">Admin Notes</div>
                  <textarea className="note-box" placeholder="Add internal notes about this farmer..." />
                </div>
                <div className="dp-actions">
                  <button className="dp-btn approve">✓ Approve Farmer</button>
                  <button className="dp-btn reject">✗ Reject Application</button>
                  <button className="dp-btn info">📩 Request Missing Info</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
