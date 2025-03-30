import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  // Using 2025 for copyright as requested
  const copyrightYear = 2025;
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Description */}
          <div className="footer-column">
            <div className="footer-logo">
              <Link href="/" className="footer-logo-text">CharityChain</Link>
            </div>
            <p className="footer-description">
              A transparent charity platform powered by blockchain technology,
              ensuring your donations reach those who need them most.
            </p>
            <p className="footer-description mt-4">
              Built on the Aptos blockchain for maximum security, transparency, and efficiency.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/campaigns">Campaigns</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="footer-column">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <FooterLink href="#">How It Works</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="footer-column">
            <h3 className="footer-heading">Stay Updated</h3>
            <p className="footer-description mb-4">
              Subscribe to our newsletter for the latest updates and news.
            </p>
            <div className="footer-subscribe">
              <input
                type="email"
                placeholder="Your email"
                className="footer-input"
              />
              <button className="footer-button">
                Subscribe
              </button>
            </div>
            
            {/* Social Icons */}
            <div className="footer-socials">
              <SocialIcon href="#" icon="twitter" />
              <SocialIcon href="#" icon="github" />
              <SocialIcon href="#" icon="linkedin" />
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="footer-divider"></div>
        
        {/* Bottom text */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {copyrightYear} CharityChain. All rights reserved.</p>
            <p className="mt-1">Blockchain charity platform. Registered charity #CH12345.</p>
          </div>
          <div className="footer-legal">
            <p>Powered by <span className="footer-highlight">Aptos Blockchain</span></p>
            <p className="mt-1">
              <Link href="#" className="footer-legal-link">Privacy Policy</Link>
              {' • '}
              <Link href="#" className="footer-legal-link">Terms of Use</Link>
              {' • '}
              <Link href="#" className="footer-legal-link">Cookies</Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: rgba(17, 24, 39, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 4rem 0 2rem;
          color: white;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .footer-column {
          margin-bottom: 2rem;
        }
        .footer-logo {
          margin-bottom: 1rem;
        }
        .footer-logo-text {
          font-size: 1.5rem;
          font-weight: bold;
          background: linear-gradient(90deg, #c355ff, #00f9ff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          text-decoration: none;
        }
        .footer-description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .footer-heading {
          font-size: 1.25rem;
          font-weight: 500;
          margin-bottom: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s;
          font-size: 0.875rem;
        }
        .footer-link:hover {
          color: #00f9ff;
        }
        .footer-subscribe {
          display: flex;
        }
        .footer-input {
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.6rem 1rem;
          border-radius: 0.25rem 0 0 0.25rem;
          width: 100%;
        }
        .footer-input:focus {
          outline: none;
          border-color: rgba(0, 249, 255, 0.5);
        }
        .footer-button {
          background: linear-gradient(90deg, #c355ff, #00f9ff);
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 0 0.25rem 0.25rem 0;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .footer-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 10px rgba(0, 249, 255, 0.3);
        }
        .footer-socials {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .footer-social-icon {
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.2s;
        }
        .footer-social-icon:hover {
          color: #00f9ff;
        }
        .footer-divider {
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
        }
        .footer-bottom {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            text-align: left;
          }
        }
        .footer-copyright {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) {
          .footer-copyright {
            margin-bottom: 0;
          }
        }
        .footer-legal {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }
        .footer-highlight {
          background: linear-gradient(90deg, #c355ff, #00f9ff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        .footer-legal-link {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-legal-link:hover {
          color: rgba(0, 249, 255, 1);
        }
        .mt-1 {
          margin-top: 0.25rem;
        }
        .mt-4 {
          margin-top: 1rem;
        }
        .mb-4 {
          margin-bottom: 1rem;
        }
      `}</style>
    </footer>
  );
};

// Footer Link component
const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <Link 
      href={href} 
      className="footer-link"
    >
      {children}
    </Link>
  </li>
);

// Social Icon component
const SocialIcon: React.FC<{ href: string; icon: 'twitter' | 'github' | 'linkedin' }> = ({ href, icon }) => {
  // Icons mapping
  const icons = {
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.935 9.935 0 002.46-2.548l-.047-.02z"/>
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.956-.266 1.98-.398 3-.403 1.02.005 2.044.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.824 1.102.824 2.222v3.293c0 .319.192.694.8.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  };
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-social-icon"
    >
      {icons[icon]}
    </a>
  );
};

export default Footer; 