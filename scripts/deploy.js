const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    // 使用 .env 中的私钥
    const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log(`Deploying contracts with account: ${deployer.address}`);

    // 预定义 Reward Token 地址
    const REWARD_TOKEN = "0xe101FB315a64cDa9944E570a7bFfaFE60b994b1D";

    // 1️⃣ 部署 Vault
    const Vault = await ethers.getContractFactory("Vault", deployer);
    const vault = await Vault.deploy(REWARD_TOKEN);
    await vault.deployed();
    console.log(`✅ Vault deployed at: ${vault.address}`);

    // 2️⃣ 部署 NFTMinter
    const mintPrice = ethers.utils.parseEther("1"); // NFT 售价 1 ERC20 代币
    const NFTMinter = await ethers.getContractFactory("NFTMinter", deployer);
    const nftMinter = await NFTMinter.deploy(REWARD_TOKEN, mintPrice, vault.address);
    await nftMinter.deployed();
    console.log(`✅ NFTMinter deployed at: ${nftMinter.address}`);

    // 3️⃣ 部署 NFTStaking
    const stakingDeadline = Math.floor(Date.now() / 1000) + 6000; // 10分钟后停止质押
    const unlockDuration = 0; // 5分钟解锁时间
    const NFTStaking = await ethers.getContractFactory("NFTStaking", deployer);
    const nftStaking = await NFTStaking.deploy(nftMinter.address, REWARD_TOKEN, vault.address, stakingDeadline, unlockDuration);
    await nftStaking.deployed();
    console.log(`✅ NFTStaking deployed at: ${nftStaking.address}`);

    // 4️⃣ 允许 Vault 向 Staking 合约转账
    await vault.approveStakingContract(nftStaking.address, true);
    console.log(`✅ Vault approved NFTStaking contract.`);

    console.log(`
    📜 Vault: ${vault.address}
    📜 NFTMinter: ${nftMinter.address}
    📜 NFTStaking: ${nftStaking.address}
    `);
}

// 运行部署
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
