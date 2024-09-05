import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import TeamList from "./components/TeamList";
import PlayerList from "./components/PlayerList";

import "./index.css";

function App() {
  return (
    <Router>
      <div className="App bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<TeamList />} />
          <Route path="/list" element={<PlayerList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
