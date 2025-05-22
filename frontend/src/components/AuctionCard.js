function AuctionCard({ title, description, price}) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 border border-gray-200 max-w-md w-full">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="mt-4 text-green-600 font-bold text-lg">
        Starting Price: ${price}
      </div>
    </div>
  );
}

export default AuctionCard