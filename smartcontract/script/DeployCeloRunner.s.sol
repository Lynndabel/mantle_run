// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/QuestToken.sol";
import "../src/RunnerBadge.sol";
import "../src/MantleRunner.sol";

/**
 * @title DeployMantleRunner
 * @dev Deployment script for Mantle Run game contracts
 * 
 * Usage:
 * forge script script/DeployMantleRunner.s.sol:DeployMantleRunner --rpc-url <your_rpc_url> --private-key <your_private_key> --broadcast
 * 
 * For Mantle Alfajores testnet:
 * forge script script/DeployMantleRunner.s.sol:DeployMantleRunner --rpc-url https://alfajores-forno.Mantle-testnet.org --private-key <your_private_key> --broadcast
 */
contract DeployMantleRunner is Script {
    
    function run() external {
        // Get deployer private key from environment or use provided key
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);
        
        // 1. Deploy QuestToken
        console.log("Deploying QuestToken...");
        QuestToken questToken = new QuestToken();
        console.log("QuestToken deployed at:", address(questToken));
        
        // 2. Deploy RunnerBadge
        console.log("Deploying RunnerBadge...");
        RunnerBadge runnerBadge = new RunnerBadge();
        console.log("RunnerBadge deployed at:", address(runnerBadge));
        
        // 3. Deploy MantleRunner with token addresses
        console.log("Deploying MantleRunner...");
        MantleRunner MantleRunner = new MantleRunner(
            address(questToken),
            address(runnerBadge)
        );
        console.log("MantleRunner deployed at:", address(MantleRunner));
        
        // 4. Set MantleRunner as authorized minter for both tokens
        console.log("Setting MantleRunner as authorized minter...");
        questToken.setGameContract(address(MantleRunner));
        runnerBadge.setGameContract(address(MantleRunner));
        
        console.log("\n=== Deployment Summary ===");
        console.log("QuestToken:", address(questToken));
        console.log("RunnerBadge:", address(runnerBadge));
        console.log("MantleRunner:", address(MantleRunner));
        console.log("========================\n");
        
        vm.stopBroadcast();
    }
}
