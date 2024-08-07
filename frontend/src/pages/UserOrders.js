import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserOrders = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.data);
      } catch (error) {
        setMessage("Error getting orders. Please try again later.");
      }
    };

    getOrders();
  }, [token]);

  if (orders.length === 0 && !message) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={80} />
        </Box>
        <Typography variant="h5" align="center" sx={{ mt: 2 }}>
          You have no orders yet.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8, pb: 6 }}>
      <Typography variant="h4" gutterBottom align="center" color="textPrimary">
        Your Orders
      </Typography>

      {message && (
        <Typography color="error" align="center" sx={{ mb: 4 }}>
          {message}
        </Typography>
      )}

      <Grid container spacing={4}>
        {orders.map((order) => {
          // Convert total_price to a number if it's not already
          const totalPrice = Number(order.total_price);

          return (
            <Grid item key={order.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 5,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                  overflow: "hidden",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order ID: {order.id}
                  </Typography>
                  <Typography variant="body1" color="textPrimary" gutterBottom>
                    Total Price: ${totalPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Status: {order.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Delivery Address: {order.delivery_address}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ordered at: {new Date(order.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", p: 2 }}>
                  <Button
                    onClick={() => navigate(`/order_item/${order.id}`)}
                    size="small"
                    color="primary"
                    variant="contained"
                    sx={{ textTransform: "none", px: 3 }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default UserOrders;
