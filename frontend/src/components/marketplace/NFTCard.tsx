'use client';

import { useState, useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { getContract, readContract, prepareContractCall, sendTransaction, waitForReceipt } from 'thirdweb';
import { defineChain } from 'thirdweb';
// Helper functions for ether conversion
const parseEther = (value: string): bigint => {
  const parts = value.split('.');
  const whole = parts[0] || '0';
  const decimals = parts[1] || '';
  const padded = decimals.padEnd(18, '0').slice(0, 18);
  return BigInt(whole + padded);
};

const formatEther = (value: bigint): string => {
  const str = value.toString().padStart(19, '0');
  const whole = str.slice(0, -18) || '0';
  const decimals = str.slice(-18).replace(/0+$/, '');
  return decimals ? `${whole}.${decimals}` : whole;
};
import { client } from '@/client';
import { CONTRACTS } from '@/config/contracts';
import { RUNNER_BADGE_ABI, NFT_MARKETPLACE_ABI } from '@/config/abis';
import { useGameStore } from '@/store/gameStore';
import { isMiniPayAvailable, checkMNTBalance } from '@/utils/minipay';
import { stableTokenABI } from '@mantle/abis';

const MantleSepolia Testnet = defineChain({
  id: 5003,
  name: "Mantle Sepolia Testnet",
  rpc: "https://rpc.sepolia.mantle.xyz/",
  nativeCurrency: {
    name: "Mantle",
    symbol: "Mantle",
    decimals: 18
  }
});

interface NFTCardProps {
  tokenId: number;
  badgeName: string;
  badgeImage: string;
  ownerAddress: string;
  isOwnedByUser: boolean;
  onListingChange?: () => void;
}

export function NFTCard({ tokenId, badgeName, badgeImage, ownerAddress, isOwnedByUser, onListingChange }: NFTCardProps) {
  const account = useActiveAccount();
  const connectedAddress = account?.address;
  const showNotification = useGameStore(state => state.showNotification);
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [listPrice, setListPrice] = useState('');
  const [isListPending, setIsListPending] = useState(false);
  const [isBuyPending, setIsBuyPending] = useState(false);
  const [isCancelPending, setIsCancelPending] = useState(false);
  const [listing, setListing] = useState<{ seller: string; price: bigint; isActive: boolean } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Mantle' | 'MNT'>('Mantle');
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [MNTBalance, setMNTBalance] = useState<string>('0');
  const [isApprovingMNT, setIsApprovingMNT] = useState(false);
  const [MNTAllowance, setMNTAllowance] = useState<bigint>(BigInt(0));

  const isOwner = isOwnedByUser;

  // Check for MiniPay and load MNT balance
  useEffect(() => {
    setIsMiniPay(isMiniPayAvailable());
  }, []);

  useEffect(() => {
    if (isMiniPay && connectedAddress) {
      checkMNTBalance(connectedAddress, true).then(setMNTBalance);
      checkMNTAllowance();
    }
  }, [isMiniPay, connectedAddress, listing]);

  // Set default payment method for MiniPay users
  useEffect(() => {
    if (isMiniPay) {
      setPaymentMethod('MNT');
    }
  }, [isMiniPay]);

  // Get badge contract instance
  const getBadgeContract = () => {
    return getContract({
      client,
      chain: MantleSepolia Testnet,
      address: CONTRACTS.RUNNER_BADGE,
      abi: RUNNER_BADGE_ABI,
    });
  };

  // Get marketplace contract instance
  const getMarketplaceContract = () => {
    if (CONTRACTS.MARKETPLACE === '0x0000000000000000000000000000000000000000') {
      return null;
    }
    return getContract({
      client,
      chain: MantleSepolia Testnet,
      address: CONTRACTS.MARKETPLACE,
      abi: NFT_MARKETPLACE_ABI,
    });
  };

  // Get MNT token contract instance
  const getMNTContract = () => {
    return getContract({
      client,
      chain: MantleSepolia Testnet,
      address: CONTRACTS.MNT_TOKEN,
      abi: stableTokenABI,
    });
  };

  // Check MNT allowance
  const checkMNTAllowance = async () => {
    if (!connectedAddress || !listing) return;
    
    try {
      const MNTContract = getMNTContract();
      const marketplace = getMarketplaceContract();
      if (!marketplace) return;

      const allowance = await readContract({
        contract: MNTContract,
        method: "allowance",
        params: [connectedAddress, CONTRACTS.MARKETPLACE],
      });

      setMNTAllowance(BigInt(allowance.toString()));
    } catch (error) {
      console.error('Error checking MNT allowance:', error);
    }
  };

  // Fetch listing info
  const fetchListing = async () => {
    const marketplace = getMarketplaceContract();
    if (!marketplace) return;

    try {
      const result = await readContract({
        contract: marketplace,
        method: "getListing",
        params: [BigInt(tokenId)],
      }) as { seller: string; price: bigint; isActive: boolean };

      setListing(result);
    } catch (error) {
      console.error('Error fetching listing:', error);
      setListing(null);
    }
  };

  // Check approval status
  const checkApproval = async () => {
    if (!connectedAddress || !isOwner) return;
    
    const marketplace = getMarketplaceContract();
    if (!marketplace) {
      setIsApproved(false);
      return;
    }

    try {
      const badgeContract = getBadgeContract();
      const approved = await readContract({
        contract: badgeContract,
        method: "isApprovedForAll",
        params: [connectedAddress as `0x${string}`, CONTRACTS.MARKETPLACE],
      }) as boolean;

      setIsApproved(approved);
    } catch (error) {
      console.error('Error checking approval:', error);
      setIsApproved(false);
    }
  };

  // Handle approve
  const handleApprove = async () => {
    if (!connectedAddress || !account) return;
    
    const marketplace = getMarketplaceContract();
    if (!marketplace) {
      showNotification('error', 'Marketplace Not Deployed', 'Marketplace contract is not deployed yet');
      return;
    }

    try {
      setIsApproving(true);
      const badgeContract = getBadgeContract();
      const transaction = prepareContractCall({
        contract: badgeContract,
        method: "setApprovalForAll",
        params: [CONTRACTS.MARKETPLACE, true],
      });

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });

      await waitForReceipt({
        client,
        chain: MantleSepolia Testnet,
        transactionHash,
      });

      setIsApproved(true);
      showNotification('success', 'Approved', 'Marketplace approved successfully!');
    } catch (error: any) {
      console.error('Approval failed:', error);
      showNotification('error', 'Approval Failed', error.message || 'Could not approve marketplace');
    } finally {
      setIsApproving(false);
    }
  };

  // Handle list
  const handleList = async () => {
    if (!listPrice || parseFloat(listPrice) <= 0) {
      showNotification('warning', 'Invalid Price', 'Please enter a valid price in Mantle');
      return;
    }

    const marketplace = getMarketplaceContract();
    if (!marketplace || !account) return;

    try {
      setIsListPending(true);
      const transaction = prepareContractCall({
        contract: marketplace,
        method: "listItem",
        params: [BigInt(tokenId), parseEther(listPrice)],
      });

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });

      await waitForReceipt({
        client,
        chain: MantleSepolia Testnet,
        transactionHash,
      });

      setShowListModal(false);
      setListPrice('');
      showNotification('success', 'Listed!', 'NFT listed for sale successfully!');
      await fetchListing();
      onListingChange?.();
    } catch (error: any) {
      console.error('Listing failed:', error);
      showNotification('error', 'Listing Failed', error.message || 'Could not list NFT');
    } finally {
      setIsListPending(false);
    }
  };

  // Handle buy with Mantle
  const handleBuyWithMantle = async () => {
    if (!listing || !account) return;

    const marketplace = getMarketplaceContract();
    if (!marketplace) return;

    try {
      setIsBuyPending(true);
      const transaction = prepareContractCall({
        contract: marketplace,
        method: "buyItem",
        params: [BigInt(tokenId)],
        value: listing.price,
      });

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });

      await waitForReceipt({
        client,
        chain: MantleSepolia Testnet,
        transactionHash,
      });

      showNotification('success', 'Purchased!', 'NFT purchased successfully with Mantle!');
      await fetchListing();
      onListingChange?.();
    } catch (error: any) {
      console.error('Purchase failed:', error);
      showNotification('error', 'Purchase Failed', error.message || 'Could not purchase NFT');
    } finally {
      setIsBuyPending(false);
    }
  };

  // Handle buy with MNT
  const handleBuyWithMNT = async () => {
    if (!listing || !account) return;

    const marketplace = getMarketplaceContract();
    const MNTContract = getMNTContract();
    if (!marketplace) return;

    try {
      setIsBuyPending(true);

      // Check if we need to approve MNT
      if (MNTAllowance < listing.price) {
        setIsApprovingMNT(true);
        showNotification('info', 'Approving MNT', 'Please approve MNT spending...');

        const approveTx = prepareContractCall({
          contract: MNTContract,
          method: "approve",
          params: [CONTRACTS.MARKETPLACE, listing.price],
        });

        const { transactionHash: approveHash } = await sendTransaction({
          account,
          transaction: approveTx,
        });

        await waitForReceipt({
          client,
          chain: MantleSepolia Testnet,
          transactionHash: approveHash,
        });

        setIsApprovingMNT(false);
        await checkMNTAllowance();
        showNotification('success', 'Approved', 'MNT approved!');
      }

      // Buy with MNT
      const buyTx = prepareContractCall({
        contract: marketplace,
        method: "buyItemWithMNT",
        params: [BigInt(tokenId), listing.price],
      });

      const { transactionHash } = await sendTransaction({
        account,
        transaction: buyTx,
      });

      await waitForReceipt({
        client,
        chain: MantleSepolia Testnet,
        transactionHash,
      });

      showNotification('success', 'Purchased!', 'NFT purchased successfully with MNT!');
      await fetchListing();
      await checkMNTBalance(connectedAddress!, true).then(setMNTBalance);
      onListingChange?.();
    } catch (error: any) {
      console.error('Purchase failed:', error);
      showNotification('error', 'Purchase Failed', error.message || 'Could not purchase NFT');
    } finally {
      setIsBuyPending(false);
      setIsApprovingMNT(false);
    }
  };

  // Main buy handler
  const handleBuy = async () => {
    if (paymentMethod === 'Mantle') {
      await handleBuyWithMantle();
    } else {
      await handleBuyWithMNT();
    }
  };

  // Handle cancel
  const handleCancel = async () => {
    const marketplace = getMarketplaceContract();
    if (!marketplace || !account) return;

    try {
      setIsCancelPending(true);
      const transaction = prepareContractCall({
        contract: marketplace,
        method: "cancelListing",
        params: [BigInt(tokenId)],
      });

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });

      await waitForReceipt({
        client,
        chain: MantleSepolia Testnet,
        transactionHash,
      });

      showNotification('success', 'Canceled', 'Listing canceled successfully!');
      await fetchListing();
      onListingChange?.();
    } catch (error: any) {
      console.error('Cancel failed:', error);
      showNotification('error', 'Cancel Failed', error.message || 'Could not cancel listing');
    } finally {
      setIsCancelPending(false);
    }
  };

  // Check approval and fetch listing on mount
  useEffect(() => {
    if (isOwner && connectedAddress) {
      checkApproval();
    }
    fetchListing();
  }, [isOwner, connectedAddress, tokenId]);

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white hover:shadow-lg transition-shadow">
      {/* NFT Image */}
      <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
        {badgeImage ? (
          <img 
            src={badgeImage} 
            alt={badgeName} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <span className="text-5xl font-bold text-white">#{tokenId}</span>
        )}
      </div>

      {/* NFT Info */}
      <div className="mb-3">
        <h3 className="pixel-font text-lg font-bold text-gray-800 mb-1">{badgeName}</h3>
        <p className="pixel-font text-xs text-gray-600">Token ID: #{tokenId}</p>

        {/* Owner info */}
        <p className="pixel-font text-xs text-gray-500 mt-1">
          {isOwner ? '👤 You own this' : `👤 ${ownerAddress.slice(0, 6)}...${ownerAddress.slice(-4)}`}
        </p>
      </div>

      {/* Listing Info */}
      {listing?.isActive && (
        <div className="mb-3 bg-green-50 border border-green-300 rounded p-2">
          <p className="pixel-font text-xs text-green-800 font-bold">📍 Listed for Sale</p>
          <p className="pixel-font text-lg font-bold text-green-600">
            {formatEther(listing.price)} Mantle
          </p>
          {listing.seller && (
            <p className="pixel-font text-xs text-gray-600 truncate">
              Seller: {listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2">
        {!connectedAddress && (
          <p className="pixel-font text-xs text-center text-gray-500">Connect wallet to interact</p>
        )}

        {connectedAddress && !isOwner && listing?.isActive && (
          <>
            {/* Payment Method Selector - Only for MiniPay users */}
            {isMiniPay && (
              <div className="mb-2 p-2 bg-green-50 border border-green-300 rounded">
                <p className="pixel-font text-[10px] text-green-800 mb-1 font-bold">💵 Payment Method:</p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPaymentMethod('Mantle')}
                    className={`nes-btn pixel-font text-[10px] px-2 py-1 flex-1 ${
                      paymentMethod === 'Mantle' ? 'is-primary' : 'is-disabled'
                    }`}
                  >
                    Mantle
                  </button>
                  <button
                    onClick={() => setPaymentMethod('MNT')}
                    className={`nes-btn pixel-font text-[10px] px-2 py-1 flex-1 ${
                      paymentMethod === 'MNT' ? 'is-success' : 'is-disabled'
                    }`}
                  >
                    MNT
                  </button>
                </div>
                {paymentMethod === 'MNT' && (
                  <p className="pixel-font text-[9px] text-green-700 mt-1">
                    Balance: {parseFloat(MNTBalance).toFixed(2)} MNT
                  </p>
                )}
              </div>
            )}
            <button
              onClick={handleBuy}
              disabled={isBuyPending || isApprovingMNT || (paymentMethod === 'MNT' && parseFloat(MNTBalance) < parseFloat(formatEther(listing.price)))}
              className="nes-btn is-primary pixel-font w-full text-xs"
            >
              {isApprovingMNT ? 'APPROVING...' : isBuyPending ? 'BUYING...' : `BUY NOW (${paymentMethod})`}
            </button>
            {paymentMethod === 'MNT' && parseFloat(MNTBalance) < parseFloat(formatEther(listing.price)) && (
              <p className="pixel-font text-[10px] text-red-600 mt-1 text-center">
                Insufficient MNT balance
              </p>
            )}
          </>
        )}

        {connectedAddress && !isOwner && !listing?.isActive && (
          <p className="pixel-font text-xs text-center text-gray-500">Not for sale</p>
        )}

        {connectedAddress && isOwner && !listing?.isActive && !isApproved && CONTRACTS.MARKETPLACE !== '0x0000000000000000000000000000000000000000' && (
          <button
            onClick={handleApprove}
            disabled={isApproving}
            className="nes-btn is-warning pixel-font w-full text-xs"
          >
            {isApproving ? 'APPROVING...' : 'APPROVE MARKETPLACE'}
          </button>
        )}

        {connectedAddress && isOwner && !listing?.isActive && isApproved && (
          <button
            onClick={() => setShowListModal(true)}
            className="nes-btn is-success pixel-font w-full text-xs"
          >
            LIST FOR SALE
          </button>
        )}

        {connectedAddress && isOwner && listing?.isActive && (
          <button
            onClick={handleCancel}
            disabled={isCancelPending}
            className="nes-btn is-error pixel-font w-full text-xs"
          >
            {isCancelPending ? 'CANCELING...' : 'CANCEL LISTING'}
          </button>
        )}

        {CONTRACTS.MARKETPLACE === '0x0000000000000000000000000000000000000000' && (
          <div className="bg-yellow-50 border border-yellow-300 rounded p-2">
            <p className="pixel-font text-xs text-yellow-800 text-center">
              ⚠️ Marketplace contract not deployed
            </p>
          </div>
        )}
      </div>

      {/* List Modal */}
      {showListModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="nes-container pixel-art bg-white max-w-md w-full">
            <h3 className="pixel-font text-xl font-bold text-gray-800 mb-4">List {badgeName}</h3>

            <div className="mb-4">
              <label className="pixel-font text-sm text-gray-700 block mb-2">Price in Mantle</label>
              <input
                type="number"
                step="0.1"
                placeholder="10.0"
                className="nes-input pixel-font w-full"
                value={listPrice}
                onChange={(e) => setListPrice(e.target.value)}
              />
              <p className="pixel-font text-xs text-gray-500 mt-1">
                Minimum: 0.1 Mantle
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowListModal(false)}
                className="nes-btn pixel-font flex-1 text-xs"
              >
                CANCEL
              </button>
              <button
                onClick={handleList}
                disabled={isListPending}
                className="nes-btn is-primary pixel-font flex-1 text-xs"
              >
                {isListPending ? 'LISTING...' : 'LIST NFT'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

