import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TemporaryDrawer = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const { userId, token } = useSelector((state) => ({
    userId: state.auth.userId,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    const getStatus = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/riders/${userId}`, 
        );
        setStatus(result.data.result.status);
      } catch (err) {
        console.error("Error getting rider status:", err);
      }
    };

    getStatus();
  }, [userId, token]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false); 
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation("rider/profile")}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </ListItem>
        {status === "available" && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation("rider/ready")}>
                <ListItemIcon>
                  <TwoWheelerIcon />
                </ListItemIcon>
                <ListItemText primary={"Ready to pick up orders"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation("rider/All__order_on_way")}>
                <ListItemIcon>
                  <RestaurantIcon />
                </ListItemIcon>
                <ListItemText primary={"Accepted Orders"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation("rider/All_delivered_order")}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"On the way orders"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation("rider/All_complete_order")}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Orders history"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button
        sx={{ color: "white" }}
        onClick={toggleDrawer(true)}
      >
        Rider's Dashboard
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
