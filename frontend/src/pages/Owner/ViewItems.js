import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Typography, Box, Container, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';

const ViewItems = () => {
  const token = useSelector(state => state.auth.token);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getRestaurantInfo = async () => {
      try {
        const result = await axios.get("http://localhost:5000/items/getItems", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(result.data.result);
        console.log(typeof result.data.result);

      } catch (error) {
        setMessage('Error getting restaurant information. Please try again later.');
      }
    };

    getRestaurantInfo();
  }, [token]);

  if (!items.length) {
    return (
      <Container>
        {message && <Typography variant="h5" color="error">{message}</Typography>}
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Menu Items</Typography>
      <Grid container spacing={3}>
        {items.map(item => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image_url || 'default_image_url.jpg'}
                  alt={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                  </Typography>
                  <Typography variant="body2" color={item.available ? 'green' : 'red'}>
                    {item.available ? 'Available' : 'Not Available'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewItems;
