import React, {useEffect, useState} from "react";
import ChatRoom from "./components/ChatRoom";
import MainPage from "./components/MainPage";
import socketClient from "socket.io-client";

let socket = socketClient("http://localhost:3001/");

function App() {
  const [username, setUsername] = useState();
  const [roomName, setRoomName] = useState();

  return (
    <div className="App">
       {(!username && !roomName ) ? <MainPage setUsername ={setUsername} setRoomName = {setRoomName} /> : 
        <ChatRoom username= {username} roomName = {roomName} socket= {socket} />
       }
   
    </div>
  );
}

export default App;
