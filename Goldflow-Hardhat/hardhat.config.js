require("dotenv").config(); // 加载 .env 文件中的环境变量
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/uXFaqJe9Gy54YN50AY0qshc6k2i7y5Jc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {
      chainId: 31337, // Hardhat 本地链的 Chain ID
    },
  },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY, // 用于验证合约
  // },
};
