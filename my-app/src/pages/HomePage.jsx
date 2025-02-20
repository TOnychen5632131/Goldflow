import React, { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Upload } from 'lucide-react';
import WalletButton from '../components/WalletButton';
import NavLinks from '../components/NavLinks';

// 自定义样式组件
const StyledHeader = styled('header')(({ theme }) => ({
  backgroundColor: '#D3D3D3',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const LightButton = styled(Button)(({ theme }) => ({
  backgroundColor: props => props.connected ? '#4CAF50' : '#FFFFFF',
  color: props => props.connected ? '#FFFFFF' : '#000000',
  borderRadius: '9999px',
  padding: '8px 24px',
  '&:hover': {
    backgroundColor: props => props.connected ? '#45a049' : '#F5F5F5',
  },
}));

// 修改 NFTSection 组件
const NFTSection = () => {
  return (
    <Box component="section" sx={{ py: 12, bgcolor: '#f5f5f5' }}>
      <Container>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 8 
          }}
        >
          Mint NFT
        </Typography>

        <Box sx={{ maxWidth: '4xl', mx: 'auto' }}>
          {/* First Card */}
          <Card sx={{ 
            bgcolor: 'white', 
            borderRadius: '24px', 
            p: 3,
            mb: 3,
            boxShadow: 'none'
          }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  borderRadius: 2,
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  width: '100%',
                  '& img': {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }
                }}>
                  <img
                    src="/1.gif"
                    alt="NFT Preview"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  bgcolor: '#E8E8E8', 
                  borderRadius: 2,
                  aspectRatio: '4/3',
                  width: '100%'
                }} />
              </Grid>
            </Grid>
          </Card>

          {/* Second Card */}
          <Card sx={{ 
            bgcolor: 'white', 
            borderRadius: '24px', 
            p: 3,
            boxShadow: 'none'
          }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  bgcolor: '#E8E8E8', 
                  borderRadius: 2,
                  aspectRatio: '4/3',
                  width: '100%'
                }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  bgcolor: '#E8E8E8', 
                  borderRadius: 2,
                  aspectRatio: '4/3',
                  width: '100%'
                }} />
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

// 新增 UploadSection 组件
const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    // Handle file upload here
  };

  return (
    <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
      <Container sx={{ maxWidth: '4xl', mx: 'auto' }}>
        <Typography variant="h4" align="center" sx={{ mb: 8, fontWeight: 600 }}>
          For Mine Owners - Upload 43-101 Report
        </Typography>

        {/* Upload Area */}
        <Box
          sx={{
            position: 'relative',
            mb: 8,
            bgcolor: 'white',
            borderRadius: 2,
            p: 6,
            boxShadow: 1,
            border: dragActive ? '2px solid primary.main' : 'none',
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {/* Decorative Dots */}
          <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {[...Array(8)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'success.light',
                  opacity: 0.5,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </Box>

          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 2 }}>
              <Upload sx={{ width: 32, height: 32, color: 'grey.400' }} />
            </Box>
            <Typography variant="h6" color="text.secondary" align="center">
              Choose a file or drag it here.
            </Typography>
            <input
              type="file"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: 'pointer',
              }}
              onChange={(e) => {
                // Handle file upload here
              }}
            />
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ space: 'y-2' }}>
                  <Typography color="text.secondary" variant="subtitle2">
                    Estimated number of mining areas
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    15
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ space: 'y-2' }}>
                  <Typography color="text.secondary" variant="subtitle2">
                    Expected revenue
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    243M
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// 修改合约地址
const NFT_CONTRACT_ADDRESS = "0x6CbefdBd9B5efC3e729970b7186247D9617E25Ac";
const LOCK_CONTRACT_ADDRESS = "0xBc4544eAdBB9a78838E8f7e1d29e16eF1392F147";

const HomePage = () => {
  const [goldValue, setGoldValue] = useState(142442);
  const [account, setAccount] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {
    const interval = setInterval(() => {
      setGoldValue((prev) => prev + Math.floor(Math.random() * 21) - 10);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // 监听钱包切换账户
  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          showAlert('Account changed!', 'info');
        } else {
          setAccount('');
          showAlert('Please connect your wallet!', 'warning');
        }
      });

      // 监听链切换
      window.ethereum.on('chainChanged', (chainId) => {
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
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

      <Container sx={{ py: 6 }}>
        <Box sx={{ maxWidth: '4xl', mx: 'auto', mb: 8 }}>
          <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
            "Real Assets, Digital Future — Gold Mine Web3 Platform"
          </Typography>

          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h5">
              Current Value of Mined Gold:{' '}
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                ${goldValue.toLocaleString()}
              </Box>
              <Box component="span" sx={{ color: 'text.secondary', ml: 1 }}>
                (Updated Every Second)
              </Box>
            </Typography>
          </Box>

          <Card sx={{ 
            bgcolor: '#E8E8E8', 
            borderRadius: '32px',
            p: { xs: 4, md: 6 },
            boxShadow: 'none'
          }}>
            <CardContent sx={{ '&:last-child': { pb: 4 } }}>
              <Typography variant="body1" sx={{ mb: 3, fontSize: '1.125rem' }}>
                Welcome to the Gold Mine Web3 Platform, where real-world assets meet digital innovation.
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, fontSize: '1.125rem' }}>
                Through our RWA (Real-World Assets) project, we combine the stable value of traditional gold mines with
                the innovative technology of Web3 to provide you with a secure, transparent, and efficient mining and
                investment platform. Here, you can watch the real-time value of mined gold fluctuate and experience the
                seamless connection between digital and physical assets.
              </Typography>

              <Typography variant="body1" sx={{ mb: 3, fontSize: '1.125rem' }}>
                Whether you want to own real gold mine assets through NFTs or earn stable returns through smart contracts,
                we offer you unprecedented opportunities.
              </Typography>

              <Typography variant="body1" sx={{ fontSize: '1.125rem' }}>
                Join us to explore the golden future and connect with global wealth.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* 添加 NFT Section */}
      <NFTSection />
      <UploadSection />

      <Snackbar 
        open={alertOpen} 
        autoHideDuration={6000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage; 