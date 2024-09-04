import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import BidInterface from "./BidInterface";

const socket = io(process.env.REACT_APP_BACKEND_URL);

function AuctionRoom() {
  const { auctionId } = useParams();
  const [player, setPlayer] = useState(null);
  const [auctionStatus, setAuctionStatus] = useState("waiting");
  const [timeLeft, setTimeLeft] = useState(20);
  const [currentBid, setCurrentBid] = useState(0);
  const [currentBidder, setCurrentBidder] = useState(null);

  useEffect(() => {
    socket.emit("joinAuction", auctionId);

    socket.on("auctionInfo", handleAuctionInfo);
    socket.on("timerUpdate", handleTimerUpdate);
    socket.on("bidUpdated", handleBidUpdated);
    socket.on("auctionEnded", handleAuctionEnded);

    return () => {
      socket.off("auctionInfo");
      socket.off("timerUpdate");
      socket.off("bidUpdated");
      socket.off("auctionEnded");
      socket.emit("leaveAuction", auctionId);
    };
  }, [auctionId]);

  const handleAuctionInfo = (data) => {
    setPlayer(data.player);
    setAuctionStatus("in progress");
    setTimeLeft(data.timeLeft);
    setCurrentBid(data.currentBid);
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

  const placeBid = (amount) => {
    socket.emit("placeBid", { auctionId, amount, userId: "current-user-id" });
  };

  if (!player) {
    return <div>Loading auction information...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Auction Room</h1>
      <h2 className="text-xl font-semibold mb-2">
        Player: {player.name} - {player.role} - {player.team}
      </h2>

      {auctionStatus === "in progress" && (
        <BidInterface
          currentBid={currentBid}
          onPlaceBid={placeBid}
          timeLeft={timeLeft}
          currentBidder={currentBidder}
        />
      )}

      {auctionStatus === "ended" && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Auction Ended</h3>
          <p>Check the alert for results</p>
        </div>
      )}
    </div>
  );
}

export default AuctionRoom;
