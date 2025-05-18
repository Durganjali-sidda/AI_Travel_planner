import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelerslList } from "@/constants/option";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { generateTravelPlan } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseconfig";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { useNavigate, } from "react-router-dom";




function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  // const [itinerary, setItinerary] = useState("");
  const[openDailog, setOpenDailog] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

const login = useGoogleLogin({
  onSuccess: (codeResp) => {
    console.log("Login success:", codeResp);
    GetUserProfile(codeResp); // fetch user info here
  },
  onError: (error) => console.log("Login error:", error)
});

  const generateTrip = async () => {
  setLoading(true);

  const user = localStorage.getItem('user');
  if (!user) {
    setOpenDailog(true);
    setLoading(false);
    return;
  }

  const { location, days, budget, traveler } = formData;

  if (!location || !days || !budget || !traveler) {
    toast("Please fill all details");
    setLoading(false);
    return;
  }

  if (parseInt(days) > 5) {
    toast("Trip duration should not be more than 5 days");
    setLoading(false);
    return;
  }

  const Final_prompt = AI_PROMPT
    .replace('{location}', location?.label)
    .replaceAll('{days}', days)
    .replace('{traveler}', traveler)
    .replace('{budget}', budget);

  console.log("Prompt Sent to Gemini:", Final_prompt);

  // setItinerary("");

  try {
    const response = await generateTravelPlan(Final_prompt);

    if (response && typeof response === "object") {
      // setItinerary(JSON.stringify(response, null, 2));
      toast("Itinerary generated successfully!");
      await SaveAiTrip(response);
    } else {
      toast("Gemini did not return valid JSON. Try again.");
    }

  } catch (error) {
    console.error("generateTrip error:", error);
    toast("Failed to generate trip. Please try again.");
  }

  setLoading(false);
};


const SaveAiTrip = async (tripData) => {
  setLoading(true);
  const docId = Date.now().toString();

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData,
      userEmail: user?.email || "unknown",
      id: docId,
    });

    console.log("✅ Saved AI Trip:", docId);
  } catch (error) {
    console.error("❌ Failed to save AI Trip:", error);
    toast("Failed to save trip. Try again.");
  }

  setLoading(false);
  navigate('/view-trip/'+ docId)

};

  const GetUserProfile = (tokenInfo) => {
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
    headers: {
      Authorization: `Bearer ${tokenInfo?.access_token}`,
      Accept: "application/json"
    }
  }).then(async (resp) => {
    console.log(resp);
    localStorage.setItem("user", JSON.stringify(resp.data));
    setOpenDailog(false);

    // ✅ Firebase Auth Sign In
    const auth = getAuth();
    const credential = GoogleAuthProvider.credential(null, tokenInfo.access_token);
    
    try {
      const result = await signInWithCredential(auth, credential);
      console.log("✅ Signed into Firebase Auth:", result.user);
      generateTrip(); // Now safe to call
    } catch (authError) {
      console.error("❌ Firebase Auth Sign-In Failed:", authError);
      toast("Firebase Auth sign-in failed. Try again.");
    }
  });
};

 
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🧳..⛺..🏖️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination?
          </h2>
          <GooglePlacesAutocomplete
            selectProps={{
              value: formData.location || null,
              onChange: (value) => handleInputChange("location", value),
              placeholder: "Search for a location...",
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input 
           placeholder={"Ex:2"}
           type="number"
           onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>

      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-4  border cursor-pointer
                 rounded-lg hover:shadow-lg 
                 ${formData?.budget === item.title ? 'shadow-lg border-2 border-black bg-gray-100' : ''}`}
              onClick={() => handleInputChange("budget", item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelerslList.map((item, index) => (
            <div
              key={index}
              className={`p-4  border cursor-pointer
                rounded-lg hover:shadow-lg 
                ${formData?.traveler === item.people? 'shadow-lg border-2 border-black bg-gray-100' : ''}`}
              onClick={() => handleInputChange("traveler", item.people)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
              <h2 className="text-sm text-gray-500">{item.people}</h2>
            </div>
          ))}
        </div>
      </div>
      
      <div className="my-10 justify-end flex">
        <Button onClick={generateTrip} className="bg-black text-white">
          {loading ? "Generating..." : "Generate Trip"}
        </Button>
      </div>

      {loading && (
        <div className="text-gray-500">Generating your itinerary...</div>
      )}
{/* 
      {!loading && itinerary && (
        <div className="mt-10 bg-gray-100 p-5 rounded-xl whitespace-pre-wrap">
          <h3 className="text-xl font-bold mb-3">Your Trip Plan:</h3>
          <p>{itinerary}</p>
        </div>
      )} */}

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
       
        <DialogContent>
          <DialogHeader>
            <img src="/logo.svg" alt="Logo"          
             className="w-16 h-16 mx-auto" />
            <DialogTitle className="font-bold text-lg mt-7">Sign In with Google</DialogTitle>
            <DialogDescription>
              Sign in to the App with Google authentication securely.
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={login}
            className="w-full mt-5 bg-black text-white flex gap-4 items-center"
          > 
            <FcGoogle className="h-7 w-7" />
            Sign In With Google
          </Button>
        </DialogContent>
      </Dialog>

      
    </div>
  );
}

export default CreateTrip;
