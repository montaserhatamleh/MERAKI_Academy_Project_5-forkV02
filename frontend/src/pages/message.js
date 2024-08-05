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
} from "@mui/material";

function Message({ socket, raider_id }) {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const { userId } = useSelector((state) => {
    return {
      userId: state.auth.userId,
    };
  });

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
    socket.emit("message", { to: raider_id, from: userId, message });
    setMessage(""); // Clear the message input after sending
  };

  return (
    <div>
    <Typography variant="h4" gutterBottom>
      Messages
    </Typography>
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <TextField
        fullWidth
        label="Message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
        onClick={sendMessage}
      >
        Send
      </Button>
    </Paper>
    {allMessages.length > 0 && (
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Message History
        </Typography>
        <Divider style={{ marginBottom: '10px' }} />
        <List>
          {allMessages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`From: ${msg.from}`}
                secondary={msg.message}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    )}
  </div>
  );
}

export default Message;
