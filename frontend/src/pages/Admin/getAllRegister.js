import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const GetAllRegister = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/rider/registration`
      );
      setUsers(response.data.riders);
      
    } catch (error) {
      console.error("Error fetching users:", error);
 
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const acceptPendingRiders = async (id) => {
    try {
      const accepted = await axios.post(
        `http://localhost:5000/users/riderRegistration/${id}`
      );
      console.log(accepted);
      setMessage(accepted.data.message)
    } catch (err) {
      console.log(err);
  
    }
  };

  const rejectPendingRiders = async (id) => {
    try {
      const reject = await axios.delete(
        `http://localhost:5000/users/riderRegistration/${id}`
      );
      console.log(reject);
      setMessage(reject.data.message)
    } catch (err) {
      console.log(err);
    
    }
  };

  return (
    <Container
      maxWidth="lr"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        margin: "10px",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <List sx={{ width: "100%" }}>
        <ListItem
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid black",
          }}
        >
          <ListItemText primary="Name" sx={{ flex: 1, fontWeight: "bold" }} />
          <ListItemText primary="Email" sx={{ flex: 1, fontWeight: "bold" }} />
          <ListItemText primary="phone" sx={{ flex: 1 }} />
          <Box sx={{ flex: 1 }} />
        </ListItem>
        {users.map((user) => (
          <ListItem
            key={user.id}
            sx={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              padding: "11px",
            }}
          >
            <ListItemText primary={user.first_name} sx={{ flex: 1 }} />
            <ListItemText primary={user.email} sx={{ flex: 1 }} />
            <ListItemText primary={user.phone_number} sx={{ flex: 1 }} />
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  acceptPendingRiders(user.id);
                }}
                variant="contained"
                color="primary"
                sx={{ marginRight: "10px" }}
              >
                Accept
              </Button>
              <Button
                onClick={() => rejectPendingRiders(user.id)}
                variant="outlined"
                color="error"
              >
                Reject
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default GetAllRegister;
