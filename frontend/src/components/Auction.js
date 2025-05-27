
function Auction({ auction }) {

   
  return (
    <div className="bg-white rounded-2xl shadow p-4 border border-gray-200 max-w-md w-full hover:shadow-md transition-shadow">
      {/* Auction Image with Status Badge */}
      <div className="relative">
        <img 
          src={auction.image_url} 
          alt={auction.name} 
          className="w-full h-48 object-cover rounded-lg"
        />
        <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-white ${
          auction.is_active ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {auction.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Auction Details */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 hover:underline">
          { auction.name}
        </h2>
        
        <p className="text-gray-600 mt-2 line-clamp-2">{ auction.description}</p>
        
        {/* Price and Seller Info */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-green-600 font-bold text-lg">
            ${ auction.current_price}
          </div>
          
          <div className="text-sm text-gray-500">
            <span>By </span>
            <a 
              href={`/users/${auction.created_by.id}`} 
              className="text-blue-500 hover:underline"
            >
              { auction.created_by.username}
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex space-x-2">
          <a
            href={`/auctions/${auction.slug}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center transition-colors"
          >
            View Details
          </a>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors">
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
    
  )
}

export default Auction