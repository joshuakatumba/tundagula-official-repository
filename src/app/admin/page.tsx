"use client";
import React from 'react';
import Topbar from '@/components/admin/Topbar';
import { AlertTriangle, Check, X } from 'lucide-react';
import {
  dashboardStats, orderVolumeChart, orderVolumeMetrics,
  platformHealth, recentOrders, verifyQueueMini,
  geoDistribution, activityLog
} from '@/lib/adminData';

export default function AdminDashboardPage() {
  return (
    <>
      <Topbar title="overview" />
      <div className="content">
        {/* Alert Bar */}
        <div className="alert-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={16} /> <span><strong>5 farmers</strong> awaiting verification — oldest submitted 38hrs ago.</span>
          <span className="alert-bar-link">Review Queue →</span>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          {dashboardStats.map((s, i) => (
            <div key={i} className={`stat ${s.color}`}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-val">{s.value}</div>
              <div className={`stat-delta ${s.deltaType}`}>{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Order Volume + Platform Health */}
        <div className="grid-3-2">
          <div className="panel span-2">
            <div className="panel-head">
              <div className="panel-title">Order Volume — 12 Weeks</div>
              <div className="panel-link">Export CSV</div>
            </div>
            <div className="panel-body">
              <div className="mini-chart" style={{ height: 80 }}>
                {orderVolumeChart.map((bar, i) => (
                  <div key={i} className={`mc-bar ${bar.type}`} style={{ height: bar.height }} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {orderVolumeMetrics.map((m, i) => (
                  <div key={i} style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{m.label}</span>{' '}
                    <span style={{ color: m.color, fontWeight: 600 }}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Platform Health</div>
            </div>
            <div className="panel-body">
              <div className="health-grid">
                {platformHealth.map((h, i) => (
                  <div key={i} className="health-item">
                    <div className="health-label">{h.label}</div>
                    <div className={`health-val ${h.color}`}>{h.value}</div>
                    <div className="health-bar-wrap">
                      <div className={`health-bar ${h.color}`} style={{ width: h.barWidth }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders + Verification Queue + Geo */}
        <div className="grid-3-2">
          <div className="panel span-2">
            <div className="panel-head">
              <div className="panel-title">Recent Orders</div>
              <div className="panel-link">View All</div>
            </div>
            <div className="panel-body">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ORDER</th><th>RESTAURANT</th><th>FARMER</th>
                    <th>VALUE (UGX)</th><th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o, i) => (
                    <tr key={i}>
                      <td className="td-mono">{o.id}</td>
                      <td className="td-main">{o.restaurant}</td>
                      <td>{o.farmer}</td>
                      <td className="td-mono">{o.value}</td>
                      <td><span className={`badge ${o.badgeColor}`}>{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Verification Queue</div>
              <div className="panel-link">View All →</div>
            </div>
            <div className="panel-body">
              {verifyQueueMini.map((v, i) => (
                <div key={i} className="verify-row">
                  <div className="verify-avatar">{v.initials}</div>
                  <div>
                    <div className="verify-name">{v.name}</div>
                    <div className="verify-meta">{v.meta}</div>
                  </div>
                  <div className="verify-actions">
                    <button className="vbtn approve"><Check size={16} /></button>
                    <button className="vbtn reject"><X size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geo + Activity */}
        <div className="grid-2-1">
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Geo Distribution</div>
              <div className="panel-link">View Map</div>
            </div>
            <div className="panel-body">
              <div className="geo-grid">
                {geoDistribution.map((g, i) => (
                  <div key={i} className="geo-row">
                    <div className="geo-label">{g.label}</div>
                    <div className="geo-bar-wrap">
                      <div className="geo-bar" style={{ width: g.width, background: g.barBg }} />
                    </div>
                    <div className="geo-count">{g.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Activity Log</div>
              <div className="panel-link">View All</div>
            </div>
            <div className="panel-body">
              {activityLog.map((a, i) => (
                <div key={i} className="activity-row">
                  <div className={`act-dot ${a.dotColor}`} />
                  <div>
                    <div className="act-text" dangerouslySetInnerHTML={{ __html: a.html }} />
                    <div className="act-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
