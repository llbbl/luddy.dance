import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Copyright from '@/components/Copyright';
import SEO from '@/components/SEO';

const inter = Inter( { subsets: [ "latin" ] } );

export const metadata: Metadata = {
  title: "luddy.dance",
  description: "Just 10 hours of Ludwig doing the Luddy! 🕺",
};

export default function RootLayout( {
                                      children,
                                    }: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="en">
    <SEO
      title={String(metadata.title || '')}
      description={String(metadata.description || '')}
      image="//10hours-luddy.webp"
    />
    <body className={ inter.className }>
    <div>
      { children }
      <Copyright/>
    </div>
    </body>
    </html>
  );
}
