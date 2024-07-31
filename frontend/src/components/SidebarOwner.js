import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const SidebarOwner = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem  component={Link} to="/restaurant_owner/view-info">
            <ListItemText primary="View Restaurant Info" />
          </ListItem>
          <ListItem  component={Link} to="/restaurant_owner/update-info">
            <ListItemText primary="Update Restaurant Info" />
          </ListItem>
          <ListItem  component={Link} to="/restaurant_owner/view-item">
            <ListItemText primary="View Restaurant Items" />
          </ListItem>
          
          <ListItem  component={Link} to="/restaurant_owner/add-item">
            <ListItemText primary="Add Restaurant Items" />
          </ListItem>
          
          
          <ListItem  component={Link} to="/restaurant_owner/pending-orders">
            <ListItemText primary="Show Pending Orders" />
          </ListItem>
          
          
          <ListItem  component={Link} to="/restaurant_owner/prepared-orders">
            <ListItemText primary="Show Prepared Orders" />
          </ListItem>
          
          <ListItem  component={Link} to="/restaurant_owner/delivered-orders">
            <ListItemText primary="Show Delivered Orders" />
          </ListItem>
          
        </List>
      </Box>
    </Drawer>
  );
};

export default SidebarOwner;
