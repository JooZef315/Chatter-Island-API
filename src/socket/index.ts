import express from "express";
import asyncHandler from "express-async-handler";
import { app, io, server } from "./server";

export const rootRouter = express.Router();

rootRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    io.to("room").emit("chat message", "msg");

    res.send("OK!");
  })
);

app.use("/api/v1", rootRouter);

server.listen(3003, () => {
  console.log("server running at http://localhost:3003");
});
