import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { DataProvider } from '../DataContext';
import '../index.css';
import '../styles/admin.css';
import '../styles/admin-verification.css';
import '../styles/admin-analytics.css';
import '../styles/public-pages.css';
import '../styles/public-pricing-about.css';
import '../styles/landing.css';
import '../styles/registration.css';
import '../styles/dashboard.css';

export const metadata = {
  title: 'Tunda Gula Farmer Portal',
  description: 'Manage and track your customer orders, listings, and harvests.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
