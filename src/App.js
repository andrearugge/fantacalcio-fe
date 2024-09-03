import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TeamSetup from './components/TeamSetup';
import AuctionRoom from './components/AuctionRoom';
import TeamView from './components/TeamView';
import CreateParticipant from './components/CreateParticipant';
import { SocketProvider } from './contexts/SocketContext';

function App() {
  return (
    <SocketProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<TeamSetup />} />
            <Route path="/auction" element={<AuctionRoom />} />
            <Route path="/team/:id" element={<TeamView />} />
            <Route path="/create-participant" element={<CreateParticipant />} />
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
}

// ... all'interno del componente Routes
export default App;