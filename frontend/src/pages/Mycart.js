import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Button, List, ListItem, ListItemText, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CheckoutForm from "../components/CheckoutForm";
import { useNavigate } from 'react-router-dom';

const Mycart = () => {
  const navigate = useNavigate();
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
      console.log(result.data.order.id);
      navigate(`/order_item/${result.data.order.id}`)
      
    } catch (err) {
      console.log(err);
    }
  };
  const handleCheckout = async () => {
    if (paymentMethod === 'Cash') {
      await createOrder();
    }
  };

  return (
    <>
      <br />
      <Box sx={{ width: '50%', bgcolor: 'background.paper', padding: 2, boxShadow: 3, borderRadius: 2, margin: 'auto', marginBottom:3}}>
        <Typography variant="h5" component="div" style={{ color: 'black' }} gutterBottom>
          Shopping Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <React.Fragment key={item.cart_item_id}>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={item.menu_item_image_url} alt={item.menu_item_name} style={{ width: 100, height: 100, borderRadius: 1 }} />
                <ListItemText sx={{ ml: 2 }}>
                  <Typography variant="body1" color="text.primary">{item.menu_item_name}</Typography>
                  <Typography variant="body2" color="text.secondary">${item.menu_item_price}</Typography>
                </ListItemText>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => handleIncrement(item.cart_item_id)} color="primary"> <AddIcon /> </IconButton>
                <Typography variant="body2" color="text.primary" sx={{ mx: 1 }}>{item.quantity}</Typography>
                <IconButton onClick={() => handleDecrement(item.cart_item_id)} color="primary"> <RemoveIcon /> </IconButton>
                <IconButton onClick={() => handleDelete(item.cart_item_id)} color="error"> <DeleteIcon /> </IconButton>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 2 }}>
        <Typography variant="h6" color="text.primary">
          Delivery Fees: ${Number(fees).toFixed(2)}
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold', mt: 1 }}>
          Total: ${Number(totalPrice).toFixed(2)}
        </Typography>
      </Box>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={paymentMethod}
          label="Payment Method"
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <MenuItem value="Cash">Cash on Delivery</MenuItem>
          <MenuItem value="Online">Online Payment</MenuItem>
        </Select>
      </FormControl>
      {paymentMethod === 'Online' ? (
        <CheckoutForm totalAmount={totalPrice} createOrder={createOrder} sx={{ mt: 2 }} />
      ) : (
        <Button onClick={handleCheckout} variant="contained" color="primary" sx={{ mt: 2 }} disabled={!paymentMethod}>
          Checkout and Submit Order
        </Button>
      )}
    </Box>
    </>

  );
}

export default Mycart;
