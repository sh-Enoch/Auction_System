import { fetchAuctions } from "@/lib/api";
import AuctionCard from "@/components/AuctionCard"; 
import Link from "next/link";


export default async function Home() {

  const auctions = await fetchAuctions("/api/auctions/");

  return (

    <div className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 p-3 flex items-center justify-between">
            <a href="#" className="text-2xl font-bold text-gray-950 hover:text-blue-600 transition">
               AS 
            </a>
            <nav>
              <ul className="flex space-x-6">
                <Link href="/login" className="hover:text-blue-600 text-black">Login</Link>
                <Link href="/register" className="hover:text-blue-600 text-black">signup</Link>
                
              </ul>
            </nav>
          </div>
        </header>
        <hr className="bg-gray-300"/>
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold text-center text-gray-950">
          welcome to the auction system
        </h1>

        <div className="grid grid-cols-3 gap-2 max-w-7xl mx-auto">
          {auctions.map((auction) => (
            <AuctionCard auction={auction} key={auction.id} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center ">
        &copy; 2025 My Auction System. All rights reserved.
      </footer>
    </div>

  );
}
