import { fetchAuctions } from "@/lib/api";
import AuctionCard from "@/components/AuctionCard"; 


export default async function Home() {

  const auctions = await fetchAuctions();

  return (
<div className="min-h-screen bg-gray-50">
  {/* Header/Navbar */}
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">Auctions</h1>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Login
      </button>
    </div>
  </header>

  {/* Main Content */}
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Page Title */}
    <div className="mb-8">
      <h2 className="text-3xl font-extrabold text-gray-900">Current Auctions</h2>
      <p className="mt-2 text-lg text-gray-600">
        Browse our collection of exclusive items up for bid
      </p>
    </div>

    {/* Auction Grid */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {auctions.map((auction) => (
        <AuctionCard 
          key={auction.id} 
          auction={auction}
          className="transform transition-all hover:scale-[1.02] hover:shadow-lg"
        />
      ))}
    </div>

    {/* Empty State */}
    {auctions.length === 0 && (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No auctions available</h3>
        <p className="mt-1 text-gray-500">
          Check back later for new auction listings
        </p>
      </div>
    )}
  </main>
</div>
  );
}
