import React, { useState } from 'react';
import axios from 'axios';

function TeamSetup() {
  const [teams, setTeams] = useState(Array(8).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (index, value) => {
    const newTeams = [...teams];
    newTeams[index] = value;
    setTeams(newTeams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Verifica che tutti i nomi siano inseriti
    if (teams.some(team => team.trim() === '')) {
      setError('Inserisci tutti i nomi delle squadre');
      return;
    }

    try {
      // Invia i dati al backend
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/teams/setup`, { teams });
      setSuccess('Squadre create con successo!');
      // Puoi aggiungere qui la logica per reindirizzare l'utente o aggiornare lo stato dell'app
    } catch (error) {
      setError('Errore durante la creazione delle squadre. Riprova.');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Configura le Squadre</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {teams.map((team, index) => (
          <div key={index} className="flex items-center">
            <label className="mr-2 w-24">Squadra {index + 1}:</label>
            <input
              type="text"
              value={team}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border p-2 flex-grow"
              placeholder={`Nome Squadra ${index + 1}`}
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Crea Squadre
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}

export default TeamSetup;