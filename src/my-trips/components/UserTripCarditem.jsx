import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCarditem({trip}) {
  return (
    <Link to={'/view-trip/'+trip?.id}>
      <div className='hover:scale-105 transition-all '>
        <img src='/avenue.jpg' className='object-cover rounded-xl h-[220px]'/>
        <div>
          <h2 className='font-bold text-lg'>
              {trip?.userSelection?.location?.label}
          </h2>
          <h2>{trip?.userSelection.days} days with {trip?.userSelection?.budget} Budget</h2>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCarditem
