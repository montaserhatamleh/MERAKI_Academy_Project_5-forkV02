import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

const AboutUs = () => {
  return (
    <Box sx={{ backgroundColor: blueGrey[50], padding: '40px 0' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" sx={{ marginBottom: 4 ,color: 'black'}}>
          About Us
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'black' }}>
          Welcome to FeedMe! We are a dedicated team passionate about bringing delicious and
          diverse food options right to your doorstep. Our mission is to connect you with the
          best local restaurants and deliver exceptional dining experiences.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'black' }}>
          Founded in 2024, FeedMe has quickly grown into a leading food delivery service in the
          region. Our team of professionals is committed to providing top-notch service and
          ensuring that your food arrives hot and fresh every time.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Ahmed Abu Alkhier</Typography>
                <Typography variant="body2" color="textSecondary">
                  Co-Founder & CEO
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'black' }}>
                  Ahmed is the visionary behind FeedMe. With a passion for culinary arts and a
                  strong background in technology, he leads our team with innovation and
                  dedication.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Montaser Alhatamleh</Typography>
                <Typography variant="body2" color="textSecondary">
                  Head of Operations
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'black' }}>
                  Montaser ensures that our logistics run smoothly and that our customers receive
                  their orders promptly. His expertise in operations is a cornerstone of our
                  success.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Osama Alrwajbeh</Typography>
                <Typography variant="body2" color="textSecondary">
                  Marketing Director
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'black' }}>
                  Osama crafts our brand's message and manages our marketing campaigns. His
                  creativity and strategic thinking help us reach new customers and keep our
                  current ones engaged.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Rawan Khattab</Typography>
                <Typography variant="body2" color="textSecondary">
                  Customer Service Manager
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'black' }}>
                  Rawan is dedicated to ensuring our customers have the best experience. She
                  handles inquiries and resolves issues with professionalism and care.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;