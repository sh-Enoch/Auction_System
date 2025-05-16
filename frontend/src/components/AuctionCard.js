function AuctionCard({ auction }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 border border-gray-200 max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800">{auction.name}</h2>
        <p className="text-gray-600 mt-2">{auction.description}</p>
        <div className="mt-4 text-green-600 font-bold text-lg">
            <p>{auction.current_price}</p>
        </div>
    </div>
  )
}

export default AuctionCard