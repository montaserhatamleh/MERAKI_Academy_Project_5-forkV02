import socketInit from "../socketServer";
import { useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useState, useEffect } from "react";

function Socket() {
  const [user_id, setUser_id] = useState("");
  const [token, setToken] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    socket?.on("connect", () => {
      console.log(true);
    });
    socket?.on("connect_error", (error) => {
      console.log(false);
      console.log(error.message);
    });
    return () => {
      socket?.close();
      socket.removeAllListeners();
    };
  }, [socket]);

  return (
    <div>
      socket
      <input
        type="text"
        placeholder="user id"
        onChange={(e) => {
          setUser_id(e.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="token"
        onChange={(e) => {
          setToken(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          setSocket(socketInit({ user_id, token }));
        }}
      >
        connect
      </button>
    </div>
  );
}

export default Socket;
