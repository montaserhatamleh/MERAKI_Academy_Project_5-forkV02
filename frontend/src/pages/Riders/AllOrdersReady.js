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
} from "@mui/material";
import { useNavigate } from "react-router-dom";



const AllOrdersReady = () => {
  const [id ,setId] = useState(null) ; 
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate() ;
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  const getAllOrders = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/riders/all/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(result.data.result);
      console.log(result.data.result);
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
      console.log(result.data.result)
    } catch (err) {
      console.log(err);
    }
  };
 
  const accept=async()=>{
    setOpen(false)
    try {
    const result = await axios.put(
      `http://localhost:5000/riders/accept/${id}`,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate("/rider/All__order_on_way")
    console.log(result.data) ; 
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
      <Container maxWidth="la">
        <Paper style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5" gutterBottom>
           All Orders Ready
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>delivery_address</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order.id} onClick={()=>getItem(order.id)} hover>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell style={{width:"20%"}}>{order.delivery_address}</TableCell>
                    <TableCell>{order.total_price}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      <React.Fragment>
        <Dialog
          open={open}
          PaperProps={{
            style: {
              width: "50%",
            },
          }}
        >
          <DialogTitle> <strong>Order Items</strong></DialogTitle>
          <DialogContent alignItems="center">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems?.map((order) => (
                    <TableRow key={order.id}  hover>
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
      </React.Fragment>
    </>
  );
};

export default AllOrdersReady;
