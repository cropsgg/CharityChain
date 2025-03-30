import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '@styles/globals.css';
import { WalletProvider } from '@components/WalletProvider';

export default function App({ Component, pageProps }: AppProps) {
  console.log('App component rendering...');
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CharityChain - Blockchain Charity Platform</title>
        <meta 
          name="description" 
          content="A charity platform powered by blockchain technology for complete transparency and trust."
        />
      </Head>
      
      <WalletProvider>
        <main className="font-sans">
          <Component {...pageProps} />
        </main>
      </WalletProvider>
    </>
  );
} 