module charity::donation_management {
    use std::error;
    use std::signer;
    use std::vector;
    use aptos_framework::event;
    use charity::fee_management;

    /// Status codes for a donation.
    const DONATION_COMPLETED: u8 = 0;
    const REFUND_REQUESTED: u8 = 1;
    const REFUNDED: u8 = 2;
    const DONATION_FAILED: u8 = 3;

    /// Admin address from Move.toml configuration
    const ADMIN: address = @net2dev_addr;

    /// Stores details of each donation.
    struct DonationRecord has copy, drop, store {
        donor: address,
        ngo: address,
        amount: u64,
        timestamp: u64,
        status: u8,
    }

    /// Event emitted for donation-related actions.
    #[event]
    struct DonationEvent has drop, store {
        donor: address,
        ngo: address,
        amount: u64,
        status: u8,
    }

    /// A global resource that keeps track of all donations.
    struct DonationManagement has key {
        donations: vector<DonationRecord>,
    }

    /// Initialize the donation management resource.
    public entry fun initialize_donations(admin: &signer) {
        // Store the resource at the admin address
        assert!(signer::address_of(admin) == ADMIN, error::permission_denied(1));
        move_to(admin, DonationManagement {
            donations: vector::empty<DonationRecord>(),
        });
    }

    /// Donor sends a donation to an NGO.
    public entry fun donate(
        donor: &signer,
        ngo: address,
        amount: u64
    ) acquires DonationManagement {
        // Calculate fee and deduct it.
        let fee = fee_management::calculate_fee(amount);
        let net_amount = amount - fee;
        // (In a full implementation, you would invoke token transfer functions here
        // and handle errors such as insufficient funds.)
        let timestamp = 0; // Replace with actual timestamp retrieval.
        let donation = DonationRecord {
            donor: signer::address_of(donor),
            ngo,
            amount: net_amount,
            timestamp,
            status: DONATION_COMPLETED,
        };
        let donation_management = borrow_global_mut<DonationManagement>(ADMIN);
        vector::push_back(&mut donation_management.donations, donation);
        
        // Emit event
        event::emit(DonationEvent {
            donor: signer::address_of(donor),
            ngo,
            amount: net_amount,
            status: DONATION_COMPLETED,
        });
        
        // Add the fee to the treasury.
        fee_management::add_fee(fee);
    }

    /// Donor can request a refund for a specific donation (by its index).
    public entry fun request_refund(
        donor: &signer,
        donation_index: u64
    ) acquires DonationManagement {
        let donation_management = borrow_global_mut<DonationManagement>(ADMIN);
        let donation_ref = vector::borrow_mut(&mut donation_management.donations, donation_index);
        // Ensure the caller is the donor.
        assert!(donation_ref.donor == signer::address_of(donor), error::permission_denied(1));
        donation_ref.status = REFUND_REQUESTED;
        
        // Emit event
        event::emit(DonationEvent {
            donor: donation_ref.donor,
            ngo: donation_ref.ngo,
            amount: donation_ref.amount,
            status: REFUND_REQUESTED,
        });
    }

    /// Admin processes a refund for a donation.
    public entry fun process_refund(
        admin: &signer,
        donation_index: u64
    ) acquires DonationManagement {
        assert!(signer::address_of(admin) == ADMIN, error::permission_denied(1));
        let donation_management = borrow_global_mut<DonationManagement>(ADMIN);
        let donation_ref = vector::borrow_mut(&mut donation_management.donations, donation_index);
        // Only process if a refund was requested.
        assert!(donation_ref.status == REFUND_REQUESTED, error::invalid_argument(2));
        // Simulate a refund transfer. In a full implementation, you would call the coin transfer function
        // and catch any errors (for insufficient funds or transaction failures).
        let refund_success = true;
        if (refund_success) {
            donation_ref.status = REFUNDED;
            
            // Emit event
            event::emit(DonationEvent {
                donor: donation_ref.donor,
                ngo: donation_ref.ngo,
                amount: donation_ref.amount,
                status: REFUNDED,
            });
        } else {
            donation_ref.status = DONATION_FAILED;
            
            // Emit event
            event::emit(DonationEvent {
                donor: donation_ref.donor,
                ngo: donation_ref.ngo,
                amount: donation_ref.amount,
                status: DONATION_FAILED,
            });
        }
    }
} 