'use client';

import { useState, useEffect } from 'react';
import { 
  getTransactionHistory, 
  TransactionInfo, 
  TransactionStatus, 
  verifyTransaction 
} from '../services/transaction';
import { FaExternalLinkAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<TransactionInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load transaction history
  useEffect(() => {
    const history = getTransactionHistory();
    setTransactions(history);
    setIsLoading(false);
  }, []);

  // Function to refresh transaction statuses
  const refreshTransactions = async () => {
    setIsLoading(true);
    
    // Create a copy of transactions
    const updatedTransactions = [...transactions];
    
    // Update pending transactions
    for (let i = 0; i < updatedTransactions.length; i++) {
      const tx = updatedTransactions[i];
      if (tx.status === TransactionStatus.PENDING) {
        const newStatus = await verifyTransaction(tx.hash);
        updatedTransactions[i] = { ...tx, status: newStatus };
      }
    }
    
    setTransactions(updatedTransactions);
    setIsLoading(false);
  };

  // Status icon component
  const StatusIcon = ({ status }: { status: TransactionStatus }) => {
    switch (status) {
      case TransactionStatus.SUCCESSFUL:
        return <FaCheckCircle className="text-green-500" />;
      case TransactionStatus.FAILED:
        return <FaTimesCircle className="text-red-500" />;
      case TransactionStatus.PENDING:
        return <FaSpinner className="animate-spin text-yellow-500" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <FaSpinner className="animate-spin text-primary-500 text-2xl" />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <p className="text-gray-500 text-center py-8">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <button 
          onClick={refreshTransactions}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          Refresh
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction Hash
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Function
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Explorer
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((tx) => (
              <tr key={tx.hash}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <StatusIcon status={tx.status} />
                    <span className="ml-2 text-sm text-gray-900">
                      {tx.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono">
                    {`${tx.hash.substring(0, 10)}...${tx.hash.substring(tx.hash.length - 8)}`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {tx.functionName.split('::').pop()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(tx.timestamp).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a 
                    href={tx.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 