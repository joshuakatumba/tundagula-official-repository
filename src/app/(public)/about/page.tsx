import React from 'react';
import PublicFooter from '@/components/public/PublicFooter';
import { values, teamMembers } from '@/lib/publicData';

export default function AboutPage() {
  return (
    <>
      <div className="about-hero">
        <h1>The food system is <em>broken</em>. We are fixing it.</h1>
        <p>Tunda Gula is a Ugandan technology company building the infrastructure for fair, transparent farm-to-restaurant trade.</p>
      </div>

      <div className="mission-section">
        <h2>Our mission</h2>
        <p>Uganda grows some of the best food in the world. But between the farm gate and the restaurant kitchen, up to 60% of the value is lost to a chain of intermediaries — village brokers, wholesalers, transporters, and middlemen — each taking a cut without adding proportional value.</p>
        <p>The farmer earns less. The restaurant pays more. Neither side has transparency into where their money goes or who they are really dealing with.</p>
        <p>Tunda Gula exists to remove those barriers. We connect verified farmers directly to food businesses through a platform that handles discovery, ordering, payment, and trust — so both sides get a better deal.</p>
      </div>

      <div className="pull-quote">
        <div className="pq-text">&ldquo;If you grow it, you should earn from it. If you buy it, you should know who grew it.&rdquo;</div>
        <div className="pq-attr">— Tunda Gula founding principle</div>
      </div>

      <div className="values-section">
        <h2>What we believe</h2>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <div className="value-name">{v.name}</div>
              <div className="value-desc">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="team-section">
        <h2>The team</h2>
        <p className="team-sub">A small team building for Uganda&apos;s food economy.</p>
        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <div key={i} className="team-card">
              <div className="team-avatar" style={{ background: m.gradient }}>{m.initials}</div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="join-cta">
        <h2>Join the movement</h2>
        <p>Whether you grow food or serve food — there is a place for you on Tunda Gula.</p>
        <div className="join-btns">
          <a href="/registration" style={{ textDecoration: 'none' }}>
            <button className="jbtn primary">Register as a Farmer →</button>
          </a>
          <a href="/registration" style={{ textDecoration: 'none' }}>
            <button className="jbtn secondary">Create Farm Account</button>
          </a>
        </div>
      </div>

      <PublicFooter />
    </>
  );
}
