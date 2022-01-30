import React, {useEffect, useState} from "react";
import ChatRoom from "./components/ChatRoom";
import MainPage from "./components/MainPage";
import socketClient from "socket.io-client";
import "./App.css";

let socket = socketClient("https://chatapp-socket-io-server.herokuapp.com/");

function App() {
  const [username, setUsername] = useState();
  const [roomName, setRoomName] = useState();

  return (
    <div className="App">
       {(!username && !roomName ) ? <MainPage setUsername ={setUsername} setRoomName = {setRoomName} /> : 
        <ChatRoom username= {username} roomName = {roomName} socket= {socket} setUsername ={setUsername} setRoomName = {setRoomName} />
       }
   
    </div>
  );
}

export default App;
