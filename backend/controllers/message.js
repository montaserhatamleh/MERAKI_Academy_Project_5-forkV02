const messageHandler = (socket, io) => {
  socket.on("message", (data) => {
    console.log("message", data);
    data.success = true;
    socket.emit("message", data);
  });
};
module.exports = messageHandler;
