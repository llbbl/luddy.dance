// components/layout.tsx

import { Inter } from 'next/font/google';
import type React from 'react';
import Copyright from '@/components/Copyright';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import SEO from '@/components/SEO';

interface LayoutProps {
  children: React.ReactNode;
}
const _inter = Inter({ subsets: ['latin'] });

const seoData = {
  title: '10 hours of Ludwig doing the Luddy! 🕺',
  description: 'Join the dance with Ludwig and enjoy 10 hours of the Luddy dance!',
  image: 'https://luddy.dance/10hours-luddy.webp',
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SEO title={seoData.title} description={seoData.description} image={seoData.image} />
      <ErrorBoundary>{children}</ErrorBoundary>
      <Copyright />
    </>
  );
};

export default Layout;
