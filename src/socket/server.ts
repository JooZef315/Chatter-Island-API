import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

export const app = express();
export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// io.use((socket, next) => {
//   const username = "joo";
//   if (!username) {
//     return next(new Error("invalid username"));
//   }
//   (socket as any).username = username;
//   next();
// });

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);

  socket.join("room");
  io.emit("chat message", {
    user: socket.id,
    message: `hi I'm in!`,
  });

  socket.on("chat message", (msg: any) => {
    io.to("room").emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
    socket.broadcast.emit("chat message", {
      user: socket.id,
      message: `leaved`,
    });
  });
});
