/**
 * Wagmi configuration with support for Mantle Mainnet (default) and Mantle Sepolia Testnet
 */

import { http, createConfig } from 'wagmi';
import { Mantle, MantleSepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// WalletConnect project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

export const config = createConfig({
  chains: [Mantle, MantleSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [Mantle.id]: http(),
    [MantleSepolia.id]: http(),
  },
  // Default to mainnet
  ssr: false,
});

// Export default chain (mainnet)
export const defaultChain = Mantle;

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
