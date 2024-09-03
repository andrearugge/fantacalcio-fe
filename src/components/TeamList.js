import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editBudget, setEditBudget] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/teams`);
      setTeams(response.data);
    } catch (error) {
      setError('Errore nel caricamento delle squadre');
      console.error('Error fetching teams:', error);
    }
  };

  const startEditing = (team) => {
    setEditingId(team._id);
    setEditName(team.name);
    setEditBudget(team.budget.toString());
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditBudget('');
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/teams/${id}`, {
        name: editName,
        budget: Number(editBudget)
      });
      setSuccess('Squadra aggiornata con successo');
      setEditingId(null);
      fetchTeams();
    } catch (error) {
      setError('Errore nell\'aggiornamento della squadra');
      console.error('Error updating team:', error);
    }
  };

  const deleteTeam = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questa squadra?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/teams/${id}`);
        setSuccess('Squadra eliminata con successo');
        fetchTeams();
      } catch (error) {
        setError('Errore nell\'eliminazione della squadra');
        console.error('Error deleting team:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lista delle Squadre</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <ul className="space-y-4">
        {teams.map(team => (
          <li key={team._id} className="border p-4 rounded">
            {editingId === team._id ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-2"
                />
                <input
                  type="number"
                  value={editBudget}
                  onChange={(e) => setEditBudget(e.target.value)}
                  className="border p-2"
                />
                <button onClick={() => saveEdit(team._id)} className="bg-green-500 text-white p-2 rounded">Salva</button>
                <button onClick={cancelEditing} className="bg-gray-500 text-white p-2 rounded">Annulla</button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span>{team.name} - Budget: {team.budget}</span>
                <div>
                  <button onClick={() => startEditing(team)} className="bg-blue-500 text-white p-2 rounded mr-2">Modifica</button>
                  <button onClick={() => deleteTeam(team._id)} className="bg-red-500 text-white p-2 rounded">Elimina</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamList;