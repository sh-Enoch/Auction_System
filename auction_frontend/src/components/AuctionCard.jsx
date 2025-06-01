// components/AuctionCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { ClockIcon, CurrencyDollarIcon, UserIcon } from '@heroicons/react/24/outline';

export default function AuctionCard({ auction }) {
  // Calculate time remaining

  const getImageUrl = () => {
    if (!auction.image_path) return 'https://via.placeholder.com/300x200?text=No+Image';
    return `http://localhost:8000${auction.image_path}`;
  };

  const image_url = getImageUrl();

const timeRemaining = () => {
    const now = new Date();
    const end = new Date(auction.end_time);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h left`;
  };
 

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Auction Image */}
      <div className="relative h-48 w-full">
        <img
          src={image_url}
          alt={auction.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {auction.featured && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            Featured
          </div>
        )}
      </div>

      {/* Auction Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {auction.name}
          </h3>
          {auction.category && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {auction.category}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {auction.slug}
        </p>

        {/* Price and Bid Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 text-green-600 mr-1" />
            <span className="font-bold text-gray-900">
              ${auction.current_price.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">
              {auction.bid_count || 0} bids
            </span>
          </div>
        </div>

        {/* Time Remaining */}
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-500 mr-1" />
            <span className={`text-sm ${
              timeRemaining() === 'Ended' ? 'text-red-500' : 'text-gray-600'
            }`}>
              {timeRemaining()}
            </span>
          </div>
          <Link 
            href={`/auctions/${auction.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}