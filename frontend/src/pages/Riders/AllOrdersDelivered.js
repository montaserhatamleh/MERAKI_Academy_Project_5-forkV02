import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";



const AllOrdersDelivered = () => {
  const [id ,setId] = useState(null) ; 
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  const getAllOrders = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/riders/all/onTheWay`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(result.data.result);
      console.log(result)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const getItem = async (id) => {
    setId(id)
    setOpen(true)
    setOrderItems([])
    try {
      const result = await axios.get(
        `http://localhost:5000/riders/order/items/${id}`
      );
      setOrderItems(result.data.result);
    } catch (err) {
      console.log(err);
    }
  };
 
  const accept=async()=>{
    setOpen(false)
    try {
    const result = await axios.put(
      `http://localhost:5000/riders/delivered/${id}`,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate("/rider/All_complete_order")
    setOrders(
      orders.map((ele) => 
        ele.id === id ? { ...ele, status: result.data.order.status } : ele
      )
    );
  } catch (err) {
    console.log(err);
  }
};

  


  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
       <>
      <Container maxWidth="la">        
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
           All Orders Delivered
          </Typography>
       
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order.id} onClick={() => getItem(order.id)} hover>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.total_price}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      <Dialog
        open={open}
        PaperProps={{
          style: {
            width: '50%',
          },
        }}
      >
        <DialogTitle variant="h5"><strong>Informations</strong></DialogTitle>
        <DialogContent alignItems="center">
        <Box>
        <Typography variant="h6" gutterBottom>
           First Name: {orderItems[0]?.first_name}
          </Typography>
          <Typography variant="h6" gutterBottom>
          Last Name: {orderItems[0]?.last_name}
          </Typography>
          <Typography variant="h6" gutterBottom>
          Phone: {orderItems[0]?.phone_number}
          </Typography>
          </Box>
          <br/>
          <TableContainer  component={Paper}>
           <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems?.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={accept} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
    </>
  );
};

export default AllOrdersDelivered;
