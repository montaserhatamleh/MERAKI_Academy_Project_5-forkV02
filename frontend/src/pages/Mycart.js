import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Button, List, ListItem, ListItemText, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CheckoutForm from "../components/CheckoutForm";

const Mycart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [fees, setFees] = useState(0);
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  useEffect(() => {
    findCartById();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      setTotalPrice(cartItems.reduce((total, item) => total + Number(item.menu_item_price) * item.quantity, Number(fees)));
    }
  }, [cartItems, fees]);

  const findCartById = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/carts/elements`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(result.data.cart);
      if (result.data.cart.length > 0) {
        setFees(Number(result.data.cart[0].restaurant_delivery_fees) || 0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleIncrement = async (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.cart_item_id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);

    const updatedItem = updatedCartItems.find(item => item.cart_item_id === id);

    try {
      await axios.put(`http://localhost:5000/carts/${id}`, { quantity: updatedItem.quantity }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrement = async (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.cart_item_id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    );
    setCartItems(updatedCartItems);

    const updatedItem = updatedCartItems.find(item => item.cart_item_id === id);

    try {
      await axios.put(`http://localhost:5000/carts/${id}`, { quantity: updatedItem.quantity }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.filter(item => item.cart_item_id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = async () => {
    try {
      const result = await axios.post(`http://localhost:5000/orders/checkout`, {
        payment_method: paymentMethod,
        total_price: totalPrice,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      // Use id from result and navigate to order using the appropriate function 
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckout = async () => {
    if (paymentMethod === 'cash') {
      // Proceed with order creation
      await createOrder();
    }
  };

  return (
    <>
      <br />
      <Box sx={{ width: '50%', bgcolor: 'background.paper', padding: 2, boxShadow: 3, borderRadius: 2, margin: 'auto' }}>
        <Typography variant="h5" component="div" style={{ color: 'black' }} gutterBottom>
          Shopping Cart
        </Typography>
        <List>
          {cartItems.map((item) => (
            <React.Fragment key={item.cart_item_id}>
              <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src={item.menu_item_image_url} style={{ width: '100px', height: '100px' }} />
                <ListItemText style={{ marginLeft: '20px', color: 'black' }} primary={item.menu_item_name} secondary={`$${item.menu_item_price}`} />
                <IconButton onClick={() => handleIncrement(item.cart_item_id)}> <AddIcon /> </IconButton>
                <Typography style={{ color: "black" }}>{item.quantity}</Typography>
                <IconButton onClick={() => handleDecrement(item.cart_item_id)}> <RemoveIcon /> </IconButton>
                <IconButton onClick={() => handleDelete(item.cart_item_id)} edge="end" aria-label="delete" >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 2 }}>
  <Typography variant="h6" color="black" sx={{ fontWeight: 'bold' }}>
    Delivery Fees: ${Number(fees).toFixed(2)}
  </Typography>
  <Typography variant="h5" color="black" sx={{ fontWeight: 'bold', mt: 1 }}>
    Total: ${Number(totalPrice).toFixed(2)}
  </Typography>
</Box>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={paymentMethod}
            label="Payment Method"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="cash">Cash on Delivery</MenuItem>
            <MenuItem value="online">Online Payment</MenuItem>
          </Select>
        </FormControl>
        {paymentMethod === 'online' ? (
          <CheckoutForm totalAmount={totalPrice} createOrder={createOrder} />
        ) : (
          <Button onClick={handleCheckout} variant="contained" color="primary" sx={{ mt: 2 }} disabled={!paymentMethod}>
            Checkout and submit order
          </Button>
        )}
      </Box>
    </>
  );
}

export default Mycart;
