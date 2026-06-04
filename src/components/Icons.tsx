import React from 'react';

// ─── DASHBOARD ICONS ───

export const IconDashboard = () => <span>📋</span>;
export const IconOrders = () => <span>📦</span>;
export const IconListings = () => <span>🥬</span>;
export const IconCalendar = () => <span>🗓️</span>;
export const IconEarnings = () => <span>💰</span>;
export const IconMoMo = () => <span>📱</span>;
export const IconProfile = () => <span>👤</span>;
export const IconReviews = () => <span>⭐</span>;
export const IconSettings = () => <span>⚙️</span>;
export const IconLogOut = () => <span>🚪</span>;
export const IconMapPin = () => <span>📍</span>;

// ─── UTILITY ICONS ───

export const IconSparkles = () => <span>✨</span>;
export const IconAlertTriangle = () => <span>⚠️</span>;
export const IconSearch = () => <span>🔍</span>;
export const IconStar = () => <span>⭐</span>;
export const IconPlus = () => <span>➕</span>;
export const IconEdit = () => <span>✏️</span>;
export const IconPhone = () => <span>📞</span>;
export const IconMail = () => <span>✉️</span>;

/**
 * Maps emoji or produce name to a professional icon component
 * For Tunda Gula, we often use the emoji directly from the database
 */
export const getProduceIcon = (iconOrName: string, size = 18) => {
  return <span style={{ fontSize: `${size}px` }}>{iconOrName}</span>;
};

/**
 * Maps public page emojis to professional icons
 */
export const getPublicIcon = (iconOrName: string, size = 18) => {
  return <span style={{ fontSize: `${size}px` }}>{iconOrName}</span>;
};
