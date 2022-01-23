import React, { useState } from "react";

export default function MainPage({ setUsername, setRoomName }) {
  const [formUsername, setFormUsername] = useState("");
  const [formRoomName, setFormRoomName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setUsername(formUsername);
    setRoomName(formRoomName);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Username:
        <input type="text" value={formUsername} onChange={(e)=> {setFormUsername(e.target.value)}}/>
        Room
        <input type="text" value={formRoomName}  onChange={(e)=> {setFormRoomName(e.target.value)}}/>
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
