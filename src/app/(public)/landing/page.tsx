"use client";
import React from 'react';
import {
  tickerItems, chainNodes, howItWorksSteps,
  farmerCTAFeatures, restaurantCTAFeatures,
  impactNumbers, testimonials,
  footerPlatformLinks, footerCompanyLinks, footerSupportLinks, footerMomoBadges
} from '@/lib/publicData';

export default function LandingPage() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="public-theme" style={{ paddingTop: 0 }}>
      {/* Nav */}
      <nav className="landing-nav">
        <div className="ln-logo">Tunda<span>Gula</span></div>
        <div className="ln-links">
          <a href="/how-it-works" className="ln-link">How It Works</a>
          <a href="/pricing" className="ln-link">Tunda Gula</a>
          <a href="/about" className="ln-link">About</a>
        </div>
        <div style={{display: 'flex', gap: '24px', alignItems: 'center'}}>
          <a href="/login" className="ln-link" style={{fontWeight: 700}}>Login</a>
          <a href="/registration" className="ln-cta">Register Your Farm →</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-badge">
          <div className="hero-dot" />
          Live in Uganda · 284 farmers · 91 restaurants
        </div>
        <h1 className="hero-h1">Farm-direct produce for Uganda&apos;s <em>restaurants</em></h1>
        <p className="hero-sub">Tunda Gula connects verified farmers directly to restaurants and food businesses — cutting out middlemen, reducing costs, and guaranteeing fair prices through escrow-protected mobile money payments.</p>
        <div className="hero-btns">
          <a href="/registration" style={{ textDecoration: 'none' }}>
            <button className="hbtn primary">Register as a Farmer →</button>
          </a>
          <button className="hbtn secondary">Browse Farms</button>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-track">
          {doubled.map((t, i) => (
            <span key={i} className="ticker-item"><span>{t.icon}</span> {t.text}</span>
          ))}
        </div>
      </div>

      {/* Problem */}
      <section className="problem-section">
        <div className="prob-label">The Problem</div>
        <h2 className="prob-title">Farmers earn less. Restaurants pay more. The middlemen profit.</h2>
        <p className="prob-desc">In Uganda&apos;s food supply chain, a farmer sells fresh milk at UGX 800 per litre. By the time it reaches a restaurant kitchen, the price is UGX 3,500. The farmer sees none of that increase.</p>
        <div className="chain">
          {chainNodes.map((n, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="chain-arrow">→</span>}
              <div className={`chain-node ${n.type}`}>
                {n.label}
                <div className="chain-node-sub">{n.sub}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="prob-highlight">
          <p><strong>Tunda Gula removes the middlemen.</strong> Farmers list their produce at fair prices. Restaurants buy directly. Payment is held in escrow via mobile money and released only when delivery is confirmed.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <h2>How it works</h2>
        <p className="section-sub">Four simple steps from farm to restaurant — no brokers, no markup chains.</p>
        <div className="steps-grid">
          {howItWorksSteps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dual CTA */}
      <section className="dual-cta">
        <div className="cta-card farmer">
          <div className="cta-badge">For Farmers</div>
          <div className="cta-title">Sell directly to restaurants</div>
          <div className="cta-desc">No more brokers taking 40% of your revenue. List your produce, set your own prices, and get paid directly via mobile money.</div>
          <div className="cta-features">
            {farmerCTAFeatures.map((f, i) => (
              <div key={i} className="cta-feat"><span className="cta-feat-check">✓</span> {f}</div>
            ))}
          </div>
          <a href="/registration" className="cta-btn">Register My Farm →</a>
        </div>
        <div className="cta-card restaurant">
          <div className="cta-badge">For Restaurants</div>
          <div className="cta-title">Source fresh, verified produce</div>
          <div className="cta-desc">Browse 200+ verified farms. Filter by produce, district, and rating. Order directly with escrow-protected payments.</div>
          <div className="cta-features">
            {restaurantCTAFeatures.map((f, i) => (
              <div key={i} className="cta-feat"><span className="cta-feat-check">✓</span> {f}</div>
            ))}
          </div>
          <button className="cta-btn">Browse Farms →</button>
        </div>
      </section>

      {/* Impact */}
      <section className="impact-section">
        <h2>Real impact. Real numbers.</h2>
        <div className="impact-grid">
          {impactNumbers.map((n, i) => (
            <div key={i}>
              <div className="impact-num">{n.value}</div>
              <div className="impact-label">{n.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonial-section">
        <h2>What they say</h2>
        <div className="test-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="test-card">
              <div className="test-text">&ldquo;{t.text}&rdquo;</div>
              <div className="test-author">
                <div className="test-avatar" style={{ background: t.avatarBg }}>{t.initials}</div>
                <div>
                  <div className="test-name">{t.name}</div>
                  <div className="test-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="ft-grid">
          <div>
            <div className="ft-logo">Tunda<span>Gula</span></div>
            <p className="ft-tagline">Connecting Uganda&apos;s farmers directly to restaurants. Fair prices. Verified farms. Escrow-protected payments.</p>
            <div className="ft-badges">
              {footerMomoBadges.map((b, i) => <span key={i} className="ft-badge">{b}</span>)}
            </div>
          </div>
          <div>
            <div className="ft-col-title">Platform</div>
            {footerPlatformLinks.map((l, i) => <a key={i} href={l.includes('Register') ? '/registration' : l.includes('How It') ? '/how-it-works' : l === 'Pricing' ? '/pricing' : l === 'Marketplace' ? '/marketplace' : '#'} className="ft-link" style={{textDecoration: 'none'}}>{l}</a>)}
          </div>
          <div>
            <div className="ft-col-title">Company</div>
            {footerCompanyLinks.map((l, i) => <a key={i} href={l === 'About Us' ? '/about' : l === 'Careers' ? '/careers' : l === 'Blog' ? '/blog' : '#'} className="ft-link" style={{textDecoration: 'none'}}>{l}</a>)}
          </div>
          <div>
            <div className="ft-col-title">Support</div>
            {footerSupportLinks.map((l, i) => <a key={i} href={l === 'Contact Us' ? '/contact' : l === 'Help Center' ? '/help' : l === 'Terms' ? '/terms' : l === 'Privacy' ? '/privacy' : '#'} className="ft-link" style={{textDecoration: 'none'}}>{l}</a>)}
          </div>
        </div>
        <div className="ft-divider" />
        <div className="ft-bottom">
          <span>© 2026 Tunda Gula Uganda Ltd. Registered in Kampala.</span>
          <span>Built with 🇺🇬 for Uganda&apos;s food economy</span>
        </div>
      </footer>
    </div>
  );
}
