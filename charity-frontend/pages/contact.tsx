import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import WalletButton from '../components/WalletButton';
import Footer from '../components/Footer';

export default function ContactPage() {
  useEffect(() => {
    console.log("Contact page mounted");
    
    // Force background color
    document.body.style.backgroundColor = "#111827";
    document.body.style.color = "#ffffff";
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    alert('Form submitted successfully! In a real application, this would send your message to our team.');
  };
  
  return (
    <>
      <Head>
        <title>Contact - CharityChain</title>
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
          .contact-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
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
            .contact-section {
              grid-template-columns: 1fr;
            }
          }
          .contact-info {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 1rem;
            padding: 2rem;
          }
          .contact-info h2 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: rgba(0, 249, 255, 1);
          }
          .info-item {
            margin-bottom: 1.5rem;
          }
          .info-item h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: white;
          }
          .info-item p, .info-item a {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.5;
            text-decoration: none;
          }
          .info-item a:hover {
            color: rgba(0, 249, 255, 1);
            text-decoration: underline;
          }
          .contact-form {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 1rem;
            padding: 2rem;
          }
          .contact-form h2 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: rgba(195, 85, 255, 1);
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: rgba(255, 255, 255, 0.8);
          }
          .form-control {
            width: 100%;
            padding: 0.75rem;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 0.5rem;
            color: white;
            font-family: inherit;
          }
          .form-control:focus {
            outline: none;
            border-color: rgba(0, 249, 255, 1);
            box-shadow: 0 0 0 2px rgba(0, 249, 255, 0.2);
          }
          textarea.form-control {
            min-height: 120px;
            resize: vertical;
          }
          .submit-button {
            background: linear-gradient(90deg, #c355ff, #00f9ff);
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 9999px;
            font-weight: 500;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            font-size: 1rem;
          }
          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 15px rgba(0, 249, 255, 0.5);
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
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Get in touch with our team for questions, partnerships, or support.</p>
        </div>
        
        <div className="contact-section">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            
            <div className="info-item">
              <h3>Email</h3>
              <p><a href="mailto:info@charitychain.org">info@charitychain.org</a></p>
            </div>
            
            <div className="info-item">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            
            <div className="info-item">
              <h3>Address</h3>
              <p>
                123 Blockchain Way<br />
                San Francisco, CA 94107<br />
                United States
              </p>
            </div>
            
            <div className="info-item">
              <h3>Social Media</h3>
              <p>
                <a href="#" style={{ marginRight: '10px' }}>Twitter</a>
                <a href="#" style={{ marginRight: '10px' }}>LinkedIn</a>
                <a href="#">GitHub</a>
              </p>
            </div>
          </div>
          
          <div className="contact-form">
            <h2>Send Us A Message</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" className="form-control" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" className="form-control" required></textarea>
              </div>
              
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
} 