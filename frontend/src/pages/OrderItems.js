import axios from "axios";
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
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));
  const [orderItems, setOrderItems] = useState();
  const getItemsOrder = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result) ;
      setOrderItems(result.data.order);
      if (result.data.order.status === "Delivered" && result.data.order.deleted_at == false) {
        setOpen(true);
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItemsOrder();
  }, [id, token]);

  if (!orderItems) {
    return <div>{"loding ...."}</div>;
  }


  const handelClose = () => {
    setOpen(false);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const ratinghandler = async () => {
    const id = orderItems.restaurant_id ;
    console.log(id);  
        try {
            const result = await axios.post(
              `http://localhost:5000/reviews/rating/${id}`,
              { rating, user_id: orderItems.user_id , id:orderItems.id },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(result);
          } catch (err) {
            console.log(err);
          }
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Order Details</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Order
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Date: {new Date(orderItems.created_at).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Payment Method: {orderItems.payment_method}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Status: {orderItems.status}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Address: {orderItems.delivery_address}
              </Typography>
              { orderItems.status === "Accepted by Rider" ?
              <>
                <Typography variant="subtitle1" gutterBottom>
                Name Rider: {orderItems.rider.first_name}
               </Typography>
                <Typography variant="subtitle1" gutterBottom>
                 Phone Number : {orderItems.rider.phone_number}
               </Typography>
               </> :" "
              }
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Item</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
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
                        <TableCell>{item.price}</TableCell>
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
                    secondary={orderItems.total_price}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>
     
      <Dialog open={open} onClose={handelClose} >
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
   
    </div>
  );
};

export default OrderItems;
