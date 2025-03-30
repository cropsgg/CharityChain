module charity::csr_management {
    use std::error;
    use std::signer;
    use std::vector;
    use aptos_framework::event;

    /// Admin address from Move.toml configuration
    const ADMIN: address = @net2dev_addr;

    /// Represents a corporate CSR campaign.
    struct CSRCampaign has copy, drop, store {
        campaign_id: u64,
        corporate: address,
        ngo: address,
        target_amount: u64,
        collected_amount: u64,
        description: vector<u8>,
    }

    /// Event for CSR campaign actions.
    #[event]
    struct CSREvent has drop, store {
        campaign_id: u64,
        corporate: address,
        ngo: address,
        amount: u64,
        event_type: vector<u8>, // e.g., "created", "donated"
    }

    /// Resource to hold all CSR campaigns.
    struct CorporateCSR has key {
        campaigns: vector<CSRCampaign>,
    }

    /// Initialize the CSR integration resource.
    public entry fun initialize_csr(admin: &signer) {
        // Stored at admin address
        assert!(signer::address_of(admin) == ADMIN, error::permission_denied(1));
        move_to(admin, CorporateCSR {
            campaigns: vector::empty<CSRCampaign>(),
        });
    }

    /// Corporate donor creates a new CSR campaign.
    public entry fun create_campaign(
        corporate: &signer,
        campaign_id: u64,
        ngo: address,
        target_amount: u64,
        description: vector<u8>
    ) acquires CorporateCSR {
        let csr = borrow_global_mut<CorporateCSR>(ADMIN);
        let campaign = CSRCampaign {
            campaign_id,
            corporate: signer::address_of(corporate),
            ngo,
            target_amount,
            collected_amount: 0,
            description,
        };
        vector::push_back(&mut csr.campaigns, campaign);
        
        // Emit event
        event::emit(CSREvent {
            campaign_id,
            corporate: signer::address_of(corporate),
            ngo,
            amount: 0,
            event_type: b"created",
        });
    }

    /// Donate to an existing CSR campaign.
    public entry fun donate_to_campaign(
        _donor: &signer,
        campaign_id: u64,
        amount: u64
    ) acquires CorporateCSR {
        let csr = borrow_global_mut<CorporateCSR>(ADMIN);
        let len = vector::length(&csr.campaigns);
        let i = 0;
        
        while (i < len) {
            let campaign_ref = vector::borrow_mut(&mut csr.campaigns, i);
            if (campaign_ref.campaign_id == campaign_id) {
                campaign_ref.collected_amount = campaign_ref.collected_amount + amount;
                
                // Emit event
                event::emit(CSREvent {
                    campaign_id,
                    corporate: campaign_ref.corporate,
                    ngo: campaign_ref.ngo,
                    amount,
                    event_type: b"donated",
                });
                return
            };
            
            i = i + 1;
        };
        
        // If no matching campaign is found, throw an error.
        abort error::invalid_argument(1)
    }
} 