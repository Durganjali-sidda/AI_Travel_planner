import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";


function Header() {
  const user=JSON.parse(localStorage.getItem('user'));
  const[openDailog, setOpenDailog] = useState(false);

  useEffect(()=>{
    console.log(user)
  }, []);

  const login = useGoogleLogin({
  onSuccess: (codeResp) => {
    console.log("Login success:", codeResp);
    GetUserProfile(codeResp); // fetch user info here
  },
  onError: (error) => console.log("Login error:", error)
});

const GetUserProfile = (tokenInfo) => {
   axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
    headers: {
      Authorization: `Bearer ${tokenInfo?.access_token}`,
      Accept: "application/json"
    }
  }).then( (resp) => {
    console.log(resp);
    localStorage.setItem("user", JSON.stringify(resp.data));
    setOpenDailog(false);
    window.location.reload();
  })
};
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg'/>
      <div>
        {user ?
           <div className='flex items-center gap-3'>
              <Button variant='outline' className='rounded-full'>My Trips</Button>

             
              <Popover>
                <PopoverTrigger>
                   <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/>
                </PopoverTrigger>
                <PopoverContent>
                  <h2  className=' cursor-pointer 'onClick={()=>{
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>Logout</h2>
                </PopoverContent>
              </Popover>

           </div>
           :
           <Button  onClick={()=>setOpenDailog(true)}className="bg-black text-white">Sign In</Button>
        }
      </div>
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
  )
}

export default Header
