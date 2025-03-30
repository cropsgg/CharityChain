module charity::settings_management {
    use std::error;
    use std::signer;
    use aptos_framework::event;
    use charity::fee_management;

    /// Admin address from Move.toml configuration
    const ADMIN: address = @net2dev_addr;

    /// Global platform settings.
    struct PlatformSettings has key {
        paused: bool,
        admin: address,
    }

    /// Event for governance actions.
    #[event]
    struct SettingsEvent has drop, store {
        event_type: vector<u8>, // e.g., "pause", "resume", "update_fee"
        info: vector<u8>,
    }

    /// Initializes the platform settings.
    public entry fun initialize_settings(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(admin_addr == ADMIN, error::permission_denied(1));
        move_to(admin, PlatformSettings {
            paused: false,
            admin: admin_addr,
        });
    }

    /// Pause the platform (admin-only).
    public entry fun pause_platform(admin: &signer) acquires PlatformSettings {
        let settings = borrow_global_mut<PlatformSettings>(ADMIN);
        assert!(signer::address_of(admin) == settings.admin, error::permission_denied(1));
        settings.paused = true;
        
        // Emit event
        event::emit(SettingsEvent {
            event_type: b"pause",
            info: b"Platform paused",
        });
    }

    /// Resume the platform (admin-only).
    public entry fun resume_platform(admin: &signer) acquires PlatformSettings {
        let settings = borrow_global_mut<PlatformSettings>(ADMIN);
        assert!(signer::address_of(admin) == settings.admin, error::permission_denied(1));
        settings.paused = false;
        
        // Emit event
        event::emit(SettingsEvent {
            event_type: b"resume",
            info: b"Platform resumed",
        });
    }

    /// Update fee configuration via governance (admin-only).
    public entry fun update_fee(admin: &signer, new_fee: u64) {
        fee_management::update_fee(admin, new_fee);
        
        // Emit event
        event::emit(SettingsEvent {
            event_type: b"update_fee",
            info: b"Fee updated via governance",
        });
    }
} 