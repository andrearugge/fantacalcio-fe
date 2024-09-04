import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import BidInterface from "./BidInterface";

const socket = io(process.env.REACT_APP_BACKEND_URL);

function AuctionParticipant() {
  const { linkId } = useParams();
  const [auctionId, setAuctionId] = useState(null);
  const [player, setPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentBidder, setCurrentBidder] = useState(null);

  useEffect(() => {
    socket.emit("joinAsParticipant", linkId);

    socket.on("auctionStarted", handleAuctionStarted);
    socket.on("timerUpdate", handleTimerUpdate);
    socket.on("bidUpdated", handleBidUpdated);
    socket.on("auctionEnded", handleAuctionEnded);

    return () => {
      socket.off("auctionStarted");
      socket.off("timerUpdate");
      socket.off("bidUpdated");
      socket.off("auctionEnded");
    };
  }, [linkId]);

  const handleAuctionStarted = (data) => {
    setAuctionId(data.auctionId);
    setPlayer(data.player);
    setCurrentBid(data.currentBid);
    setTimeLeft(data.timeLeft);
  };

  const handleTimerUpdate = (time) => {
    setTimeLeft(time);
  };

  const handleBidUpdated = (data) => {
    setCurrentBid(data.amount);
    setCurrentBidder(data.bidder);
  };

  const handleAuctionEnded = (result) => {
    alert(`Auction ended! Winner: ${result.winner}, Amount: ${result.amount}`);
    setAuctionId(null);
    setPlayer(null);
  };

  const placeBid = (amount) => {
    socket.emit("placeBid", { auctionId, amount, userId: linkId });
  };

  if (!player) {
    return <div>Waiting for auction to start...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Auction Room</h1>
      <h2 className="text-xl mb-4">Player: {player.name}</h2>
      <BidInterface
        currentBid={currentBid}
        onPlaceBid={placeBid}
        timeLeft={timeLeft}
        currentBidder={currentBidder}
      />
    </div>
  );
}

export default AuctionParticipant;
