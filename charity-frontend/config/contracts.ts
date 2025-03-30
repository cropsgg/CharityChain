/**
 * Smart Contract Configuration
 * Contains the deployed contract addresses and module names for the Charity Platform
 */

// The address where our smart contracts are deployed
export const CONTRACT_ADDRESS = "0x2db6d9574e7c36edbb45a59ee4df763cdc815d6c30cc00cc6165f2af0a5efc08";

// Module names
export const MODULES = {
  DONATION_MANAGEMENT: "donation_management",
  NGO_REGISTRATION: "ngo_registration",
  FEE_MANAGEMENT: "fee_management",
  CSR_MANAGEMENT: "csr_management",
  MILESTONE_MANAGEMENT: "milestone_management",
  SETTINGS_MANAGEMENT: "settings_management",
};

// Network configuration
export const NETWORK = {
  DEVNET: "devnet",
  TESTNET: "testnet",
  MAINNET: "mainnet",
};

// Current network
export const CURRENT_NETWORK = NETWORK.DEVNET;

// Explorer URL builder
export const getExplorerURL = (
  type: "account" | "transaction" | "module", 
  hash: string,
  network: string = CURRENT_NETWORK
) => {
  return `https://explorer.aptoslabs.com/${type}/${hash}?network=${network}`;
};

// Function IDs for common contract calls
export const FUNCTION_IDS = {
  // Donation Management
  DONATE: `${CONTRACT_ADDRESS}::${MODULES.DONATION_MANAGEMENT}::donate`,
  REQUEST_REFUND: `${CONTRACT_ADDRESS}::${MODULES.DONATION_MANAGEMENT}::request_refund`,
  
  // NGO Registration
  REGISTER_ENTITY: `${CONTRACT_ADDRESS}::${MODULES.NGO_REGISTRATION}::register_entity`,
  
  // CSR Management
  CREATE_CAMPAIGN: `${CONTRACT_ADDRESS}::${MODULES.CSR_MANAGEMENT}::create_campaign`,
  DONATE_TO_CAMPAIGN: `${CONTRACT_ADDRESS}::${MODULES.CSR_MANAGEMENT}::donate_to_campaign`,
}; 