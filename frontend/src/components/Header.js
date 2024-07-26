// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            FeedMe
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/signin">
            Sign In
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
          <Button color="inherit" component={Link} to="/become-partner">
            Become a Partner
          </Button>
          <Button color="inherit" component={Link} to="/become-rider">
            Become a Rider
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
