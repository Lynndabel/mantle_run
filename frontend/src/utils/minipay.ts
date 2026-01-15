import { STABLE_TOKEN_ABI } from '@/config/abis';

/**
 * MiniPay Integration Utilities
 * Detects MiniPay wallet and provides utilities for MiniPay-specific features
 */

// Check if MiniPay wallet is available
export function isMiniPayAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  const hasEthereum = !!(window as any).ethereum;
  const isMiniPay = !!((window as any).ethereum && ((window as any).ethereum as any).isMiniPay);
  
  // Debug logging
  if (hasEthereum) {
    console.log('🔍 Wallet Detection:', {
      hasEthereum,
      isMiniPay,
      walletType: isMiniPay ? 'MiniPay' : 'Other Wallet'
    });
  }
  
  return isMiniPay;
}

// Get connected address from MiniPay
export async function getMiniPayAddress(): Promise<string | null> {
  if (!isMiniPayAvailable()) return null;

  try {
    const accounts = await ((window as any).ethereum as any).request({
      method: "eth_requestAccounts",
      params: [],
    });

    return accounts[0] || null;
  } catch (error) {
    console.error("Error getting MiniPay address:", error);
    return null;
  }
}

// Check MNT balance using viem
export async function checkMNTBalance(
  address: string,
  isTestnet: boolean = false
): Promise<string> {
  try {
    const { createPublicClient, http, getContract, formatEther } = await import("viem");
    const { Mantle, MantleSepolia } = await import("viem/chains");

    const STABLE_TOKEN_ADDRESS_SEPOLIA = "0xc04cc072f052c2e4959de14c7a180713e1ecb18d"; // Mantle Sepolia Testnet
    const STABLE_TOKEN_ADDRESS_MAINNET = "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b"; // Mantle Mainnet

    const publicClient = createPublicClient({
      chain: isTestnet ? MantleSepolia : Mantle,
      transport: http(),
    });

    const stableTokenAddress = isTestnet
      ? STABLE_TOKEN_ADDRESS_SEPOLIA
      : STABLE_TOKEN_ADDRESS_MAINNET;

    const StableTokenContract = getContract({
      abi: STABLE_TOKEN_ABI,
      address: stableTokenAddress as `0x${string}`,
      client: publicClient,
    });

    const balanceInBigNumber = await StableTokenContract.read.balanceOf([
      address as `0x${string}`,
    ]);

    const balanceInEthers = formatEther(balanceInBigNumber);

    return balanceInEthers;
  } catch (error) {
    console.error("Error checking MNT balance:", error);
    return "0";
  }
}

// Open MiniPay add cash screen
export function openMiniPayAddCash(): void {
  if (typeof window !== 'undefined') {
    window.open('https://minipay.opera.com/add_cash', '_blank');
  }
}

// Check if transaction succeeded
export async function checkTransactionStatus(
  transactionHash: string,
  isTestnet: boolean = false
): Promise<boolean> {
  try {
    const { createPublicClient, http } = await import("viem");
    const { Mantle, MantleSepolia } = await import("viem/chains");

    const publicClient = createPublicClient({
      chain: isTestnet ? MantleSepolia : Mantle,
      transport: http(),
    });

    const receipt = await publicClient.getTransactionReceipt({
      hash: transactionHash as `0x${string}`,
    });

    return receipt.status === "success";
  } catch (error) {
    console.error("Error checking transaction status:", error);
    return false;
  }
}

