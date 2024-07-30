import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link, useNavigate } from 'react-router-dom';
const TemporaryDrawer = ()=> {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate() ; 
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handelRiderRegistretion = ()=>{
    navigate("/admin/get_All_Rider_registretion") ; 
  }
  const handelUser = ()=>{
    navigate("/admin") ; 
  }
  const handelRider = ()=>{
    navigate("admin/get_all_riders") ; 
  }
  const handelAllRestaurants = ()=>{
    navigate("admin/get_all_restaurants") ; 
  }
  const handelOwnerRegistration = ()=>{
    navigate("admin/get_All_registration_Owner") ; 
  }
  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
      <ListItem  disablePadding>
            <ListItemButton onClick={handelUser}>
              <ListItemIcon>
               <PersonIcon /> 
              </ListItemIcon>
              <ListItemText primary={"get all users"} />
            </ListItemButton>
          </ListItem>

            <ListItem  disablePadding>
            <ListItemButton onClick={handelRider} >
              <ListItemIcon >
              <TwoWheelerIcon/>
              </ListItemIcon>
              <ListItemText primary={"get all riders"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handelAllRestaurants}>
              <ListItemIcon >
               <RestaurantIcon/> 
              </ListItemIcon>
              <ListItemText primary={"get all owner or Restaurants"} />
            </ListItemButton>
          </ListItem>
          
          <ListItem  disablePadding>
            <ListItemButton onClick={handelOwnerRegistration} >
              <ListItemIcon >
               <InboxIcon /> 
              </ListItemIcon>
              <ListItemText primary={"get all owner Resgertion pending"} />
            </ListItemButton>
          </ListItem>
          
          <ListItem  disablePadding>
            <ListItemButton onClick={handelRiderRegistretion} >
              <ListItemIcon >
               <InboxIcon /> 
              </ListItemIcon>
              <ListItemText primary={"get all riders Resgertion pending"} />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button component={Link} to="/admin" sx={{ color: 'white' }} compone onClick={toggleDrawer(true)}>Dash Bord</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer ; 
