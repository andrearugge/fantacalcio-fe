import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Asta</h1>
      <div className="flex space-x-3">
        <Link
          to="/list"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Lista Calciatori
        </Link>

        <Link
          to="/auction"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Gestisci Asta
        </Link>
        <Link
          to="/teams"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Squadre
        </Link>
      </div>
    </div>
  );
}

export default Home;
