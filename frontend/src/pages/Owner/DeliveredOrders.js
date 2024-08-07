import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Typography, Box, Container, Grid, Card, CardContent, Button , Dialog, 
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
  ListItemText} from '@mui/material';


const DeliveredOrders = () => {
    const token = useSelector((state) => state.auth.token);
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [open,setOpen]=useState(false) ; 
    const [orderItems, setOrderItems] = useState()
    useEffect(() => {
      const getDeliveredOrders = async () => {
        try {
          const result = await axios.get('http://localhost:5000/restaurants/restaurant/delivered', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOrders(result.data.result);
        } catch (error) {
          setMessage('Error getting delivered orders. Please try again later.');
        }
      };
  
      getDeliveredOrders();
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


    if (!orders.length) {
        return (
          <Container style={{height:"700px"}} >
            {message && <Typography variant="h5" color="error">{message}</Typography>}
            <Typography variant="h6">Loading...</Typography>
          </Container>
        );
      }
    
      return (
        <>
        <Container style={{height:"500px" , background:"white" , padding:"15px"}}>
          <Typography variant="h4" color={"black"} gutterBottom>Delivered Orders</Typography>
          <Grid container spacing={3}>
            {orders.map(order => (
              <Grid item key={order.id} xs={12} sm={6} md={4}>
                <Card style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
borderRadius: "8px",}}>
                  <CardContent>
                    <Typography style={{color: 'black'}} gutterBottom variant="h5" component="div">
                      Order #{order.id}
                    </Typography>
                    <Typography style={{color:"black"}} variant="body2">
                      Delivery Address: {order.delivery_address}
                    </Typography>
                    <Typography color="black" variant="body2">
                      Total Price: ${order.total_price}
                    </Typography>
                    <Typography color="black" variant="body2">
                      Status: {order.status}
                    </Typography>
                  </CardContent>
                  <Box style={{display:"flex" ,justifyContent: 'flex-end'  }}>
                  <Button onClick={()=>getItemsOrder(order.id)}>View Items</Button>
                  </Box>
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
}

export default DeliveredOrders