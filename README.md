# Mantle Run

Run through stages. Earn tokens. Collect badges. Trade NFTs.

## What You Get

You play a runner game. You complete stages. You earn QUEST tokens. You collect badge NFTs. Your progress stays on blockchain. Your rewards stay in your wallet.

## How It Works

Connect your wallet. Register your username. Play through three stages. Complete quizzes. Earn tokens and NFTs. Trade badges on marketplace.

## Your First Game

Step one: Connect your wallet. Use MetaMask, WalletConnect, or MiniPay. MiniPay users get MNT payment options.

Step two: Register your username. Choose a unique name. Get 100 bonus coins. Start your journey.

Step three: Play Stage 1. Run through obstacles. Answer quiz questions. Complete the stage. Earn QUEST tokens.

Step four: Claim your rewards. Claim tokens for completed stages. Claim badge NFTs. View your collection.

Step five: Trade badges. List your badges on marketplace. Buy badges from others. Use Mantle or MNT.

## Stages

Stage 1: Explorer Badge. Complete to earn your first badge. Unlock Stage 2.

Stage 2: Adventurer Badge. More challenging obstacles. Higher rewards.

Stage 3: Master Badge. Final challenge. Maximum rewards.

## Rewards

Registration bonus: 100 in-game coins.

Stage completion: QUEST tokens based on performance.

Badge NFTs: Unique collectible badges for each stage.

Leaderboard: Compete for top positions. See your rank.

## MiniPay Integration

MiniPay users get special features. Automatic wallet detection. MNT balance display. MNT payment option for marketplace. Low transaction fees. Add cash button for quick funding.

## Mobile First

Mantle Run works on your phone. Responsive design fits any screen. Touch controls work perfectly. Optimized for mobile gameplay.

## What You Own

Your badge NFTs belong to you. Trade them. Sell them. Keep them. Your QUEST tokens belong to you. Spend them. Hold them. Your progress stays on blockchain forever.

## Why Mantle

Mantle offers low fees. Your rewards stay in your pocket. Fast transactions mean quick payouts. Mobile design works on your phone. Built for real use.

## Setup and Installation

### Prerequisites

- Node.js 18+ and npm
- Git
- A Mantle-compatible wallet (MetaMask, WalletConnect, or MiniPay)
- For local development: Foundry (for smart contracts)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Web3Baddies/Mantle_run.git
   cd Mantle_run
   ```

2. **Set up the development environment**
   ```bash
   # Install smart contract dependencies
   cd smartcontract
   forge install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**
   - Copy the example environment files:
     ```bash
     cp frontend/.env.local.example frontend/.env.local
     cp smartcontract/.env.example smartcontract/.env
     ```
   - Update the `.env` files with your configuration (see Configuration section below)

4. **Start the development servers**
   ```bash
   # In one terminal (smart contracts)
   cd smartcontract
   forge build
   
   # In another terminal (frontend)
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

### Configuration

#### Frontend (`.env.local`)
```env
NEXT_PUBLIC_QUEST_TOKEN_ADDRESS=0x6937de2Cd1Ad91C4EB7e86AC22ad92c5B89d678B
NEXT_PUBLIC_RUNNER_BADGE_ADDRESS=0x3A71981Ece2aE0CE6F880Bb57D5B5B2c8C95C918
NEXT_PUBLIC_Mantle_run_ADDRESS=0x10877552d992559Ad1a13516AD5Ab948B2aCe554
NEXT_PUBLIC_Mantle_NFT_MARKETPLACE=0x67b018939F05751363581D58C46909B6640C30D3
NEXT_PUBLIC_MNT_TOKEN_ADDRESS=0xc04cc072f052c2e4959de14c7a180713e1ecb18d
NEXT_PUBLIC_CHAIN_ID=5003
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.mantle.xyz
```

#### Smart Contracts (`.env`)
```env
PRIVATE_KEY=0xyour_private_key_with_0x_prefix
ETHERSCAN_API_KEY=your_blockscout_api_key
```

### Deploying to Production

1. **Deploy Smart Contracts**
   ```bash
   # Deploy to Mantle Mainnet
   forge script script/DeployMantleRunner.s.sol:DeployMantleRunner --rpc-url https://rpc.sepolia.mantle.xyz --broadcast
   
   # Deploy Marketplace
   forge script script/DeployMarketplace.s.sol:DeployMarketplace --rpc-url https://rpc.sepolia.mantle.xyz --broadcast
   ```

2. **Build Frontend for Production**
   ```bash
   cd frontend
   npm run build
   npm start
   ```

### Getting Testnet Tokens

For development on Mantle Sepolia testnet:
1. Get test Mantle from the [Mantle Sepolia Faucet](https://faucet.Mantle.org/Mantle-sepolia)
2. Get test MNT from the [Mantle Faucet](https://faucet.Mantle.org/)

## Getting Started

Frontend: Navigate to frontend folder. Run npm install. Run npm run dev. Visit localhost:3000.

Contracts: See smartcontract README for setup. Deploy to Mantle Sepolia testnet. Update frontend addresses.

## Deployed Contracts

Mantle Sepolia Testnet:

QuestToken: 0x48e2e16a5cfe127fbfc76f3fd85163bbae64a861

RunnerBadge: 0x7b72c0e84012f868fe9a4164a8122593d0f38b84

MantleRunner: 0x4588b0ff4016952e4391dea6dcc7f9a1484ac7b6

NFTMarketplace: 0x370f6701cFDECC0A9D744a12b156317AA3CE32D1

View contracts on Blockscout: https://explorer.Mantle-sepolia.Mantle-testnet.org/

## Documentation

- **Root README**: Project overview and getting started (this file)
- **[smartcontract/README.md](./smartcontract/README.md)**: Smart contract setup, deployment, and verification
- **[frontend/README.md](./frontend/README.md)**: Frontend setup, features, and integration guide
- **[frontend/MINIPAY_INTEGRATION.md](./frontend/MINIPAY_INTEGRATION.md)**: MiniPay integration details and features
- **[mini_app/README.md](./mini_app/README.md)**: Farcaster MiniApp implementation with Farcaster SDK integration
- **[mini_app/FARCASTER_INTEGRATION.md](./mini_app/FARCASTER_INTEGRATION.md)**: Farcaster MiniApp integration guide
- **[mini_app/MINIPAY_INTEGRATION.md](./mini_app/MINIPAY_INTEGRATION.md)**: MiniPay integration for MiniApp

## Built for Hackathon

Mantle Run built for **Mantle MiniPay Hackathon 2024** (Nov 14-30). Play to earn mechanics. Mobile first design. Smart contract rewards. NFT marketplace. MiniPay integration. Ready for users.

**Hackathon Alignment:**
- Category: Play-to-Earn Games
- MiniPay Integration: Full MNT support for marketplace
- Farcaster MiniApp: Complete Farcaster MiniApp integration
- All Contracts Verified: Source code on Blockscout
- Mobile-First: Responsive design for all devices
- Documentation: Complete setup guides in each folder

