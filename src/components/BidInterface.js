import React, { useState, useEffect } from "react";

function BidInterface({ currentBid, onPlaceBid, timeLeft, currentBidder }) {
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Reset bid amount when current bid changes
    setBidAmount("");
    setError("");
  }, [currentBid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const numericBid = Number(bidAmount);
    if (isNaN(numericBid) || numericBid <= currentBid) {
      setError("Please enter a valid amount higher than the current bid.");
      return;
    }

    onPlaceBid(numericBid);
    setBidAmount("");
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold mb-4">Current Auction Status</h3>
      <div className="mb-4">
        <p className="text-gray-700 text-sm font-bold mb-2">
          Current Bid: ${currentBid.toFixed(2)}
        </p>
        <p className="text-gray-700 text-sm font-bold mb-2">
          Current Bidder: {currentBidder || "None"}
        </p>
        <p className="text-gray-700 text-sm font-bold mb-2">
          Time Left: {timeLeft} seconds
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="bidAmount"
          >
            Your Bid
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bidAmount"
            type="number"
            step="0.01"
            min={currentBid + 0.01}
            placeholder={`Enter bid amount (min $${(currentBid + 0.01).toFixed(
              2
            )})`}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-2">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Place Bid
          </button>
        </div>
      </form>
    </div>
  );
}

export default BidInterface;
