const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "*",
});

io.on('connection', (socket) => {
  socket.emit("message", "Welcome to the chat!");

  socket.on("chatMessage", (message)=> {
    io.emit("message", message);
  })

  socket.on("disconnect", ()=> {
    io.emit("message", "User has left the chat");
  })

});

server.listen(3001, () => {
  console.log('listening on *:3001');
});