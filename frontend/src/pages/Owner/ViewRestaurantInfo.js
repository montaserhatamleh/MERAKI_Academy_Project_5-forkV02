import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button 
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ErrorTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

const Heading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
  fontWeight: 'bold',
}));

const DetailTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
}));

const ViewRestaurantInfo = () => {
  const token = useSelector((state) => state.auth.token);
  const [restaurant, setRestaurant] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getRestaurantInfo = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/restaurants/RestaurantById",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRestaurant(result.data.result);
      } catch (error) {
        console.log(error);
        setMessage(
          "Error getting restaurant information. Please try again later."
        );
      }
    };

    getRestaurantInfo();
  }, [token]);

  if (!restaurant && !message) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      {message ? (
        <ErrorTypography variant="h6" align="center">
          {message}
        </ErrorTypography>
      ) : (
        <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
          {restaurant.image_url && (
            <ImageContainer>
              <CardMedia
                component="img"
                height="200"
                image={restaurant.image_url}
                alt={restaurant.name}
                sx={{ objectFit: "cover", width: '100%', height: '100%' }}
              />
            </ImageContainer>
          )}
          <CardContent>
            <Heading variant="h4" align="center">
              {restaurant.name}
            </Heading>
            <DetailTypography variant="h6">
              <strong>Address:</strong> {restaurant.address}
            </DetailTypography>
            <DetailTypography variant="h6">
              <strong>Phone:</strong> {restaurant.phone_number}
            </DetailTypography>
            <DetailTypography variant="h6">
              <strong>Category:</strong> {restaurant.category}
            </DetailTypography>
            <DetailTypography variant="h6">
              <strong>Delivery Fees:</strong> ${restaurant.delivery_fees}
            </DetailTypography>
            <DetailTypography variant="h6" sx={{ wordBreak: 'break-all' }}>
              <strong>Image URL:</strong> {restaurant.image_url}
            </DetailTypography>
            <Box sx={{ textAlign: 'center', marginTop: 3 }}>
              <Button variant="outlined" color="primary" onClick={() => window.open(restaurant.image_url, "_blank")}>
                View Image
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ViewRestaurantInfo;