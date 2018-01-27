const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = process.env.port || 3000;

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("bot-to-fe", data => {
    console.log("bot-to-fe:", data);
    io.sockets.emit("bot-to-fe", data);
  });

  socket.on("fe-to-bot", data => {
    console.log("fe-to-bot:", data);
    io.sockets.emit("fe-to-bot", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io;

http.listen(3000, () => {
  console.log("listening on *:3000");
});
