import React from 'react';
import { Link } from 'react-router-dom';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  if (!itinerary || itinerary.length === 0) {
    return (
      <div>
        <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
        <p className="text-gray-500 mt-2">No itinerary available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
      
      {itinerary.map((dayPlan, dayIndex) => (
        <div key={dayIndex} className="mt-6 ">
          <h3 className="text-lg font-semibold text-indigo-600">Day {dayPlan.day} - {dayPlan.bestTimeToVisit}</h3>
          
          <div className="grid md:grid-cols-3 gap-4 mt-4 ">
            {dayPlan.places.map((place, index) => (
                <Link to={'https://www.google.com/maps/search/?api=1&query='+place.name}  target='_blank'>
                    <div key={index} className="p-4 border rounded-xl shadow-md bg-white hover:scale-105 cursor-pointer transition-all hover:shadow-md">
                        <p className="text-sm mt-1">⏰ {place.time}</p>
                        <img
                        src={'/placestovisit.jpg'}
                        alt={place.name}
                        className="w-full h-48 object-cover rounded-lg"
                        />
                        <h4 className="text-md font-bold mt-3">{place.name}</h4>
                        <p className="text-sm text-gray-700 mt-1">{place.details}</p>
                        <p className="text-sm mt-1">🕒 {place.travelTime}</p>
                        <p className="text-sm mt-1">🎟️ {place.ticketPrice}</p>
                    </div>
              </Link>
            ))}
          </div>
        </div>
        
      ))}
    </div>
  );
}

export default PlacesToVisit;
