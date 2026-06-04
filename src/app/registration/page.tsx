"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerFarmer } from '../actions';
import PublicNav from '@/components/public/PublicNav';
// No icons needed from library as we use emojis directly

const DISTRICTS = [
  'Wakiso', 'Kampala', 'Mbarara', 'Kiruhura', 'Bushenyi',
  'Kayunga', 'Luwero', 'Nakaseke', 'Mukono', 'Jinja',
  'Mbale', 'Gulu', 'Fort Portal', 'Masaka', 'Kabale'
];

const CATEGORIES = [
  { id: 'fruits', name: 'Fruits', icon: '🍍', desc: 'Pineapples, Mangoes, Melons' },
  { id: 'veg', name: 'Vegetables', icon: '🥬', desc: 'Kale, Cabbage, Onions' },
  { id: 'tubers', name: 'Tubers', icon: '🥔', desc: 'Potatoes, Cassava, Yams' },
  { id: 'grains', name: 'Grains', icon: '🌾', desc: 'Maize, Rice, Beans' },
  { id: 'dairy', name: 'Dairy', icon: '🥛', desc: 'Milk, Ghee, Yoghurt' },
  { id: 'poultry', name: 'Poultry', icon: '🐓', desc: 'Chicken, Eggs, Turkey' },
];

