"use client"; // Add this line to mark as a Client Component

import { useEffect, useState } from "react";
import AuctionCard from "@/components/AuctionCard";
import { fetchAuctions } from "@/lib/api"; // Assuming api.js is in lib folder

export default function Home() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        setLoading(true);
        const data = await fetchAuctions();
        setAuctions(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("Failed to load auctions.");
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    loadAuctions();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1 className="p-4 text-center text-2xl font-bold">Auctions</h1>
      <hr />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
        {loading && <p className="text-center col-span-full">Loading auctions...</p>}
        {error && <p className="text-center text-red-500 col-span-full">Error: {error}</p>}
        {!loading && !error && auctions.length === 0 && (
          <p className="text-center col-span-full">No auctions available at the moment.</p>
        )}
        {!loading && !error &&
          auctions.map((auction) => (
            <AuctionCard
              key={auction.id} // Assuming each auction has a unique id
              title={auction.title}
              description={auction.description}
              price={auction.currentPrice} // Assuming price is currentPrice
              // imageUrl={auction.imageUrl} // Assuming you have an imageUrl
            />
          ))}
      </main>
    </div>
  );
}
