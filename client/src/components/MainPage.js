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
    <div className="mainPageContainer">
      <div className="title">ChatApp</div>
      <form onSubmit={handleSubmit} className="mainPageForm">
        <div className="mainPageFormContent">
          <div className="accessInput">
            Username:
            <input type="text" value={formUsername} onChange={(e) => { setFormUsername(e.target.value) }} />
          </div>
          <div className="accessInput">
            Room Name:
            <input type="text" value={formRoomName} onChange={(e) => { setFormRoomName(e.target.value) }} />
          </div>
          <button type="submit">Enter</button>
        </div>
      </form>
    </div>
  );
}
