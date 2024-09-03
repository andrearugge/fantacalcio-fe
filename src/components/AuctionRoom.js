import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useSocket } from '../contexts/SocketContext';

function AuctionRoom() {
  const { uniqueLink } = useParams();
  const navigate = useNavigate();
  const [participant, setParticipant] = useState(null);
  // const socket = useSocket();

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/participants/${uniqueLink}`);
        setParticipant(response.data);
      } catch (error) {
        console.error('Error fetching participant:', error);
        // Esempio di navigazione in caso di errore
        // navigate('/error');
      }
    };

    fetchParticipant();
  }, [uniqueLink, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Auction Room</h2>
      {participant ? (
        <p>Welcome, {participant.name}!</p>
      ) : (
        <p>Loading participant information...</p>
      )}
      {/* Aggiungi qui l'interfaccia per l'asta */}
    </div>
  );
}

export default AuctionRoom;