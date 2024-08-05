const authSocket = (socket, next) => {
  const headers = socket.handshake.headers;
  console.log(" error from Socket auth"); console.log(headers);
  if (!headers.token) {
    console.log(headers.token);
    next(new Error("invalid"));
  } else {
    socket.join("room-" + headers.user_id);
    socket.user = { token: headers.token, user_id: headers };
    next();
  }
};
const socketDebug = (socket, next) => {
  if (socket[0] !== "message") {
    next(new Error("socket middleware Error"));
  } else {
    next();
  }
};

module.exports = { authSocket, socketDebug };
