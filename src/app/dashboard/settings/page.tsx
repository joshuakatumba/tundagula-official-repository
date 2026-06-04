"use client";

import React, { useState } from 'react';
import { useLang } from '../../../context/LanguageContext';

export default function SettingsPage() {
  const { lang, setLang, t } = useLang();
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'language', label: 'Language', icon: '🌐' }
  ];

  return (
    <div className="settings-container" style={{display: 'grid', gridTemplateColumns: '240px 1fr', gap: '30px'}}>
      <div className="box" style={{padding: '10px', height: 'fit-content'}}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 15px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === tab.id ? '#e8f5e9' : 'transparent',
              color: activeTab === tab.id ? 'var(--leaf)' : '#666',
              fontWeight: activeTab === tab.id ? '700' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '5px'
            }}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <div className="box" style={{padding: '30px'}}>
        {activeTab === 'account' && (
          <div>
            <h3 style={{fontSize: '20px', fontWeight: '800', marginBottom: '20px'}}>Account Preferences</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div style={{padding: '15px', border: '1px solid #eee', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <div style={{fontWeight: '700'}}>SMS Alerts</div>
                  <div style={{fontSize: '12px', color: 'var(--text-soft)'}}>Receive order updates via SMS</div>
                </div>
                <input type="checkbox" defaultChecked style={{width: '20px', height: '20px'}} />
              </div>
              <div style={{padding: '15px', border: '1px solid #eee', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <div style={{fontWeight: '700'}}>Email Marketing</div>
                  <div style={{fontSize: '12px', color: 'var(--text-soft)'}}>Receive tips on farming and market prices</div>
                </div>
                <input type="checkbox" style={{width: '20px', height: '20px'}} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'language' && (
          <div>
            <h3 style={{fontSize: '20px', fontWeight: '800', marginBottom: '20px'}}>Language Settings</h3>
            <p style={{color: 'var(--text-soft)', marginBottom: '20px'}}>Choose your preferred language for the portal.</p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px'}}>
              {['en', 'sw', 'lg'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    border: '2px solid',
                    borderColor: lang === l ? 'var(--leaf)' : '#eee',
                    background: lang === l ? '#f1f8e9' : 'white',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{fontSize: '24px', marginBottom: '5px'}}>
                    {l === 'en' ? '🇬🇧' : l === 'sw' ? '🇹🇿' : '🇺🇬'}
                  </div>
                  <div style={{fontWeight: '700'}}>{l === 'en' ? 'English' : l === 'sw' ? 'Kiswahili' : 'Luganda'}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h3 style={{fontSize: '20px', fontWeight: '800', marginBottom: '20px'}}>Security</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <label style={{fontSize: '14px', fontWeight: '600'}}>Current Password</label>
                <input type="password" style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <label style={{fontSize: '14px', fontWeight: '600'}}>New Password</label>
                <input type="password" style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}} />
              </div>
              <button className="btn-primary" style={{padding: '12px', background: 'var(--leaf)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer'}}>Update Password</button>
            </div>
          </div>
        )}

        {(activeTab === 'notifications') && (
            <div style={{padding: '40px', textAlign: 'center', color: 'var(--text-soft)'}}>
                Notification settings are coming soon in Version 1.2.
            </div>
        )}
      </div>
    </div>
  );
}
