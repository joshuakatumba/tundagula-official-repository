"use client";
import React, { useEffect, useState } from 'react';

export default function Topbar({ title = "overview" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' EAT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">admin / <span>{title}</span></div>
        <div className="live-indicator"><div className="live-dot"></div> LIVE</div>
      </div>
      <div className="topbar-right">
        <div className="topbar-time">{time}</div>
        <div className="icon-btn">🔔</div>
        <div className="icon-btn">⚙️</div>
      </div>
    </div>
  );
}
