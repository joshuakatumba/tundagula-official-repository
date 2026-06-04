"use client";

import React, { useState } from 'react';
import { useData } from '../../../DataContext';
import { addWithdrawal } from '../../actions';
import { IconMoMo } from '../../../components/Icons';

export default function MoMoPage() {
  const { transactions, refreshData } = useData();
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const totalIncome = transactions
    .filter((t: any) => t.type === 'income')
    .reduce((acc: number, t: any) => acc + parseInt(t.amount.replace(/[^0-9]/g, '')), 0);

  const totalWithdrawn = transactions
    .filter((t: any) => t.type === 'withdrawal')
    .reduce((acc: number, t: any) => acc + parseInt(t.amount.replace(/[^0-9]/g, '')), 0);

  const balance = totalIncome - totalWithdrawn;

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(amount) > balance) {
      alert("Insufficient balance!");
      return;
    }
    setLoading(true);
    await addWithdrawal(`UGX ${parseInt(amount).toLocaleString()}`);
    setAmount('');
    setPhone('');
    setLoading(false);
    refreshData();
    alert("Withdrawal initiated successfully!");
  };

  return (
    <div className="momo-container" style={{maxWidth: '600px', margin: '0 auto'}}>
      <div className="box" style={{padding: '30px', textAlign: 'center', marginBottom: '30px'}}>
        <div style={{fontSize: '48px', marginBottom: '10px'}}>📱</div>
        <h2 style={{fontSize: '24px', fontWeight: '800'}}>Mobile Money Payouts</h2>
        <p style={{color: 'var(--text-soft)', marginTop: '10px'}}>Withdraw your earnings directly to your MTN or Airtel MoMo wallet.</p>
      </div>

      <div className="box" style={{padding: '30px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px'}}>
          <span style={{fontWeight: '500'}}>Withdrawable Balance:</span>
          <span style={{fontWeight: '800', color: 'var(--leaf)'}}>UGX {balance.toLocaleString()}</span>
        </div>

        <form onSubmit={handleWithdraw} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <label style={{fontSize: '14px', fontWeight: '600'}}>Phone Number</label>
            <input 
              type="tel" 
              placeholder="07XX XXX XXX" 
              required 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}} 
            />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <label style={{fontSize: '14px', fontWeight: '600'}}>Amount to Withdraw (UGX)</label>
            <input 
              type="number" 
              placeholder="Minimum 5,000" 
              required 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}} 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || !amount || parseInt(amount) < 5000}
            className="btn-primary" 
            style={{
              padding: '15px', 
              borderRadius: '8px', 
              border: 'none', 
              backgroundColor: 'var(--leaf)', 
              color: 'white', 
              fontWeight: '700', 
              cursor: 'pointer',
              opacity: (loading || !amount || parseInt(amount) < 5000) ? 0.6 : 1
            }}
          >
            {loading ? 'Processing...' : 'Withdraw to MoMo'}
          </button>
        </form>
      </div>
    </div>
  );
}
