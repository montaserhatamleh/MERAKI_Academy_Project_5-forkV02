import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Typography, Box, Container } from '@mui/material';

const ViewRestaurantInfo = () => {
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
        console.log(error)
        setMessage('Error getting restaurant information. Please try again later.');
      }
    };

    getRestaurantInfo();
  }, [token]);

  if (!restaurant) {
    return (
      <Container>
        <Typography variant="h5" color="error">{message}</Typography>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4">Restaurant Information</Typography>
      <Typography variant="h6">Name: {restaurant.name}</Typography>
      <Typography variant="h6">Address: {restaurant.address}</Typography>
      <Typography variant="h6">Phone: {restaurant.phone_number}</Typography>
      <Typography variant="h6">Category: {restaurant.category}</Typography>
      <Typography variant="h6">Delivery Fees: {restaurant.delivery_fees}</Typography>
      <Typography variant="h6">Image URL: {restaurant.image_url}</Typography>
    </Container>
  );
};

export default ViewRestaurantInfo;
