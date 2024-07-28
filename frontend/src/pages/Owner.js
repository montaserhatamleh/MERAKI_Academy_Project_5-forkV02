import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Typography, Box, Container, TextField } from '@mui/material';

const Owner = () => {
  const token = useSelector(state => state.auth.token);
  const [restaurant, setRestaurant] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getRestaurantInfo = async () => {
      try {
        const result = await axios.get("http://localhost:5000/restaurants/RestaurantById", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRestaurant(result.data.result);
      } catch (error) {
        setMessage('Error getting restaurant information. Please try again later.');
      }
    };

    getRestaurantInfo();
  }, [token]);

  if (!restaurant) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white'
          }}
        >
          <Typography component="h1" variant="h5">Restaurant Dashboard</Typography>
          {message && <Typography color="error">{message}</Typography>}
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#424242', // Slightly lighter background
          padding: 3,
          borderRadius: 2
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: 'white', marginBottom: 2 }}>Restaurant Dashboard</Typography>
        {message && <Typography color="error">{message}</Typography>}
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Restaurant Name"
            value={restaurant.name || ''}
            InputProps={{ readOnly: true, style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            value={restaurant.address || ''}
            InputProps={{ readOnly: true, style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone_number"
            label="Phone Number"
            value={restaurant.phone_number || ''}
            InputProps={{ readOnly: true, style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="category"
            label="Category"
            value={restaurant.category || ''}
            InputProps={{ readOnly: true, style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="delivery_fees"
            label="Delivery Fees"
            type="number"
            value={restaurant.delivery_fees || ''}
            InputProps={{ readOnly: true, style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="image_url"
            label="Image URL"
            value={restaurant.image_url || ''}
            InputProps={{ readOnly: true, style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Owner;
