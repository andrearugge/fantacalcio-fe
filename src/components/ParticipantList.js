import React, { useState, useEffect } from "react";
import axios from "axios";

function ParticipantList() {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/participants`
      );
      setParticipants(response.data);
      setIsLoading(false);
    } catch (err) {
      setError("Error fetching participants");
      setIsLoading(false);
      console.error("Error fetching participants:", err);
    }
  };

  if (isLoading) return <div>Loading participants...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Participant List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant._id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {participant.name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {participant._id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {participants.length === 0 && (
        <p className="text-center mt-4">No participants found.</p>
      )}
    </div>
  );
}

export default ParticipantList;
