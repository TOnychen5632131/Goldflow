const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const user = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log(`Testing contracts with user: ${user.address}`);

    // **预定义 RewardToken 地址**
    const REWARD_TOKEN = "0xe101FB315a64cDa9944E570a7bFfaFE60b994b1D";

    // **手动替换已部署的合约地址**
    const vaultAddress = "0x4B131ecD3946641f13216F4467C446BC49a2F3bc";
    const nftMinterAddress = "0xEdde5d3e3A44CEdf7B11dCd4FddB8F1E7F26Bef7";
    const nftStakingAddress = "0x427414E9403217aF85D1E079c993697271172fa0";

    // **获取已部署合约实例**
    const vault = await ethers.getContractAt("Vault", vaultAddress, user);
    const nftMinter = await ethers.getContractAt("NFTMinter", nftMinterAddress, user);
    const nftStaking = await ethers.getContractAt("NFTStaking", nftStakingAddress, user);
    const rewardToken = await ethers.getContractAt("IERC20", REWARD_TOKEN, user);

    // **检查用户 ERC20 余额**
    const userBalance = await rewardToken.balanceOf(user.address);
    console.log(`💰 User ERC20 balance: ${ethers.utils.formatEther(userBalance)} Tokens`);

    if (userBalance.lt(ethers.utils.parseEther("1"))) {
        console.error("❌ Error: Insufficient ERC20 balance to mint NFT.");
        return;
    }

    // **检查 & 进行 approve**
    let allowance = await rewardToken.allowance(user.address, nftMinter.address);
    console.log(`🔎 Current Allowance: ${ethers.utils.formatEther(allowance)}`);

    if (allowance.lt(ethers.utils.parseEther("1"))) {
        console.log("🔑 Approving NFTMinter to spend 1 ERC20 token...");
        const approveTx = await rewardToken.approve(nftMinter.address, ethers.utils.parseEther("10"));
        await approveTx.wait();
        console.log("✅ Approval successful.");
    }

    // **估算 mint 交易的 Gas**
    console.log("🛠 Estimating gas for mint...");
    let gasEstimate;
    try {
        gasEstimate = await nftMinter.estimateGas.mint();
        console.log(`🔋 Estimated gas: ${gasEstimate.toString()}`);
    } catch (error) {
        console.error("❌ Gas estimation failed:", error);
        return;
    }

    // **执行 mint**
    console.log("🛒 Minting NFT...");
    try {
        const tx = await nftMinter.mint({ gasLimit: gasEstimate.mul(2) });
        await tx.wait();
        console.log("✅ NFT minted.");
    } catch (error) {
        console.error("❌ Mint failed:", error);
        return;
    }

    // **获取 NFT ID**
    const tokenId = 1;  // 可能需要从 NFT 事件中获取

    // **用户批准 NFT 质押**
    console.log("⚡ Approving NFT for staking...");
    let stakeGas = await nftMinter.estimateGas.approve(nftStaking.address, tokenId);
    const stakeApproveTx = await nftMinter.approve(nftStaking.address, tokenId, { gasLimit: stakeGas.mul(3) });
    await stakeApproveTx.wait();
    console.log("✅ NFT Approved for staking.");

    // **用户质押 NFT**
    console.log("📌 Staking NFT...");
    let stakeGasEstimate = await nftStaking.estimateGas.stake(tokenId);
    const stakeTx = await nftStaking.stake(tokenId, { gasLimit: stakeGasEstimate.mul(4) });
    await stakeTx.wait();
    console.log("✅ NFT Staked.");

    // **Vault 充值奖励**
    console.log("💰 Funding vault...");
    let vaultApproveGas = await rewardToken.estimateGas.approve(vault.address, ethers.utils.parseEther("1"));
    const vaultApproveTx = await rewardToken.approve(vault.address, ethers.utils.parseEther("1"), { gasLimit: vaultApproveGas.mul(4) });
    await vaultApproveTx.wait();
    console.log("✅ Vault Approved.");

    let depositGas = await vault.estimateGas.deposit(ethers.utils.parseEther("1"));
    const depositTx = await vault.deposit(ethers.utils.parseEther("1"), { gasLimit: depositGas.mul(4) });
    await depositTx.wait();
    console.log("✅ Vault Deposited 1 Token.");

    let transferGas = await vault.estimateGas.transferRewards(nftStaking.address, ethers.utils.parseEther("1"));
    const transferTx = await vault.transferRewards(nftStaking.address, ethers.utils.parseEther("1"), { gasLimit: transferGas.mul(4) });
    await transferTx.wait();
    console.log("✅ Vault transferred 1 reward token to Staking contract.");

    // **等待解锁时间**
    // console.log("⏳ Waiting for unlock time...");
    // await new Promise((resolve) => setTimeout(resolve, 30 * 1000)); // 30秒

    // **用户解质押 NFT 并领取奖励**
    console.log("🔓 Unstaking NFT...");
    let unstakeGas = await nftStaking.estimateGas.unstake(tokenId);
    const unstakeTx = await nftStaking.unstake(tokenId, { gasLimit: unstakeGas.mul(4) });
    await unstakeTx.wait();
    console.log("✅ NFT unstaked and reward claimed.");

    console.log("🎉 Test flow completed successfully!");
}

// 运行测试
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
