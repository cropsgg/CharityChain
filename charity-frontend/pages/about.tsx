import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import WalletButton from '../components/WalletButton';
import Footer from '../components/Footer';

export default function AboutPage() {
  useEffect(() => {
    console.log("About page mounted");
    
    // Force background color
    document.body.style.backgroundColor = "#111827";
    document.body.style.color = "#ffffff";
  }, []);
  
  return (
    <>
      <Head>
        <title>About - CharityChain</title>
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
          .about-section {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 1rem;
            padding: 2rem;
            margin-bottom: 2rem;
          }
          .about-section h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: rgba(0, 249, 255, 1);
          }
          .about-section p {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
            margin-bottom: 1rem;
          }
          .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
          }
          .team-member {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            padding: 1.5rem;
            text-align: center;
          }
          .member-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(45deg, #c355ff, #00f9ff);
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: white;
          }
          .member-name {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }
          .member-title {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.875rem;
            margin-bottom: 1rem;
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
        <div className="page-header">
          <h1>About CharityChain</h1>
          <p>Leveraging blockchain technology to bring transparency and accountability to charitable giving.</p>
        </div>
        
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>CharityChain's mission is to revolutionize charitable giving through blockchain technology. By creating an immutable record of all donations and disbursements, we ensure complete transparency and accountability in the philanthropic sector.</p>
          <p>We believe that donors deserve to know exactly how their contributions are being used, and beneficiaries deserve efficient, fair distribution of funds. Our platform bridges this gap by providing real-time tracking and verification.</p>
        </div>
        
        <div className="about-section">
          <h2>Blockchain Transparency</h2>
          <p>All donations made through our platform are recorded on the Aptos blockchain, creating a permanent, tamper-proof record. Every transaction, from initial donation to final disbursement, is tracked and visible to all stakeholders.</p>
          <p>Our smart contracts ensure that funds are released to organizations only when predefined milestones are met, adding an extra layer of accountability and ensuring donations achieve their intended impact.</p>
        </div>
        
        <div className="about-section">
          <h2>Our Team</h2>
          <p>CharityChain is built by a dedicated team of blockchain developers, philanthropic experts, and social impact professionals committed to improving transparency in charitable giving.</p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">JD</div>
              <div className="member-name">Jane Doe</div>
              <div className="member-title">Founder & CEO</div>
              <p>Blockchain enthusiast with 10+ years in the non-profit sector.</p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">JS</div>
              <div className="member-name">John Smith</div>
              <div className="member-title">CTO</div>
              <p>Experienced blockchain developer specialized in smart contracts.</p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">AR</div>
              <div className="member-name">Alice Rodriguez</div>
              <div className="member-title">Head of Partnerships</div>
              <p>Building bridges between NGOs and the blockchain world.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
} 