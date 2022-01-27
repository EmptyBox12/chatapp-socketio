const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "*",
});

const userList = [];

io.on("connection", (socket) => {
  socket.on("join-room", ({ username, roomName }) => {
    let user = { username, roomName, id: socket.id };
    userList.push(user);
    socket.emit("message", {
      username: "ChatBot",
      text: "Welcome to the chat!",
    });
    socket.broadcast.emit("message", {
      username: "ChatBot",
      text: `${username} joined the chat!`,
    });
  });

  socket.on("chatMessage", ({ chatMessage }) => {
    let user = userList.find((user) => user.id == socket.id);
    io.emit("message", {
      text: chatMessage,
      username: user.username,
      roomName: user.roomName,
    });
  });

  socket.on("disconnect", () => {
    let user = userList.find((user) => user.id == socket.id);
    let index = userList.indexOf(user);
    userList.splice(index, 1);
    if(user.username){
      io.emit("message", {
        text: `${user.username} has left the chat`,
        username: "ChatBot",
        roomName: user.roomName,
      });
    }
    
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
