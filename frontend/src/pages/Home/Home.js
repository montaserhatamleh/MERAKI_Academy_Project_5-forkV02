// Home.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Box, Typography, Button ,Container} from '@mui/material';
import restaurantImage from '../../assets/images/bg_3.jpg'; 
import partnerImage from '../../assets/images/gallery-1.jpg';
import riderImage from '../../assets/images/about.jpg';
import joinFamilyImage from '../../assets/images/bg_2.jpg';
import "./Home.css"
const Home = () => {
  return    (
    <div className="home">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={3000}>
        <div>
          <img src={restaurantImage} alt="Discover Restaurants" />
          <Box className="carousel-content">
            <Container maxWidth="md">
              <Typography variant="h3" gutterBottom>Discover Restaurants</Typography>
              <Typography variant="h6" gutterBottom>Explore a wide variety of cuisines and dishes</Typography>
              <Button variant="contained" color="primary" component={Link} to="/restaurants">
                Explore Restaurants
              </Button>
            </Container>
          </Box>
        </div>
        <div>
          <img src={partnerImage} alt="Become a Partner" />
          <Box className="carousel-content">
            <Container maxWidth="md">
              <Typography variant="h3" gutterBottom>Become a Partner</Typography>
              <Typography variant="h6" gutterBottom>Grow your business with us</Typography>
              <Button variant="contained" color="secondary" component={Link} to="/become-partner">
                Join as Partner
              </Button>
            </Container>
          </Box>
        </div>
        <div>
          <img src={riderImage} alt="Become a Rider" />
          <Box className="carousel-content">
            <Container maxWidth="md">
              <Typography variant="h3" gutterBottom>Become a Rider</Typography>
              <Typography variant="h6" gutterBottom>Earn money on your schedule</Typography>
              <Button variant="contained" color="success" component={Link} to="/become-rider">
                Become a Rider
              </Button>
            </Container>
          </Box>
        </div>
        <div>
          <img src={joinFamilyImage} alt="Join Our Family" />
          <Box className="carousel-content">
            <Container maxWidth="md">
              <Typography variant="h3" gutterBottom>Join Our Family</Typography>
              <Typography variant="h6" gutterBottom>Sign up and start your journey with us</Typography>
              <Button variant="contained" color="info" component={Link} to="/signup">
                Sign Up
              </Button>
            </Container>
          </Box>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
