# CharityChain - Blockchain-Based Charity Platform

## Overview

CharityChain is a decentralized blockchain-based charity donation platform built on the Aptos blockchain. The platform enables transparent, secure, and efficient charitable donations with real-time tracking and verification.

## Project Overview

CharityChain provides a transparent way for donors to contribute to charitable causes with the following features:

- **Blockchain Transparency**: All donations are tracked on the Aptos blockchain, ensuring immutable record-keeping
- **Wallet Integration**: Connect with Petra Wallet for secure blockchain transactions
- **Real-time Campaign Tracking**: See donation progress and impact in real-time
- **Verification System**: NGOs and charitable organizations undergo verification
- **Smart Contract Security**: Funds distribution controlled by smart contracts

## Current State

### Implemented Features
- Blockchain Integration
  - Petra wallet connection
  - Transaction processing
  - Smart contract interaction
  - Transaction verification
  - Blockchain hash tracking
- Campaign Management
  - Campaign creation and listing
  - Donation processing
  - Milestone tracking
  - Progress monitoring
- User Interface
  - Modern, responsive design
  - Dark/light mode support
  - Real-time updates
  - Transaction history
- Security Features
  - Wallet authentication
  - Transaction signing
  - Input validation
  - Rate limiting

## Technical Architecture

### Smart Contracts

#### 1. Donation Management Contract (`donation_management.move`)
```move
// Core functionality for handling donations
- record_donation: Records a new donation with donor info, amount, and campaign ID
- process_donation: Handles the donation processing and fund distribution
- refund_donation: Manages donation refunds if needed
- get_donation_history: Retrieves donation history for a campaign
- verify_donation: Verifies donation authenticity on the blockchain
```

#### 2. NGO Registration Contract (`ngo_registration.move`)
```move
// Manages NGO registration and verification
- register_ngo: Registers a new NGO with required documentation
- verify_ngo: Verifies NGO credentials and documentation
- update_ngo_info: Updates NGO information
- get_ngo_status: Checks NGO verification status
- list_verified_ngos: Lists all verified NGOs
```

#### 3. Campaign Management Contract (`campaign_management.move`)
```move
// Handles campaign creation and management
- create_campaign: Creates a new fundraising campaign
- update_campaign: Updates campaign details
- end_campaign: Handles campaign completion
- get_campaign_details: Retrieves campaign information
- list_active_campaigns: Lists all active campaigns
```

#### 4. Milestone Management Contract (`milestone_management.move`)
```move
// Manages campaign milestones and fund release
- create_milestone: Creates a new milestone for a campaign
- update_milestone: Updates milestone progress
- release_funds: Releases funds for completed milestones
- verify_milestone: Verifies milestone completion
- get_milestone_status: Checks milestone status
```

#### 5. Fee Management Contract (`fee_management.move`)
```move
// Handles platform fees and treasury management
- calculate_fees: Calculates platform fees for transactions
- collect_fees: Collects and distributes platform fees
- update_fee_structure: Updates platform fee structure
- get_fee_info: Retrieves current fee information
```

### Blockchain Hash Integration

#### Overview
Blockchain transaction hashes are cryptographic digests that uniquely identify transactions on the blockchain. They serve as immutable receipts that can be used to verify that a transaction occurred and was included in the blockchain.

#### Implementation Components

##### 1. Contract Configuration
```typescript
// config/contracts.ts
- Contract addresses
- Module names
- Network information
- Function IDs for common contract calls
- Helper functions for building explorer URLs
```

##### 2. Transaction Service
```typescript
// services/transaction.ts
- Executing blockchain transactions
- Tracking transaction statuses
- Maintaining transaction history
- Verifying transactions on the blockchain
```

##### 3. Transaction History Component
```typescript
// components/TransactionHistory.tsx
- Transaction hash display
- Status tracking
- Time information
- Function called
- Explorer link generation
```

##### 4. Transaction Verification Component
```typescript
// components/TransactionVerification.tsx
- Pending status
- Successful confirmation
- Failed transaction handling
```

##### 5. Donation Receipt Card
```typescript
// components/DonationReceiptCard.tsx
- Transaction hash inclusion
- Verification status
- Amount details
- Recipient information
- Date and time
- Donor address
- Explorer link
```

#### Transaction Flow
1. **Initiation**: User clicks "Donate" and enters an amount
2. **Submission**: Transaction is created and submitted to the blockchain
3. **Tracking**: Transaction hash is captured and stored in history
4. **Verification**: UI updates to show transaction status
5. **Receipt**: Once confirmed, a receipt is generated with the hash

#### Data Structure
```typescript
interface TransactionInfo {
  hash: string;         // The transaction hash
  status: TransactionStatus; // PENDING, SUCCESSFUL, or FAILED
  explorerUrl: string;  // URL to the explorer
  timestamp: number;    // Time of transaction
  functionName: string; // Contract function called
  args: any[];         // Arguments passed to the function
}
```

### Frontend Architecture

#### Component Structure

##### Wallet Integration Components
```typescript
// WalletProvider.tsx
- Manages wallet connection state
- Handles wallet events
- Provides wallet context to the app

// WalletButton.tsx
- Handles wallet connection UI
- Manages connection/disconnection
- Shows wallet status

// TransactionHistory.tsx
- Displays transaction records
- Shows transaction status
- Handles transaction filtering
```

##### Campaign Components
```typescript
// DonateButton.tsx
- Handles donation process
- Manages transaction submission
- Shows donation status

// DonationReceiptCard.tsx
- Generates donation receipts
- Shows transaction details
- Provides verification info

// CampaignCard.tsx
- Displays campaign information
- Shows progress and milestones
- Handles campaign interaction
```

#### State Management
```typescript
// Using React Context for global state
- WalletContext: Manages wallet state
- CampaignContext: Manages campaign data
- TransactionContext: Manages transaction state
```

#### API Integration
```typescript
// Blockchain API Services
- getCampaigns: Fetches campaign data
- submitDonation: Handles donation submission
- verifyTransaction: Verifies blockchain transactions
- getNGOInfo: Retrieves NGO information
```

## Technology Stack

### Core Technologies
- Next.js 14
- TypeScript
- Tailwind CSS
- daisyUI
- Aptos SDK
- Petra Wallet

### Development Tools
- ESLint
- Prettier
- Jest
- React Testing Library
- Cypress

## Project Structure

```
charity-frontend/
├── components/           # React components
├── pages/               # Next.js pages
├── styles/              # Global styles
├── utils/               # Utility functions
├── hooks/               # Custom React hooks
├── contexts/            # React contexts
├── types/               # TypeScript types
├── public/              # Static assets
└── tests/               # Test files
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Petra Wallet browser extension
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/charity-chain.git

# Navigate to frontend directory
cd charity-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Development Challenges

### Current Issues
1. Blockchain Integration
   - Transaction confirmation delays
   - Network congestion handling
   - Gas fee optimization
   - State synchronization

2. Performance Optimization
   - Large bundle size
   - Image optimization
   - API response caching
   - State management efficiency

### Solutions
1. Blockchain
   - Implement retry mechanisms
   - Add transaction queuing
   - Optimize gas usage
   - Cache blockchain state

2. Performance
   - Code splitting
   - Lazy loading
   - Image optimization
   - State management optimization

## Contributing

### Guidelines
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

### Code Style
- Follow TypeScript best practices
- Use functional components
- Implement proper error handling
- Add comprehensive tests
- Document your code

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries or support, please contact:
- Email: support@charitychain.com
- GitHub Issues: [Project Issues](https://github.com/yourusername/charity-chain/issues)
