import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import {
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  IconButton,
  Container,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageUser = ({ socket, raider_id }) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [user, setUser] = useState([]);

  const { userId, token } = useSelector((state) => ({
    token: state.auth.token,
    userId: state.auth.userId,
  }));

  const findUserById = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result.data.user.first_name);
      setUser(result.data.user.first_name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findUserById()
    const receiveMessage = (data) => {
      setAllMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit("message", {
      to: raider_id,
      from: user,
      message,
    });
    setMessage("");
  };

  return (
    <>
    <Box  sx={{
      width: '100%',
      height: "400px",
      border: '1px solid #ccc',
      borderRadius: 2,
      overflow: 'scroll',
      backgroundColor: '#fff',
      marginTop: 2
    }} >
      <Typography variant="h4" gutterBottom >
        Messages
      </Typography>
      {allMessages.length > 0 && (
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Message History
          </Typography>
          <Divider style={{ marginBottom: "10px" }} />
          <List>
            {allMessages.map((msg, index) => (
              <ListItem
                key={index}
                alignItems="flex-start"
                style={{
                  justifyContent:
                    msg.from === userId ? "flex-end" : "flex-start",
                  paddingLeft: msg.from === userId ? "0" : "10px",
                  paddingRight: msg.from === userId ? "0" : "10px",
                }}
              >
                <ListItemText
                  primary={` ${msg.from}`}
                  secondary={msg.message } 
                  style={{
                    textAlign: msg.from === user ? "right" : "left",
                    marginLeft: msg.from === user ? "0" : "10px",
                    marginRight: msg.from === user ? "10px" : "0",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
     
      
    </Box>
      <Box display="flex" alignItems="center">
     
      <TextField
        fullWidth
        label="Message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
 
      <IconButton
        color="primary"
        onClick={sendMessage}
        style={{ marginLeft: "10px" }}
      >
        <SendIcon />
      </IconButton>
    </Box>

    </>
  );
};

export default MessageUser;
