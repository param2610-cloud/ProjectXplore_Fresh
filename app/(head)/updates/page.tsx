'use client';
import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import {app}  from "@/firebase";



const page = () => {
  const auth = getAuth(app)
  return (
    <div>
      <button className='text-xl' onClick={()=>{const user = auth.currentUser;
        console.log(user)
      }}>user</button>
    </div>
  )
}

export default page
