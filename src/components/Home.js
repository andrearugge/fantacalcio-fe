import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Asta Fantacalcio</h1>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/list"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Lista Calciatori
        </Link>

        <Link
          to="/teams"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Squadre
        </Link>

        <Link
          to="/auction-admin"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Gestione Asta (Admin)
        </Link>

        <Link
          to="/auction-login"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Partecipa all'Asta
        </Link>
      </div>
    </div>
  );
}

export default Home;
