module charity::fee_management {
    use std::error;
    use std::signer;
    use aptos_framework::event;

    /// Admin address from Move.toml configuration
    const ADMIN: address = @net2dev_addr;

    /// Stores fee configuration and treasury balance.
    struct FeeConfig has key {
        fee_percentage: u64, // In basis points (e.g., 900 = 9%)
        treasury_balance: u64,
    }

    /// Event for fee-related actions.
    #[event]
    struct FeeEvent has drop, store {
        event_type: vector<u8>, // "update", "collected", "withdraw"
        amount: u64,
        new_fee: u64,
    }

    /// Initializes the fee configuration resource.
    public entry fun initialize_fee_config(admin: &signer) {
        // Only admin can initialize.
        assert!(signer::address_of(admin) == ADMIN, error::permission_denied(1));
        move_to(admin, FeeConfig {
            fee_percentage: 900, // Default fee of 9% (900 basis points)
            treasury_balance: 0,
        });
    }

    /// Calculate fee for a given donation amount.
    public fun calculate_fee(amount: u64): u64 acquires FeeConfig {
        let fee_config = borrow_global<FeeConfig>(ADMIN);
        // Calculate fee (amount * percentage / 10000)
        (amount * fee_config.fee_percentage) / 10000
    }

    /// Add fee to the treasury.
    public fun add_fee(amount: u64): u64 acquires FeeConfig {
        let fee_config = borrow_global_mut<FeeConfig>(ADMIN);
        fee_config.treasury_balance = fee_config.treasury_balance + amount;
        
        // Emit event
        event::emit(FeeEvent {
            event_type: b"collected",
            amount,
            new_fee: fee_config.fee_percentage,
        });
        
        amount
    }

    /// Update the fee percentage (admin-only).
    public entry fun update_fee(admin: &signer, new_fee_percentage: u64) acquires FeeConfig {
        assert!(signer::address_of(admin) == ADMIN, error::permission_denied(1));
        let fee_config = borrow_global_mut<FeeConfig>(ADMIN);
        // Ensure fee is within reasonable bounds (e.g., max 20%)
        assert!(new_fee_percentage <= 2000, error::invalid_argument(2));
        fee_config.fee_percentage = new_fee_percentage;
        
        // Emit event
        event::emit(FeeEvent {
            event_type: b"update",
            amount: 0,
            new_fee: new_fee_percentage,
        });
    }

    /// Withdraw treasury funds (admin-only).
    public entry fun withdraw_funds(admin: &signer, amount: u64) acquires FeeConfig {
        assert!(signer::address_of(admin) == ADMIN, error::permission_denied(1));
        let fee_config = borrow_global_mut<FeeConfig>(ADMIN);
        // Ensure sufficient balance.
        assert!(fee_config.treasury_balance >= amount, error::invalid_state(3));
        fee_config.treasury_balance = fee_config.treasury_balance - amount;
        
        // Emit event
        event::emit(FeeEvent {
            event_type: b"withdraw",
            amount,
            new_fee: fee_config.fee_percentage,
        });
        // In a full implementation, perform the coin transfer to the admin.
    }
} 