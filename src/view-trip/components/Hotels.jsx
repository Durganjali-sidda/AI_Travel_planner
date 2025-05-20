import React from 'react';
import { Link } from 'react-router-dom';

function Hotel({ trip }) {
  // If trip or tripData is still loading
  if (!trip || !trip.tripData) {
    return (
      <div>
        <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
        <p className="text-gray-500 mt-2">Loading hotel data...</p>
      </div>
    );
  }

  const hotels = trip.tripData.hotels;

  // If hotels are empty or undefined
  if (!hotels || hotels.length === 0) {
    return (
      <div>
        <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
        <p className="text-gray-500 mt-2">No hotel recommendations available.</p>
      </div>
    );
  }

  // If hotels exist
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid gap-3 mt-4 md:grid-cols-4 ">
        {hotels.map((item, index) => (
          <Link 
          key={index}
          to={'https://www.google.com/maps/search/?api=1&query='+item.name+ " ,"+item.address}  target='_blank'>
          <div  className=" hover:scale-105 cursor-pointer transition-all  rounded-xl shadow-md bg-white h-full flex flex-col">
            <img
              src={ '/Hotels.jpg'}
              alt={item.name || `Hotel ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
            <p className="text-sm mt-1">📍 {item.address}</p>
            {/* <p className="text-sm text-gray-600 mt-1">{item.description}</p> */}
            <p className="text-sm mt-1">💰 {item.price}</p>
            <p className="text-sm mt-1">⭐ {item.rating}</p>
          </div>
          </Link>
        ))}


      </div>
    </div>
  );
}

export default Hotel;
