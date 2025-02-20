import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Card,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BrowserProvider, Contract } from 'ethers';
import WalletButton from '../components/WalletButton';
import NavLinks from '../components/NavLinks';
import { parseEther } from 'ethers';

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

const AdminButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8CBEB2',
  color: 'white',
  padding: '12px 32px',
  fontSize: '1.125rem',
  '&:hover': {
    backgroundColor: '#7CAE9F',
  },
}));

// Vault 合约 ABI
const VAULT_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "stakingContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "stakingContract",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "approveStakingContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// 修改合约地址为实际地址
const VAULT_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const STAKING_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const RLUSD_TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// ERC20 Token ABI
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
];

const AdminPage = () => {
  const [rewardAmount, setRewardAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleDistributeRewards = async () => {
    if (!window.ethereum) {
      showAlert('Please install MetaMask!', 'error');
      return;
    }

    try {
      setIsProcessing(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 创建 RLUSD 合约实例
      const rlusdContract = new Contract(RLUSD_TOKEN_ADDRESS, ERC20_ABI, signer);
      
      // 创建 Vault 合约实例
      const vaultContract = new Contract(VAULT_CONTRACT_ADDRESS, VAULT_CONTRACT_ABI, signer);

      // 检查 RLUSD 授权
      const userAddress = await signer.getAddress();
      const allowance = await rlusdContract.allowance(userAddress, VAULT_CONTRACT_ADDRESS);
      
      if (allowance < parseEther(rewardAmount)) {
        // 授权 Vault 合约使用 RLUSD
        const approveTx = await rlusdContract.approve(VAULT_CONTRACT_ADDRESS, parseEther(rewardAmount));
        await approveTx.wait();
        showAlert('RLUSD approval successful', 'success');
      }

      // 将分红存入 Vault
      const depositTx = await vaultContract.deposit(parseEther(rewardAmount));
      await depositTx.wait();

      showAlert('Rewards distributed to vault successfully!', 'success');
      setRewardAmount('');
    } catch (error) {
      console.error('Error distributing rewards:', error);
      showAlert(error.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
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

      <Container sx={{ py: 12 }}>
        <Typography variant="h2" align="center" sx={{ fontWeight: 'bold', mb: 8 }}>
          Admin Dashboard
        </Typography>

        <Card sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Distribute Rewards
            </Typography>
            
            <TextField
              label="Reward Amount (RLUSD)"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              type="number"
              fullWidth
            />

            <AdminButton
              variant="contained"
              onClick={handleDistributeRewards}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Distribute Rewards'}
            </AdminButton>
          </Box>
        </Card>
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

export default AdminPage; 