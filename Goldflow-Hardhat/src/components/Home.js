import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function Home() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* 顶部导航栏 */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2, 
        bgcolor: 'transparent' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src="/logo.png" alt="Gold Flow" style={{ height: 40 }} />
          <Typography variant="h6">GOLD FLOW</Typography>
        </Box>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: 'white', 
            color: 'black',
            '&:hover': { bgcolor: '#f0f0f0' }
          }}
        >
          Connect wallet
        </Button>
      </Box>

      {/* 主要内容区域 */}
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          "Real Assets, Digital Future — Gold Mine Web3 Platform"
        </Typography>

        <Typography variant="h5" sx={{ mt: 3, color: '#666' }}>
          Current Value of Mined Gold: <span style={{ fontWeight: 'bold' }}>$142442</span>
          <Typography variant="caption" sx={{ ml: 1 }}>(Updated Every Second)</Typography>
        </Typography>

        <Box sx={{ 
          mt: 6, 
          p: 4, 
          bgcolor: '#e0e0e0',
          borderRadius: 2,
          textAlign: 'left'
        }}>
          <Typography paragraph>
            Welcome to the Gold Mine Web3 Platform, where real-world assets meet digital innovation.
          </Typography>
          <Typography paragraph>
            Through our RWA (Real-World Assets) project, we combine the stable value of traditional gold mines with the innovative technology of Web3 to provide you with a secure, transparent, and efficient mining and investment platform. Here, you can watch the real-time value of mined gold fluctuate and experience the seamless connection between digital and physical assets.
          </Typography>
          <Typography>
            Whether you want to own real gold mine assets through NFTs or earn stable returns through smart contracts, we offer you unprecedented opportunities.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Join us to explore the golden future and connect with global wealth.
          </Typography>
        </Box>

        {/* NFT 铸造区域 */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            Mint NFT
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 2,
            mt: 3 
          }}>
            {[1, 2, 3, 4].map((item) => (
              <Box key={item} sx={{ 
                height: 200, 
                bgcolor: '#e0e0e0',
                borderRadius: 1
              }} />
            ))}
          </Box>
        </Box>

        {/* 上传报告区域 */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            For Mine Owners - Upload 43-101 Report
          </Typography>
          <Box sx={{ 
            mt: 3,
            p: 4,
            border: '2px dashed #ccc',
            borderRadius: 2,
            bgcolor: 'white'
          }}>
            <UploadFileIcon sx={{ fontSize: 40, color: '#999' }} />
            <Typography sx={{ mt: 2, color: '#666' }}>
              Choose a file or drag it here.
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            mt: 4,
            p: 3,
            bgcolor: 'white',
            borderRadius: 2
          }}>
            <Box>
              <Typography variant="h6">Estimated number of mining areas</Typography>
              <Typography variant="h3">15</Typography>
            </Box>
            <Box>
              <Typography variant="h6">Expected revenue</Typography>
              <Typography variant="h3">243M</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Home; 