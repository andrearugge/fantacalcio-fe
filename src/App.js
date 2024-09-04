import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import TeamSetup from "./components/TeamSetup";
import PlayerAuction from './components/PlayerAuction';
import TeamView from "./components/TeamView";
import TeamList from "./components/TeamList";
import PlayerList from "./components/PlayerList";
import CreateParticipant from "./components/CreateParticipant";
import './index.css';
// import { SocketProvider } from "./contexts/SocketContext";

function App() {
  return (
    <Router>
      <div className="App bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<TeamSetup />} />
          <Route path="/auction" element={<PlayerAuction />} />
          <Route path="/team/:id" element={<TeamView />} />
          <Route path="/create-participant" element={<CreateParticipant />} />
          <Route path="/teams" element={<TeamList />} />
          <Route path="/list" element={<PlayerList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
