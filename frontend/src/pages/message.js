import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// raider_id
function Message({ socket, raider_id }) {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const { userId } = useSelector((state) => {
    return {
      userId: state.auth.userId,
    };
  });

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
    //to : raider_id
    socket.emit("message", { to: raider_id, from: userId, message });
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
