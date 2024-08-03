import io from "socket.io-client";

const socketInit = (user_id, token) => {
  return io("http://localhost:8080/", {
    extraHeaders: {
      user_id,
      token,
    },
    // autoConnect: false,// .connect() .open()
  });
};
export default socketInit;
