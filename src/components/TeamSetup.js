import React, { useState } from 'react';
import axios from 'axios';

function TeamSetup() {
  const [teams, setTeams] = useState(Array(8).fill(''));
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');

  const handleChange = (index, value) => {
    const newTeams = [...teams];
    newTeams[index] = value;
    setTeams(newTeams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');

    if (teams.some(team => team.trim() === '')) {
      setErrors(['Inserisci tutti i nomi delle squadre']);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/teams/setup`, { teams });
      if (response.data.errors && response.data.errors.length > 0) {
        setErrors(response.data.errors);
        if (response.data.createdTeams.length > 0) {
          setSuccess(`${response.data.createdTeams.length} squadre create con successo.`);
        }
      } else {
        setSuccess('Tutte le squadre sono state create con successo!');
      }
    } catch (error) {
      setErrors([error.response?.data?.message || 'Errore durante la creazione delle squadre. Riprova.']);
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
      {errors.length > 0 && (
        <div className="mt-4">
          <h3 className="text-red-500 font-bold">Errori:</h3>
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index} className="text-red-500">{error}</li>
            ))}
          </ul>
        </div>
      )}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}

export default TeamSetup;