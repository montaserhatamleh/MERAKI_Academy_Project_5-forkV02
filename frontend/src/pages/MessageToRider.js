import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const MessageRider = ({ socket, user_id }) => {

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [name, setName] = useState([]);
  const { userId } = useSelector((state) => ({
    userId: state.auth.userId,
  }));
  console.log(userId);
  // console.log(userId);
  const getRiderById = () => {
    
    axios
      .get(`http://localhost:5000/riders/${userId}`)
      .then((result) => {
        setName(result.data.result.first_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRiderById();
  }, []);

  useEffect(() => {
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
      to: user_id,
      from: name,
      message,
    });
    setMessage("");
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
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
                    msg.from === localStorage.getItem("rider_id")
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                <ListItemText
                  primary={`${msg.from}`}
                  secondary={msg.message}
                  style={{
                    textAlign:
                      msg.from === name
                        ? "right"
                        : "left",
                    marginLeft:
                      msg.from !== name
                        ? "10px"
                        : "0",
                    marginRight:
                      msg.from === name
                        ? "10px"
                        : "0",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <Paper
        style={{ padding: "20px", marginBottom: "20px", marginTop: "20px" }}
      >
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
      </Paper>
    </Box>
  );
};

export default MessageRider;
