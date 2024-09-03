import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const getTeams = () => api.get('/api/teams');
export const createTeam = (teamData) => api.post('/api/teams', teamData);
// Add more API calls as needed