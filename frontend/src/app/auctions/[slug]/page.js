import { fetchAuctions  } from "@/lib/api";

export default async function AuctionPage({ params }) {
    const auction =  await fetchAuctions(`/api/auctions/${params.slug}/`);
    const imageUrl = process.env.AUCTION_SYSTEM_BACKEND_URL + auction.image_url;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl text-blue-600  text-center font-bold mb-4">{auction.name}</h1>
                <img 
                    src={imageUrl} 
                    alt={auction.name} 
                    className="w-full h-full object-contain rounded-lg mb-4"
                />
                <p className="text-gray-700 mb-4">{auction.description}</p>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-green-600">${auction.current_price}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${auction.is_active ? 'bg-green-500' : 'bg-red-500'}`}>
                        {auction.is_active ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <div className="text-sm text-gray-500">
                    Created by: 
                    <a href={`/users/${auction.created_by.id}`} className="text-blue-500 hover:underline ml-1">
                        {auction.created_by.username}
                    </a>
                </div>
            </div>
        </div>
    )

}