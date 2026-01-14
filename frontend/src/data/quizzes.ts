// Mantle-themed quiz questions for each stage
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const STAGE_QUIZZES: Record<number, QuizQuestion[]> = {
  1: [
    {
      question: "What is Mantle's mission?",
      options: [
        "To create the fastest blockchain",
        "To build a financial system that creates conditions of prosperity for everyone",
        "To replace all traditional banks",
        "To mine Bitcoin faster"
      ],
      correctAnswer: 1,
      explanation: "Mantle's mission is to build a financial system that creates the conditions of prosperity for everyone."
    },
    {
      question: "What makes Mantle unique for mobile users?",
      options: [
        "It only works on iPhones",
        "Mobile-first design with phone number mapping to wallet addresses",
        "It's faster than other blockchains",
        "It has the best mobile games"
      ],
      correctAnswer: 1,
      explanation: "Mantle is designed mobile-first and allows users to send crypto using phone numbers instead of complex addresses."
    },
    {
      question: "What is Mantle's native token?",
      options: [
        "MNT",
        "CEUR",
        "Mantle",
        "GOLD"
      ],
      correctAnswer: 2,
      explanation: "Mantle is the native asset of the Mantle platform, used for transaction fees, governance, and staking."
    },
    {
      question: "What type of stablecoins does Mantle support?",
      options: [
        "Only USD stablecoins",
        "Multiple fiat-pegged stablecoins like MNT, cEUR, cREAL",
        "Only cryptocurrency-backed stablecoins",
        "No stablecoins"
      ],
      correctAnswer: 1,
      explanation: "Mantle supports multiple fiat-pegged stablecoins including MNT (US Dollar), cEUR (Euro), and cREAL (Brazilian Real)."
    },
    {
      question: "What consensus mechanism does Mantle use?",
      options: [
        "Proof of Work",
        "Proof of Stake",
        "Delegated Proof of Stake",
        "Proof of Authority"
      ],
      correctAnswer: 1,
      explanation: "Mantle uses a Proof of Stake (PoS) consensus mechanism, making it energy-efficient and environmentally friendly."
    }
  ],
  2: [
    {
      question: "What is Mantle's approach to carbon neutrality?",
      options: [
        "It ignores environmental concerns",
        "Carbon-negative through offsetting and natural capital backing",
        "Only uses renewable energy for mining",
        "Plants one tree per transaction"
      ],
      correctAnswer: 1,
      explanation: "Mantle is carbon-negative, offsetting more carbon than it produces and backing its reserve with natural capital assets."
    },
    {
      question: "What is the Mantle Reserve?",
      options: [
        "A backup of all blockchain data",
        "A pool of assets backing Mantle stablecoins",
        "A savings account for users",
        "A mining pool"
      ],
      correctAnswer: 1,
      explanation: "The Mantle Reserve is a diversified portfolio of crypto assets that backs and stabilizes the value of Mantle stablecoins."
    },
    {
      question: "What is Valora?",
      options: [
        "A Mantle validator",
        "A mobile wallet for Mantle",
        "A stablecoin",
        "A smart contract language"
      ],
      correctAnswer: 1,
      explanation: "Valora is a mobile-first wallet designed for the Mantle ecosystem, making crypto accessible to everyone."
    },
    {
      question: "What programming language is used for Mantle smart contracts?",
      options: [
        "Python",
        "JavaScript",
        "Solidity",
        "Rust"
      ],
      correctAnswer: 2,
      explanation: "Mantle smart contracts are written in Solidity, the same language used for Ethereum, making it easy for developers to build on Mantle."
    },
    {
      question: "What is Mantle's block time?",
      options: [
        "10 minutes",
        "1 minute",
        "5 seconds",
        "15 seconds"
      ],
      correctAnswer: 2,
      explanation: "Mantle has a fast block time of approximately 5 seconds, enabling quick transaction confirmations."
    }
  ],
  3: [
    {
      question: "What is the Mantle Alliance for Prosperity?",
      options: [
        "A mining pool",
        "A coalition of organizations building financial inclusion",
        "A trading platform",
        "A validator group"
      ],
      correctAnswer: 1,
      explanation: "The Alliance for Prosperity is a coalition of over 150 organizations working to build financial inclusion using Mantle."
    },
    {
      question: "What is unique about Mantle's identity protocol?",
      options: [
        "It requires government ID",
        "It maps phone numbers to wallet addresses",
        "It uses facial recognition",
        "It doesn't have identity features"
      ],
      correctAnswer: 1,
      explanation: "Mantle's identity protocol allows users to map their phone numbers to wallet addresses, making it easy to send money to contacts."
    },
    {
      question: "What is Mantle's approach to governance?",
      options: [
        "Centralized control by founders",
        "On-chain governance where Mantle holders can vote on proposals",
        "No governance system",
        "Governance by miners only"
      ],
      correctAnswer: 1,
      explanation: "Mantle uses on-chain governance where Mantle token holders can propose and vote on protocol changes."
    },
    {
      question: "What is the Mantle Community Fund?",
      options: [
        "A charity organization",
        "On-chain fund for ecosystem development and public goods",
        "A venture capital fund",
        "A user rewards program"
      ],
      correctAnswer: 1,
      explanation: "The Community Fund is an on-chain fund that supports projects building on Mantle and contributing to financial inclusion."
    },
    {
      question: "What makes Mantle EVM-compatible?",
      options: [
        "It's a fork of Ethereum",
        "It can run Ethereum smart contracts and tools work seamlessly",
        "It uses the same consensus as Ethereum",
        "It's not EVM-compatible"
      ],
      correctAnswer: 1,
      explanation: "Mantle is fully EVM-compatible, meaning Ethereum smart contracts and development tools work on Mantle with minimal changes."
    }
  ]
};

// Helper function to get random questions for a stage
export function getStageQuestions(stage: number, count: number = 5): QuizQuestion[] {
  const questions = STAGE_QUIZZES[stage] || [];
  if (questions.length <= count) return questions;
  
  // Shuffle and return requested count
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
