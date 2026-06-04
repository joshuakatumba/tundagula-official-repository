'use client';

import React from 'react';
import PublicFooter from '@/components/public/PublicFooter';

export default function ContactPage() {
  return (
    <>
      <div className="about-hero">
        <h1>Get in <em>touch</em></h1>
        <p>Have questions about Tunda Gula? Need help registering your farm or placing an order? Our team is here to help.</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--leaf)', marginBottom: '8px' }}>
              Farmer Support
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)' }}>+256 700 000 000</div>
            <div style={{ color: 'var(--text-soft-public)', marginTop: '8px', fontSize: '15px' }}>Available Mon-Sat, 8am to 6pm</div>
          </div>
          
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--leaf)', marginBottom: '8px' }}>
              Restaurant Partnerships
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)' }}>+256 772 000 000</div>
            <div style={{ color: 'var(--text-soft-public)', marginTop: '8px', fontSize: '15px' }}>Available Mon-Fri, 9am to 5pm</div>
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--leaf)', marginBottom: '8px' }}>
              Email Us
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)' }}>support@tundagula.ug</div>
            <div style={{ color: 'var(--text-soft-public)', marginTop: '8px', fontSize: '15px' }}>We aim to reply within 2 hours.</div>
          </div>
          
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--leaf)', marginBottom: '8px' }}>
              Office Location
            </div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.6 }}>
              Innovation Village<br />
              Ntinda Complex, Block B<br />
              Kampala, Uganda
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--white)', padding: '48px', borderRadius: '24px', border: '1px solid var(--border-public)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ink)', marginBottom: '32px', fontFamily: 'var(--serif)' }}>Send us a message</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)' }}>Your Name</label>
              <input type="text" placeholder="e.g. Kato Joseph" style={{ padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '16px', outline: 'none', background: '#fcfcfc', transition: 'all 0.2s' }} onFocus={(e) => { e.target.style.borderColor = 'var(--leaf)'; e.target.style.background = 'var(--white)'; }} onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.background = '#fcfcfc'; }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)' }}>Email or Phone</label>
              <input type="text" placeholder="How can we reach you?" style={{ padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '16px', outline: 'none', background: '#fcfcfc', transition: 'all 0.2s' }} onFocus={(e) => { e.target.style.borderColor = 'var(--leaf)'; e.target.style.background = 'var(--white)'; }} onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.background = '#fcfcfc'; }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)' }}>Message</label>
              <textarea placeholder="How can we help?" rows={5} style={{ padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '16px', outline: 'none', background: '#fcfcfc', resize: 'vertical', transition: 'all 0.2s' }} onFocus={(e) => { e.target.style.borderColor = 'var(--leaf)'; e.target.style.background = 'var(--white)'; }} onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.background = '#fcfcfc'; }}></textarea>
            </div>
            <button type="button" style={{ marginTop: '8px', padding: '16px', background: 'var(--ink)', color: 'var(--white)', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="join-cta">
        <h2>Ready to join us?</h2>
        <p>Whether you grow food or serve food — there is a place for you on Tunda Gula.</p>
        <div className="join-btns">
          <a href="/registration" style={{ textDecoration: 'none' }}>
            <button className="jbtn primary">Register as a Farmer →</button>
          </a>
        </div>
      </div>

      <PublicFooter />
    </>
  );
}
