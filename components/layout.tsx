// components/layout.tsx
import React from 'react';
import SEO from '@/components/SEO';
import { Inter } from "next/font/google";
import '../assets/styles/globals.css';
import Copyright from '@/components/Copyright';

interface LayoutProps {
  children: React.ReactNode;
}
const inter = Inter( { subsets: [ "latin" ] } );

const seoData = {
  title: "10 hours of Ludwig doing the Luddy! 🕺",
  description: "Join the dance with Ludwig and enjoy 10 hours of the Luddy dance!",
  image: "https://luddy.dance/10hours-luddy.webp"
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SEO title={ seoData.title } description={ seoData.description } image={ seoData.image }/>
      {children}
      <Copyright />
    </>
  );
};

export default Layout;
