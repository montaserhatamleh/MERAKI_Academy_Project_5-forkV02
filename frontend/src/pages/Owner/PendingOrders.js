import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Grid, Button, Card, CardContent } from '@mui/material';

const PendingOrders = () => {
  const token = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getPendingOrders = async () => {
      try {
        const result = await axios.get('http://localhost:5000/restaurants/find', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(result.data.result);
      } catch (error) {
        setMessage('Error getting pending orders. Please try again later.');
      }
    };

    getPendingOrders();
  }, [token]);

  const handleStatusChange = async (orderId, status) => {
    try {
      let endpoint;
      if (status === 'Preparing') {
        endpoint = `http://localhost:5000/restaurants/prepare/${orderId}`;
      } else if (status === 'Ready') {
        endpoint = `http://localhost:5000/restaurants/read/${orderId}`;
      }

      await axios.put(endpoint, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
      setMessage(`Order ${orderId} status updated to ${status}`);
    } catch (error) {
      setMessage('Error updating order status. Please try again later.');
    }
  };

  if (!orders.length) {
    return (
      <Container>
        {message && <Typography variant="h5" color="error">{message}</Typography>}
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Pending Orders</Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item key={order.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Order #{order.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {order.delivery_address}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {order.status}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStatusChange(order.id, 'Preparing')}
                  disabled={order.status !== 'Pending'}
                >
                  Mark as Preparing
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleStatusChange(order.id, 'Ready')}
                  disabled={order.status !== 'Preparing'}
                >
                  Mark as Ready
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PendingOrders;
