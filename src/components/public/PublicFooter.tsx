import React from 'react';
import { footerPlatformLinks, footerCompanyLinks, footerSupportLinks, footerMomoBadges } from '@/lib/publicData';

export default function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="ft-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
        <div>
          <div className="ft-logo">Tunda<span>Gula</span></div>
          <p className="ft-tagline">Connecting Uganda&apos;s farmers directly to restaurants. Fair prices. Verified farms. Escrow-protected payments.</p>
          <div className="ft-badges">
            {footerMomoBadges.map((b, i) => (
              <span key={i} className="ft-badge">{b}</span>
            ))}
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
  );
}
