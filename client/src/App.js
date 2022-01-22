import socketClient  from "socket.io-client";
import React, {useEffect, useState} from "react";

let socket = socketClient ("http://localhost:3001/");


function App() {
  const [messages, setMessages] = useState(["cat"]);
  const [chatMessage, setChatMessage] = useState("");

  useEffect(()=> {
    socket.on("message", (message)=> {
      let arr = [...messages];
      arr.push(message);
      if(messages !== arr){
        setMessages(arr);
      }
    })
  },[messages])

  function handleSend(e) {
    e.preventDefault();
    socket.emit("chatMessage", chatMessage);
    setChatMessage("");
  }

  return (
    <div className="App">
      {messages.map((message, index) => {
        return (<div key={index}>{message}</div>);
      })}
      <form onClick={handleSend}>
        <input type="text" value={chatMessage} onChange={(e)=>{setChatMessage(e.target.value)}}/>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
