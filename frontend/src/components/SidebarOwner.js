import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  Divider,
  IconButton,
  Toolbar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import UpdateIcon from "@mui/icons-material/Update";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const SidebarOwner = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDrawerToggle}
        sx={{
          boxShadow: 1,
          "&:hover": {
            backgroundColor: "lightgray",
          },
          width: "100px",
          height: "50px",
        }}
      >
        {open ? "Close" : "Open"}
      </Button>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
        <Divider />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button component={Link} to="/restaurant_owner/view-info">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="View Restaurant Info" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/restaurant_owner/update-info"
            >
              <ListItemIcon>
                <UpdateIcon />
              </ListItemIcon>
              <ListItemText primary="Update Restaurant Info" />
            </ListItem>
            <ListItem button component={Link} to="/restaurant_owner/view-item">
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="View Restaurant Items" />
            </ListItem>
            <ListItem button component={Link} to="/restaurant_owner/add-item">
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Add Restaurant Items" />
            </ListItem>
            <Divider />
            <ListItem
              button
              component={Link}
              to="/restaurant_owner/pending-orders"
            >
              <ListItemIcon>
                <PendingActionsIcon />
              </ListItemIcon>
              <ListItemText primary="Show Pending Orders" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/restaurant_owner/prepared-orders"
            >
              <ListItemIcon>
                <AssignmentTurnedInIcon />
              </ListItemIcon>
              <ListItemText primary="Show Prepared Orders" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/restaurant_owner/delivered-orders"
            >
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Show Delivered Orders" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SidebarOwner;
