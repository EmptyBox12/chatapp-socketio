import React, { useEffect, useState } from "react";

export default function ChatRoom({
  username,
  roomName,
  socket,
  setUsername,
  setRoomName,
}) {
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");

  useEffect(() => {
    socket.emit("join-room", { username, roomName });
    return socket.off("join-room");
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevState) => {
        return [...prevState, message];
      });
    });
  }, []);

  function handleSend(e) {
    e.preventDefault();
    socket.emit("chatMessage", { chatMessage });
    setChatMessage("");
  }

  return (
    <div>
      <button
        onClick={() => {
          socket.emit("leave-room");
          setUsername("");
          setRoomName("");
        }}
      >
        Back
      </button>
      {messages.map((message, index) => {
        return message.id && socket.id === message.id ? (
          <div key={index}>You: {message.text}</div>
        ) : (
          <div key={index}>
            {message.username}: {message.text}
          </div>
        );
      })}
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={chatMessage}
          onChange={(e) => {
            setChatMessage(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
