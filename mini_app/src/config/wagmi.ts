/**
 * Wagmi configuration with Farcaster MiniApp connector
 * Supports both Mantle Sepolia Testnet (default) and Mantle Sepolia Testnet
 */

import { http, createConfig } from "wagmi";
import { Mantle, MantleSepolia } from "wagmi/chains";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";

export const wagmiConfig = createConfig({
  chains: [Mantle, MantleSepolia],
  transports: {
    [Mantle.id]: http(),
    [MantleSepolia.id]: http(),
  },
  connectors: [miniAppConnector()],
  // Default to Sepolia Testnet
  ssr: false,
});

// Export default chain (Sepolia Testnet)
export const defaultChain = Mantle;
