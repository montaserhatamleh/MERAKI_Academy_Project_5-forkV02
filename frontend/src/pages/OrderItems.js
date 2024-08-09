import axios from "axios";
import socketInit from "./socketServer";
import MessageUser from "./MessageToUser";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  Box,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
} from "@mui/material";

const OrderItems = () => {
  const id = useParams().id;
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const { token, userId, rider_id } = useSelector((state) => ({
    token: state.auth.token,
    userId: state.auth.userId,
    rider_id: state.auth.rider_id,
  }));
  const [orderItems, setOrderItems] = useState("");
  const getItemsOrder = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      setOrderItems(result.data.order);
      if (
        result.data.order.status === "Delivered" &&
        result.data.order.deleted_at == false
      ) {
        setOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket?.on("connect", () => {
      setIsConnected(true);
      console.log(true);
    });
    socket?.on("connect_error", (error) => {
      console.log(false);
      setIsConnected(false);
      console.log(error.message);
    });
    return () => {
      socket?.close();
      socket?.removeAllListeners();
    };
  }, [socket]);

  useEffect(() => {
    getItemsOrder(); 

    const intervalId = setInterval(() => {
      getItemsOrder(); 
    }, 5000); 

    return () => clearInterval(intervalId);
  }, [id, token]);
  if (!orderItems) {
    return <div>{"loading ...."}</div>;
  }

  const handelClose = () => {
    setOpen(false);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const ratinghandler = async () => {
    const id = orderItems.restaurant_id;
    console.log(id);
    try {
      const result = await axios.post(
        `http://localhost:5000/reviews/rating/${id}`,
        { rating, user_id: orderItems.user_id, id: orderItems.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpen(false);

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return  (
    <Container sx={{ paddingBottom: 6 }}>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              <strong>Order Details</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Date:</strong> {new Date(orderItems.created_at).toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Payment Method:</strong> {orderItems.payment_method}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Restaurant Name:</strong> {orderItems.items[0].res_name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Status:</strong> {orderItems.status}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Address:</strong> {orderItems.delivery_address}
            </Typography>
            {(orderItems.status === "Accepted by Rider" || orderItems.status === "On the Way") && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Rider Name:</strong> {orderItems.rider.first_name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Rider Phone Number:</strong> {orderItems.rider.phone_number}
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Rider Vehicle:</strong> {orderItems.rider.vehicle_details}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setSocket(socketInit({ user_id: userId, rider_id: rider_id }))
                    }
                  >
                    Chat To Rider
                  </Button>
                </Box>
              </>
            )}
            {isConnected && (
              <Box
              >
                <MessageUser socket={socket} userId={userId} />
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Image</strong></TableCell>
                    <TableCell><strong>Item</strong></TableCell>
                    <TableCell><strong>Price</strong></TableCell>
                    <TableCell><strong>Quantity</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          style={{ width: "100px", height: "100px" }}
                          alt={item.name}
                          src={item.image_url}
                          variant="square"
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <List>
              <ListItem>
                <ListItemText
                  primary="Total"
                  secondary={<Typography variant="h6"><strong>${orderItems.total_price}</strong></Typography>}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2, textAlign: 'center', color: 'gray' }}>
        If you have any problem with your order, contact us at <strong>+962787068115</strong>
      </Typography>
      <Dialog open={open} onClose={handelClose}>
        <DialogTitle>Start Review</DialogTitle>
        <DialogContent>
          <Rating
            name="star-rating"
            value={rating}
            onChange={handleRatingChange}
            size="large"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelClose}>Cancel</Button>
          <Button onClick={ratinghandler}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default OrderItems;
