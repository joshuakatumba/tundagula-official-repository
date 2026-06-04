"use client";

import React from 'react';
import { useData } from '../../../DataContext';

export default function EarningsPage() {
  const { transactions, loading } = useData();

  if (loading) return <div style={{padding: '40px', textAlign: 'center'}}>Loading financial data...</div>;

  const parseAmount = (amtStr: string) => {
    const numeric = parseInt(amtStr.replace(/[^0-9]/g, '')) || 0;
    return amtStr.toLowerCase().includes('k') ? numeric * 1000 : numeric;
  };

  const totalIncome = transactions
    .filter((t: any) => t.type === 'income')
    .reduce((acc: number, t: any) => acc + parseAmount(t.amount), 0);

  const totalWithdrawn = transactions
    .filter((t: any) => t.type === 'withdrawal')
    .reduce((acc: number, t: any) => acc + parseAmount(t.amount), 0);

  const balance = totalIncome - totalWithdrawn;

  return (
    <div className="earnings-container">
      <h2 style={{fontSize: '24px', fontWeight: '700', marginBottom: '20px'}}>Financial Overview</h2>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px'}}>
        <div className="box" style={{padding: '24px', borderLeft: '4px solid var(--leaf)'}}>
          <div style={{fontSize: '14px', color: 'var(--text-soft)'}}>Current Balance</div>
          <div style={{fontSize: '28px', fontWeight: '800', color: 'var(--leaf)'}}>UGX {(balance/1000).toFixed(0)}K</div>
        </div>
        <div className="box" style={{padding: '24px', borderLeft: '4px solid #2196f3'}}>
          <div style={{fontSize: '14px', color: 'var(--text-soft)'}}>Total Income</div>
          <div style={{fontSize: '28px', fontWeight: '800'}}>UGX {(totalIncome/1000).toFixed(0)}K</div>
        </div>
        <div className="box" style={{padding: '24px', borderLeft: '4px solid #f44336'}}>
          <div style={{fontSize: '14px', color: 'var(--text-soft)'}}>Total Withdrawn</div>
          <div style={{fontSize: '28px', fontWeight: '800'}}>UGX {(totalWithdrawn/1000).toFixed(0)}K</div>
        </div>
      </div>

      <div className="box">
        <div className="box-header">
          <div className="box-title">Transaction History</div>
        </div>
        <div className="box-body" style={{padding: '0'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee'}}>
                <th style={{padding: '12px', textAlign: 'left'}}>Date</th>
                <th style={{padding: '12px', textAlign: 'left'}}>Description</th>
                <th style={{padding: '12px', textAlign: 'left'}}>Type</th>
                <th style={{padding: '12px', textAlign: 'right'}}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t: any) => (
                <tr key={t.id} style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '12px', fontSize: '14px'}}>{new Date(t.date).toLocaleDateString()}</td>
                  <td style={{padding: '12px', fontSize: '14px'}}>{t.description}</td>
                  <td style={{padding: '12px'}}>
                    <span style={{
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px',
                      backgroundColor: t.type === 'income' ? '#e8f5e9' : '#ffebee',
                      color: t.type === 'income' ? '#2e7d32' : '#c62828'
                    }}>
                      {t.type.toUpperCase()}
                    </span>
                  </td>
                  <td style={{padding: '12px', textAlign: 'right', fontWeight: '600', color: t.type === 'income' ? '#2e7d32' : '#c62828'}}>
                    {t.type === 'income' ? '+' : '-'} {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
