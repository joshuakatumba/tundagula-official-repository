"use client";
import React, { useState } from 'react';
import PublicFooter from '@/components/public/PublicFooter';
import { farmerPlans, restaurantFeatures, faqItems } from '@/lib/publicData';

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <div className="price-hero">
        <h1>Simple, <span>fair</span> pricing</h1>
        <p>Built for Uganda. Priced so that even the smallest farm can afford to join the formal economy.</p>
      </div>

      <div className="pricing-section">
        <div className="pricing-label">For Farmers</div>
        <div className="pricing-title">Choose your plan</div>

        <div className="plans-grid">
          {farmerPlans.map((plan, i) => (
            <div key={i} className={`plan-card ${plan.featured ? 'featured' : ''}`}>
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">{plan.price}</div>
              <div className="plan-period">{plan.period}</div>
              <div className="plan-divider" />
              <div className="plan-features">
                {plan.features.map((f, j) => (
                  <div key={j} className={`pf-item ${f.disabled ? 'disabled' : ''}`}>
                    <span className="pf-check">{f.disabled ? '—' : '✓'}</span>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
              <a href={plan.btnText.includes('Contact') ? '/contact' : '/registration'} style={{ textDecoration: 'none' }}>
                <button className="plan-btn">{plan.btnText}</button>
              </a>
            </div>
          ))}
        </div>

        <div className="restaurant-pricing">
          <div>
            <div className="rp-label">For Restaurants</div>
            <div className="rp-title">Free to browse. 3% per order.</div>
            <div className="rp-desc">
              Restaurants pay nothing to sign up. Browse farms, check profiles, and read reviews for free. When you place an order, a 3% service fee is applied — that is it. No subscriptions. No hidden costs.
            </div>
            <a href="/registration" style={{ textDecoration: 'none' }}>
              <button className="rp-btn">Create Farmer Account →</button>
            </a>
          </div>
          <div className="rp-features">
            {restaurantFeatures.map((f, i) => (
              <div key={i} className="rpf-item">
                <div className="rpf-icon">{f.icon}</div>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently asked questions</h2>
        {faqItems.map((faq, i) => (
          <div
            key={i}
            className={`faq-item ${openFaq === i ? 'open' : ''}`}
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <div className="faq-q">
              <span>{faq.q}</span>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-a">{faq.a}</div>
          </div>
        ))}
      </div>

      <PublicFooter />
    </>
  );
}
