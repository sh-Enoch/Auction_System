import Image from "next/image";
import AuctionCard from "../components/AuctionCard";
import { fetchAuctions } from "@/lib/api";

export default async function HomePage() {
  const auctions = await fetchAuctions();

  return (
    <main>
      <h1 className="text-2xl text-center p-5">Live Auctions</h1>
      <div className="flex flex-wrap justify-center gap-4 p-5">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction}/>
        ))}
      </div>
    </main>
  )
}