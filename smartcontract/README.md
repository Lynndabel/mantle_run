# Mantle Run Smart Contracts

Smart contracts for Mantle Run game. Deploy to Mantle. Test locally. Verify on Blockscout.

## Quick Links

- [Deployed Contracts](#deployed-contracts)
- [Contract Verification](#contract-verification)
- [Usage Examples](#usage)

## What These Contracts Do

**QuestToken**: ERC20 token for game rewards. Players earn QUEST tokens by completing stages. Tokens can be claimed and used for in-game purchases.

**RunnerBadge**: ERC721 NFT contract. Players earn unique badge NFTs for completing each stage. Badges are collectible and tradeable.

**MantleRunner**: Main game contract. Manages player registration, game sessions, stage progression, leaderboards, and reward distribution. Mints tokens and NFTs to players.

**NFTMarketplace**: Escrowless marketplace for trading RunnerBadge NFTs. Supports both Mantle (native) and MNT (stablecoin) payments. Sellers keep NFTs until sold.

## Prerequisites

Install Foundry. Get Mantle for gas fees. Have a wallet ready.

Foundry installation: https://book.getfoundry.sh/getting-started/installation

## Installation

Clone the repository. Navigate to smartcontract folder. Install dependencies.

```bash
cd Mantle_run/smartcontract
forge install
```

Build contracts:

```bash
forge build
```

Run tests:

```bash
forge test
```

All tests must pass before deployment.

## Configuration

Create a `.env` file in the smartcontract directory:

```
PRIVATE_KEY=0xyour_private_key_with_0x_prefix
ETHERSCAN_API_KEY=your_blockscout_api_key
```

Important notes:
- Private key must include 0x prefix
- Etherscan API key works for Blockscout (Mantle Sepolia)
- Get API key from: https://explorer.Mantle-sepolia.Mantle-testnet.org/

## Get Testnet Tokens

Get testnet tokens before deploying:

- Mantle Sepolia Faucet: https://faucet.Mantle.org/Mantle-sepolia
- Google Cloud Faucet: https://cloud.google.com/application/web3/faucet/Mantle/sepolia

You need Mantle for gas fees.

## Deployment

### Deploy All Contracts

Deploy everything to Mantle Sepolia:

```bash
forge script script/DeployMantleRunner.s.sol:DeployMantleRunner --rpc-url https://forno.Mantle-sepolia.Mantle-testnet.org/ --broadcast
```

This deploys QuestToken, RunnerBadge, and MantleRunner. Sets up relationships. Authorizes MantleRunner to mint tokens and NFTs.

### Deploy Marketplace

Deploy marketplace with MNT support:

```bash
forge script script/DeployMarketplace.s.sol:DeployMarketplace --rpc-url https://forno.Mantle-sepolia.Mantle-testnet.org/ --broadcast
```

This deploys NFTMarketplace with MNT payment support.

### Deploy to Mainnet

```bash
forge script script/DeployMantleRunner.s.sol:DeployMantleRunner --rpc-url https://rpc.sepolia.mantle.xyz --broadcast
```

## Deployed Contracts

### Mantle Sepolia Testnet

**QuestToken**: `0x48e2e16a5cfe127fbfc76f3fd85163bbae64a861`
- Symbol: QUEST
- Decimals: 18
- [View on Explorer](https://explorer.Mantle-sepolia.Mantle-testnet.org/address/0x48e2e16a5cfe127fbfc76f3fd85163bbae64a861)
- ✅ Verified

**RunnerBadge**: `0x7b72c0e84012f868fe9a4164a8122593d0f38b84`
- Symbol: BADGE
- [View on Explorer](https://explorer.Mantle-sepolia.Mantle-testnet.org/address/0x7b72c0e84012f868fe9a4164a8122593d0f38b84)
- ✅ Verified

**MantleRunner**: `0x4588b0ff4016952e4391dea6dcc7f9a1484ac7b6`
- Main game contract
- [View on Explorer](https://explorer.Mantle-sepolia.Mantle-testnet.org/address/0x4588b0ff4016952e4391dea6dcc7f9a1484ac7b6)
- ✅ Verified

**NFTMarketplace**: `0x370f6701cFDECC0A9D744a12b156317AA3CE32D1`
- Supports Mantle and MNT payments
- MNT Token: `0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b`
- [View on Explorer](https://explorer.Mantle-sepolia.Mantle-testnet.org/address/0x370f6701cFDECC0A9D744a12b156317AA3CE32D1)
- ✅ Verified

**MNT Token**: `0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b`
- Mantle Sepolia stablecoin
- [View on Explorer](https://explorer.Mantle-sepolia.Mantle-testnet.org/address/0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b)

View all contracts on Blockscout: https://explorer.Mantle-sepolia.Mantle-testnet.org/

## Contract Verification

### Verify Using Forge (Recommended)

Set your ETHERSCAN_API_KEY in `.env` file, then run:

#### QuestToken (No constructor args)
```bash
forge verify-contract 0x48e2e16a5cfe127fbfc76f3fd85163bbae64a861 \
  src/QuestToken.sol:QuestToken \
  --chain-id 11142220 \
  --verifier blockscout \
  --verifier-url "https://Mantle-sepolia.blockscout.com/api" \
  --etherscan-api-key $ETHERSCAN_API_KEY
```

#### RunnerBadge (No constructor args)
```bash
forge verify-contract 0x7b72c0e84012f868fe9a4164a8122593d0f38b84 \
  src/RunnerBadge.sol:RunnerBadge \
  --chain-id 11142220 \
  --verifier blockscout \
  --verifier-url "https://Mantle-sepolia.blockscout.com/api" \
  --etherscan-api-key $ETHERSCAN_API_KEY
```

#### MantleRunner (Constructor args: questToken, runnerBadge)
```bash
forge verify-contract 0x4588b0ff4016952e4391dea6dcc7f9a1484ac7b6 \
  src/MantleRunner.sol:MantleRunner \
  --chain-id 11142220 \
  --verifier blockscout \
  --verifier-url "https://Mantle-sepolia.blockscout.com/api" \
  --constructor-args 0x00000000000000000000000048e2e16a5cfe127fbfc76f3fd85163bbae64a8610000000000000000000000007b72c0e84012f868fe9a4164a8122593d0f38b84 \
  --etherscan-api-key $ETHERSCAN_API_KEY
```

#### NFTMarketplace (Constructor args: runnerBadge, MNT token)
```bash
forge verify-contract 0x370f6701cFDECC0A9D744a12b156317AA3CE32D1 \
  src/NFTMarketplace.sol:NFTMarketplace \
  --chain-id 11142220 \
  --verifier blockscout \
  --verifier-url "https://Mantle-sepolia.blockscout.com/api" \
  --constructor-args 0x0000000000000000000000007b72c0e84012f868fe9a4164a8122593d0f38b84000000000000000000000000de9e4c3ce781b4ba68120d6261cbad65ce0ab00b \
  --etherscan-api-key $ETHERSCAN_API_KEY
```

**Note:** All contracts have been verified! Verification is asynchronous and may take a few minutes to complete. Check the Blockscout URLs above to confirm verification status.

### Verify Using Blockscout Web Interface

1. Go to contract address on Blockscout
2. Click "Contract" tab
3. Click "Verify & Publish"
4. Fill in verification form:
   - **Compiler Type:** Solidity (Single file) or Standard JSON Input
   - **Compiler Version:** `0.8.19`
   - **License:** MIT
   - **Optimization:** No
   - **Contract Source Code:** Copy from `src/[ContractName].sol`
   - **Constructor Arguments:** See below

#### Constructor Arguments (ABI-Encoded)

**QuestToken**: `0x` (no constructor args)

**RunnerBadge**: `0x` (no constructor args)

**MantleRunner**: `0x00000000000000000000000048e2e16a5cfe127fbfc76f3fd85163bbae64a8610000000000000000000000007b72c0e84012f868fe9a4164a8122593d0f38b84`
- QuestToken: `0x48e2e16a5cfe127fbfc76f3fd85163bbae64a861`
- RunnerBadge: `0x7b72c0e84012f868fe9a4164a8122593d0f38b84`

**NFTMarketplace**: `0x0000000000000000000000007b72c0e84012f868fe9a4164a8122593d0f38b84000000000000000000000000de9e4c3ce781b4ba68120d6261cbad65ce0ab00b`
- RunnerBadge: `0x7B72c0E84012f868fe9a4164a8122593d0F38B84`
- MNT Token: `0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b`

## Usage

### Register Player

Call `registerPlayer(username)` on MantleRunner contract.

Players must register before playing. Registration bonus: 100 in-game coins.

### Save Game Session

Call `saveGameSession(stage, finalScore, coinsCollected, questionsCorrect, stageCompleted)`.

Saves player progress. Updates leaderboard. Tracks stage completion.

### Claim Tokens

Call `claimTokens(stage)` on MantleRunner contract.

Claims QUEST tokens for completed stage. Can only claim once per stage.

### Claim NFT Badge

Call `claimNFT(stage)` on MantleRunner contract.

Mints RunnerBadge NFT for completed stage. Can only claim once per stage.

### List NFT for Sale

1. Approve marketplace to transfer NFT
2. Call `listItem(tokenId, price)` on NFTMarketplace

Price is in wei (Mantle). NFT stays with seller until sold.

### Buy NFT with Mantle

Call `buyItem(tokenId)` on NFTMarketplace with `value: price`.

Sends Mantle to seller. Transfers NFT to buyer.

### Buy NFT with MNT

1. Approve marketplace to spend MNT
2. Call `buyItemWithMNT(tokenId, MNTAmount)` on NFTMarketplace

Sends MNT to seller. Transfers NFT to buyer. Only available for MiniPay users.

### Cancel Listing

Call `cancelListing(tokenId)` on NFTMarketplace.

Only seller can cancel. Removes listing from marketplace.

## Frontend Integration

### Connect to Mantle Network

```typescript
import { defineChain } from "thirdweb/chains";

const MantleSepolia = defineChain({
  id: 42220,
  name: "Mantle Sepolia",
  rpc: "https://rpc.sepolia.mantle.xyz/",
  nativeCurrency: {
    name: "Mantle",
    symbol: "Mantle",
    decimals: 18
  }
});
```

### Get Contract Instance

```typescript
import { getContract } from "thirdweb";

const MantleRunnerContract = getContract({
  client: client,
  chain: MantleSepolia,
  address: "0x4588b0ff4016952e4391dea6dcc7f9a1484ac7b6"
});
```

### Register Player

```typescript
import { prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";

const transaction = prepareContractCall({
  contract: MantleRunnerContract,
  method: "registerPlayer",
  params: ["PlayerUsername"]
});

const { transactionHash } = await sendTransaction({
  account,
  transaction,
});

await waitForReceipt({
  client,
  chain: MantleSepolia,
  transactionHash,
});
```

### Buy NFT with Mantle

```typescript
const marketplaceContract = getContract({
  client: client,
  chain: MantleSepolia,
  address: "0x370f6701cFDECC0A9D744a12b156317AA3CE32D1"
});

const transaction = prepareContractCall({
  contract: marketplaceContract,
  method: "buyItem",
  params: [BigInt(tokenId)],
  value: listingPrice, // in wei
});

const { transactionHash } = await sendTransaction({
  account,
  transaction,
});
```

### Buy NFT with MNT

```typescript
// First approve MNT spending
const MNTContract = getContract({
  client: client,
  chain: MantleSepolia,
  address: "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b"
});

const approveTx = prepareContractCall({
  contract: MNTContract,
  method: "approve",
  params: [marketplaceAddress, listingPrice],
});

await sendTransaction({ account, transaction: approveTx });

// Then buy with MNT
const buyTx = prepareContractCall({
  contract: marketplaceContract,
  method: "buyItemWithMNT",
  params: [BigInt(tokenId), listingPrice],
});

await sendTransaction({ account, transaction: buyTx });
```

## Network Configuration

**Mantle Sepolia Testnet:**
- Chain ID: 11142220
- RPC: https://forno.Mantle-sepolia.Mantle-testnet.org/
- Explorer: https://explorer.Mantle-sepolia.Mantle-testnet.org/
- MNT: 0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b

**Mantle Mainnet:**
- Chain ID: 42220
- RPC: https://rpc.sepolia.mantle.xyz
- Explorer: https://Mantlescan.io/
- MNT: 0x765DE816845861e75A25fCA122bb6898B8B1282a

## Project Structure

```
smartcontract/
├── src/
│   ├── QuestToken.sol
│   ├── RunnerBadge.sol
│   ├── MantleRunner.sol
│   └── NFTMarketplace.sol
├── script/
│   ├── DeployMantleRunner.s.sol
│   └── DeployMarketplace.s.sol
├── test/
│   └── (test files)
├── foundry.toml
└── README.md
```

## Security

Contracts include security features:
- ReentrancyGuard prevents reentrancy attacks
- SafeERC20 handles token transfers safely
- Input validation on all functions
- Owner-only functions protected
- Supply limits enforced
- Access control for minting

## Troubleshooting

**Deployment fails:**
- Check `.env` file has correct values
- Ensure you have enough Mantle for gas fees
- Verify network connectivity
- Check contract compilation: `forge build`

**Verification fails:**
- Ensure `ETHERSCAN_API_KEY` is set in `.env`
- Check API key is valid
- Wait a few minutes after deployment before verification
- Try manual verification on Blockscout
- Ensure constructor arguments are correct

**Tests fail:**
- Run `forge clean` and rebuild
- Check Solidity version matches (0.8.19)
- Verify dependencies installed: `forge install`

## Contract Update Notes

After deploying new contracts:
- Update frontend with new contract addresses
- Verify all contracts on Blockscout
- Test full flow: register, play, save session, claim rewards
- Test marketplace: list, buy with Mantle, buy with MNT

## Support

For issues or questions:
- Mantle Documentation: https://docs.Mantle.org
- Foundry Book: https://book.getfoundry.sh
- OpenZeppelin Contracts: https://docs.openzeppelin.com/contracts
