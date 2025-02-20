// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTStaking is Ownable {
    IERC721 public nft;
    IERC20 public rewardToken;
    address public vault;

    uint256 public stakingDeadline;  // 质押截止时间
    uint256 public unlockDuration;   // 解锁所需时间
    uint256 public totalStaked;      // 质押 NFT 总数
    uint256 public totalRewards;     // 质押奖励总数
    uint256 public rewardPerNFT;     // 每个 NFT 固定收益

    mapping(uint256 => address) public stakers;  // NFT ID -> 质押者地址
    mapping(address => uint256[]) public userStakes; // 用户地址 -> 质押 NFT 列表

    event Staked(address indexed user, uint256 tokenId);
    event Unstaked(address indexed user, uint256 tokenId, uint256 reward);
    event Claimed(address indexed user, uint256 reward);
    event RewardsUpdated(uint256 totalRewards, uint256 rewardPerNFT);

    modifier onlyVault() {
        require(msg.sender == vault, "Caller is not Vault");
        _;
    }

    constructor(
        address _nft,
        address _rewardToken,
        address _vault,
        uint256 _stakingDeadline,
        uint256 _unlockDuration
    ) Ownable(msg.sender){
        nft = IERC721(_nft);
        rewardToken = IERC20(_rewardToken);
        vault = _vault;
        stakingDeadline = _stakingDeadline;
        unlockDuration = _unlockDuration;
    }

    function stake(uint256 tokenId) external {
        require(block.timestamp < stakingDeadline, "Staking has ended");

        nft.transferFrom(msg.sender, address(this), tokenId);

        stakers[tokenId] = msg.sender;
        userStakes[msg.sender].push(tokenId);
        totalStaked++;

        emit Staked(msg.sender, tokenId);
    }

    function unstake(uint256 tokenId) external {
        require(stakers[tokenId] == msg.sender, "Not the owner");
        require(block.timestamp >=  unlockDuration, "Unlock time not reached");//stakingDeadline +

        uint256 reward = rewardPerNFT; // 固定收益

        delete stakers[tokenId];

        nft.transferFrom(address(this), msg.sender, tokenId);
        if (reward > 0) {
            require(rewardToken.transfer(msg.sender, reward), "Reward transfer failed");
        }

        totalStaked--;

        emit Unstaked(msg.sender, tokenId, reward);
    }

    function claim() external {
        uint256 reward = 0;
        uint256[] memory tokens = userStakes[msg.sender];

        for (uint256 i = 0; i < tokens.length; i++) {
            if (stakers[tokens[i]] == msg.sender) {
                reward += rewardPerNFT;
            }
        }

        require(reward > 0, "No rewards available");
        require(rewardToken.transfer(msg.sender, reward), "Reward transfer failed");

        emit Claimed(msg.sender, reward);
    }

    function transferRewards(uint256 amount) external onlyVault {
        require(rewardToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        totalRewards += amount;

        if (totalStaked > 0) {
            rewardPerNFT = totalRewards / totalStaked; // 计算固定收益
        }

        emit RewardsUpdated(totalRewards, rewardPerNFT);
    }

    function setStakingDeadline(uint256 _deadline) external onlyOwner {
        stakingDeadline = _deadline;
    }

    function setUnlockDuration(uint256 _duration) external onlyOwner {
        unlockDuration = _duration;
    }
}
