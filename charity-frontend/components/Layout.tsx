'use client';

import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "CharityChain - Blockchain Charity Platform",
  description = "A charity platform powered by blockchain technology for transparency and trust."
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        
        <main className="flex-grow pt-16">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout; 