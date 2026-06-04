"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginFarmer } from '@/app/actions';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const defaultEmail = searchParams?.get('email');
    const isRegistered = searchParams?.get('registered');
    
    if (defaultEmail) setEmail(defaultEmail);
    if (isRegistered === 'true') setShowSuccess(true);
  }, [searchParams]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const result = await loginFarmer(formData);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-wrapper" style={{ 
      minHeight: 'calc(100vh - 64px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px 24px',
      background: 'var(--cream)'
    }}>
      <div className="login-card" style={{
        background: 'var(--white)',
        padding: '48px',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '480px',
        border: '1px solid var(--border-public)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            fontFamily: 'var(--serif)', 
            fontSize: '28px', 
            fontWeight: 900, 
            color: 'var(--ink)' 
          }}>
            Welcome Back
          </div>
          <p style={{ color: 'var(--text-soft-public)', marginTop: '8px' }}>
            Sign in to manage your farm and orders.
          </p>
        </div>

        {showSuccess && (
          <div style={{ 
            background: 'rgba(34, 197, 94, 0.1)', 
            color: 'var(--leaf)', 
            padding: '16px', 
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: 600,
            textAlign: 'center',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}>
            Registration successful! Please login with your new credentials.
          </div>
        )}

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#EF4444', 
            padding: '16px', 
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: 600,
            textAlign: 'center',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)' }}>
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. farmer@tundagula.ug" 
              required
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1.5px solid #eee',
                fontSize: '16px',
                outline: 'none',
                background: '#fcfcfc',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--leaf)'; e.target.style.background = 'var(--white)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.background = '#fcfcfc'; }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)' }}>
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1.5px solid #eee',
                fontSize: '16px',
                outline: 'none',
                background: '#fcfcfc',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--leaf)'; e.target.style.background = 'var(--white)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.background = '#fcfcfc'; }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{
              marginTop: '8px',
              padding: '16px',
              background: 'var(--ink)',
              color: 'var(--white)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: isSubmitting ? 'wait' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'all 0.2s'
            }}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: 'var(--text-soft-public)' }}>
          Don't have an account yet?{' '}
          <Link href="/registration" style={{ color: 'var(--leaf)', fontWeight: 700, textDecoration: 'none' }}>
            Register your farm
          </Link>
        </div>
      </div>
    </div>
  );
}
