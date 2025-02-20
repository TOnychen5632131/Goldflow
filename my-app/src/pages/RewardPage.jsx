import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
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
  borderRadius: '12px',
  padding: '8px 24px',
  fontSize: '1.125rem',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

// 新增自定义按钮样式
const TealButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8CBEB2',
  color: 'white',
  padding: '24px 32px',
  fontSize: '1.125rem',
  '&:hover': {
    backgroundColor: '#7CAE9F',
  },
}));

// 新增账户信息组件
const AccountInfo = () => {
  return (
    <Box sx={{ bgcolor: 'grey.100', py: 6 }}>
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Account Information Card */}
        <Card sx={{ boxShadow: 2 }}>
          <Box sx={{ p: 3 }}>
            <Typography 
              variant="h4" 
              align="center" 
              sx={{ 
                fontWeight: 600,
                mb: 3,
              }}
            >
              Account Information
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              textAlign: 'center',
              mb: 3,
            }}>
              <Typography variant="h6" color="text.secondary">
                Wallet Address: <Box component="span" sx={{ fontFamily: 'monospace' }}>0x123456789abcdef</Box>
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Current Balance: <Box component="span" sx={{ fontWeight: 600 }}>$1500.00</Box>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TealButton variant="contained">
                Update Account Info
              </TealButton>
            </Box>
          </Box>
        </Card>

        {/* Help Card */}
        <Card sx={{ boxShadow: 2 }}>
          <Box sx={{ p: 3 }}>
            <Typography 
              variant="h4" 
              align="center" 
              sx={{ 
                fontWeight: 600,
                mb: 3,
              }}
            >
              Need Help?
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 3,
              alignItems: 'center',
            }}>
              <TealButton variant="contained">
                Contact Support
              </TealButton>
              <Typography variant="h6" color="text.secondary" align="center">
                If you need assistance, please contact us via email or live chat.
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

const RewardPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      {/* Header Bar */}
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

      {/* Dashboard Title */}
      <Container sx={{ py: 16, px: 2 }}>
        <Typography 
          variant="h1" 
          align="center"
          sx={{
            fontSize: { xs: '4rem', md: '5rem' },
            fontWeight: 'bold',
            letterSpacing: '-0.02em',
            color: 'text.primary',
          }}
        >
          Gold Mine Dashboard
        </Typography>
      </Container>

      {/* 添加 Account Info Section */}
      <AccountInfo />
    </Box>
  );
};

export default RewardPage; 