import React, { useState, useEffect } from "react";

function Message({ socket, user_id }) {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [allMessages]);
  const receiveMessage = (data) => {
    setAllMessages([...allMessages, data]);
    console.log(data);
  };
  const sendMessage = () => {
    socket.emit("message", { to, from: user_id, message });
  };

  return (
    <div>
      Message
      <input
        type="text"
        placeholder="message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="to"
        onChange={(e) => {
          setTo(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        send
      </button>
      {allMessages.length > 0 &&
        allMessages.map((message) => {
          return (
            <p>
              {" "}
              <small>
                From: {message.from} {message.message}
              </small>
            </p>
          );
        })}
    </div>
  );
}

export default Message;
