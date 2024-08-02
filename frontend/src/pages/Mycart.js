import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Mycart = () => {
  const [totalPrice ,setTotalPrice ] = useState(0)
  const [cartItems, setCartItems] = useState([]) ; 
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));
    
  const findCartById = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/carts/elements`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } );
      console.log(result);
      setCartItems(result.data.cart) ; 
    } catch (err) {
      console.log(err);
    }
  };

    useEffect(()=>{findCartById()},[])

    const handleIncrement = async (id) => {
      const updatedCartItems = cartItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      console.log(updatedCartItems) ; 
    
      const updatedItem = updatedCartItems.find(item => item.id === id);
    
      try {
        const result = await axios.put(`http://localhost:5000/carts/${id}`, { quantity: updatedItem.quantity }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    };

  const handleDecrement = async(id) => {
    const updatedCartItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1)} : item
    );
    setCartItems(updatedCartItems);
    console.log(updatedCartItems) ; 
  
    const updatedItem = updatedCartItems.find(item => item.id === id);
  
    try {
      const result = await axios.put(`http://localhost:5000/carts/${id}`, { quantity: updatedItem.quantity }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async(id) => {
    try {
      const result = await axios.delete(`http://localhost:5000/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    setCartItems(cartItems.filter(item => item.id !== id));
  }catch (err) {
    console.log(err);
  }
}

const checkout =async()=>{
  try {
    const result = await axios.post(`http://localhost:5000/orders/checkout`,{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      console.log(result)
}catch (err) {
  console.log(err);
}
}



 
  return (
    <>
    <br/>
    <Box sx={{ width: '50%', bgcolor: 'background.paper', padding: 2, boxShadow: 3, borderRadius: 2, margin: 'auto' }}>
    <Typography variant="h5" component="div" style={{ color: 'black' }} gutterBottom>
      Shopping Cart
    </Typography>
    <List>
      {cartItems.map((item) => (
        <React.Fragment key={item.id}>
          <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={item.image_url} style={{ width: '100px', height: '100px' }} />
            <ListItemText style={{ marginLeft: '20px', color: 'black' }} primary={item.name} secondary={`$${item.price}`} />
            <IconButton onClick={()=>handleIncrement(item.id)}> <AddIcon /> </IconButton>
            <Typography style={{color:"black"}}>{item.quantity}</Typography>
            <IconButton onClick={()=>handleDecrement(item.id)}> <RemoveIcon /> </IconButton>
            <IconButton  onClick={()=>handleDelete(item.id)} edge="end" aria-label="delete" >
              <DeleteIcon />
            </IconButton>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
      <Typography variant="h6" color="black">
        Total: ${cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0)}
      </Typography>
      <Button onClick={checkout} variant="contained" color="primary">
        Checkout
      </Button>
    </Box>
  </Box>
  </>
);
}

export default Mycart