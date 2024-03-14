import express from "express";
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
import cors from "cors";

app.use(cors());

const socketIO = require("socket.io")(http, {
  origin: "http://localhost:3000",
});

socketIO.on("connection", (socket) => {
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
    console.log(data);
  });
  console.log(`${socket.id} user connected`);
  socket.on("disconnect", () => {
    console.log("User disconected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
