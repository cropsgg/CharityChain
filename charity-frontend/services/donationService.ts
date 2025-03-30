'use client';

import { Types } from 'aptos';

// Constants
const MODULE_ADDRESS = '0x2db6d9574e7c36edbb45a59ee4df763cdc815d6c30cc00cc6165f2af0a5efc08';
const MODULE_NAME = 'donation_management';
const NGO_REGISTRY_MODULE = 'ngo_registration';

// Interface for donation data
export interface DonationData {
  ngoAddress: string;
  amount: number;
}

// Interface for NGO data
export interface NGOData {
  address: string;
  name: string;
  registrationNumber: string;
  isVerified: boolean;
  isCorporate: boolean;
}

/**
 * Service for interacting with the donation smart contracts
 */
export class DonationService {
  private wallet: any;

  constructor(wallet: any) {
    this.wallet = wallet;
  }

  /**
   * Make a donation to an NGO
   * @param ngoAddress - The address of the NGO
   * @param amount - The amount to donate
   * @returns The transaction hash
   */
  async donate(ngoAddress: string, amount: number): Promise<string> {
    try {
      // Create the transaction payload
      const payload = {
        type: 'entry_function_payload',
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::donate`,
        type_arguments: [],
        arguments: [ngoAddress, amount.toString()]
      };

      // Sign and submit the transaction
      const response = await this.wallet.signAndSubmitTransaction(payload);
      
      // Return the transaction hash
      return response.hash;
    } catch (error) {
      console.error('Error donating:', error);
      throw error;
    }
  }

  /**
   * Request a refund for a donation
   * @param donationIndex - The index of the donation
   * @returns The transaction hash
   */
  async requestRefund(donationIndex: number): Promise<string> {
    try {
      // Create the transaction payload
      const payload = {
        type: 'entry_function_payload',
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::request_refund`,
        type_arguments: [],
        arguments: [donationIndex.toString()]
      };

      // Sign and submit the transaction
      const response = await this.wallet.signAndSubmitTransaction(payload);
      
      // Return the transaction hash
      return response.hash;
    } catch (error) {
      console.error('Error requesting refund:', error);
      throw error;
    }
  }

  /**
   * Register as an NGO or corporate entity
   * @param name - The name of the entity
   * @param registrationNumber - The registration number of the entity
   * @param isCorporate - Whether the entity is a corporate entity
   * @returns The transaction hash
   */
  async registerEntity(
    name: string, 
    registrationNumber: string, 
    isCorporate: boolean
  ): Promise<string> {
    try {
      // Convert strings to byte arrays
      const nameBytes = Array.from(new TextEncoder().encode(name));
      const regNumberBytes = Array.from(new TextEncoder().encode(registrationNumber));

      // Create the transaction payload
      const payload = {
        type: 'entry_function_payload',
        function: `${MODULE_ADDRESS}::${NGO_REGISTRY_MODULE}::register_entity`,
        type_arguments: [],
        arguments: [nameBytes, regNumberBytes, isCorporate]
      };

      // Sign and submit the transaction
      const response = await this.wallet.signAndSubmitTransaction(payload);
      
      // Return the transaction hash
      return response.hash;
    } catch (error) {
      console.error('Error registering entity:', error);
      throw error;
    }
  }

  /**
   * Get mock NGO data (to be replaced with actual blockchain data)
   * @returns An array of NGO data
   */
  getMockNGOs(): NGOData[] {
    return [
      {
        address: '0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0',
        name: 'Global Water Foundation',
        registrationNumber: 'NGO12345',
        isVerified: true,
        isCorporate: false
      },
      {
        address: '0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789',
        name: 'Education for All',
        registrationNumber: 'NGO67890',
        isVerified: true,
        isCorporate: false
      },
      {
        address: '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
        name: 'Tech Accessibility Initiative',
        registrationNumber: 'CSR12345',
        isVerified: true,
        isCorporate: true
      }
    ];
  }

  /**
   * Get mock campaign data (to be replaced with actual blockchain data)
   * @returns An array of campaign data
   */
  getMockCampaigns() {
    return [
      {
        id: '1',
        title: 'Clean Water for Rural Villages',
        ngo: 'Global Water Foundation',
        description: 'Providing clean drinking water to 10 villages in rural areas.',
        targetAmount: 50000,
        currentAmount: 35000,
        deadline: new Date('2023-12-31'),
        image: '/images/water.jpg'
      },
      {
        id: '2',
        title: 'School Supplies for Underprivileged Children',
        ngo: 'Education for All',
        description: 'Providing books, stationery, and other school supplies to 1000 children.',
        targetAmount: 25000,
        currentAmount: 15000,
        deadline: new Date('2023-11-30'),
        image: '/images/education.jpg'
      },
      {
        id: '3',
        title: 'Computer Labs for Rural Schools',
        ngo: 'Tech Accessibility Initiative',
        description: 'Setting up computer labs in 5 rural schools to bridge the digital divide.',
        targetAmount: 75000,
        currentAmount: 45000,
        deadline: new Date('2023-10-31'),
        image: '/images/technology.jpg'
      }
    ];
  }
} 