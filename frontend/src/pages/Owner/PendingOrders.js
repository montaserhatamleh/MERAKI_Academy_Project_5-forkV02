import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  CardActions,
} from "@mui/material";

const PendingOrders = () => {
  const token = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getPendingOrders = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/restaurants/find",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(result.data.result);
      } catch (error) {
        setMessage("Error getting pending orders. Please try again later.");
      }
    };

    getPendingOrders();
  }, [token]);

  const handleStatusChange = async (orderId, status) => {
    try {
      let endpoint;
      if (status === "Preparing") {
        endpoint = `http://localhost:5000/restaurants/prepare/${orderId}`;
      } else if (status === "Ready") {
        endpoint = `http://localhost:5000/restaurants/read/${orderId}`;
      }

      await axios.put(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
      setMessage(`Order ${orderId} status updated to ${status}`);
    } catch (error) {
      setMessage("Error updating order status. Please try again later.");
    }
  };

  if (!orders.length) {
    return (
      <Container>
        {message && (
          <Typography variant="h5" color="error">
            {message}
          </Typography>
        )}
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Pending Orders
      </Typography>
      <Grid container spacing={4}>
        {orders.map((order) => (
          <Grid item key={order.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "medium" }}
                >
                  Order #{order.id}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 1.5 }}
                >
                  {order.delivery_address}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  Status: {order.status}
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ flexGrow: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleStatusChange(order.id, "Preparing")}
                    disabled={order.status !== "Pending"}
                    sx={{ textTransform: "none" }}
                  >
                    Mark as Preparing
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PendingOrders;
