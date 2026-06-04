"use client";

import React, { useState } from 'react';
import { useData } from '../../../DataContext';
import { updateProfile } from '../../actions';
import { IconMapPin, IconReviews, IconPhone, IconMail } from '../../../components/Icons';

export default function ProfilePage() {
  const { profile, listings, harvests, loading, refreshData } = useData();
  const [isEditing, setIsEditing] = useState(false);

  const completionTasks = [
    { done: !!profile?.description },
    { done: listings.length >= 3 },
    { done: !!profile?.location },
    { done: harvests.length > 0 }
  ];
  const dynamicCompletion = Math.round((completionTasks.filter(t => t.done).length / completionTasks.length) * 100);

  if (loading) return <div style={{padding: '40px', textAlign: 'center'}}>Loading profile...</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateProfile(formData);
    setIsEditing(false);
    refreshData();
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-container" style={{maxWidth: '800px', margin: '0 auto'}}>
      <div className="box" style={{padding: '40px', textAlign: 'center', marginBottom: '30px', background: 'linear-gradient(to bottom, #e8f5e9, #ffffff)'}}>
        <div style={{width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--leaf)', color: 'white', fontSize: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: '800'}}>
          {profile?.name?.substring(0, 2).toUpperCase()}
        </div>
        <h2 style={{fontSize: '28px', fontWeight: '800'}}>{profile?.farm_name}</h2>
        <p style={{color: 'var(--text-soft)', marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'}}>
          📍 {profile?.location}
        </p>
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'}}>
              ⭐ {profile?.rating}
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-soft)'}}>Rating</div>
          </div>
          <div style={{width: '1px', backgroundColor: '#eee'}}></div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '20px', fontWeight: '700'}}>{dynamicCompletion}%</div>
            <div style={{fontSize: '12px', color: 'var(--text-soft)'}}>Completion</div>
          </div>
        </div>
      </div>

      <div className="box" style={{padding: '30px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h3 style={{fontSize: '20px', fontWeight: '700'}}>Farm Details</h3>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            style={{padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', background: 'white', cursor: 'pointer'}}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <label style={{fontSize: '14px', fontWeight: '600'}}>Farmer Name</label>
                <input name="name" defaultValue={profile?.name} required style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <label style={{fontSize: '14px', fontWeight: '600'}}>Farm Name</label>
                <input name="farm_name" defaultValue={profile?.farm_name} required style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}} />
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <label style={{fontSize: '14px', fontWeight: '600'}}>Location (Region/Village)</label>
              <input name="location" defaultValue={profile?.location} required style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <label style={{fontSize: '14px', fontWeight: '600'}}>Bio / Description</label>
              <textarea name="description" defaultValue={profile?.description} rows={4} style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'none'}} />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <label style={{fontSize: '14px', fontWeight: '600'}}>Phone Number</label>
                <input name="phone" defaultValue={profile?.phone} style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <label style={{fontSize: '14px', fontWeight: '600'}}>Email Address</label>
                <input name="email" type="email" defaultValue={profile?.email} style={{padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}} />
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--leaf)', color: 'white', fontWeight: '700', cursor: 'pointer'}}>
              Save Changes to Database
            </button>
          </form>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '25px'}}>
            <div>
              <div style={{fontSize: '12px', color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: '1px'}}>About the Farm</div>
              <p style={{marginTop: '10px', lineHeight: '1.6', color: '#444'}}>{profile?.description}</p>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
              <div>
                <div style={{fontSize: '12px', color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: '1px'}}>Contact Info</div>
                <div style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>📞 {profile?.phone}</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>✉️ {profile?.email}</div>
                </div>
              </div>
              <div>
                <div style={{fontSize: '12px', color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: '1px'}}>Farmer</div>
                <div style={{marginTop: '10px', fontWeight: '600'}}>{profile?.name}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
