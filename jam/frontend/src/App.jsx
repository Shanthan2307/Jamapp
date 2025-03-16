import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RoomJoinPage from "./components/RoomJoinPage";
import CreateRoomPage from "./components/CreateRoomPage";
import Room from "./components/Room";

const App = () => {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
