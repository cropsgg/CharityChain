module charity::milestone_management {
    use std::error;
    use std::signer;
    use std::vector;
    use aptos_framework::event;

    /// Admin address from Move.toml configuration
    const ADMIN: address = @net2dev_addr;

    /// Stores details of a milestone.
    struct Milestone has copy, drop, store {
        id: u64,
        ngo: address,
        description: vector<u8>,
        amount: u64,
        achieved: bool,
    }

    /// Event emitted when a milestone is updated.
    #[event]
    struct MilestoneEvent has drop, store {
        id: u64,
        ngo: address,
        achieved: bool,
    }

    /// A global resource that holds milestones.
    struct MilestoneData has key {
        milestones: vector<Milestone>,
    }

    /// Initializes the milestone data.
    public entry fun initialize_milestones(admin: &signer) {
        // Store at admin address
        assert!(signer::address_of(admin) == ADMIN, error::permission_denied(1));
        move_to(admin, MilestoneData {
            milestones: vector::empty<Milestone>(),
        });
    }

    /// Admin creates a new milestone for a given NGO campaign.
    public entry fun create_milestone(
        admin: &signer,
        ngo: address,
        description: vector<u8>,
        amount: u64
    ) acquires MilestoneData {
        assert!(signer::address_of(admin) == ADMIN, error::permission_denied(1));
        let milestone_data = borrow_global_mut<MilestoneData>(ADMIN);
        let id = vector::length(&milestone_data.milestones);
        let milestone = Milestone {
            id,
            ngo,
            description,
            amount,
            achieved: false,
        };
        vector::push_back(&mut milestone_data.milestones, milestone);
    }

    /// Oracle function to update milestone status.
    public entry fun oracle_update_milestone(
        _oracle: &signer,
        id: u64,
        achieved: bool
    ) acquires MilestoneData {
        // For simplicity, any caller may act as oracle.
        let milestone_data = borrow_global_mut<MilestoneData>(ADMIN);
        let len = vector::length(&milestone_data.milestones);
        let i = 0;
        
        while (i < len) {
            let milestone_ref = vector::borrow_mut(&mut milestone_data.milestones, i);
            if (milestone_ref.id == id) {
                milestone_ref.achieved = achieved;
                
                // Emit event
                event::emit(MilestoneEvent {
                    id,
                    ngo: milestone_ref.ngo,
                    achieved,
                });
                
                if (achieved) {
                    // Call internal function to release funds.
                    release_funds(milestone_ref.ngo, milestone_ref.amount);
                };
                
                return
            };
            
            i = i + 1;
        }
    }

    /// Internal placeholder function to release funds to the NGO.
    fun release_funds(_ngo: address, _amount: u64) {
        // In a full implementation, perform a coin transfer from escrow.
        // Include error handling for insufficient funds.
    }
} 