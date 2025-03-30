#!/bin/bash

# Charity Platform Smart Contract Deployment Script
# --------------------------------------------------

# Set environment variables
NETWORK=${1:-"devnet"}  # Default to devnet if not specified

echo "🚀 Deploying Charity Platform smart contracts to $NETWORK"

# Verify Aptos CLI is installed
if ! command -v aptos &> /dev/null; then
    echo "❌ Aptos CLI not found. Please install it and try again."
    echo "   Installation instructions: https://aptos.dev/cli-tools/aptos-cli/"
    exit 1
fi

# Hardcoded account address from profile (we already know it from the output)
ACCOUNT_ADDRESS="0x2db6d9574e7c36edbb45a59ee4df763cdc815d6c30cc00cc6165f2af0a5efc08"

echo "📝 Using account address: $ACCOUNT_ADDRESS"

# Compile the Move modules
echo "🔨 Compiling Move modules..."
aptos move compile --package-dir . --named-addresses net2dev_addr=$ACCOUNT_ADDRESS

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Compilation successful!"

# Publish the modules
echo "📦 Publishing modules to $NETWORK..."
aptos move publish --package-dir . --named-addresses net2dev_addr=$ACCOUNT_ADDRESS

if [ $? -ne 0 ]; then
    echo "❌ Publication failed. Please check the error messages."
    exit 1
fi

echo "🎉 Smart contracts successfully deployed to $NETWORK!"
echo "📊 Explorer URL: https://explorer.aptoslabs.com/account/$ACCOUNT_ADDRESS?network=$NETWORK"

# Initialize the modules
echo "🔧 Initializing modules..."

echo "1️⃣ Initializing registry..."
aptos move run --function-id $ACCOUNT_ADDRESS::ngo_registration::initialize_registry

echo "2️⃣ Initializing fee configuration..."
aptos move run --function-id $ACCOUNT_ADDRESS::fee_management::initialize_fee_config

echo "3️⃣ Initializing donations..."
aptos move run --function-id $ACCOUNT_ADDRESS::donation_management::initialize_donations

echo "4️⃣ Initializing CSR..."
aptos move run --function-id $ACCOUNT_ADDRESS::csr_management::initialize_csr

echo "5️⃣ Initializing milestones..."
aptos move run --function-id $ACCOUNT_ADDRESS::milestone_management::initialize_milestones

echo "6️⃣ Initializing settings..."
aptos move run --function-id $ACCOUNT_ADDRESS::settings_management::initialize_settings

echo "✅ All modules initialized successfully!"
echo "🎉 Deployment complete! The charity platform is now ready to use." 