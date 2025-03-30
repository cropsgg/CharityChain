'use client';

import { useState, useEffect } from 'react';
import { FaWallet } from 'react-icons/fa';
import { useWallet } from './WalletProvider';

export default function WalletButton() {
  const { connect, disconnect, connected, address, balance } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connect();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setDropdownOpen(false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Update loading state when connected state changes
  useEffect(() => {
    if (connected) {
      setIsLoading(false);
    }
  }, [connected]);

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (connected && address) {
    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }}
          className="flex items-center px-4 py-2 rounded-full bg-opacity-10 bg-white border border-white border-opacity-20 text-white hover:bg-opacity-20 transition-all"
        >
          <img 
            src="/petra.webp" 
            alt="Petra Wallet" 
            className="w-5 h-5 mr-2"
          />
          <span>{formatAddress(address)}</span>
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-slate-800 rounded-md shadow-xl z-50">
            <div className="px-4 py-2 text-sm text-slate-300">
              <p>Wallet: Petra</p>
              <p className="mt-1">Balance: {balance.toFixed(2)} APT</p>
            </div>
            <div className="border-t border-slate-700 my-1"></div>
            <button
              onClick={handleDisconnect}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      className={`flex items-center px-4 py-2 rounded-full ${
        isLoading 
          ? 'bg-opacity-50 cursor-not-allowed' 
          : 'hover:shadow-glow'
      } bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium transition-all`}
    >
      <img 
        src="/petra.webp" 
        alt="Petra Wallet" 
        className="w-5 h-5 mr-2"
      />
      <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
    </button>
  );
} 