import React, { useEffect, useState, useRef } from "react";

export default function ChatRoom({
  username,
  roomName,
  socket,
  setUsername,
  setRoomName,
}) {
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const ownRef = useRef();
  const messageRef = useRef();

  useEffect(() => {
    socket.emit("join-room", { username, roomName });
    return socket.off("join-room");
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevState) => {
        if (message.id && message.id === prevState[prevState.length - 1].id) {
          message.username = "";
        }
        setLoading(false);
        return [...prevState, message];
      });
      if (messageRef.current) {
        if (socket.id == message.id) {
          ownRef.current.scrollIntoView();
        } else {
          messageRef.current.scrollIntoView();
        }
      }
    });
  }, []);

  function handleSend(e) {
    e.preventDefault();
    socket.emit("chatMessage", { chatMessage });
    setChatMessage("");
  }

  return (
    <div  className={loading ? "loadingContainer" : "chatContainer"}>
      {!loading &&
        <>
          <div className="title chatRoom">
            <div>ChatApp</div>
            <button
              onClick={() => {
                socket.emit("leave-room");
                setUsername();
                setRoomName();
              }}
            >
              Back
            </button>
          </div>
          <div className="chatMain">
            <div className="chatMessages">
              {messages && messages.map((message, index) => {
                return message.id && socket.id === message.id ? (
                  <div ref={ownRef} className="ownMessage" key={index}>
                    {message.text}
                  </div>
                ) : (
                  <div ref={messageRef} className="message" key={index}>
                    <div className="messageUsername">{message.username}</div>
                    <div className="messageContent">{message.text}</div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSend}>
              <input
                required={true}
                type="text"
                value={chatMessage}
                onChange={(e) => {
                  setChatMessage(e.target.value);
                }}
              />
              <button type="submit"></button>
            </form>
          </div>
        </>}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}
