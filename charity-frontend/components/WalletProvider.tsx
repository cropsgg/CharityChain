'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { AptosWalletAdapterProvider, useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { Types } from 'aptos';

// Define the shape of our wallet context
interface WalletContextType {
  connected: boolean;
  address: string | null;
  balance: number;
  connect: () => Promise<string | void>;
  disconnect: () => void;
  signAndSubmitTransaction?: (payload: any) => Promise<any>;
}

// Create the context with default values
const WalletContext = createContext<WalletContextType>({
  connected: false,
  address: null,
  balance: 0,
  connect: async () => {},
  disconnect: () => {},
  signAndSubmitTransaction: undefined,
});

// Hook to use the wallet context
export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

// Main WalletProvider component - this wraps the Aptos Wallet Adapter
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  // Initialize the wallets we want to support
  const wallets = useMemo(() => [new PetraWallet()], []);

  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <WalletContextWrapper>
        {children}
      </WalletContextWrapper>
    </AptosWalletAdapterProvider>
  );
};

// This is the internal wrapper that uses the Aptos wallet adapter
const WalletContextWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    connected, 
    account, 
    connect: aptosConnect, 
    disconnect: aptosDisconnect,
    wallets,
    signAndSubmitTransaction: aptosSignAndSubmitTransaction
  } = useAptosWallet();
  
  const [balance, setBalance] = useState<number>(0);
  
  // Connect to wallet
  const connect = async (): Promise<string | void> => {
    try {
      // Attempt to connect using first available wallet or Petra specifically
      await aptosConnect('Petra');
      
      // The account will be available after connecting
      if (account?.address) {
        console.log('Connected to wallet:', account.address);
        return account.address.toString();
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      throw error;
    }
  };

  // Disconnect from wallet
  const disconnect = () => {
    aptosDisconnect();
    console.log('Disconnected from wallet');
  };
  
  // Fetch balance when connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (connected && account?.address) {
        try {
          // Mock balance for now - in production, you would fetch this from the blockchain
          // For example, using the Aptos SDK or API
          setBalance(Math.floor(Math.random() * 10000) / 100);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      } else {
        setBalance(0);
      }
    };

    fetchBalance();
  }, [connected, account]);

  const value = {
    connected,
    address: account?.address?.toString() || null,
    balance,
    connect,
    disconnect,
    signAndSubmitTransaction: connected ? aptosSignAndSubmitTransaction : undefined,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider; 