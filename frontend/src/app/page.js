import Image from "next/image";
import AuctionCard from "@/components/AuctionCard"; 

export default function Home() {
  return (
    <div className="">
      <h1 className="p-4">Auctions</h1>

      <hr />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <AuctionCard
        title="Vintage Camera"
        description="A rare 1970s film camera in excellent condition."
        price="120.00"
      />

      <div className="mt-6">
        <AuctionCard
          title="Gaming Laptop"
          description="High-performance laptop perfect for gaming and development."
          price="950.00"
        />
      </div>
    </main>




    </div>
  );
}
