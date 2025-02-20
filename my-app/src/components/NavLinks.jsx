import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: '#666666',
  transition: 'all 0.3s ease',
  fontSize: '1rem',
  fontWeight: 500,
  '&:hover': {
    color: '#000000',
    transform: 'scale(1.1)',
  },
}));

const NavLinks = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 4,
      ml: 8,
      alignItems: 'center',
    }}>
      <StyledLink to="/">
        <Typography>Home</Typography>
      </StyledLink>
      <StyledLink to="/trade">
        <Typography>Trade</Typography>
      </StyledLink>
      <StyledLink to="/reward">
        <Typography>Reward</Typography>
      </StyledLink>
      <StyledLink to="/admin">
        <Typography>Admin</Typography>
      </StyledLink>
    </Box>
  );
};

export default NavLinks; 