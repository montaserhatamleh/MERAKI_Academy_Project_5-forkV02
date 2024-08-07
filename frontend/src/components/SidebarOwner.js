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

const SidebarOwner=()=>{
const [open, setOpen] = React.useState(false);
const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  const DrawerList = (
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
  ) ;

  return (
    <>
      <Button
        component={Link}
        to="/restaurant_owner"
        sx={{ color: "white" }}
        compone
        onClick={toggleDrawer(true)}
      >
        Owner Dashbord
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
       {DrawerList}
      </Drawer>
    </>
  );
};

export default SidebarOwner;
