import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, Container, TextField, Button } from '@mui/material';

const Owner = () => {
  const token = useSelector(state => state.auth.token);
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    phone_number: '',
    category: '',
    delivery_fees: '',
    image_url: ''
  });
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

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const result = await axios.put("http://localhost:5000/restaurants/updateRestaurant", restaurant, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Restaurant updated successfully!');
      setRestaurant(result.data.result);
    } catch (error) {
      setMessage('Error updating restaurant information. Please try again later.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#424242',
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
            value={restaurant.name}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
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
            value={restaurant.address}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
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
            value={restaurant.phone_number}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
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
            value={restaurant.category}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
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
            value={restaurant.delivery_fees}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="image_url"
            label="Image URL"
            value={restaurant.image_url}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={handleUpdate}
            sx={{ mt: 3, mb: 2, backgroundColor: '#1976d2' }}
          >
            Update Information
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Owner;
