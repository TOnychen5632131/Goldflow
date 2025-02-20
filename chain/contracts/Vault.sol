// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface INFTStaking {
    function transferRewards(uint256 amount) external;
}

contract Vault is Ownable {
    IERC20 public rewardToken;
    mapping(address => bool) public approvedStakingContracts;

    event RewardTransferred(address indexed stakingContract, uint256 amount);
    event StakingContractApproved(address indexed stakingContract, bool approved);

    constructor(address _rewardToken) Ownable(msg.sender){
        rewardToken = IERC20(_rewardToken);
    }

    function deposit(uint256 amount) external {
        require(rewardToken.transferFrom(msg.sender, address(this), amount), "Deposit failed");
    }

    function transferRewards(address stakingContract, uint256 amount) external onlyOwner {
        require(approvedStakingContracts[stakingContract], "Staking contract not approved");
        rewardToken.approve(stakingContract,amount);
        // 直接调用 Staking 合约的 transferRewards 方法
        INFTStaking(stakingContract).transferRewards(amount);

        emit RewardTransferred(stakingContract, amount);
    }

    function approveStakingContract(address stakingContract, bool approved) external onlyOwner {
        approvedStakingContracts[stakingContract] = approved;
        emit StakingContractApproved(stakingContract, approved);
    }

    function withdraw() external onlyOwner{
        uint amount = rewardToken.balanceOf(address(this));
        rewardToken.transfer(msg.sender,amount);
    }

}
