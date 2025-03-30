'use client';

import { useState } from 'react';
import TransactionVerification from './TransactionVerification';
import { FaDownload, FaShare, FaCopy, FaCheckCircle } from 'react-icons/fa';
import { getExplorerURL } from '../config/contracts';

interface DonationReceiptProps {
  txHash: string;
  amount: string;
  ngoName: string;
  ngoAddress: string;
  timestamp: Date;
  donorAddress: string;
}

export default function DonationReceiptCard({
  txHash,
  amount,
  ngoName,
  ngoAddress,
  timestamp,
  donorAddress,
}: DonationReceiptProps) {
  const [copied, setCopied] = useState(false);

  // Format date
  const formattedDate = timestamp.toLocaleDateString();
  const formattedTime = timestamp.toLocaleTimeString();
  
  // Explorer URL
  const explorerUrl = getExplorerURL('transaction', txHash);
  
  // Copy TX hash to clipboard
  const copyTxHash = () => {
    navigator.clipboard.writeText(txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-primary-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white">Donation Receipt</h3>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <TransactionVerification txHash={txHash} className="mb-2" />
          
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <span className="font-mono">{`${txHash.substring(0, 18)}...${txHash.substring(txHash.length - 6)}`}</span>
            <button 
              onClick={copyTxHash}
              className="ml-2 text-primary-500 hover:text-primary-700 focus:outline-none"
              aria-label="Copy transaction hash"
            >
              {copied ? <FaCheckCircle /> : <FaCopy />}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-lg font-bold">{amount} APT</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="text-md">{formattedDate}</p>
            <p className="text-sm text-gray-500">{formattedTime}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500">To</p>
          <p className="font-medium">{ngoName}</p>
          <p className="text-xs text-gray-500 font-mono truncate">{ngoAddress}</p>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-500">From</p>
          <p className="text-xs text-gray-500 font-mono truncate">{donorAddress}</p>
        </div>
        
        <div className="flex justify-between">
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
          >
            View on Explorer
          </a>
          
          <div className="flex space-x-2">
            <button className="inline-flex items-center text-gray-600 hover:text-primary-600 text-sm">
              <FaDownload className="mr-1" /> Save
            </button>
            <button className="inline-flex items-center text-gray-600 hover:text-primary-600 text-sm">
              <FaShare className="mr-1" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 