import React, { useEffect, useState } from "react";


export default function ChatRoom({username, roomName, socket, setUsername, setRoomName}) {
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");

  useEffect(()=> {
    socket.emit("join-room", {username, roomName});
  }, [])

  useEffect(() => {
    socket.on("message", (message) => {
      let arr = [...messages];
      arr.push(message);
      if (messages != arr) {
        setMessages(arr);
      }
    });
  }, [messages]);

  function handleSend(e) {
    e.preventDefault();
    socket.emit("chatMessage", {chatMessage});
    setChatMessage("");
  }

  return (
    <div>
      <button onClick={()=> {
        socket.emit("leave-room");
        setUsername();
        setRoomName();
      }}>Back</button>
      {messages.map((message, index) => {
        return <div key={index}>{message.username}: {message.text}</div>;
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
