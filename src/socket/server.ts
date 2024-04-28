import express from "express";
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
const { ExpressPeerServer } = require("peer");
import { Msg, User } from "./socket.types";
import {
  addUserToHisRooms,
  addUserToOnline,
  removeUserFromOnline,
  saveMessageToDb,
} from "./helpers";

export const app = express();
export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

//for video chat
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
app.use("/peerjs", peerServer);

const onlineUsers: User[] = [];

io.on("connection", (socket: Socket) => {
  console.log("a user connected: ", socket.id);

  socket.on("online", async (userId) => {
    addUserToOnline(socket.id, userId, onlineUsers);
    io.emit("onlineUsers", onlineUsers);
    await addUserToHisRooms(socket, userId);
  });

  socket.on("message", async (msg: Msg) => {
    io.to(msg.roomId).emit("message", msg);
    await saveMessageToDb(msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
    removeUserFromOnline(socket.id, onlineUsers);
    io.emit("onlineUsers", onlineUsers);
  });
});
