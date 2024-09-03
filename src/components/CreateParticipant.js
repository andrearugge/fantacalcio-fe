import React, { useState } from 'react';
import axios from 'axios';

function CreateParticipant() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/participants`, { name });
      setLink(response.data.participantLink);
    } catch (error) {
      console.error('Error creating participant:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Participant</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Participant Name"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create</button>
      </form>
      {link && (
        <div>
          <p>Participant Link:</p>
          <a href={link} className="text-blue-500 underline">{link}</a>
        </div>
      )}
    </div>
  );
}

export default CreateParticipant;