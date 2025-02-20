import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Card,
  Grid,
  LinearProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AlertTriangle } from 'lucide-react';
import { BrowserProvider, Contract, parseEther } from 'ethers';
import WalletButton from '../components/WalletButton';
import NavLinks from '../components/NavLinks';

// 自定义样式组件
const StyledHeader = styled('header')(({ theme }) => ({
  backgroundColor: '#E8E8E8',
  padding: theme.spacing(2),
}));

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4CAF50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

const StakeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#e97f63',
  color: 'white',
  padding: '12px 32px',
  fontSize: '1.125rem',
  '&:hover': {
    backgroundColor: '#d97358',
  },
}));

// 新增自定义进度条样式
const StyledProgress = styled(LinearProgress)(({ theme }) => ({
  height: 24,
  backgroundColor: '#E8E8E8',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#8CBEB2',
  },
}));

// 新增自定义按钮样式
const ClaimButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8CBEB2',
  color: 'white',
  padding: '8px 32px',
  '&:hover': {
    backgroundColor: '#7CAE9F',
  },
}));

// 新增取消质押按钮样式
const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF6347',
  color: 'white',
  padding: '24px 32px',
  fontSize: '1.125rem',
  '&:hover': {
    backgroundColor: '#E55336',
  },
}));

// 添加新的按钮样式
const MintButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8CBEB2',
  color: 'white',
  padding: '12px 32px',
  fontSize: '1.125rem',
  '&:hover': {
    backgroundColor: '#7CAE9F',
  },
}));

const calendarData = [
  { day: "Sun", dates: [1, 8, 15, 22, 29], amounts: ["$4.50", "$7.90", "$8.30", "$5.10", "$8.20"] },
  { day: "Mon", dates: [2, 9, 16, 23], amounts: ["$7.80", "$4.10", "$5.50", "$8.40"] },
  { day: "Tue", dates: [3, 10, 17, 24], amounts: ["$5.00", "$5.00", "$3.70", "$4.20"] },
  { day: "Wed", dates: [4, 11, 18, 25], amounts: ["$5.30", "$8.20", "$8.50", "$5.00"] },
  { day: "Thu", dates: [5, 12, 19, 26], amounts: ["$8.00", "$5.10", "$5.00", "$8.10"] },
  { day: "Fri", dates: [6, 13, 20, 27], amounts: ["$3.80", "$3.90", "$8.00", "$3.90"] },
  { day: "Sat", dates: [7, 14, 21, 28], amounts: ["$5.20", "$5.40", "$4.00", "$5.00"] },
];

// 修改 NFT 合约 ABI，确保与实际合约匹配
const NFT_CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paymentToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// 修改合约地址
const NFT_CONTRACT_ADDRESS = "0x6CbefdBd9B5efC3e729970b7186247D9617E25Ac";  // NFTMinter
const STAKING_CONTRACT_ADDRESS = "0x2fAe849D4F8662F3c27534bd32a027B52cfa158e";  // NFTStaking
const VAULT_CONTRACT_ADDRESS = "0x0AC09A363861f4928A27502E32b84905Af379C8E";  // Vault
const LOCK_CONTRACT_ADDRESS = "0xBc4544eAdBB9a78838E8f7e1d29e16eF1392F147";  // Lock

