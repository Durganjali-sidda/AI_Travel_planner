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



function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");
  const[openDailog, setOpenDailog] = useState(false);

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
    const user = localStorage.getItem('user');
    if(!user){
      setOpenDailog(true)
      return ;
    }

    const { location, days, budget, traveler } = formData;

    if (!location || !days || !budget || !traveler) {
      toast("Please fill all details");
      return;
    }
    const Final_prompt = AI_PROMPT
    .replace('{location}',formData?.location?.label)
    .replace('{days}',formData?.days)
    .replace('{traveler}',formData?.traveler)
    .replace('{budget',formData?.budget)
    .replace('{days}',formData?.days)
    console.log(Final_prompt)
    

    setLoading(true);
    setItinerary("");

    const response = await generateTravelPlan(Final_prompt);

    if (response) {
      setItinerary(response);
    } else {
      toast("Failed to generate itinerary from Gemini");
    }

    setLoading(false);
  };
 
  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp)
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDailog(false);
      generateTrip()
    })
  }
 
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

      {!loading && itinerary && (
        <div className="mt-10 bg-gray-100 p-5 rounded-xl whitespace-pre-wrap">
          <h3 className="text-xl font-bold mb-3">Your Trip Plan:</h3>
          <p>{itinerary}</p>
        </div>
      )}

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
       
        <DialogContent>
          <DialogHeader>
            <img src="/logo.svg" alt="Logo"          
             className="w-16 h-16 mx-auto" />
            <DialogTitle className="font-bold text-lg mt-7">Sign In with Google</DialogTitle>
            <DialogDescription>
              Sign in to the App with Google authentication securely
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
