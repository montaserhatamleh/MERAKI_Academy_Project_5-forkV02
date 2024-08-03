// import socketInit from "../pages/socketServer";
// import { useSelector } from "react-redux";
// import React from "react";
// import { useState, useEffect } from "react";
// import Message from "../pages/message";

// function Socket() {
//   const { userId, rider_id } = useSelector((state) => {
//     return {
//       userId: state.auth.userId,
//       rider_id: state.auth.rider_id,
//     };
//   });
//   console.log(userId);
//   console.log(rider_id);

  
//   const [socket, setSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     socket?.on("connect", () => {
//       setIsConnected(true);
//       console.log(true);
//     });
//     socket?.on("connect_error", (error) => {
//       console.log(false);
//       setIsConnected(false);
//       console.log(error.message);
//     });
//     return () => {
//       socket?.close();
//       socket?.removeAllListeners();
//     };
//   }, [socket]);

//   return (
//     <div>
//       <button
//         onClick={() => {
//           setSocket(socketInit({ user_id: userId, rider_id: rider_id }));
//         }}
//       >
//         connect
//       </button>
//       // raider_id
//       {isConnected && <Message socket={socket} raider_id={rider_id} />}
//     </div>
//   );
// }

// export default Socket;
