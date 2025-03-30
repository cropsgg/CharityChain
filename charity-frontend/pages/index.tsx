import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import WalletButton from '../components/WalletButton';
import { useWallet } from '../components/WalletProvider';
import Footer from '../components/Footer';

// Sample campaign data
const campaigns = [
  {
    id: "1",
    title: "Clean Water Initiative",
    description: "Providing clean drinking water to communities in need through sustainable infrastructure.",
    image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    goal: 50000,
    raised: 32750,
    categories: ["Water", "Infrastructure"]
  },
  {
    id: "2",
    title: "Education for All",
    description: "Supporting educational programs for underprivileged children across developing nations.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    goal: 75000,
    raised: 42100,
    categories: ["Education", "Children"]
  },
  {
    id: "3",
    title: "Medical Relief Fund",
    description: "Providing essential medical supplies to underserved communities affected by natural disasters.",
    image: "https://images.unsplash.com/photo-1631815588090-d1bcbe9b4b4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
    goal: 100000,
    raised: 89750,
    categories: ["Healthcare", "Disaster Relief"]
  }
];

export default function Home() {
  useEffect(() => {
    console.log("Home page mounted");
    
    // Force background color
    document.body.style.backgroundColor = "#111827";
    document.body.style.color = "#ffffff";
  }, []);
  
  const { connected } = useWallet();
  
  return (
    <>
      <Head>
        <title>CharityChain - Blockchain Charity Platform</title>
        <style>{`
          body {
            background: linear-gradient(to bottom, #111827, #0f172a);
            color: white;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .navbar {
            background-color: rgba(17, 24, 39, 0.8);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
          }
          .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            text-decoration: none;
          }
          .nav-links {
            display: flex;
            gap: 2rem;
          }
          .nav-link {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: color 0.2s;
          }
          .nav-link:hover {
            color: white;
          }
          .wallet-btn-container {
            margin-left: 1rem;
          }
          @media (max-width: 768px) {
            .navbar {
              flex-wrap: wrap;
            }
            .nav-links {
              order: 3;
              width: 100%;
              margin-top: 1rem;
              justify-content: center;
            }
            .wallet-btn-container {
              order: 2;
              margin-left: 0;
            }
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 7rem 2rem 2rem;
          }
          .hero-section {
            display: flex;
            flex-direction: column;
            margin-bottom: 4rem;
          }
          @media (min-width: 768px) {
            .hero-section {
              flex-direction: row;
              align-items: center;
            }
          }
          .hero-content {
            flex: 1;
            margin-bottom: 2rem;
          }
          @media (min-width: 768px) {
            .hero-content {
              margin-bottom: 0;
              margin-right: 2rem;
            }
          }
          .hero-title {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            background: linear-gradient(90deg, #c355ff, #00f9ff);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
            line-height: 1.2;
          }
          .hero-description {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            color: rgba(255, 255, 255, 0.8);
            max-width: 600px;
            line-height: 1.6;
          }
          .hero-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }
          .donate-wallet-btn {
            display: inline-block;
          }
          .donate-wallet-btn button {
            padding: 0.75rem 1.5rem;
            border-radius: 9999px;
            font-weight: 500;
            font-size: 1rem;
          }
          .button-primary {
            background: linear-gradient(90deg, #c355ff, #00f9ff);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 9999px;
            font-weight: 500;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            text-decoration: none;
            font-size: 1rem;
          }
          .button-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 15px rgba(0, 249, 255, 0.5);
          }
          .button-secondary {
            background-color: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 0.75rem 1.5rem;
            border-radius: 9999px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            font-size: 1rem;
          }
          .button-secondary:hover {
            background-color: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
          }
          .hero-image {
            flex: 1;
            height: 400px;
            border-radius: 1rem;
            overflow: hidden;
            background-position: center;
            background-size: cover;
            background-image: url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }
          .section-header {
            text-align: center;
            margin-bottom: 3rem;
          }
          .section-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(90deg, #c355ff, #00f9ff);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
          }
          .section-description {
            font-size: 1.25rem;
            max-width: 700px;
            margin: 0 auto;
            color: rgba(255, 255, 255, 0.8);
          }
          .campaigns-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
          }
          .campaign-card {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 1rem;
            overflow: hidden;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .campaign-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }
          .campaign-image {
            height: 180px;
            background-color: rgba(255, 255, 255, 0.1);
            background-position: center;
            background-size: cover;
          }
          .campaign-content {
            padding: 1.5rem;
          }
          .campaign-title {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: white;
          }
          .campaign-description {
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 1rem;
            font-size: 0.875rem;
            line-height: 1.5;
          }
          .campaign-categories {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
          }
          .campaign-category {
            background-color: rgba(0, 249, 255, 0.2);
            color: rgba(0, 249, 255, 1);
            border-radius: 9999px;
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem;
          }
          .campaign-progress-bar {
            height: 8px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            margin-bottom: 0.5rem;
            overflow: hidden;
          }
          .campaign-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #c355ff, #00f9ff);
            border-radius: 4px;
          }
          .campaign-stats {
            display: flex;
            justify-content: space-between;
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.875rem;
          }
          .campaign-button {
            background: linear-gradient(90deg, #c355ff, #00f9ff);
            color: white;
            border: none;
            width: 100%;
            padding: 0.75rem 0;
            border-radius: 0.5rem;
            font-weight: 500;
            margin-top: 1rem;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            text-decoration: none;
            text-align: center;
            display: block;
          }
          .campaign-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 15px rgba(0, 249, 255, 0.5);
          }
          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
          }
          .feature-card {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            transition: transform 0.2s;
          }
          .feature-card:hover {
            transform: translateY(-5px);
          }
          .feature-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(45deg, rgba(195, 85, 255, 0.2), rgba(0, 249, 255, 0.2));
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
          }
          .feature-icon svg {
            width: 30px;
            height: 30px;
            color: #00f9ff;
          }
          .feature-title {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: white;
          }
          .feature-description {
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.6;
          }
          .cta-section {
            background: linear-gradient(45deg, rgba(195, 85, 255, 0.1), rgba(0, 249, 255, 0.1));
            border-radius: 1rem;
            padding: 3rem 2rem;
            text-align: center;
            margin-bottom: 2rem;
          }
          .cta-title {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: white;
          }
          .cta-description {
            font-size: 1.25rem;
            max-width: 700px;
            margin: 0 auto 2rem;
            color: rgba(255, 255, 255, 0.8);
          }
          .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
          }
          .debug-info {
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: red;
            color: white;
            padding: 0.5rem;
            z-index: 9999;
          }
        `}</style>
      </Head>
      
      <nav className="navbar">
        <Link href="/" className="logo">CharityChain</Link>
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/campaigns" className="nav-link">Campaigns</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>
        <div className="wallet-btn-container">
          <WalletButton />
        </div>
      </nav>
      
      <div className="container">
        {/* Hero section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Transparent Giving on the Blockchain</h1>
            <p className="hero-description">
              CharityChain leverages blockchain technology to ensure your donations are tracked transparently and reach those who need them most.
            </p>
            <div className="hero-buttons">
              {connected ? (
                <Link href="/campaigns" className="button-primary">Donate Now</Link>
              ) : (
                <div className="donate-wallet-btn">
                  <WalletButton />
                </div>
              )}
              <Link href="/campaigns" className="button-secondary">Explore Campaigns</Link>
            </div>
          </div>
          <div className="hero-image"></div>
        </section>
        
        {/* Featured Campaigns section */}
        <section id="campaigns">
          <div className="section-header">
            <h2 className="section-title">Featured Campaigns</h2>
            <p className="section-description">
              Support these ongoing initiatives to make a positive impact in communities around the world.
            </p>
          </div>
          
          <div className="campaigns-grid">
            {campaigns.map(campaign => {
              const progressPercentage = (campaign.raised / campaign.goal) * 100;
              
              return (
                <div key={campaign.id} className="campaign-card">
                  <div 
                    className="campaign-image" 
                    style={{ 
                      backgroundImage: campaign.image ? `url(${campaign.image})` : 'linear-gradient(45deg, rgba(195, 85, 255, 0.3), rgba(0, 249, 255, 0.3))'
                    }}
                  ></div>
                  <div className="campaign-content">
                    <h3 className="campaign-title">{campaign.title}</h3>
                    <p className="campaign-description">{campaign.description}</p>
                    
                    <div className="campaign-categories">
                      {campaign.categories.map(category => (
                        <span key={category} className="campaign-category">{category}</span>
                      ))}
                    </div>
                    
                    <div className="campaign-progress-bar">
                      <div 
                        className="campaign-progress-fill" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="campaign-stats">
                      <div>${campaign.raised} raised</div>
                      <div>{Math.round(progressPercentage)}% of ${campaign.goal}</div>
                    </div>
                    
                    <Link href={`/campaigns/${campaign.id}`} className="campaign-button">
                      View Campaign
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="section-header">
            <Link href="/campaigns" className="button-primary">View All Campaigns</Link>
          </div>
        </section>
        
        {/* Features section */}
        <section>
          <div className="section-header">
            <h2 className="section-title">Why Choose CharityChain</h2>
            <p className="section-description">
              Our platform offers unique advantages to ensure your donations have the maximum impact.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="feature-title">Blockchain Security</h3>
              <p className="feature-description">
                All transactions are secured on the blockchain, making them immutable and transparent.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Complete Transparency</h3>
              <p className="feature-description">
                Track exactly where your donations go and how they're being used by charitable organizations.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Community Governance</h3>
              <p className="feature-description">
                Participate in decisions about which campaigns to feature and how to improve the platform.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="cta-section">
          <h2 className="cta-title">Ready to Make a Difference?</h2>
          <p className="cta-description">
            Join thousands of donors who are changing the world through transparent, blockchain-powered giving.
          </p>
          <div className="cta-buttons">
            <Link href="/campaigns" className="button-primary">Browse Campaigns</Link>
            <Link href="/about" className="button-secondary">Learn More</Link>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
} 