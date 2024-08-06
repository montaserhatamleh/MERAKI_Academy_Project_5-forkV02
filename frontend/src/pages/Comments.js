import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography ,Grid } from '@mui/material';
import women from "../assets/images/woman-eating-steak-restaurant-couple-dinner.webp";
import siomn from "../assets/images/big-breakfast.jpg";
import person from "../assets/images/4f3f09ae980b9192aaf66d0cc0bb26a9.jpg";
const comments = [
  {
    name: "Omer",
    image:siomn,
    comment: "The website is very user-friendly and easy to navigate. I found the information I needed without any hassle",

  },
  {
    name: "Nour",
    image:women , 
    comment: "All the necessary information is readily available and clearly presented. It's easy to find what I'm looking for",
 
  },
  {
    name: "Mohammad",
    image: person,
    comment: "The website maintains a consistent look and feel throughout, which makes it easier to use and more professiona",
    
  }
];

const RestaurantComments = () => {
    return (
        <Box sx={{ mt: 5, padding: '15px', borderRadius: '900px' }}>
        <Grid container spacing={3} justifyContent="center">
          {comments.map((comment, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} style={{display:"flex" , justifyContent:"center" }} >
              <Card sx={{ mb: 2 }} style={{width:"80%" , textAlign:"center" ,boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "8px"}}>     
                <CardMedia
                  component="img"
                  image={comment.image}
                  alt={comment.name}
                  sx={{ height: 400, width: '100%', objectFit: 'cover' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2, padding: '10px' }}>
                    <Typography variant="h6">{comment.name}</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>{comment.comment}</strong>
                  </Typography>
                </CardContent>
              </Card>   
            </Grid>
          ))}
        </Grid>
      </Box>
    );
 
};

export default RestaurantComments;
