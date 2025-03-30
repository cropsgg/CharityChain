'use client';

import { useState } from 'react';
import { useWallet } from '@/components/WalletProvider';
import { TransactionInfo, TransactionStatus } from '../services/transaction';
import { FUNCTION_IDS, getExplorerURL } from '../config/contracts';
import TransactionVerification from './TransactionVerification';
import DonationReceiptCard from './DonationReceiptCard';

interface DonateButtonProps {
  ngoAddress: string;
  ngoName: string;
  className?: string;
}

export default function DonateButton({ ngoAddress, ngoName, className = '' }: DonateButtonProps) {
  const { connected, connect, address, signAndSubmitTransaction } = useWallet();
  const [amount, setAmount] = useState<number>(10);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState<TransactionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleDonate = async () => {
    if (!connected) {
      await connect();
      return;
    }

    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!connected || !signAndSubmitTransaction || amount <= 0) return;

    setIsLoading(true);
    setError(null);
    
    try {
      // Use our transaction service to make the donation
      const payload = {
        function: FUNCTION_IDS.DONATE,
        type_arguments: [],
        arguments: [ngoAddress, amount.toString()]
      };
      
      const pendingTransaction = await signAndSubmitTransaction(payload);
      
      // Create transaction info
      const txHash = typeof pendingTransaction === 'string' 
        ? pendingTransaction 
        : pendingTransaction.hash || pendingTransaction.txid || pendingTransaction;
        
      const txInfo: TransactionInfo = {
        hash: txHash,
        status: TransactionStatus.PENDING,
        explorerUrl: getExplorerURL('transaction', txHash),
        timestamp: Date.now(),
        functionName: FUNCTION_IDS.DONATE,
        args: [ngoAddress, amount.toString()],
      };
      
      setTransaction(txInfo);
      
      // Show the modal for a bit before switching to the receipt
      setTimeout(() => {
        setShowReceipt(true);
      }, 3000);
    } catch (err: any) {
      console.error('Donation error:', err);
      setError(err.message || 'Failed to process donation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTransaction(null);
    setError(null);
    setShowReceipt(false);
  };

  const viewReceipt = () => {
    setShowReceipt(true);
  };

  return (
    <>
      <button
        onClick={handleDonate}
        className={`px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-medium transition-colors ${className}`}
      >
        {connected ? 'Donate Now' : 'Connect & Donate'}
      </button>

      {/* Donation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {transaction && showReceipt && address ? (
              <DonationReceiptCard
                txHash={transaction.hash}
                amount={amount.toString()}
                ngoName={ngoName}
                ngoAddress={ngoAddress}
                timestamp={new Date(transaction.timestamp)}
                donorAddress={address}
              />
            ) : transaction ? (
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Transaction Submitted!</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Your donation is being processed on the blockchain.
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  <TransactionVerification txHash={transaction.hash} />
                </div>
                <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded overflow-x-auto mb-4">
                  <p className="font-mono">{transaction.hash}</p>
                </div>
                <button
                  onClick={viewReceipt}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  View Receipt
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Make a Donation</h3>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                    {error}
                  </div>
                )}
                
                <div className="mb-6">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (APT)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    disabled={isLoading}
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || amount <= 0}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-500 hover:bg-primary-600'
                  }`}
                >
                  {isLoading ? 'Processing...' : `Donate ${amount} APT`}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
} 