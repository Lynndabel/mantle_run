export interface QuizItem {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // 0-based index into options
  }
  
  export const questions: QuizItem[] = [
    // Mantle & Web3 (1–25)
    { id: '1', question: 'What consensus mechanism powers the Mantle network?', options: ['Proof of Stake (PoS)', 'Proof of Work', 'Hashgraph', 'Byzantine Fault'], correctAnswer: 0 },
    { id: '2', question: 'What is the native token of Mantle?', options: ['CEL', 'Mantle', 'CGLD', 'CLO'], correctAnswer: 1 },
    { id: '3', question: 'Mantle is designed to be...', options: ['Mobile-first', 'Desktop-only', 'Server-based', 'Offline-only'], correctAnswer: 0 },
    { id: '4', question: 'Mantle is compatible with the Ethereum Virtual Machine (EVM).', options: ['True', 'False'], correctAnswer: 0 },
    { id: '5', question: 'What stablecoin is native to the Mantle platform?', options: ['USDT', 'USDC', 'MNT', 'DAI'], correctAnswer: 2 },
    { id: '6', question: 'Which of these is a key feature of Mantle?', options: ['Ultra-light client', 'Mining', 'Gas-free only', 'Centralized'], correctAnswer: 0 },
    { id: '7', question: 'What can be used as a public key on Mantle?', options: ['Phone number', 'Email only', 'IP address', 'MAC address'], correctAnswer: 0 },
    { id: '8', question: 'Mantle aims to empower...', options: ['Smartphone users', 'Miners', 'Banks', 'Governments'], correctAnswer: 0 },
    { id: '9', question: 'What language is primarily used for Mantle smart contracts?', options: ['Rust', 'Solidity', 'Python', 'C++'], correctAnswer: 1 },
    { id: '10', question: 'What does Valora App allow you to do?', options: ['Mine Bitcoin', 'Send crypto to phone numbers', 'Hack servers', 'Create NFTs only'], correctAnswer: 1 },
    { id: '11', question: 'What is the average block time on Mantle?', options: ['5 seconds', '1 minute', '10 minutes', '1 hour'], correctAnswer: 0 },
    { id: '12', question: 'What is the name of Mantle’s network explorer?', options: ['Etherscan', 'Mantle Explorer', 'BscScan', 'PolygonScan'], correctAnswer: 1 },
    { id: '13', question: 'When did Mantle Sepolia Testnet launch?', options: ['2020', '2018', '2022', '2015'], correctAnswer: 0 },
    { id: '14', question: 'What is Mantle mainly used for?', options: ['Governance & Fees', 'Buying groceries', 'Mining', 'Nothing'], correctAnswer: 0 },
    { id: '15', question: 'How does Mantle help financial inclusion?', options: ['By requiring expensive hardware', 'By being mobile-accessible', 'By banning cash', 'By increasing fees'], correctAnswer: 1 },
    { id: '16', question: 'Which wallet is optimized for Mantle?', options: ['Valora', 'Phantom', 'Keplr', 'Yoroi'], correctAnswer: 0 },
    { id: '17', question: 'What is staking in Mantle?', options: ['Locking Mantle to secure network', 'Selling Mantle', 'Burning Mantle', 'Mining Mantle'], correctAnswer: 0 },
    { id: '18', question: 'Mantle is a carbon-negative blockchain.', options: ['True', 'False'], correctAnswer: 0 },
    { id: '19', question: 'How can you pay for gas on Mantle?', options: ['Only Mantle', 'Mantle or MNT', 'Bitcoin', 'Fiat cash'], correctAnswer: 1 },
    { id: '20', question: 'What is the mission of Mantle?', options: ['To build a financial system that creates conditions of prosperity for everyone', 'To replace Bitcoin', 'To make banks rich', 'To stop crypto'], correctAnswer: 0 },
    { id: '21', question: 'Which organization supports Mantle development?', options: ['Mantle Foundation', 'Ethereum Foundation', 'Bitcoin Foundation', 'Ripple Labs'], correctAnswer: 0 },
    { id: '22', question: 'What is "Refi" in the context of Mantle?', options: ['Regenerative Finance', 'Real Finance', 'Red Finance', 'Rapid Finance'], correctAnswer: 0 },
    { id: '23', question: 'Mantle uses a decentralized phone verification protocol.', options: ['True', 'False'], correctAnswer: 0 },
    { id: '24', question: 'Which stablecoin is pegged to the Euro on Mantle?', options: ['cEUR', 'EURS', 'EURT', 'AgEUR'], correctAnswer: 0 },
    { id: '25', question: 'What is a real-world use of Mantle?', options: ['Universal Basic Income (UBI) distribution', 'High frequency trading', 'Dark web payments', 'None'], correctAnswer: 0 },
  
  // MiniPay & Advanced Mantle (26–50)
  { id: '26', question: 'What is MiniPay?', options: ['A mobile wallet built on Mantle', 'A crypto exchange', 'A mining app', 'A blockchain game'], correctAnswer: 0 },
  { id: '27', question: 'MiniPay is integrated into which messaging app?', options: ['WhatsApp', 'Telegram', 'Opera Mini', 'Signal'], correctAnswer: 2 },
  { id: '28', question: 'What makes MiniPay unique?', options: ['It only supports Bitcoin', 'It requires KYC', 'It works on feature phones', 'It requires expensive smartphones'], correctAnswer: 2 },
  { id: '29', question: 'Which stablecoins can you use in MiniPay?', options: ['USDT only', 'Bitcoin', 'Ethereum', 'MNT, cEUR, cREAL'], correctAnswer: 3 },
  { id: '30', question: 'MiniPay allows peer-to-peer payments without internet.', options: ['True', 'False'], correctAnswer: 1 },
  { id: '31', question: 'What is the purpose of Mantle\'s stability mechanism?', options: ['To ban users', 'To increase gas fees', 'To mine Mantle', 'To maintain stablecoin pegs'], correctAnswer: 3 },
  { id: '32', question: 'What is the Mantle Reserve?', options: ['A mining pool', 'A basket of crypto assets backing stablecoins', 'A government fund', 'A bank account'], correctAnswer: 1 },
  { id: '33', question: 'How does Mantle achieve ultra-light clients?', options: ['BLS signature aggregation', 'Proof of Work', 'Mining', 'Centralization'], correctAnswer: 0 },
  { id: '34', question: 'What is the role of validators on Mantle?', options: ['Delete transactions', 'Create NFTs', 'Mine new blocks', 'Propose and validate blocks'], correctAnswer: 3 },
  { id: '35', question: 'What programming framework is popular for Mantle dApps?', options: ['Unity', 'Django', 'React Native with Mantle SDK', 'WordPress'], correctAnswer: 2 },
  { id: '36', question: 'What does cREAL represent?', options: ['Mining reward', 'Real estate token', 'NFT collection', 'Brazilian Real stablecoin on Mantle'], correctAnswer: 3 },
  { id: '37', question: 'Which DeFi protocol is native to Mantle?', options: ['Ubeswap', 'Uniswap', 'PancakeSwap', 'SushiSwap'], correctAnswer: 0 },
  { id: '38', question: 'What is the purpose of the Mantle CLI?', options: ['To hack wallets', 'To interact with Mantle blockchain from command line', 'To play games', 'To mine Mantle'], correctAnswer: 1 },
  { id: '39', question: 'MiniPay users can send money using which identifier?', options: ['Email only', 'Social security numbers', 'Phone numbers or wallet addresses', 'Only wallet addresses'], correctAnswer: 2 },
  { id: '40', question: 'What is the gas token on Mantle?', options: ['Fiat currency', 'Bitcoin', 'Only ETH', 'Mantle or stable tokens like MNT'], correctAnswer: 3 },
  { id: '41', question: 'What is Mantle Composer?', options: ['A tool to quickly build Mantle dApps', 'A wallet', 'A mining software', 'A music app'], correctAnswer: 0 },
  { id: '42', question: 'Which bridge connects Mantle to other blockchains?', options: ['Brooklyn Bridge', 'Mantle Bridge (Optics/Hyperlane)', 'Bitcoin Bridge', 'No bridge exists'], correctAnswer: 1 },
  { id: '43', question: 'What is SocialConnect on Mantle?', options: ['A mining pool', 'A dating app', 'A protocol to map phone numbers to wallet addresses', 'A social media app'], correctAnswer: 2 },
  { id: '44', question: 'How many validators secure the Mantle network?', options: ['1', '1 million', '10', 'Around 100-150'], correctAnswer: 3 },
  { id: '45', question: 'What is Plumo?', options: ['A ultra-light client protocol for Mantle', 'A fruit', 'A token', 'A mining algorithm'], correctAnswer: 0 },
  { id: '46', question: 'MiniPay is available in which regions?', options: ['Only Europe', 'Africa and other emerging markets', 'Only USA', 'Only Asia'], correctAnswer: 1 },
  { id: '47', question: 'What is the transaction finality time on Mantle?', options: ['1 day', '10 minutes', 'Around 5 seconds', '1 hour'], correctAnswer: 2 },
  { id: '48', question: 'Which library helps developers integrate Mantle into React apps?', options: ['react-paypal', 'react-bank', 'react-bitcoin', 'react-Mantle'], correctAnswer: 3 },
  { id: '49', question: 'What is Kolektivo?', options: ['A community currency project on Mantle', 'A government agency', 'A mining company', 'A music band'], correctAnswer: 0 },
  { id: '50', question: 'MiniPay requires users to download a separate wallet app.', options: ['False - it\'s built into Opera Mini', 'True'], correctAnswer: 0 },
  ];
