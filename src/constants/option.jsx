export const SelectTravelerslList = [
    {
      id: 1,
      title: "Just Me",
      desc: "Perfect solo adventures for the independent traveler.",
      icon: "🧍",
      people: "solo"
    },
    {
      id: 2,
      title: "A Couple",
      desc: "Romantic getaways designed for two.",
      icon: "👫",
      people: '2 people'
    },
    {
      id: 3,
      title: "Family",
      desc: "Fun-filled trips for the entire family.",
      icon: "👨‍👩‍👧‍👦",
      people: '3 to 5 people'
    },
    {
      id: 4,
      title: "With Friends",
      desc: "Group adventures and chill vibes with your best buds.",
      icon: "🕺🎉",
      people: 'A Gang of freinds'
    },
  ];
  
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: "Cheap",
      desc: "Budget-friendly options without compromising essentials.",
      icon: "💸"
    },
    {
      id: 2,
      title: "Moderate",
      desc: "Balanced choices for comfort and value.",
      icon: "💰"
    },
    {
      id: 3,
      title: "Luxurious",
      desc: "Top-tier experiences with premium amenities.",
      icon: "💎"
    },
  ];
  

  export const AI_PROMPT = `
  Generate a travel plan for the following:
  - Location: {location}
  - Duration: {days} days
  - Traveler type: {traveler}
  - Budget: {budget}

  Return only valid JSON in this structure:

  {
    "hotels": [
      {
        "name": "Hotel Name",
        "address": "Full address",
        "price": "Price per night",
        "imageUrl": "https://...",
        "geo": { "lat": 0.0, "lng": 0.0 },
        "rating": 4.5,
        "description": "Short description"
      }
      // multiple hotels like above
    ],
    "itinerary": [
      {
        "day": 1,
        "bestTimeToVisit": "Morning",
        "places": [
          {
            "name": "Place name",
            "details": "About the place",
            "imageUrl": "https://...",
            "geo": { "lat": 0.0, "lng": 0.0 },
            "ticketPrice": "100 INR",
            "travelTime": "30 mins",
            "time": "10:00 AM",
          }
          // multiple places like above
        ]
      }
      // more days if applicable
    ]
  }

  Only return valid JSON. No explanations, no comments, no Markdown.
  `;

