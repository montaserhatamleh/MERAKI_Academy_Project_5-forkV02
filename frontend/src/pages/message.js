import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
      <h2>Message</h2>
      <input
        type="text"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      {allMessages.length > 0 &&
        allMessages.map((msg, index) => (
          <p key={index}>
            <small>
              From: {msg.from} {msg.message}
            </small>
          </p>
        ))}
    </div>
  );
}

export default Message;
