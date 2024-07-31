import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid } from '@mui/material';

const UserOrders = () => {
  const token = useSelector(state => state.auth.token);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data.data);
      } catch (error) {
        setMessage('Error getting orders. Please try again later.');
      }
    };

    getOrders();
  }, [token]);

  if (orders.length === 0 && !message) {
    return (
      <Container>
        <Typography variant="h5">You have no orders yet.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Orders</Typography>
      {message && <Typography color="error">{message}</Typography>}
      <Grid container spacing={3}>
        {orders.map(order => (
          <Grid item key={order.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography variant="body1">Total Price: ${order.total_price.toFixed(2)}</Typography>
                <Typography variant="body2">Status: {order.status}</Typography>
                <Typography variant="body2">Delivery Address: {order.delivery_address}</Typography>
                <Typography variant="body2">Ordered at: {new Date(order.created_at).toLocaleString()}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button> 
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserOrders;
