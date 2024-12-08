const io = require("socket.io")(3000, {
  cors: { origin: "http://localhost:3001", method: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("User Connected!");

  socket.on("createRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("joinRoom", (roomId, userName) => {
    socket.join(roomId);
    const socketId = socket.id;
    io.to(roomId).emit("userJoined", userName, socketId);

    socket.on("disconnect", () => {
      console.log(`${userName}-${socketId} left this room-${roomId}`);
      socket.to(roomId).emit("userLeaveRoom", userName, socket.id);
    });
  });

  socket.on("message", (message, roomID, userName, date) => {
    if (!roomID?.length) {
      return; // dont do id room id is not found
    }
    io.to(roomID).emit("message", message, socket.id, userName,  date);
  });

  socket.on("userLeaveRoom", (roomId, userName) => {
    socket.leave(roomId);
    const socketId = socket.id;
    io.to(roomId).emit("userLeaveRoom", userName, socketId);
  });

  // socket.on("disconnect", (socketId) => {
  //   console.log("User left!");
  //   // const socketId = socket.id
  //   // io.to(roomId).emit("userLeave", userName,socketId);
  // });
});
