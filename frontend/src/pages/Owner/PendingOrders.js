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
  Dialog, 
  DialogTitle,
   DialogContent, 
   DialogActions, 
  TableContainer,
   Paper, 
   Table,
    TableHead, 
    TableRow, 
    TableCell,
 TableBody, 
 Divider,
  List, 
  ListItem, 
  ListItemText
} from "@mui/material";

const PendingOrders = () => {
  const token = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [open,setOpen]=useState(false) ; 
  const [orderItems, setOrderItems] = useState();
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
        console.log(result.data.result)
        setOrders(result.data.result);
      } catch (error) {
        setMessage("Error getting pending orders. Please try again later.");
      }
    };

    getPendingOrders();
  }, [token]);

 
  const getItemsOrder = async (id) => {
    try {
      const result = await axios.get(`http://localhost:5000/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      setOrderItems(result.data.order);
      setOpen(true);
      
    } catch (err) {
      console.log(err);
    }
  };

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
      <Container style={{height:"700px"}}>
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
    <>
    <Container sx={{ mt: 4, height:"500px" , background:"white" , padding:"15px"}}>
    <Typography variant="h4" gutterBottom  sx={{mb: 4 , color:"black" }}>
      Pending Orders
    </Typography>
    <Grid container spacing={4}>
      {orders.map((order) => (
        <Grid item key={order.id} xs={12} sm={6} md={4} >
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'medium' ,  }}>
                Order #{order.id}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold'}}>
                {order.delivery_address}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{fontWeight: 'bold'}}>
                Status: {order.status}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{fontWeight: 'bold' }}>
                Order Date: {new Date(order.created_at).toLocaleString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button onClick={()=>getItemsOrder(order.id)} variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                  View Items
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStatusChange(order.id, 'Preparing')}
                  disabled={order.status !== 'Pending'}
                  sx={{ textTransform: 'none', ml: 2 }}
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

  <Dialog maxWidth="md" fullWidth open={open} >
        <DialogTitle>Items</DialogTitle>
        <DialogContent>

        <Grid   item xs={12}>
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
                    {orderItems?.items.map((item, index) => (
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
                    secondary={orderItems?.total_price}
                  />
                </ListItem>
              </List>
            </Grid>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button> 
        </DialogActions>
      </Dialog>
 
          
    </>
  

);
};

export default PendingOrders;
