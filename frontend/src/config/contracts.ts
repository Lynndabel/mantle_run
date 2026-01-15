// Contract addresses by network
const CONTRACTS_BY_NETWORK = {
  // Mantle Sepolia Testnet (Chain ID: 5003)
  Sepolia Testnet: {
   QUEST_TOKEN: '0x6937de2Cd1Ad91C4EB7e86AC22ad92c5B89d678B' as `0x${string}`,
    RUNNER_BADGE: '0x3A71981Ece2aE0CE6F880Bb57D5B5B2c8C95C918' as `0x${string}`,
    Mantle_run: '0x10877552d992559Ad1a13516AD5Ab948B2aCe554' as `0x${string}`,
    MARKETPLACE: '0xcA7eEcC451DcAc42D33463161F0c4EC62ED8E88A' as `0x${string}`, // Updated with platform fees (2.5%)
    MNT_TOKEN: '0xc04cc072f052c2e4959de14c7a180713e1ecb18d' as `0x${string}`, // Mantle Sepolia MNT
  },
  // Mantle Sepolia Testnet (Chain ID: 5003
)
  TESTNET: {
    QUEST_TOKEN: '0x6937de2Cd1Ad91C4EB7e86AC22ad92c5B89d678B' as `0x${string}`,
    RUNNER_BADGE: '0x3A71981Ece2aE0CE6F880Bb57D5B5B2c8C95C918' as `0x${string}`,
    Mantle_run: '0x10877552d992559Ad1a13516AD5Ab948B2aCe554' as `0x${string}`,
    MARKETPLACE: '0xcA7eEcC451DcAc42D33463161F0c4EC62ED8E88A' as `0x${string}`, // Updated with platform fees (2.5%)
    MNT_TOKEN: '0xc04cc072f052c2e4959de14c7a180713e1ecb18d' as `0x${string}`, // Mantle Sepolia MNT
  },
} as const;

// Helper function to get contract addresses for a specific network
export function getContractAddresses(chainId?: number) {
  // Default to Sepolia Testnet (5003)
  const isSepolia Testnet = chainId === undefined || chainId === 5003;
  return isSepolia Testnet ? CONTRACTS_BY_NETWORK.Sepolia Testnet : CONTRACTS_BY_NETWORK.TESTNET;
}

// Legacy export for backward compatibility - defaults to Sepolia Testnet (as per Farcaster requirement)
// Individual files should use getContractAddresses(chainId) for network-aware access
export const CONTRACTS = CONTRACTS_BY_NETWORK.Sepolia Testnet;

// Network configuration
export const Mantle_SEPOLIA = {
  id: 5003
,
  name: 'Mantle Sepolia Testnet',
  network: 'Mantle-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Mantle',
    symbol: 'MNT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.mantle.xyz'],
    },
    public: {
      http: ['https://rpc.sepolia.mantle.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Mantle Explorer',
      url: 'https://explorer.Mantle-sepolia.Mantle-testnet.org',
    },
  },
  testnet: true,
} as const;

// Game constants
export const GAME_CONSTANTS = {
  REGISTRATION_BONUS: 100,
  COMPLETION_MULTIPLIER: 2,
  TOTAL_STAGES: 3,
  STAGE_REWARDS: {
    1: 20,
    2: 50,
    3: 100,
  },
  STAGE_BADGES: {
    1: 'Explorer Badge',
    2: 'Adventurer Badge',
    3: 'Master Badge',
  },
} as const;
