import React, { useEffect } from 'react'
import { Button } from '../ui/button'

function Header() {
  const user=JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    console.log(user)
  }, [])
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg'/>
      <div>
        <Button className="bg-black text-white">Sign In</Button>
      </div>
    </div>
  )
}

export default Header
