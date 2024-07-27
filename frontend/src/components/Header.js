// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../redux/auth';

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            FeedMe
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!token ? (
            <>
              <Button sx={{ color: 'white' }} component={Link} to="/signin">
                Sign In
              </Button>
              <Button sx={{ color: 'white' }} component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          ) : (
            <Button sx={{ color: 'white' }} onClick={handleLogout}>
              Sign Out
            </Button>
          )}
          <Button sx={{ color: 'white' }} component={Link} to="/become-partner">
            Become a Partner
          </Button>
          <Button sx={{ color: 'white' }} component={Link} to="/become-rider">
            Become a Rider
          </Button>
          <Button sx={{ color: 'white' }} component={Link} to="/get_All_Rider">
            Get All Riders
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
