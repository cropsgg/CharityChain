/**
 * Transaction Service
 * Handles Aptos blockchain operations and manages transaction hashes
 */

import { 
  CONTRACT_ADDRESS, 
  CURRENT_NETWORK, 
  FUNCTION_IDS, 
  getExplorerURL 
} from '../config/contracts';

// Transaction status types
export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
}

// Transaction information interface
export interface TransactionInfo {
  hash: string;
  status: TransactionStatus;
  explorerUrl: string;
  timestamp: number;
  functionName: string;
  args: any[];
}

// In-memory transaction storage
// In a real app, this would be persisted to localStorage or a database
let transactionHistory: TransactionInfo[] = [];

/**
 * Execute a transaction on the Aptos blockchain
 * @param wallet The connected Petra wallet object
 * @param functionName The function ID to call
 * @param args Arguments for the function call
 * @returns Transaction information
 */
export const executeTransaction = async (
  wallet: any,
  functionName: string,
  args: any[]
): Promise<TransactionInfo> => {
  if (!wallet) {
    throw new Error('Wallet not connected');
  }

  try {
    // Create a transaction payload
    const payload = {
      function: functionName,
      type_arguments: [],
      arguments: args
    };

    // Sign and submit the transaction
    const pendingTransaction = await wallet.signAndSubmitTransaction(payload);
    
    // Handle different response formats from different wallet providers
    const txHash = typeof pendingTransaction === 'string' 
      ? pendingTransaction 
      : pendingTransaction.hash || pendingTransaction.txid || pendingTransaction;
    
    // Create transaction info object
    const txInfo: TransactionInfo = {
      hash: txHash,
      status: TransactionStatus.PENDING,
      explorerUrl: getExplorerURL('transaction', txHash),
      timestamp: Date.now(),
      functionName,
      args,
    };
    
    // Add to history
    transactionHistory.unshift(txInfo);
    
    try {
      // In a real application, we would implement proper transaction status polling here
      // For simplicity, we're just returning the transaction info with PENDING status
      // The UI can then use verifyTransaction to check the status later
      return txInfo;
    } catch (error) {
      console.error('Transaction verification error:', error);
      const failedTxInfo = {
        ...txInfo,
        status: TransactionStatus.FAILED,
      };
      
      // Update in history
      transactionHistory = transactionHistory.map(tx => 
        tx.hash === failedTxInfo.hash ? failedTxInfo : tx
      );
      
      return failedTxInfo;
    }
  } catch (error) {
    console.error('Transaction error:', error);
    throw error;
  }
};

/**
 * Make a donation to an NGO
 * @param wallet The connected Petra wallet object
 * @param ngoAddress The NGO address to donate to
 * @param amount The amount to donate
 * @returns Transaction information
 */
export const makeDonation = async (
  wallet: any,
  ngoAddress: string,
  amount: number | bigint
): Promise<TransactionInfo> => {
  return executeTransaction(
    wallet,
    FUNCTION_IDS.DONATE,
    [ngoAddress, amount.toString()]
  );
};

/**
 * Get the transaction history
 * @returns Array of transaction information
 */
export const getTransactionHistory = (): TransactionInfo[] => {
  return [...transactionHistory];
};

/**
 * Verify the status of a transaction
 * @param hash The transaction hash to verify
 * @returns Transaction status
 */
export const verifyTransaction = async (hash: string): Promise<TransactionStatus> => {
  try {
    // In a production environment, we would use the Aptos SDK to verify the transaction
    // For simplicity, in this example we'll assume success after a delay
    // This simulates the blockchain confirmation time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real app, we would check the transaction status on the blockchain
    // For demo purposes, we'll just return SUCCESS
    return TransactionStatus.SUCCESSFUL;
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return TransactionStatus.PENDING;
  }
}; 