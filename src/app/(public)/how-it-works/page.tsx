"use client";
import React from 'react';
import PublicFooter from '@/components/public/PublicFooter';
import {
  hiwTimelineSteps, whoFarmerFeatures, whoRestaurantFeatures
} from '@/lib/publicData';

export default function HowItWorksPage() {
  return (
    <>
      <div className="hiw-hero">
        <h1>How <span>TundaGula</span> works</h1>
        <p>Four steps. No middlemen. Fair prices for farmers, fresh produce for restaurants.</p>
      </div>

      <div className="timeline-section">
        {hiwTimelineSteps.map((step) => (
          <div key={step.num} className="tl-step">
            <div className="tl-left">
              <div className="tl-num">{step.num}</div>
              <div className="tl-line" />
            </div>
            <div className="tl-content">
              <div className="tl-icon-pub">{step.icon}</div>
              <div className="tl-title-pub">{step.title}</div>
              <div className="tl-desc">{step.desc}</div>
              <div className="tl-note" dangerouslySetInnerHTML={{ __html: step.note }} />
            </div>
          </div>
        ))}
      </div>

      <div className="who-section">
        <h2>Who is Tunda Gula for?</h2>
        <div className="who-grid">
          <div className="who-card">
            <h3>👨‍🌾 For Farmers</h3>
            <p>You grow food. You deserve a fair price and a reliable buyer. Tunda Gula gives you both.</p>
            <div className="who-list">
              {whoFarmerFeatures.map((f, i) => (
                <div key={i} className="who-item">
                  <div className="who-check">✓</div>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <a href="/registration" style={{ textDecoration: 'none' }}>
              <button className="who-cta">Register My Farm →</button>
            </a>
          </div>
          <div className="who-card">
            <h3>🍽 For Restaurants</h3>
            <p>You serve food. You need fresh, affordable produce from verified farms. Tunda Gula delivers.</p>
            <div className="who-list">
              {whoRestaurantFeatures.map((f, i) => (
                <div key={i} className="who-item">
                  <div className="who-check">✓</div>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <button className="who-cta">Browse Farms →</button>
          </div>
        </div>
      </div>

      <PublicFooter />
    </>
  );
}
