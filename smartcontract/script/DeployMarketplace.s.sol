// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {NFTMarketplace} from "../src/NFTMarketplace.sol";

contract DeployMarketplace is Script {
    // RunnerBadge contract address on Mantle Sepolia
    address constant RUNNER_BADGE = 0x3A71981Ece2aE0CE6F880Bb57D5B5B2c8C95C918;
    // MNT token address on Mantle Sepolia
    address constant MNT_TOKEN = 0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        console.log("Deploying NFTMarketplace...");
        console.log("RunnerBadge address:", RUNNER_BADGE);
        console.log("MNT token address:", MNT_TOKEN);

        NFTMarketplace marketplace = new NFTMarketplace(RUNNER_BADGE, MNT_TOKEN);

        console.log("NFTMarketplace deployed at:", address(marketplace));
        console.log("Update CONTRACTS.MARKETPLACE in frontend config with:", address(marketplace));

        vm.stopBroadcast();
    }
}

