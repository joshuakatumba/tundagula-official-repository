"use client";

import React from 'react';
import { useData } from '../../../DataContext';
import { useLang } from '../../../context/LanguageContext';
import { updateOrderStatus } from '../../actions';

export default function OrdersPage() {
  const { orders, loading, refreshData } = useData();
  const { t } = useLang();

  const handleStatusChange = async (id: number, newStatus: string) => {
    await updateOrderStatus(id, newStatus);
    refreshData();
  };

  if (loading) return <div style={{padding: '40px', textAlign: 'center'}}>Loading orders...</div>;

  return (
    <div className="orders-container">
      <div className="box">
        <div className="box-header">
          <div className="box-title">My Orders</div>
          <div className="box-filter">
            <select style={{padding: '6px', borderRadius: '4px', border: '1px solid #ddd'}}>
              <option>All Orders</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
        <div className="box-body" style={{padding: '0'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee'}}>
                <th style={{padding: '12px', textAlign: 'left', fontSize: '14px', color: 'var(--text-soft)'}}>Order ID</th>
                <th style={{padding: '12px', textAlign: 'left', fontSize: '14px', color: 'var(--text-soft)'}}>Customer</th>
                <th style={{padding: '12px', textAlign: 'left', fontSize: '14px', color: 'var(--text-soft)'}}>Produce</th>
                <th style={{padding: '12px', textAlign: 'left', fontSize: '14px', color: 'var(--text-soft)'}}>Quantity</th>
                <th style={{padding: '12px', textAlign: 'left', fontSize: '14px', color: 'var(--text-soft)'}}>Amount</th>
                <th style={{padding: '12px', textAlign: 'left', fontSize: '14px', color: 'var(--text-soft)'}}>Delivery Date</th>
                <th style={{padding: '12px', textAlign: 'left', fontSize: '14px', color: 'var(--text-soft)'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '12px', fontSize: '14px'}}>#ORD-{order.id.toString().padStart(4, '0')}</td>
                  <td style={{padding: '12px', fontSize: '14px', fontWeight: '500'}}>{order.customer}</td>
                  <td style={{padding: '12px', fontSize: '14px'}}>{order.produce}</td>
                  <td style={{padding: '12px', fontSize: '14px'}}>{order.quantity}</td>
                  <td style={{padding: '12px', fontSize: '14px', fontWeight: '600'}}>{order.amount}</td>
                  <td style={{padding: '12px', fontSize: '14px'}}>{order.delivery_date}</td>
                  <td style={{padding: '12px'}}>
                    <div style={{position: 'relative', display: 'inline-block'}}>
                      <select 
                        value={order.status} 
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={{
                          appearance: 'none',
                          backgroundColor: order.status === 'DELIVERED' ? 'var(--leaf-light)' : '#f0fdf4',
                          color: order.status === 'DELIVERED' ? 'var(--leaf)' : '#166534',
                          border: '1px solid #bbf7d0',
                          padding: '6px 28px 6px 12px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="TRANSIT">TRANSIT</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                      <div style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: '#166534',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <span>▼</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} style={{padding: '40px', textAlign: 'center', color: 'var(--text-soft)'}}>No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
