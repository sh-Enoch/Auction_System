"use client";
import Link from "next/link";
import fetchAuctions from "@/lib/api";
import { useEffect, useState } from "react";
import AuctionCard from "@/components/AuctionCard";


export default function Home() {

  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await fetchAuctions();
        if ('error' in data) {
          setError(data.error);
          setAuctions([]);
        } else {

          setAuctions(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAuctions();
  },[]);

  if (loading) return <div className="text-center text-blue-600 font-bold">Loading...</div>;
  if (error) return <div className="text-center text-red-600 font-bold">Error: {error}</div>;

  

  
  return (
    <div  className=" bg-gray-100 min-h-screen flex flex-col">
     
      <main className="flex-1 p-4">
        <h1 className="text-blue-600 font-bold text-center text-2xl p-4">Welcome to our Auctions today you are so lucky!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 max-w-screen-xl mx-auto">

          {auctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        
        
        </div>
      </main>

    </div>

  );
}
