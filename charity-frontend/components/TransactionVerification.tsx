'use client';

import { useState, useEffect } from 'react';
import {
  verifyTransaction,
  TransactionStatus,
} from '../services/transaction';
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaExternalLinkAlt } from 'react-icons/fa';
import { getExplorerURL } from '../config/contracts';

interface TransactionVerificationProps {
  txHash: string;
  showExplorerLink?: boolean;
  className?: string;
}

export default function TransactionVerification({
  txHash,
  showExplorerLink = true,
  className = '',
}: TransactionVerificationProps) {
  const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.PENDING);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkTransaction = async () => {
      if (!txHash) {
        setError('No transaction hash provided');
        setIsLoading(false);
        return;
      }

      try {
        const transactionStatus = await verifyTransaction(txHash);
        setStatus(transactionStatus);
      } catch (error) {
        setError('Failed to verify transaction');
        console.error('Transaction verification error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkTransaction();
  }, [txHash]);

  if (isLoading) {
    return (
      <div className={`flex items-center ${className}`}>
        <FaSpinner className="animate-spin text-yellow-500 mr-2" />
        <span className="text-gray-600">Verifying...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-red-500 ${className}`}>
        {error}
      </div>
    );
  }

  // Get explorer URL
  const explorerUrl = getExplorerURL('transaction', txHash);

  return (
    <div className={`flex items-center ${className}`}>
      {status === TransactionStatus.SUCCESSFUL && (
        <>
          <FaCheckCircle className="text-green-500 mr-2" />
          <span className="text-gray-800">Verified on blockchain</span>
        </>
      )}

      {status === TransactionStatus.FAILED && (
        <>
          <FaTimesCircle className="text-red-500 mr-2" />
          <span className="text-gray-800">Transaction failed</span>
        </>
      )}

      {status === TransactionStatus.PENDING && (
        <>
          <FaSpinner className="animate-spin text-yellow-500 mr-2" />
          <span className="text-gray-800">Pending verification</span>
        </>
      )}

      {showExplorerLink && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          <FaExternalLinkAlt className="h-3 w-3 mr-1" />
          <span className="text-xs">View on Explorer</span>
        </a>
      )}
    </div>
  );
} 