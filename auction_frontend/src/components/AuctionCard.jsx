// components/AuctionCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { ClockIcon, CurrencyDollarIcon, UserIcon } from '@heroicons/react/24/outline';

export default function AuctionCard({ auction }) {
  // Calculate time remaining
  const timeRemaining = () => {
    const now = new Date();
    const end = new Date(auction.end_time);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  // Get image URL with error handling
  const getImageUrl = () => {
    try {
      if (!auction.image_url) return '';
      
      // Remove leading slash if present to prevent double slashes
      const imagePath = auction.image_url.startsWith('/') 
        ? auction.image_url.substring(1) 
        : auction.image_url;
      
      return `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/${imagePath}`;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return '';
    }
  };

  const imageUrl = getImageUrl();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      {/* Auction Image - Using Next.js Image component */}
      <div className="relative h-48 w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={auction.name || 'Auction item'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="/placeholder-auction.jpg"
            onError={(e) => {
              e.target.src = '/placeholder-auction.jpg';
            }}
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        
        {/* Featured badge */}
        {auction.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            Featured
          </div>
        )}
        
        {/* Time remaining overlay */}
        <div className={`absolute bottom-2 left-2 ${
          timeRemaining() === 'Ended' ? 'bg-red-600' : 'bg-black/70'
        } text-white px-2 py-1 rounded-md text-xs font-medium`}>
          {timeRemaining()}
        </div>
      </div>

      {/* Auction Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {auction.name}
          </h3>
          {auction.category && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full whitespace-nowrap ml-2">
              {auction.category}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
          {auction.description || auction.slug || 'No description available'}
        </p>

        {/* Price and Bid Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 text-green-600 mr-1.5" />
            <span className="font-bold text-gray-900">
              ${auction.current_price?.toLocaleString() || '0'}
            </span>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 text-gray-500 mr-1.5" />
            <span className="text-sm text-gray-600">
              {auction.bid_count || 0} {auction.bid_count === 1 ? 'bid' : 'bids'}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <Link 
          href={`/auctions/${auction.id}`}
          className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium text-sm"
        >
          Place Bid
        </Link>
      </div>
    </div>
  );
}