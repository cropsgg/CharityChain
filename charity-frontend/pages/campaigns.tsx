import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import WalletButton from '../components/WalletButton';
import Footer from '../components/Footer';

// Sample campaign data
const campaigns = [
  {
    id: '1',
    title: 'Clean Water Initiative',
    description: 'Providing clean water solutions to communities in need around the globe.',
    goal: 15000,
    raised: 9750,
    categories: ['Environment', 'Health'],
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800'
  },
  {
    id: '2',
    title: 'Education for All',
    description: 'Supporting educational initiatives for underprivileged children worldwide.',
    goal: 25000,
    raised: 12300,
    categories: ['Education', 'Community']
  },
  {
    id: '3',
    title: 'Wildlife Conservation',
    description: 'Protecting endangered species and their natural habitats.',
    goal: 30000,
    raised: 22500,
    categories: ['Environment', 'Animals']
  },
  {
    id: '4',
    title: 'Medical Aid for Refugees',
    description: 'Providing essential medical supplies and care for refugee camps.',
    goal: 18000,
    raised: 9000,
    categories: ['Health', 'Humanitarian']
  },
  {
    id: '5',
    title: 'Disaster Relief Fund',
    description: 'Immediate assistance for communities affected by natural disasters.',
    goal: 50000,
    raised: 35200,
    categories: ['Emergency', 'Humanitarian']
  },
  {
    id: '6',
    title: 'Digital Literacy Program',
    description: 'Teaching essential tech skills to underprivileged communities.',
    goal: 12000,
    raised: 5800,
    categories: ['Education', 'Technology']
  }
];

export default function CampaignsPage() {
  useEffect(() => {
    console.log("Campaigns page mounted");
    
    // Force background color
    document.body.style.backgroundColor = "#111827";
    document.body.style.color = "#ffffff";
  }, []);
  
  return (
    <>
      <Head>
        <title>Campaigns - CharityChain</title>
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
          .page-header {
            text-align: center;
            margin-bottom: 3rem;
          }
          .page-header h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(90deg, #c355ff, #00f9ff);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
          }
          .page-header p {
            font-size: 1.25rem;
            max-width: 700px;
            margin: 0 auto;
            color: rgba(255, 255, 255, 0.8);
          }
          .filter-section {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
          }
          .filter-title {
            margin-bottom: 1rem;
            font-size: 1.25rem;
            color: white;
          }
          .filter-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .filter-button {
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 9999px;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.8);
            cursor: pointer;
            transition: all 0.2s;
          }
          .filter-button:hover, .filter-button.active {
            background-color: rgba(195, 85, 255, 0.3);
            border-color: rgba(195, 85, 255, 1);
            color: white;
          }
          .campaigns-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
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
          }
          .campaign-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 15px rgba(0, 249, 255, 0.5);
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
        <div className="page-header">
          <h1>All Campaigns</h1>
          <p>Discover meaningful charity campaigns powered by blockchain technology, providing transparency and trust for all donations.</p>
        </div>
        
        <div className="filter-section">
          <div className="filter-title">Filter by Category</div>
          <div className="filter-buttons">
            <button className="filter-button active">All</button>
            <button className="filter-button">Environment</button>
            <button className="filter-button">Health</button>
            <button className="filter-button">Education</button>
            <button className="filter-button">Humanitarian</button>
            <button className="filter-button">Animals</button>
            <button className="filter-button">Technology</button>
            <button className="filter-button">Community</button>
            <button className="filter-button">Emergency</button>
          </div>
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
                  
                  <Link href={`/campaigns/${campaign.id}`}>
                    <button className="campaign-button">View Campaign</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <Footer />
    </>
  );
} 