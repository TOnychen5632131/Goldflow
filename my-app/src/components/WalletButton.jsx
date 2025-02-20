import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BrowserProvider } from 'ethers';

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4CAF50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

const WalletButton = () => {
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      // 请求用户授权连接钱包
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // 获取连接的账户地址
      const account = accounts[0];
      setAccount(account);

      // 创建 provider
      const provider = new BrowserProvider(window.ethereum);

      // 检查网络是否正确（Sepolia 测试网）
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111n) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0xaa36a7',
                chainName: 'Sepolia Test Network',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['https://sepolia.infura.io/v3/YOUR-PROJECT-ID'],
                blockExplorerUrls: ['https://sepolia.etherscan.io']
              }]
            });
          } else {
            throw switchError;
          }
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // 监听钱包切换账户
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount('');
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  return (
    <GreenButton 
      variant="contained"
      onClick={connectWallet}
    >
      {account ? 'Wallet Connected' : 'Connect Wallet'}
    </GreenButton>
  );
};

export default WalletButton; 