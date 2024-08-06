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

function MessageUser({ socket, raider_id }) {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const { userId } = useSelector((state) => ({
    userId: state.auth.userId,
  }));

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
      to: raider_id,
      from: userId,
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
                    msg.from === userId ? "flex-end" : "flex-start",
                  paddingLeft: msg.from === userId ? "0" : "10px",
                  paddingRight: msg.from === userId ? "0" : "10px",
                }}
              >
                <ListItemText
                  primary={`from: ${msg.from}`}
                  secondary={msg.message}
                  style={{
                    textAlign: msg.from === userId ? "right" : "left",
                    marginLeft: msg.from === userId ? "0" : "10px",
                    marginRight: msg.from === userId ? "10px" : "0",
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
}

export default MessageUser;
