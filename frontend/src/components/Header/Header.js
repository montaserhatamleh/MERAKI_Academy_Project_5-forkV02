import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../../redux/auth';
import TemporaryDrawer from "../../pages/Admin/SideBar";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SidBarRider from "../../pages/Riders/SidBarRiders" 
import SidBarOwner from "../../components/SidebarOwner"
import './header.css'
const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/');
  };

  return (

    <AppBar position="static"  sx={{ backgroundColor: '#D55E32', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}   >

      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 40px', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} to="/" sx={{ color: 'white', marginRight: 2 }}>
            <RestaurantIcon sx={{ fontSize: 40 }} /> 
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', fontSize: '1.5rem' }} className="feedme-logo">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} className="feedme-link">
              FeedMe
            </Link>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {!token ? (
            <>
              <Button sx={{ color: 'white', fontWeight: '500', borderRadius: '20px', '&:hover': { backgroundColor: '#388e3c', color: '#ffd700' } }} component={Link} to="/signin">
                Sign In
              </Button>
              <Button sx={{ color: 'white', fontWeight: '500', borderRadius: '20px', '&:hover': { backgroundColor: '#388e3c', color: '#ffd700' } }} component={Link} to="/signup">
                Sign Up
              </Button>
              <Button sx={{ color: 'white', fontWeight: '500', borderRadius: '20px', '&:hover': { backgroundColor: '#388e3c', color: '#ffd700' } }} component={Link} to="/become-partner">
                Become a Partner
              </Button>
              <Button sx={{ color: 'white', fontWeight: '500', borderRadius: '20px', '&:hover': { backgroundColor: '#388e3c', color: '#ffd700' } }} component={Link} to="/become-rider">
                Become a Rider
              </Button>
            </>
          ) : (
            <>
              {role === 'Admin' && (
                <TemporaryDrawer />
              )}
              {role === 'Restaurant Owner' && (
               <SidBarOwner/>
              )}
              {role === 'Customer' && (
                <>
                  <Button sx={{ color: 'white', fontWeight: '500', borderRadius: '20px', '&:hover': { backgroundColor: '#388e3c', color: '#ffd700' } }} component={Link} to="/userOrders">
                    My Orders
                  </Button>
                  <Button sx={{ color: 'white', fontWeight: '500', borderRadius: '20px', '&:hover': { backgroundColor: '#388e3c', color: '#ffd700' } }} component={Link} to="/profile_user">
                    Profile
                  </Button>
                </>
              )}
              {role === 'Rider' && (
                <>
                 <SidBarRider/>
                </>
              )}
              <Button sx={{ color: 'white', fontWeight: '500', borderRadius: '20px', '&:hover': { backgroundColor: '#388e3c', color: '#ffd700' } }} onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
