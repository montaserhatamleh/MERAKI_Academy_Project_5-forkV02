import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
const Admin = () => {
 

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Outlet />
      

      </Box>
    </Box>
  );
};

export default Admin;