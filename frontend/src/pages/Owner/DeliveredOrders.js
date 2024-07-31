import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Typography, Box, Container, Grid, Card, CardContent, Button } from '@mui/material';


const DeliveredOrders = () => {
    const token = useSelector((state) => state.auth.token);
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      const getDeliveredOrders = async () => {
        try {
          const result = await axios.get('http://localhost:5000/restaurants/restaurant/delivered', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOrders(result.data.result);
        } catch (error) {
          setMessage('Error getting delivered orders. Please try again later.');
        }
      };
  
      getDeliveredOrders();
    }, [token]);



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
          <Typography variant="h4" gutterBottom>Delivered Orders</Typography>
          <Grid container spacing={3}>
            {orders.map(order => (
              <Grid item key={order.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Order #{order.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Delivery Address: {order.delivery_address}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Price: ${order.total_price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: {order.status}
                    </Typography>
                   
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      );
}

export default DeliveredOrders