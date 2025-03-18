import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RoomJoinPage from "./components/RoomJoinPage";
import CreateRoomPage from "./components/CreateRoomPage";
import Room from "./components/Room";

const App = () => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    const fetchUserRoom = async () => {
      const response = await fetch("/api/user-in-room");
      const data = await response.json();
      setRoomCode(data.code);
    };

    fetchUserRoom();
  }, []);

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  return (
    <Router>
      <Routes>
        {/* Use 'element' instead of wrapping components inside Route */}
        <Route
          path="/"
          element={roomCode ? <Room roomCode={roomCode} leaveRoomCallback={clearRoomCode} /> : <HomePage />}
        />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room leaveRoomCallback={clearRoomCode} />} />
      </Routes>
    </Router>
  );
};

export default App;