// 修改 ERC20 Token ABI，使用完整的 ABI 定义
const ERC20_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// 修改 Staking 合约 ABI
const STAKING_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nft",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_rewardToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_vault",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_stakingDeadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_unlockDuration",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nft",
    "outputs": [
      {
        "internalType": "contract IERC721",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "stakers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "cancelStaking",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// ERC721 (NFT) ABI
const ERC721_ABI = [
  "function approve(address to, uint256 tokenId) external",
  "function getApproved(uint256 tokenId) external view returns (address)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)",
];

// 添加 RLUSD Token 地址
const RLUSD_TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// 添加 Vault 合约地址和 ABI
const VAULT_CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "withdrawDividend",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userBalances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// 修改 MiningProgress 组件，通过 props 接收 showAlert
const MiningProgress = ({ showAlert }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClaimDividend = async () => {
    if (!window.ethereum) {
      showAlert('Please install MetaMask!', 'error');
      return;
    }

    try {
      setIsProcessing(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      // 创建 Vault 合约实例
      const vaultContract = new Contract(VAULT_CONTRACT_ADDRESS, VAULT_CONTRACT_ABI, signer);
      
      // 创建 RLUSD 合约实例
      const rlusdContract = new Contract(RLUSD_TOKEN_ADDRESS, ERC20_ABI, signer);

      // 检查用户在 Vault 中的余额
      const userBalance = await vaultContract.userBalances(userAddress);
      
      if (userBalance.isZero()) {
        throw new Error('No dividend available to claim');
      }

      // 提取分红
      const withdrawTx = await vaultContract.withdrawDividend();
      await withdrawTx.wait();

      showAlert('Dividend claimed successfully!', 'success');
    } catch (error) {
      console.error('Error claiming dividend:', error);
      showAlert(error.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Mining Progress Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" align="center" sx={{ fontWeight: 600 }}>
            Mining Progress
          </Typography>
          <StyledProgress variant="determinate" value={15} />
        </Box>

        {/* Dividend Card */}
        <Card sx={{ boxShadow: 3 }}>
          <Box sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 500 }}>
              Your Available Dividend
            </Typography>
            <ClaimButton 
              variant="contained"
              onClick={handleClaimDividend}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Claim Dividend'}
            </ClaimButton>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

// 新增取消质押组件
const CancelStaking = ({ showAlert }) => {
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelStaking = async () => {
    if (!window.ethereum) {
      showAlert('Please install MetaMask!', 'error');
      return;
    }

    try {
      setIsCancelling(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      // 创建合约实例
      const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, STAKING_CONTRACT_ABI, signer);
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, ERC721_ABI, signer);

      try {
        // 检查用户是否有质押的 NFT
        const nftBalance = await nftContract.balanceOf(userAddress);
        if (nftBalance.toString() === '0') {
          throw new Error('You do not own any NFTs');
        }

        // 获取用户的第一个 NFT token ID
        const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, 0);
        
        // 检查这个 NFT 是否被质押
        const staker = await stakingContract.stakers(tokenId);
        if (staker.toLowerCase() !== userAddress.toLowerCase()) {
          throw new Error('You have no staked NFTs');
        }

        // 检查是否已授权 RLUSD
        const tokenContract = new Contract(RLUSD_TOKEN_ADDRESS, ERC20_ABI, signer);
        const allowance = await tokenContract.allowance(userAddress, STAKING_CONTRACT_ADDRESS);
        
        if (allowance < parseEther("1")) {
          // 请求授权 1 RLUSD
          const approveTx = await tokenContract.approve(STAKING_CONTRACT_ADDRESS, parseEther("1"));
          await approveTx.wait();
          showAlert('RLUSD approval successful', 'success');
        }

        // 调用取消质押函数
        console.log('Cancelling staking for token:', tokenId.toString());
        const tx = await stakingContract.cancelStaking(tokenId);
        await tx.wait();

        showAlert('Staking cancelled successfully! NFT returned with 1 RLUSD penalty', 'success');
      } catch (contractError) {
        console.error('Contract interaction error:', contractError);
        throw contractError;
      }
    } catch (error) {
      console.error('Error cancelling staking:', error);
      showAlert(error.message, 'error');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Cancel Staking Early
      </Typography>
      <Typography sx={{ mb: 4, color: 'text.secondary' }}>
        Warning: Cancelling staking before the unlock time will result in a 1 RLUSD penalty
      </Typography>
      <CancelButton
        variant="contained"
        onClick={handleCancelStaking}
        disabled={isCancelling}
        startIcon={<AlertTriangle />}
      >
        {isCancelling ? 'Processing...' : 'Cancel Staking'}
      </CancelButton>
    </Box>
  );
};

const TradePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [isStaking, setIsStaking] = useState(false);

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleBuyNFT = async () => {
    if (!window.ethereum) {
      showAlert('Please install MetaMask!', 'error');
      return;
    }

    try {
      setIsLoading(true);

      // 创建 provider 和 signer
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 创建合约实例
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);

      try {
        // 获取支付代币地址和铸造价格
        const paymentTokenAddress = await nftContract.paymentToken();
        console.log('Payment Token Address:', paymentTokenAddress);

        if (!paymentTokenAddress) {
          throw new Error('Invalid payment token address');
        }

        const mintPrice = await nftContract.mintPrice();
        console.log('Mint Price:', mintPrice.toString());

        // 创建 ERC20 代币合约实例
        const tokenContract = new Contract(paymentTokenAddress, ERC20_ABI, signer);

        // 检查授权
        const userAddress = await signer.getAddress();
        const allowance = await tokenContract.allowance(userAddress, NFT_CONTRACT_ADDRESS);

        // 如果授权不足，请求授权
        if (allowance < mintPrice) {
          const approveTx = await tokenContract.approve(NFT_CONTRACT_ADDRESS, mintPrice);
          await approveTx.wait();
          showAlert('Token approval successful', 'success');
        }

        // 铸造 NFT
        const tx = await nftContract.mint();
        await tx.wait();

        showAlert('NFT minted successfully!', 'success');
      } catch (contractError) {
        console.error('Contract interaction error:', contractError);
        
        // 检查合约是否存在
        const code = await provider.getCode(NFT_CONTRACT_ADDRESS);
        if (code === '0x') {
          throw new Error('Contract not found at the specified address');
        }
        
        throw new Error('Failed to interact with the contract. Please check the contract address and network.');
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      showAlert(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStakeNFT = async () => {
    if (!window.ethereum) {
      showAlert('Please install MetaMask!', 'error');
      return;
    }

    try {
      setIsStaking(true);

      // 创建 provider 和 signer
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 直接使用 NFT 合约地址而不是从 Staking 合约获取
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, ERC721_ABI, signer);
      const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, STAKING_CONTRACT_ABI, signer);

      // 获取用户地址
      const userAddress = await signer.getAddress();

      try {
        // 检查用户是否拥有 NFT
        const balance = await nftContract.balanceOf(userAddress);
        if (balance.toString() === '0') {
          throw new Error('You do not own any NFTs to stake');
        }

        // 获取用户的第一个 NFT token ID
        const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, 0);
        console.log('Token ID to stake:', tokenId.toString());

        // 检查是否已授权
        const approved = await nftContract.getApproved(tokenId);
        if (approved !== STAKING_CONTRACT_ADDRESS) {
          // 请求授权
          console.log('Approving NFT transfer...');
          const approveTx = await nftContract.approve(STAKING_CONTRACT_ADDRESS, tokenId);
          await approveTx.wait();
          showAlert('NFT approval successful', 'success');
        }

        // 质押 NFT
        console.log('Staking NFT...');
        const tx = await stakingContract.stake(tokenId);
        await tx.wait();

        showAlert('NFT staked successfully!', 'success');
      } catch (contractError) {
        console.error('Contract interaction error:', contractError);
        
        // 检查合约是否存在
        const nftCode = await provider.getCode(NFT_CONTRACT_ADDRESS);
        const stakingCode = await provider.getCode(STAKING_CONTRACT_ADDRESS);
        
        if (nftCode === '0x') {
          throw new Error('NFT contract not found at the specified address');
        }
        if (stakingCode === '0x') {
          throw new Error('Staking contract not found at the specified address');
        }
        
        throw contractError;
      }
    } catch (error) {
      console.error('Error staking NFT:', error);
      showAlert(error.message, 'error');
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      {/* Header */}
      <StyledHeader>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box 
                  sx={{ 
                    width: 48,
                    height: 48,
                    position: 'relative',
                    '& img': {
                      objectFit: 'contain',
                    }
                  }}
                >
                  <img
                    src="/logo.pic.jpg"
                    alt="Gold Flow Logo"
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.2 }}>
                  GOLD<br />FLOW
                </Typography>
              </Box>
              <NavLinks />
            </Box>
            <WalletButton />
          </Box>
        </Container>
      </StyledHeader>

      {/* Main Content */}
      <Container sx={{ py: 12 }}>
        {/* Buy NFT Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 4 }}>
            Buy Your NFT
          </Typography>
          <MintButton 
            variant="contained"
            onClick={handleBuyNFT}
            disabled={isLoading}
            sx={{ mb: 8 }}
          >
            {isLoading ? 'Processing...' : 'Buy Your NFT'}
          </MintButton>
        </Box>

        {/* Stake NFT Section */}
        <Box sx={{ textAlign: 'center', mb: 16 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 4 }}>
            Stake Your NFT
          </Typography>
          <StakeButton 
            variant="contained"
            onClick={handleStakeNFT}
            disabled={isStaking}
          >
            {isStaking ? 'Processing...' : 'Stake NFT'}
          </StakeButton>
        </Box>

        {/* Calendar */}
        <Box sx={{ bgcolor: 'grey.50', borderRadius: 2, p: 8 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 600, mb: 8 }}>
            Estimated Earnings Calendar
          </Typography>
          
          <Grid container spacing={2}>
            {/* Calendar Headers */}
            {calendarData.map((col) => (
              <Grid item xs={12/7} key={col.day}>
                <Typography sx={{ textAlign: 'center', fontWeight: 500 }}>
                  {col.day}
                </Typography>
              </Grid>
            ))}

            {/* Calendar Days */}
            {calendarData.map((col) => (
              <Grid item xs={12/7} key={col.day}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {col.dates.map((date, index) => (
                    <Card key={date} sx={{ p: 2 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 500, mb: 1 }}>
                          {date}
                        </Typography>
                        <Typography 
                          sx={{ 
                            fontSize: '0.875rem',
                            color: Number.parseFloat(col.amounts[index].slice(1)) > 7
                              ? 'success.main'
                              : Number.parseFloat(col.amounts[index].slice(1)) > 5
                                ? 'warning.main'
                                : 'text.secondary'
                          }}
                        >
                          {col.amounts[index]}
                        </Typography>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 修改 MiningProgress 组件，传入 showAlert */}
        <MiningProgress showAlert={showAlert} />

        {/* 添加 Cancel Staking Section */}
        <CancelStaking showAlert={showAlert} />
      </Container>

      <Snackbar 
        open={alertOpen} 
        autoHideDuration={6000} 
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TradePage; 