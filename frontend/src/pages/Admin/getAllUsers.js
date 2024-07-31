import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from '@mui/system';
const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const { token, role } = useSelector((state) => ({
    token: state.auth.token,
    role: state.auth.role,
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const getAllUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/users/find/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(result.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const showDataUser = async (id) => {
    try {
      const result = await axios.get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpen(true)
      setData(result.data.user);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    if (role == "Admin") getAllUsers();
  }, []);

  const deletedUser = async (id) => {
    try {
      const result = await axios.put(
        `http://localhost:5000/users/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.filter((ele) => ele.id !== id));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const StyledDialogContent = styled(DialogContent)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });
  
  const InfoText = styled('h3')({
    margin: '8px 0',
  });
  

  return (
    <>
      <Container
        maxWidth="lr"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          All Users
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
            <ListItemText
              primary="Email"
              sx={{ flex: 1, fontWeight: "bold" }}
            />
            <ListItemText
              primary="Phone"
              sx={{ flex: 1, fontWeight: "bold" }}
            />
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
              <Box
                sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  onClick={() => {
                    deletedUser(user.id);
                  }}
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: "10px" }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    showDataUser(user.id);
                  }}
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: "10px" }}
                >
                  show
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    
      <React.Fragment>
      <Dialog  open={open} 
         PaperProps={{
           style: {
             width: '30%', 
           },
         }}
         
      >
        <DialogTitle > User Information </DialogTitle>
        <DialogContent alignItems="center">
          <InfoText><strong>Name :</strong> {data.first_name}</InfoText>
          <InfoText><strong>Last Name :</strong> {data.last_name}</InfoText>
          <InfoText><strong>Email :</strong> {data.email}</InfoText>
          <InfoText><strong>Phone :</strong> {data.phone_number}</InfoText>
          <InfoText><strong>Created Data :</strong> {data.created_at}</InfoText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
    </>
  );
};

export default GetAllUsers;
