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
      <header className="bg-blue-50 text-2xl">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href='/' className="text-2xl font-black text-gray-950">AS</Link>
          <nav>
          <ul className="flex space-x-3  p-2">
              <li>
                <Link href="" className="text-gray-950 font-bold hover:text-blue-600">Login</Link>
              </li>
              <li>
                <Link href="" className="text-gray-950 font-bold hover:text-blue-600">Register</Link>
              </li>
          </ul>
          </nav>
        </div>
      </header>
      <hr className="bg-gray-300"/>
      <main className="flex-1 p-4">
        <h1 className="text-blue-600 font-bold text-center text-2xl">Welcome to our Auctions today you are so lucky!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">

          {auctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        
        
        </div>
      </main>
      <footer className="bg-gray-800 shadow-sm rounded-lg ">
        <div className="w-full mx-auto max-w-screen-2xl p-4 md:flex md:justify-between ">
          <span  className="text-sm text-gray-500 ">
            &copy; 2025 Auction System. All rights reserved.
          </span>
          <ul className="flex flex-wrap items-center  text-sm font-medium text-gray-500">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
          </ul>
        </div>
        
         </footer>
    </div>

  );
}
