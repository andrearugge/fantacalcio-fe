import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlayerList() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/players`);
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
      setMessage('Error fetching players');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/players/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data.message);
      fetchPlayers(); // Aggiorna la lista dei giocatori dopo il caricamento
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestione Calciatori</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Carica File CSV</h2>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept=".csv" 
            className="mr-2 p-2 border rounded"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Carica
          </button>
        </form>
        {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Lista Calciatori</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nome</th>
              <th className="border p-2">Ruolo</th>
              <th className="border p-2">Squadra</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player._id}>
                <td className="border p-2">{player.name}</td>
                <td className="border p-2">{player.role}</td>
                <td className="border p-2">{player.team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlayerList;