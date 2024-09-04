import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import BidInterface from "./BidInterface";

const socket = io(process.env.REACT_APP_BACKEND_URL);

function PlayerAuction() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [auctionStatus, setAuctionStatus] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentBid, setCurrentBid] = useState(0);
  const [currentBidder, setCurrentBidder] = useState(null);
  const [participantLinks, setParticipantLinks] = useState([]);
  const [auctionId, setAuctionId] = useState(null);

  useEffect(() => {
    fetchPlayers();
    socket.on("auctionStarted", handleAuctionStarted);
    socket.on("timerUpdate", handleTimerUpdate);
    socket.on("bidUpdated", handleBidUpdated);
    socket.on("auctionEnded", handleAuctionEnded);
    socket.on("bidError", handleBidError);
    socket.on("participantLinkCreated", handleParticipantLinkCreated);
    socket.on("participantLinks", handleParticipantLinks);

    // Richiedi i link dei partecipanti all'avvio
    socket.emit("getParticipantLinks");

    return () => {
      socket.off("auctionStarted");
      socket.off("timerUpdate");
      socket.off("bidUpdated");
      socket.off("auctionEnded");
      socket.off("bidError");
      socket.off("participantLinkCreated");
      socket.off("participantLinks");
    };
  }, []);

  useEffect(() => {
    const filtered = players.filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayers(filtered);
  }, [searchTerm, players]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/players`
      );
      setPlayers(response.data);
      setFilteredPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handlePlayerSelect = (playerId) => {
    const player = players.find((p) => p._id === playerId);
    setSelectedPlayer(player);
  };

  const startAuction = () => {
    if (selectedPlayer) {
      socket.emit("startAuction", selectedPlayer._id);
    }
  };

  const handleAuctionStarted = (data) => {
    setAuctionStatus("in progress");
    setTimeLeft(data.timeLeft);
    setCurrentBid(data.currentBid);
    setSelectedPlayer(data.player);
    setAuctionId(data.auctionId);

    // Notifica tutti i partecipanti
    participantLinks.forEach((link) => {
      socket.emit("notifyParticipant", {
        linkId: link.linkId,
        auctionId: data.auctionId,
      });
    });
  };

  const handleTimerUpdate = (time) => {
    setTimeLeft(time);
  };

  const handleBidUpdated = (data) => {
    setCurrentBid(data.amount);
    setCurrentBidder(data.bidder);
  };

  const handleAuctionEnded = (result) => {
    setAuctionStatus("ended");
    setTimeLeft(0);
    alert(`Auction ended! Winner: ${result.winner}, Amount: ${result.amount}`);
  };

  const handleBidError = (errorMessage) => {
    alert(errorMessage);
  };

  const handleParticipantLinkCreated = ({ participantId, link }) => {
    setParticipantLinks((prev) => [...prev, { participantId, url: link }]);
  };

  const handleParticipantLinks = (links) => {
    setParticipantLinks(links);
  };

  const createParticipantLink = () => {
    const participantId = prompt("Enter participant ID:");
    if (participantId) {
      socket.emit("createParticipantLink", participantId);
    }
  };

  const placeBid = (amount) => {
    socket.emit("placeBid", {
      auctionId,
      amount: Number(amount),
      userId: "current-user-id",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Player Auction</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Select a Player</h2>
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            placeholder="Search for a player..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => handlePlayerSelect(e.target.value)}
            value={selectedPlayer ? selectedPlayer._id : ""}
          >
            <option value="">Select a player</option>
            {filteredPlayers.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name} - {player.role} - {player.team}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedPlayer && auctionStatus !== "in progress" && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Selected Player: {selectedPlayer.name}
          </h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={startAuction}
          >
            Start Auction
          </button>
        </div>
      )}

      {auctionStatus === "in progress" && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Auction in Progress</h3>
          <p className="mb-2">Player: {selectedPlayer.name}</p>
          <BidInterface
            currentBid={currentBid}
            onPlaceBid={placeBid}
            timeLeft={timeLeft}
            currentBidder={currentBidder}
          />
        </div>
      )}

      {auctionStatus === "ended" && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Auction Ended</h3>
          <p>Check the alert for results</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Participant Links</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
          onClick={createParticipantLink}
        >
          Create Participant Link
        </button>
        <ul>
          {participantLinks.map((link, index) => (
            <li key={index} className="mb-2">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Participant {link.participantId}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlayerAuction;
