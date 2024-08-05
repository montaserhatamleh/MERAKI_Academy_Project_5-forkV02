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
        <Typography variant="h5">You have no orders yet.
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress size={80} />
      </Box>
        </Typography>
      </Container>
    );
  }



  return (
    <Container maxWidth="lg" sx={{ mt: 4, paddingBottom: 6 }}>
      <Typography variant="h4" gutterBottom align="center" color="textPrimary">
        Your Orders
      </Typography>

      {message && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {message}
        </Typography>
      )}

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item key={order.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.03)" },
                overflow: "hidden",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order ID: {order.id}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  Total Price: ${order.total_price}
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
                  sx={{ textTransform: "none" }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserOrders;
