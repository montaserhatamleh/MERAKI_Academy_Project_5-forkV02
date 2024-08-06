import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { Fastfood, DeliveryDining, Restaurant, LocalShipping } from '@mui/icons-material';

const services = [
  {
    title: 'Add Your Restaurant',
    description: 'Expand your reach by listing your restaurant on our platform and attract more customers.',
    icon: <Restaurant fontSize="large" />,
    color: '#ff5722' 
  },
  {
    title: 'Join Our Delivery Team',
    description: 'Become a rider and earn money with flexible hours. Join our dedicated delivery team.',
    icon: <DeliveryDining fontSize="large" />,
    color: '#4caf50' 
  },
  {
    title: 'Food Delivery to Your Door',
    description: 'Get your favorite dishes delivered quickly and conveniently right to your doorstep.',
    icon: <LocalShipping fontSize="large" />,
    color: '#2196f3' 
  },
  {
    title: 'Explore a Variety of Cuisines',
    description: 'Browse through a wide selection of cuisines from the best local and international restaurants.',
    icon: <Fastfood fontSize="large" />,
    color: '#9c27b0' 
  }
];

const Services = () => {
  return (
    <Box sx={{ padding: '40px 0', backgroundColor: '#f5f5f5' }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 2, color: '#333' }}>
          Our Services
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Discover the range of services we offer to enhance your experience with us.
        </Typography>
      </Box>
      <Box sx={{ padding: '0 20px' }}> 
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center', 
                  padding: 2, 
                  boxShadow: 'none', 
                  borderRadius: '8px', 
                  border: `1px solid ${service.color}`,
                  height: '100%',  
                  margin: '0 20px 40px', 
                  '& .MuiCardContent-root': {
                    flex: '1 0 auto', 
                  },
                }}
              >
                <Box sx={{ marginBottom: 2, color: service.color, fontSize: '3rem' }}>
                  {service.icon}
                </Box>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="h6" sx={{ marginBottom: 1, color: '#333' }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Services;