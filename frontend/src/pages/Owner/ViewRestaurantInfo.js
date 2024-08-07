import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Typography, Paper, Grid, Avatar } from '@mui/material';

const ViewRestaurantInfo = () => {
  const token = useSelector((state) => state.auth.token);
  const [restaurant, setRestaurant] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getRestaurantInfo = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/restaurants/RestaurantById",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRestaurant(result.data.result);
      } catch (error) {
        console.log(error);
        setMessage(
          "Error getting restaurant information. Please try again later."
        );
      }
    };

    getRestaurantInfo();
  }, [token]);

  if (!restaurant) {
    return (
      <Container style={{height:"700px"}}>
        <Typography variant="h5" color="error">
          {message}
        </Typography>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container style={{height:"500px"}}>
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Avatar 
            alt={restaurant.name}
            src={restaurant.image_url}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            variant="square"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Restaurant Information
          </Typography>
          <Typography variant="h6" color="textSecondary">
            <strong>Name:</strong> {restaurant.name}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            <strong>Address:</strong> {restaurant.address}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            <strong>Phone:</strong> {restaurant.phone_number}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            <strong>Category:</strong> {restaurant.category}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            <strong>Delivery Fees:</strong> {restaurant.delivery_fees}
          </Typography>

        </Grid>
      </Grid>
    </Paper>
  </Container>
);
}


export default ViewRestaurantInfo;
