"use client";

import React, { useState } from 'react';
import { useData } from '../../../DataContext';
import { updateProfile } from '../../actions';

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

  if (loading) return <div className="profile-loading">Loading profile...</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateProfile(formData);
    setIsEditing(false);
    refreshData();
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">
      <div className="box profile-hero">
        <div className="profile-avatar">
          {profile?.name?.substring(0, 2).toUpperCase()}
        </div>
        <h2 className="profile-farm-name">{profile?.farm_name}</h2>
        <p className="profile-location">📍 {profile?.location}</p>
        <div className="profile-metrics">
          <div className="profile-metric">
            <div className="profile-metric-value">⭐ {profile?.rating}</div>
            <div className="profile-metric-label">Rating</div>
          </div>
          <div className="profile-metric-divider"></div>
          <div className="profile-metric">
            <div className="profile-metric-value">{dynamicCompletion}%</div>
            <div className="profile-metric-label">Completion</div>
          </div>
        </div>
      </div>

      <div className="box profile-details-box">
        <div className="profile-details-header">
          <h3 className="profile-details-title">Farm Details</h3>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="profile-edit-btn"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-form-grid">
              <div className="profile-field">
                <label>Farmer Name</label>
                <input name="name" defaultValue={profile?.name} required />
              </div>
              <div className="profile-field">
                <label>Farm Name</label>
                <input name="farm_name" defaultValue={profile?.farm_name} required />
              </div>
            </div>
            <div className="profile-field">
              <label>Location (Region/Village)</label>
              <input name="location" defaultValue={profile?.location} required />
            </div>
            <div className="profile-field">
              <label>Bio / Description</label>
              <textarea name="description" defaultValue={profile?.description} rows={4} />
            </div>
            <div className="profile-form-grid">
              <div className="profile-field">
                <label>Phone Number</label>
                <input name="phone" defaultValue={profile?.phone} />
              </div>
              <div className="profile-field">
                <label>Email Address</label>
                <input name="email" type="email" defaultValue={profile?.email} />
              </div>
            </div>
            <button type="submit" className="btn-primary profile-save-btn">
              Save Changes to Database
            </button>
          </form>
        ) : (
          <div className="profile-view">
            <div>
              <div className="profile-label">About the Farm</div>
              <p className="profile-about">{profile?.description}</p>
            </div>
            <div className="profile-info-grid">
              <div>
                <div className="profile-label">Contact Info</div>
                <div className="profile-contact-list">
                  <div>📞 {profile?.phone}</div>
                  <div>✉️ {profile?.email}</div>
                </div>
              </div>
              <div>
                <div className="profile-label">Farmer</div>
                <div className="profile-farmer">{profile?.name}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