export default function RegistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleCert = (cert: string) => {
    setCertifications(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append('produce_categories', JSON.stringify(selectedCategories));
    formData.append('certifications', JSON.stringify(certifications));

    try {
      const result = await registerFarmer(formData);
      if (result.success) {
        const email = formData.get('email') as string;
        // Redirect to login portal
        router.push(`/login?email=${encodeURIComponent(email)}&registered=true`);
      }
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className="public-theme">
      <PublicNav />

      <div className="hero-strip">
        <h1>Join Uganda&apos;s <em>direct</em> farm-to-market network</h1>
        <p>Register your farm, list your produce, and receive purchase orders directly from restaurants — no middlemen, more earnings.</p>
        <div className="step-pills">
          <div className={`step-pill ${step >= 1 ? 'active' : ''}`}><div className="num">1</div> Farm Details</div>
          <div className={`step-pill ${step >= 2 ? 'active' : ''}`}><div className="num">2</div> Produce</div>
          <div className={`step-pill ${step >= 3 ? 'active' : ''}`}><div className="num">3</div> Payment</div>
        </div>
      </div>

      <main className="reg-main">
        <div className="progress-label">
          <span>{step === 1 ? 'Farm & Personal Details' : step === 2 ? 'Produce Categories' : 'Payment Setup'}</span>
          <span>{step === 1 ? '33%' : step === 2 ? '66%' : '100%'} complete</span>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: step === 1 ? 'block' : 'none' }}>
            <div className="form-sections-wrap">
              <section className="form-section">
                <div className="section-header">
                  <div className="section-icon">👤</div>
                  <div>
                    <div className="section-title">Your Information</div>
                    <div className="section-sub">Tell us about yourself — this builds your public farmer profile</div>
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label>First Name <span className="req">*</span></label>
                    <input name="first_name" type="text" placeholder="e.g. Emmanuel" />
                  </div>
                  <div className="field">
                    <label>Surname <span className="req">*</span></label>
                    <input name="surname" type="text" placeholder="e.g. Ssekandi" />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label>Phone Number <span className="req">*</span></label>
                    <input name="phone" type="tel" placeholder="+256 7XX XXX XXX" />
                    <div className="hint">This is your login and how buyers will contact you</div>
                  </div>
                  <div className="field">
                    <label>WhatsApp Number</label>
                    <input name="whatsapp" type="tel" placeholder="Same as above or different" />
                  </div>
                </div>

                <div className="field">
                  <label>Email Address <span className="req">*</span></label>
                  <input name="email" type="email" placeholder="e.g. joshua@example.com" required />
                </div>

                <div className="field">
                  <label>Password <span className="req">*</span></label>
                  <input name="password" type="password" placeholder="••••••••" required />
                </div>
                <div className="field">
                  <label>Retype Password <span className="req">*</span></label>
                  <input name="confirm_password" type="password" placeholder="••••••••" required />
                </div>

                <div className="field">
                  <label>Your Story <span className="req">*</span></label>
                  <textarea name="story" placeholder="Tell restaurants about yourself and your farm. What makes your produce special?"></textarea>
                  <div className="hint">A personal story builds trust. Farmers with bios get 3× more orders.</div>
                </div>
              </section>

              <section className="form-section">
                <div className="section-header">
                  <div className="section-icon">🌱</div>
                  <div>
                    <div className="section-title">Farm Details</div>
                    <div className="section-sub">Location and size help restaurants find farms near them</div>
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label>Farm Name <span className="req">*</span></label>
                    <input name="farm_name" type="text" placeholder="e.g. Ssekandi Family Farm" />
                  </div>
                  <div className="field">
                    <label>Farm Type <span className="req">*</span></label>
                    <div className="select-wrap">
                      <select name="farm_type">
                        <option value="">Select farm type</option>
                        <option>Mixed Farm (crops + livestock)</option>
                        <option>Crop Farm only</option>
                        <option>Livestock Farm only</option>
                        <option>Poultry Farm</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label>District <span className="req">*</span></label>
                    <div className="select-wrap">
                      <select name="district">
                        <option value="">Select district</option>
                        {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Sub-County</label>
                    <input name="sub_county" type="text" placeholder="e.g. Kira" />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label>Farm Size (Acres)</label>
                    <input name="farm_size" type="number" placeholder="e.g. 5" />
                  </div>
                  <div className="field">
                    <label>Years Farming</label>
                    <input name="years_farming" type="number" placeholder="e.g. 12" />
                  </div>
                </div>
              </section>

              <button type="button" className="btn-primary full" onClick={() => {
                const form = document.querySelector('form') as HTMLFormElement;
                const fn = (form.querySelector('[name=first_name]') as HTMLInputElement)?.value;
                const sn = (form.querySelector('[name=surname]') as HTMLInputElement)?.value;
                const ph = (form.querySelector('[name=phone]') as HTMLInputElement)?.value;
                const em = (form.querySelector('[name=email]') as HTMLInputElement)?.value;
                const pw = (form.querySelector('[name=password]') as HTMLInputElement)?.value;
                const cpw = (form.querySelector('[name=confirm_password]') as HTMLInputElement)?.value;

                if (!fn || !sn || !ph || !em || !pw) {
                  alert('Please fill in your name, phone, email, and password.');
                  return;
                }
                if (pw !== cpw) {
                  alert('Passwords do not match.');
                  return;
                }
                setStep(2);
              }}>Next: Produce Selection →</button>
            </div>
          </div>

          <div style={{ display: step === 2 ? 'block' : 'none' }}>
            <div className="form-sections-wrap">
              <section className="form-section">
                <div className="section-header">
                  <div className="section-icon">🧺</div>
                  <div>
                    <div className="section-title">What do you grow?</div>
                    <div className="section-sub">Select the categories you produce for market</div>
                  </div>
                </div>

                <div className="category-grid">
                  {CATEGORIES.map(cat => (
                    <div
                      key={cat.id}
                      className={`category-card ${selectedCategories.includes(cat.id) ? 'selected' : ''}`}
                      onClick={() => toggleCategory(cat.id)}
                    >
                      <div className="category-icon">{cat.icon}</div>
                      <div className="category-name">{cat.name}</div>
                      <div className="category-desc">{cat.desc}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="form-section">
                <div className="section-header">
                  <div className="section-icon">📜</div>
                  <div>
                    <div className="section-title">Certifications</div>
                    <div className="section-sub">Optional proof of quality (UNBS, Organic, etc.)</div>
                  </div>
                </div>

                <div className="radio-group">
                  {['Organic Certified', 'UNBS Standards', 'Dairy Permit', 'None yet'].map(cert => (
                    <div
                      key={cert}
                      className={`radio-option ${certifications.includes(cert) ? 'checked' : ''}`}
                      onClick={() => toggleCert(cert)}
                    >
                      <div className="radio-dot"></div>
                      {cert}
                    </div>
                  ))}
                </div>
              </section>

              <div className="btn-row">
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
                <button type="button" className="btn-primary" onClick={() => setStep(3)}>Next: Payment Setup →</button>
              </div>
            </div>
          </div>

          <div style={{ display: step === 3 ? 'block' : 'none' }}>
            <div className="form-sections-wrap">
              <section className="form-section">
                <div className="section-header">
                  <div className="section-icon">💰</div>
                  <div>
                    <div className="section-title">Payment Method</div>
                    <div className="section-sub">How you want to receive payments from buyers</div>
                  </div>
                </div>

                <div className="field">
                  <label>Primary Method</label>
                  <div className="select-wrap">
                    <select name="payment_method" required>
                      <option>Mobile Money (MTN/Airtel)</option>
                      <option>Bank Transfer</option>
                      <option>Cash on Delivery (Restricted)</option>
                    </select>
                  </div>
                </div>

                <div className="field" style={{ marginTop: '20px' }}>
                  <label>MoMo Number for Payouts <span className="req">*</span></label>
                  <input name="momo_number" type="tel" placeholder="07XX XXX XXX" required />
                  <div className="hint">Payments are held in escrow and released to this number.</div>
                </div>
              </section>

              <div className="submit-area" style={{ flexDirection: 'column', textAlign: 'center', gap: '24px' }}>
                <div className="submit-copy">
                  <h3>Ready to join Tunda Gula?</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '8px' }}>By clicking submit, you agree to our farmer terms and code of conduct.</p>
                  <div className="trust-row" style={{ justifyContent: 'center' }}>
                    <div className="trust-badge">🛡️ Verified Identity</div>
                    <div className="trust-badge">🤝 Fair Trade</div>
                    <div className="trust-badge">📲 Secure Payments</div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '20px 48px',
                    fontSize: '20px',
                    fontWeight: '900',
                    borderRadius: '16px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #f5a623, #f7c948)',
                    color: '#1a1a1a',
                    cursor: isSubmitting ? 'wait' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: 'all 0.3s ease',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {isSubmitting ? '⏳ Creating Your Account...' : '🚀 Submit Registration & Enter Dashboard →'}
                </button>
              </div>

              <button type="button" className="btn-secondary full" style={{ marginTop: '12px' }} onClick={() => setStep(2)}>← Back</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
