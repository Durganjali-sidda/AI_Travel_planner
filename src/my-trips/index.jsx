import { db } from "@/service/firebaseconfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCarditem from "./components/UserTripCarditem";

function Mytrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const fetched = useRef(false); // ✅ used to prevent double fetch

  useEffect(() => {
    if (!fetched.current) {
      GetUserTrips();
      fetched.current = true; // ✅ mark as fetched
    }
  }, []);

  const GetUserTrips = async () => {
    const userStr = localStorage.getItem("user");

    if (!userStr) {
      navigate("/");
      return;
    }

    setUserTrips([]);

    const user = JSON.parse(userStr);
    const userEmail = user?.email;

    if (!userEmail) {
      console.warn("User email missing in localStorage.");
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", userEmail)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No trips found for this user.");
      }

      const trips = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        trips.push(doc.data());
      });

      setUserTrips(trips); // ✅ set once after collecting all
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrips?.length>0?userTrips.map((trip, index) => (
          <UserTripCarditem key={index} trip={trip} />
        ))
        :[1,2,3,4,5,6].map((item,index)=>(
         <div key={index} className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl">
          </div>

        )
        )
      }
      </div>
    </div>
  );
}

export default Mytrips;
