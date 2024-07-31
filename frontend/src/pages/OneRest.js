import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box,
} from "@mui/material";
const RestaurantDetails = () => {
  const { id } = useParams(); 
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchRestaurantData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/restaurants/allInfo/${id}`
      );
      setRestaurant(response.data.restaurant);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch restaurant data.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRestaurantData();
  }, [id]);

  if (loading) return <CircularProgress />;

  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {restaurant.name}
      </Typography>
      <Box sx={{ display: "flex", marginBottom: 2 }}>
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "10px",
            marginRight: "20px",
          }}
        />
        <Box>
          <Typography variant="body1">
            <strong>Address:</strong> {restaurant.address}
          </Typography>
          <Typography variant="body1">
            <strong>Category:</strong> {restaurant.category}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {restaurant.phone_number}
          </Typography>
          <Typography variant="body1">
            <strong>Delivery Fees:</strong> ${restaurant.delivery_fees}
          </Typography>
          <Typography variant="body1">
            <strong>Rating:</strong> {restaurant.average_rating} (based on{" "}
            {restaurant.rating_count} reviews)
          </Typography>
        </Box>
      </Box>
      <Typography variant="h5" gutterBottom>
        Menu 
      </Typography>
      {Object.keys(restaurant.menu_items).map((category) => (
        <Box key={category} sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            {category}
          </Typography>
          <Grid container spacing={2}>
            {restaurant.menu_items[category].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image_url || "default_image_url.jpg"}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      ${item.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={item.available ? "green" : "red"}
                    >
                      {item.available ? "Available" : "Not Available"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};
export default RestaurantDetails;
