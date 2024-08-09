import * as React from "react";
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
import { Link, useNavigate } from "react-router-dom";
const TemporaryDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  
const Profile = () => {
  navigate("rider/profile");
 };

 const handelAllOrderReady = () => {
    navigate("/rider/ready");
};

  const handelAllOnTheWay = () => {
    navigate("rider/All__order_on_way");
  };
  const handelAllDeliveredOrder = () => {
    navigate("rider/All_delivered_order");
  };
  const handelAllCompletedOrder = () => {
    navigate("rider/All_complete_order");
  };
  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={Profile}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handelAllOrderReady}>
            <ListItemIcon>
              <TwoWheelerIcon />
            </ListItemIcon>
            <ListItemText primary={"ready to pick up orders"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handelAllOnTheWay}>
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary={"Accepted Orders"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handelAllDeliveredOrder}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"on the way orders"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handelAllCompletedOrder}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"orders history"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button
        component={Link}
        to="/rider"
        sx={{ color: "white" }}
        compone
        onClick={toggleDrawer(true)}
      >
        Riders Dashbord
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
       {DrawerList}
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
