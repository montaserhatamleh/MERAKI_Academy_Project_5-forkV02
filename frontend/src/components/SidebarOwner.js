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
        </List>
      </Box>
    </Drawer>
  );
};

export default SidebarOwner;
