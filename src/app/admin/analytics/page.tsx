"use client";
import React, { useState } from 'react';
import {
  analyticsKPIs, gmvByMonth, produceBreakdown, topDistrictsByOrders,
  topFarmers, revenueStreams, escrowBreakdown, growthMetrics,
  disputeKPIs, disputeCards, disputeDetails
} from '@/lib/adminData';

export default function AnalyticsDisputesPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'disputes'>('analytics');
  const [selectedDispute, setSelectedDispute] = useState('D019');
  const dd = disputeDetails[selectedDispute];

  return (
    <>
      {/* Custom Topbar with Tabs */}
      <div className="topbar">
        <div className="topbar-left">
          <div className="topbar-title">admin / <span>{activeTab}</span></div>
          <div className="live-indicator"><div className="live-dot" /> LIVE</div>
        </div>
        <div className="topbar-tabs">
          <button className={`ttab ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>📊 Analytics</button>
          <button className={`ttab ${activeTab === 'disputes' ? 'active' : ''}`} onClick={() => setActiveTab('disputes')}>⚠️ Disputes <span className="badge red" style={{ marginLeft: 6 }}>2</span></button>
        </div>
      </div>

      <div className="content">
        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div>
            <div className="kpi-grid">
              {analyticsKPIs.map((k, i) => (
                <div key={i} className="kpi">
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-val">{k.value}</div>
                  <div className={`kpi-delta ${k.deltaType}`}>{k.delta}</div>
                </div>
              ))}
            </div>

            <div className="analytics-grid">
              {/* GMV by Month */}
              <div className="panel">
                <div className="ph"><div className="ph-title">GMV by Month</div></div>
                <div className="pb">
                  <div className="bar-chart">
                    {gmvByMonth.map((b, i) => (
                      <div key={i} className="bc-col">
                        <div className="bc-val">{b.value}</div>
                        <div className={`bc-bar ${b.type}`} style={{ height: b.height }} />
                        <div className="bc-label">{b.month}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Produce Breakdown */}
              <div className="panel">
                <div className="ph"><div className="ph-title">Produce Breakdown</div></div>
                <div className="pb">
                  <div className="donut-row">
                    {produceBreakdown.map((p, i) => (
                      <div key={i} className="donut-item">
                        <span style={{ fontSize: 18 }}>{p.icon}</span>
                        <div className="donut-label">{p.label}</div>
                        <div className="donut-bar-wrap">
                          <div className="donut-bar" style={{ width: p.width, background: p.color }} />
                        </div>
                        <div className="donut-pct">{p.pct}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Farmers Table */}
            <div className="panel" style={{ marginBottom: 16 }}>
              <div className="ph"><div className="ph-title">Top Farmers by GMV</div><div className="ph-link">Export</div></div>
              <div className="pb">
                <table className="dt">
                  <thead>
                    <tr><th>#</th><th>FARMER</th><th>DISTRICT</th><th>CATEGORY</th><th>ORDERS</th><th>GMV (UGX)</th><th>RATING</th><th>STATUS</th></tr>
                  </thead>
                  <tbody>
                    {topFarmers.map((f, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: f.rankColor }}>{f.rank}</td>
                        <td style={{ fontWeight: 600, color: 'var(--text)' }}>{f.name}</td>
                        <td>{f.district}</td>
                        <td>{f.category}</td>
                        <td style={{ fontFamily: 'var(--mono)' }}>{f.orders}</td>
                        <td style={{ fontFamily: 'var(--mono)' }}>{f.gmv}</td>
                        <td style={{ fontFamily: 'var(--mono)', color: 'var(--amber)' }}>{f.rating}</td>
                        <td><span className="badge green">{f.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="analytics-grid three">
              {/* Revenue Streams */}
              <div className="panel">
                <div className="ph"><div className="ph-title">Revenue Streams</div></div>
                <div className="pb">
                  <div className="donut-row">
                    {revenueStreams.map((r, i) => (
                      <div key={i} className="donut-item">
                        <div className="donut-label">{r.label}</div>
                        <div className="donut-bar-wrap">
                          <div className="donut-bar" style={{ width: r.width, background: r.color }} />
                        </div>
                        <div className="donut-pct">{r.pct}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Escrow Status */}
              <div className="panel">
                <div className="ph"><div className="ph-title">Escrow Status</div></div>
                <div className="pb">
                  <div className="donut-row">
                    {escrowBreakdown.map((e, i) => (
                      <div key={i} className="donut-item">
                        <div className="donut-label">{e.label}</div>
                        <div className="donut-bar-wrap">
                          <div className="donut-bar" style={{ width: e.width, background: e.color }} />
                        </div>
                        <div className="donut-pct">{e.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Growth */}
              <div className="panel">
                <div className="ph"><div className="ph-title">Growth Metrics</div></div>
                <div className="pb">
                  <div className="donut-row">
                    {growthMetrics.map((g, i) => (
                      <div key={i} className="donut-item">
                        <div className="donut-label">{g.label}</div>
                        <div className="donut-bar-wrap">
                          <div className="donut-bar" style={{ width: g.width, background: g.color }} />
                        </div>
                        <div className="donut-pct">{g.pct}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DISPUTES TAB */}
        {activeTab === 'disputes' && (
          <div>
            <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
              {disputeKPIs.map((k, i) => (
                <div key={i} className="kpi">
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-val" style={{ color: k.valueColor }}>{k.value}</div>
                  <div className={`kpi-delta ${k.deltaType}`}>{k.delta}</div>
                </div>
              ))}
            </div>

            <div className="dispute-layout">
              <div className="dispute-list">
                {disputeCards.map((d) => (
                  <div
                    key={d.id}
                    className={`disp-card ${selectedDispute === d.id ? 'selected' : ''} ${d.resolved ? 'resolved' : ''}`}
                    onClick={() => setSelectedDispute(d.id)}
                  >
                    <div className="dc-head">
                      <div>
                        <div className="dc-id">{d.disputeId}</div>
                        <div className="dc-title">{d.title}</div>
                        <div className="dc-meta">{d.meta}</div>
                      </div>
                      <div className="dc-badge-wrap">
                        <span className={`badge ${d.statusColor}`}>{d.status}</span>
                        <div className="dc-time">{d.timeLabel}</div>
                      </div>
                    </div>
                    <div className="dc-body">
                      <div>
                        <div className="dc-field-label">Order Value</div>
                        <div className="dc-field-val"><strong>{d.orderValue}</strong></div>
                      </div>
                      <div>
                        <div className="dc-field-label">Issue</div>
                        <div className="dc-field-val">{d.issueType}</div>
                      </div>
                      <div>
                        <div className="dc-field-label">Escrow</div>
                        <div className="dc-field-val" style={{ color: d.escrowColor }}>{d.escrowStatus}</div>
                      </div>
                    </div>
                    {!d.resolved && (
                      <div className="dc-actions">
                        <button className="da-btn resolve">✓ Resolve</button>
                        <button className="da-btn refund">💰 Refund</button>
                        <button className="da-btn escalate">⚠ Escalate</button>
                        <button className="da-btn contact">✉ Contact</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Dispute Detail */}
              {dd && (
                <div className="dd-panel">
                  <div className="dd-header">
                    <div className="dd-id">{dd.disputeId}</div>
                    <div className="dd-title">{dd.title}</div>
                  </div>
                  <div className="dd-section">
                    <div className="dd-sec-title">Parties</div>
                    <div className="dd-row"><div className="dd-key">Restaurant</div><div className="dd-val">{dd.restaurant}</div></div>
                    <div className="dd-row"><div className="dd-key">Farmer</div><div className="dd-val">{dd.farmer}</div></div>
                    <div className="dd-row"><div className="dd-key">Order</div><div className="dd-val">{dd.orderId}</div></div>
                  </div>
                  <div className="dd-section">
                    <div className="dd-sec-title">Financials</div>
                    <div className="dd-row"><div className="dd-key">Order Value</div><div className="dd-val">{dd.orderValue}</div></div>
                    <div className="dd-row"><div className="dd-key">Escrow</div><div className="dd-val" style={{ color: 'var(--amber)' }}>{dd.escrow}</div></div>
                  </div>
                  <div className="dd-section">
                    <div className="dd-sec-title">Claim</div>
                    <p style={{ fontSize: 13, color: 'var(--text-soft)', fontStyle: 'italic' }}>{dd.claim}</p>
                  </div>
                  <div className="dd-section">
                    <div className="dd-sec-title">Timeline</div>
                    <div className="timeline">
                      {dd.timeline.map((t, i) => (
                        <div key={i} className="tl-item">
                          <div className={`tl-dot ${t.dotColor}`} />
                          <div>
                            <div className="tl-text" dangerouslySetInnerHTML={{ __html: t.text }} />
                            <span className="tl-time">{t.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="dd-actions">
                    <button className="dda-btn resolve">✓ Mark Resolved</button>
                    <button className="dda-btn refund">💰 Issue Partial Refund</button>
                    <button className="dda-btn ghost">📩 Contact Both Parties</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
