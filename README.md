# CharityChain - Decentralized Charity Platform

## Overview

CharityChain is a revolutionary decentralized charity platform built on the Aptos blockchain, designed to bring transparency, accountability, and efficiency to charitable giving. The platform leverages blockchain technology to create an immutable record of donations, ensure proper fund allocation, and provide real-time tracking of charitable initiatives.

## 🌟 Key Features

- **Transparent Donation Tracking**: Every donation is recorded on the blockchain
- **Smart Contract-Based Fund Management**: Automated and secure fund distribution
- **NGO Verification System**: Rigorous verification process for charitable organizations
- **Milestone-Based Fund Release**: Ensures funds are used as intended
- **Real-time Progress Tracking**: Monitor campaign progress and impact
- **Corporate CSR Integration**: Dedicated features for corporate social responsibility
- **Multi-signature Security**: Enhanced fund security through multi-sig wallets
- **Automated Reporting**: Transparent financial and impact reporting

## 🏗️ Technical Architecture

### Smart Contract Infrastructure

Our platform is built on six core smart contracts, each handling specific aspects of the charity ecosystem:

#### 1. NGO Registration & Verification Contract (`ngo_registration.move`)

```move
/// Core functionality for NGO management and verification
public contract NGORegistration {
    // Structures
    struct NGOProfile {
        address: address,
        name: String,
        registration_number: String,
        verification_status: VerificationStatus,
        documents: vector<Document>,
        rating: u8,
        total_funds_raised: u64,
        successful_campaigns: u64
    }

    // Key Functions
    public fun register_ngo(
        name: String,
        registration_number: String,
        documents: vector<Document>
    )
    
    public fun verify_ngo(
        ngo_address: address,
        verification_result: VerificationStatus
    )
    
    public fun update_ngo_profile(
        new_details: NGOProfileUpdate
    )
}
```

**Key Features:**
- NGO profile creation and management
- Document verification system
- Reputation scoring mechanism
- Compliance tracking
- Automated verification checks
- Historical performance tracking

#### 2. Donation Management Contract (`donation_management.move`)

```move
/// Handles all donation-related operations
public contract DonationManagement {
    // Structures
    struct Donation {
        donor: address,
        amount: u64,
        campaign_id: u64,
        timestamp: u64,
        status: DonationStatus,
        transaction_hash: vector<u8>
    }

    // Key Functions
    public fun process_donation(
        campaign_id: u64,
        amount: u64
    )
    
    public fun release_funds(
        campaign_id: u64,
        milestone_id: u64
    )
    
    public fun refund_donation(
        donation_id: u64,
        reason: String
    )
}
```

**Key Features:**
- Secure donation processing
- Multi-currency support
- Automated receipt generation
- Fund allocation tracking
- Refund mechanism
- Transaction history maintenance

#### 3. Milestone Management Contract (`milestone_management.move`)

```move
/// Manages campaign milestones and fund release
public contract MilestoneManagement {
    // Structures
    struct Milestone {
        id: u64,
        campaign_id: u64,
        description: String,
        required_funds: u64,
        completion_criteria: vector<Criterion>,
        status: MilestoneStatus,
        verification_proofs: vector<Proof>
    }

    // Key Functions
    public fun create_milestone(
        campaign_id: u64,
        description: String,
        required_funds: u64
    )
    
    public fun verify_milestone_completion(
        milestone_id: u64,
        proofs: vector<Proof>
    )
    
    public fun release_milestone_funds(
        milestone_id: u64
    )
}
```

**Key Features:**
- Milestone creation and tracking
- Progress verification system
- Automated fund release
- Proof of completion validation
- Impact measurement metrics
- Stakeholder approval workflow

#### 4. Corporate CSR Integration Contract (`csr_management.move`)

```move
/// Manages corporate donations and CSR initiatives
public contract CSRManagement {
    // Structures
    struct CSRInitiative {
        company_id: u64,
        budget: u64,
        focus_areas: vector<String>,
        impact_metrics: vector<Metric>,
        tax_benefits: TaxBenefit
    }

    // Key Functions
    public fun register_csr_initiative(
        budget: u64,
        focus_areas: vector<String>
    )
    
    public fun track_impact_metrics(
        initiative_id: u64,
        metrics: vector<Metric>
    )
    
    public fun generate_tax_documents(
        initiative_id: u64
    )
}
```

**Key Features:**
- Corporate profile management
- CSR budget allocation
- Impact tracking
- Tax benefit calculation
- Automated reporting
- Compliance documentation

#### 5. Fee Management Contract (`fee_management.move`)

