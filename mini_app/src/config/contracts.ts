// Contract addresses by network
const CONTRACTS_BY_NETWORK = {
  // Mantle Sepolia Testnet (Chain ID: 5003)
  Sepolia Testnet: {
    QUEST_TOKEN: '0x7B61f8EadD960a2e676f26E6968F5f65FebE1341' as `0x${string}`,
    RUNNER_BADGE: '0xe0Aad78b3615ce64469518f4E406B580de5cABaA' as `0x${string}`,
    Mantle_run: '0x553efD80A0ADEd286Ed49F78Ba5051846db91B37' as `0x${string}`,
    MARKETPLACE: '0x387998f2eA7f6f4F81cc583ba2bDB841d2bB77C6' as `0x${string}`, // Platform fee: 2.5%
    MNT_TOKEN: '0x765DE816845861e75A25fCA122bb6898B8B1282a' as `0x${string}`, // Mantle Sepolia Testnet MNT
  },
  // Mantle Sepolia Testnet (Chain ID: 5003
)
  TESTNET: {
    QUEST_TOKEN: '0x48e2e16a5cfe127fbfc76f3fd85163bbae64a861' as `0x${string}`,
    RUNNER_BADGE: '0x7b72c0e84012f868fe9a4164a8122593d0f38b84' as `0x${string}`,
    Mantle_run: '0x4588b0ff4016952e4391dea6dcc7f9a1484ac7b6' as `0x${string}`,
    MARKETPLACE: '0x2d133d0E526193C17AA0Cb0ceD0D9081fbc6Ad73' as `0x${string}`, // Updated with platform fees (2.5%)
    MNT_TOKEN: '0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b' as `0x${string}`, // Mantle Sepolia MNT
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
    symbol: 'MNTR',
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
