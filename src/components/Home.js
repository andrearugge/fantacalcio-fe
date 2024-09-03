import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Benvenuto all'Asta del Fantacalcio</h1>
      <Link to="/setup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Inizia Setup Squadre
      </Link>
    </div>
  );
}

export default Home;