```move
/// Handles platform fees and revenue distribution
public contract FeeManagement {
    // Structures
    struct FeeStructure {
        base_fee: u64,
        transaction_fee: u64,
        special_campaign_fee: u64,
        corporate_fee: u64
    }

    // Key Functions
    public fun calculate_fees(
        transaction_amount: u64,
        transaction_type: TransactionType
    ): u64
    
    public fun distribute_fees(
        collected_fees: u64
    )
    
    public fun update_fee_structure(
        new_structure: FeeStructure
    )
}
```

**Key Features:**
- Dynamic fee calculation
- Revenue distribution
- Fee optimization
- Special rate management
- Transaction cost analysis
- Automated settlements

#### 6. Settings Management Contract (`settings_management.move`)

```move
/// Manages platform-wide settings and configurations
public contract SettingsManagement {
    // Structures
    struct PlatformSettings {
        min_donation_amount: u64,
        max_campaign_duration: u64,
        required_verifications: u8,
        supported_currencies: vector<Currency>
    }

    // Key Functions
    public fun update_platform_settings(
        new_settings: PlatformSettings
    )
    
    public fun add_supported_currency(
        currency: Currency
    )
    
    public fun update_security_parameters(
        params: SecurityParams
    )
}
```

**Key Features:**
- Platform configuration
- Security settings
- Currency management
- Verification parameters
- System limits
- Access control

## 🔒 Security Features

### Multi-signature Implementation
```move
struct MultiSigWallet {
    required_signatures: u8,
    owners: vector<address>,
    pending_transactions: vector<Transaction>
}
```

### Transaction Verification
```move
struct TransactionVerification {
    hash: vector<u8>,
    signatures: vector<Signature>,
    timestamp: u64,
    status: VerificationStatus
}
```

## 📊 Data Structures

### Campaign Structure
```move
struct Campaign {
    id: u64,
    ngo_address: address,
    title: String,
    description: String,
    target_amount: u64,
    raised_amount: u64,
    start_time: u64,
    end_time: u64,
    milestones: vector<Milestone>,
    status: CampaignStatus
}
```

### Donation Structure
```move
struct DonationDetails {
    id: u64,
    donor: address,
    amount: u64,
    campaign_id: u64,
    timestamp: u64,
    transaction_hash: vector<u8>,
    status: DonationStatus
}
```

## 🚀 Getting Started

### Prerequisites
- Aptos CLI
- Move Compiler
- Node.js 18+
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cropsgg/CharityChain.git
cd CharityChain
```

2. Install dependencies:
```bash
cd charity-frontend
npm install
```

3. Deploy smart contracts:
```bash
./scripts/deploy.sh
```

4. Start the frontend:
```bash
npm run dev
```

## 🔧 Development Setup

### Smart Contract Development
1. Install Aptos CLI
2. Configure Move.toml
3. Run tests:
```bash
aptos move test
```

### Frontend Development
1. Configure environment variables
2. Run development server
3. Connect wallet
4. Test transactions

## 📈 Performance Metrics

- Transaction Processing: ~3-5 seconds
- Smart Contract Gas Optimization: Implemented
- Frontend Load Time: < 2 seconds
- Blockchain Query Response: < 1 second

## 🔐 Security Measures

1. **Smart Contract Security**
   - Multi-signature requirements
   - Time locks on large transactions
   - Emergency pause functionality
   - Rate limiting

2. **Access Control**
   - Role-based permissions
   - Graduated access levels
   - Activity monitoring
   - Audit logging

## 🌐 Network Architecture

```
CharityChain Network
├── Smart Contract Layer
│   ├── NGO Registration
│   ├── Donation Management
│   ├── Milestone Tracking
│   ├── CSR Integration
│   ├── Fee Management
│   └── Settings Management
├── Application Layer
│   ├── Frontend (Next.js)
│   ├── Backend Services
│   └── API Gateway
└── Infrastructure Layer
    ├── Aptos Blockchain
    ├── IPFS Storage
    └── Analytics Engine
```

## 🛣️ Roadmap

### Phase 1: Foundation (Completed)
- ✅ Core smart contracts
- ✅ Basic frontend
- ✅ Wallet integration
- ✅ Transaction processing

### Phase 2: Enhancement (In Progress)
- 🔄 Advanced analytics
- 🔄 Mobile application
- 🔄 Multi-chain support
- 🔄 AI-powered fraud detection

### Phase 3: Expansion (Planned)
- 📅 Global NGO network
- 📅 Corporate partnerships
- 📅 Government integrations
- 📅 Impact measurement system

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Submit pull request
5. Code review
6. Merge

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Project Lead**: [Your Name]
- **Email**: support@charitychain.com
- **Discord**: [Community Channel]
- **Twitter**: [@CharityChain]

## 🙏 Acknowledgments

- Aptos Foundation
- Open Source Community
- Early Contributors
- NGO Partners 