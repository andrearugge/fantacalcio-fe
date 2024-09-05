import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import TeamSetup from "./components/TeamSetup";
import TeamView from "./components/TeamView";
import TeamList from "./components/TeamList";
import PlayerList from "./components/PlayerList";
import CreateParticipant from "./components/CreateParticipant";

import "./index.css";

function App() {
  return (
    <Router>
      <div className="App bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<TeamList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
