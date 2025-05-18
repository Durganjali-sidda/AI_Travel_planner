import { db } from '@/service/firebaseconfig';
import InfoSection from '@/view-trip/components/InfoSection';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Hotel from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVist';


function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  const GetTripData = useCallback(async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('document:', docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log('No Such Document');
      toast('No trip Found!');
    }
  }, [tripId]);

  useEffect(() => {
    if (tripId) GetTripData();
  }, [tripId, GetTripData]);

  return( 
  <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
    {/* Information section */}
      <InfoSection trip={trip} />
    {/* Recomended hotels */}
      {trip?.tripData && <Hotel trip={trip} />}

    {/* Daily plan */}
      {trip?.tripData?.itinerary && <PlacesToVisit trip={trip} />}

  </div>
  )
}

export default Viewtrip;
