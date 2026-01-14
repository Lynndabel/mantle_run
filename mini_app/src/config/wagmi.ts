/**
 * Wagmi configuration with Farcaster MiniApp connector
 * Supports both Mantle Mainnet (default) and Mantle Sepolia Testnet
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
  // Default to mainnet
  ssr: false,
});

// Export default chain (mainnet)
export const defaultChain = Mantle;
