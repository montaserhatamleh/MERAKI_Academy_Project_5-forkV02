// Home.js
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from "@mui/material";
import restaurantImage from "../../assets/images/image_3.jpg";
import partnerImage from "../../assets/images/gallery-1.jpg";
import riderImage from "../../assets/images/about.jpg";
import joinFamilyImage from "../../assets/images/bg_2.jpg";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Carousel Section */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        <div>
          <img src={restaurantImage} alt="Discover Restaurants" />
          <Box className="carousel-content">
            <Container maxWidth="md">
              <Typography variant="h3" gutterBottom>
                Discover Restaurants
              </Typography>
              <Typography variant="h6" gutterBottom>
                Explore a wide variety of cuisines and dishes
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/restaurants"
              >
                Explore Restaurants
              </Button>
            </Container>
          </Box>
        </div>
        <div>
          <img src={partnerImage} alt="Become a Partner" />
          <Box className="carousel-content">
            <Container maxWidth="md">
              <Typography variant="h3" gutterBottom>
                Become a Partner
              </Typography>
              <Typography variant="h6" gutterBottom>
                Grow your business with us
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/become-partner"
              >
                Join as Partner
              </Button>
            </Container>
          </Box>
        </div>
        <div>
          <img src={riderImage} alt="Become a Rider" />
          <Box className="carousel-content">
            <Container maxWidth="md">
              <Typography variant="h3" gutterBottom>
                Become a Rider
              </Typography>
              <Typography variant="h6" gutterBottom>
                Earn money on your schedule
              </Typography>
              <Button
                variant="contained"
                color="success"
                component={Link}
                to="/become-rider"
              >
                Become a Rider
              </Button>
            </Container>
          </Box>
        </div>
        <div>
          <img
            src={joinFamilyImage}
            alt="Join Our Family"
            style={{ width: "200%" }}
          />
          <Box className="carousel-content">
            <Container maxWidth="md">
              <Typography variant="h3" gutterBottom>
                Join Our Family
              </Typography>
              <Typography variant="h6" gutterBottom>
                Sign up and start your journey with us
              </Typography>
              <Button
                variant="contained"
                color="info"
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </Container>
          </Box>
        </div>
      </Carousel>

      {/* Top Rated Restaurants Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', padding: '40px 0' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" sx={{ marginBottom: 4, color: 'black' }}>
            Top Rated Restaurants
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={"https://res.cloudinary.com/djrwu1bfo/image/upload/v1722368653/res_images/g9aegfyqvko0pimitwb6.png"}
                  alt="Top Restaurant 1"
                  sx={{ height: 180,  
                    objectFit: 'contain', 
                    width: '100%',
                    display: 'block' }} 
                />
                <CardContent>
                  <Typography variant="h6">Nur</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Delicious cuisine with excellent service.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={"https://res.cloudinary.com/djrwu1bfo/image/upload/v1722367064/res_images/dr1cjem9588tdkaeceji.png"}
                  alt="Top Restaurant 2"
                  sx={{  height: 180, 
                    objectFit: 'contain', 
                    width: '100%',
                    display: 'block' }} 
                />
                <CardContent>
                  <Typography variant="h6">Sufra</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Amazing food and cozy atmosphere.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={"https://res.cloudinary.com/djrwu1bfo/image/upload/v1722369117/res_images/i8umccm3y6f2md7tt05g.png"}
                  alt="Top Restaurant 3"
                  sx={{  height: 180,  
                    objectFit: 'contain', 
                          width: '100%',
                    display: 'block'  }} 
                />
                <CardContent>
                  <Typography variant="h6">Romero</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Great variety and top-notch quality.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
