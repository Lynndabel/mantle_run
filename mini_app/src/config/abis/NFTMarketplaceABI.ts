// NFTMarketplace ABI
export const NFT_MARKETPLACE_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_nftContract", type: "address" },
      { internalType: "address", name: "_MNTToken", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: true, internalType: "address", name: "seller", type: "address" }
    ],
    name: "ItemCanceled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
      { indexed: false, internalType: "uint256", name: "price", type: "uint256" }
    ],
    name: "ItemListed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
      { indexed: false, internalType: "uint256", name: "price", type: "uint256" }
    ],
    name: "ItemSold",
    type: "event"
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "buyItem",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "getListing",
    outputs: [
      {
        components: [
          { internalType: "address", name: "seller", type: "address" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "bool", name: "isActive", type: "bool" }
        ],
        internalType: "struct NFTMarketplace.Listing",
        name: "listing",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "isListed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" }
    ],
    name: "listItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "listings",
    outputs: [
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "bool", name: "isActive", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "nftContract",
    outputs: [{ internalType: "contract IERC721", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MNTToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "MNTAmount", type: "uint256" }
    ],
    name: "buyItemWithMNT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
      { indexed: false, internalType: "uint256", name: "price", type: "uint256" }
    ],
    name: "ItemSoldWithMNT",
    type: "event"
  }
] as const;

