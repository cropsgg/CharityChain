module charity::ngo_registration {
    use std::error;
    use std::signer;
    use std::table;

    /// Information about a registered entity (NGO or Corporate)
    struct NGOInfo has copy, drop, store {
        name: vector<u8>,
        registration_number: vector<u8>,
        compliance_verified: bool,
        is_corporate: bool,
    }

    /// A registry that maps an entity's address to its NGOInfo.
    struct NGORegistry has key {
        ngos: table::Table<address, NGOInfo>,
    }

    /// Admin address from Move.toml configuration
    const ADMIN: address = @net2dev_addr;

    /// Initializes the NGO registry.
    public entry fun initialize_registry(admin: &signer) {
        // Only admin can initialize.
        assert!(signer::address_of(admin) == ADMIN, error::permission_denied(1));
        move_to(admin, NGORegistry {
            ngos: table::new<address, NGOInfo>(),
        });
    }

    /// Register an NGO (or corporate donor) on the platform.
    public entry fun register_entity(
        caller: &signer,
        name: vector<u8>,
        registration_number: vector<u8>,
        is_corporate: bool
    ) acquires NGORegistry {
        let caller_addr = signer::address_of(caller);
        let info = NGOInfo {
            name,
            registration_number,
            compliance_verified: false,
            is_corporate,
        };
        // The registry is stored at the ADMIN address.
        let registry = borrow_global_mut<NGORegistry>(ADMIN);
        table::add(&mut registry.ngos, caller_addr, info);
    }

    /// Admin function to update an entity's compliance status.
    public entry fun verify_entity(
        admin: &signer,
        entity_addr: address,
        verified: bool
    ) acquires NGORegistry {
        assert!(signer::address_of(admin) == ADMIN, error::permission_denied(1));
        let registry = borrow_global_mut<NGORegistry>(ADMIN);
        let info_ref = table::borrow_mut(&mut registry.ngos, entity_addr);
        info_ref.compliance_verified = verified;
    }

    /// Public function to get an entity's information.
    public fun get_entity_info(entity_addr: address): NGOInfo acquires NGORegistry {
        let registry = borrow_global<NGORegistry>(ADMIN);
        *table::borrow(&registry.ngos, entity_addr)
    }
} 