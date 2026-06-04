"use client";

import React from 'react';
import { useData } from '../../../DataContext';
import { updateHarvest, addHarvest } from '../../actions';
import { useLang } from '../../../context/LanguageContext';

export default function CalendarPage() {
  const { harvests, loading, refreshData } = useData();
  const { t } = useLang();
  const [showAdd, setShowAdd] = React.useState(false);

  if (loading) return <div style={{padding: '40px', textAlign: 'center'}}>Loading harvest calendar...</div>;

  const handleUpdate = async (id: number) => {
    const newQty = prompt("Enter new estimated quantity (e.g. 250kg):");
    if (newQty) {
      await updateHarvest(id, newQty);
      refreshData();
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addHarvest(formData);
    setShowAdd(false);
    refreshData();
  };

  return (
    <div className="calendar-container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2 style={{fontSize: '24px', fontWeight: '700'}}>{t('nav_calendar')}</h2>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            style={{
              padding: '8px 16px', 
              backgroundColor: 'var(--leaf)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: '600', 
              cursor: 'pointer'
            }}
          >
            {showAdd ? '× Close' : '+ Schedule Harvest'}
          </button>
          <div style={{fontSize: '14px', color: 'var(--text-soft)'}}>April 2026</div>
        </div>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="box" style={{marginBottom: '30px', padding: '20px'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', alignItems: 'end'}}>
            <div>
              <label style={{display: 'block', fontSize: '12px', marginBottom: '5px', fontWeight: '600'}}>Produce Name</label>
              <input name="produce" placeholder="e.g. Pineapples" required style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '12px', marginBottom: '5px', fontWeight: '600'}}>Expected Qty</label>
              <input name="quantity" placeholder="e.g. 500kg" required style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '12px', marginBottom: '5px', fontWeight: '600'}}>Harvest Date</label>
              <input name="date" type="date" required style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}} />
            </div>
            <div>
              <button type="submit" style={{width: '100%', padding: '11px', backgroundColor: 'var(--leaf)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer'}}>
                Save to Calendar
              </button>
            </div>
          </div>
        </form>
      )}

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', marginBottom: '30px'}}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} style={{textAlign: 'center', fontWeight: '600', padding: '10px', color: 'var(--text-soft)'}}>{d}</div>
        ))}
        {Array.from({length: 30}).map((_, i) => {
          const day = i + 1;
          const harvest = harvests.find((h: any) => parseInt(h.day) === day);
          return (
            <div 
              key={i} 
              style={{
                height: '100px', 
                border: '1px solid #eee', 
                borderRadius: '8px', 
                padding: '8px',
                backgroundColor: harvest ? '#e8f5e9' : 'white',
                position: 'relative'
              }}
            >
              <div style={{fontSize: '12px', color: '#999'}}>{day}</div>
              {harvest && (
                <div style={{marginTop: '5px', textAlign: 'center'}}>
                  <div style={{fontSize: '20px'}}>{harvest.icon}</div>
                  <div style={{fontSize: '11px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{harvest.produce}</div>
                  <div style={{fontSize: '10px', color: 'var(--leaf)'}}>{harvest.quantity}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="box">
        <div className="box-header">
          <div className="box-title">Upcoming Harvest Details</div>
        </div>
        <div className="box-body" style={{padding: '0'}}>
          {harvests.map((h: any) => (
            <div key={h.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #eee'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <div style={{fontSize: '24px'}}>{h.icon}</div>
                <div>
                  <div style={{fontWeight: '700'}}>{h.produce}</div>
                  <div style={{fontSize: '12px', color: 'var(--text-soft)'}}>Date: {h.date}</div>
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                <div style={{fontWeight: '800', color: 'var(--leaf)'}}>{h.quantity}</div>
                <button 
                  onClick={() => handleUpdate(h.id)}
                  style={{padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: '12px'}}
                >
                  Update Qty
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
