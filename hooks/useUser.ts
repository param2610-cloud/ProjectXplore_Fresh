'use client';
import React, { useState, useEffect } from "react";
import STATES from "@/lib/utils/constants";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "@/firebase"
import { usePathname } from "next/navigation";

export default function useUser() {
  const pathname = usePathname()
  let [User, setUser] = useState<User | null>(null);
  let [STATE, setLoad] = useState(STATES.LOADING);
  let [userUid, setUserUid] = useState<string | undefined | null>(null);
  let getSession = () => {
    setLoad(STATES.LOADING);
    const auth = getAuth(app)
    setUser(auth.currentUser);
    onAuthStateChanged(auth, (u: User | null) => {
      if (u) {
        setUser(u);
        setUserUid(u?.uid);
      } else {
        setUser(null);
        setUserUid(null);
      }
      setLoad(STATES.LOADED); 
    });
  }

  useEffect(() => {
    getSession();
    if(!User){
      localStorage.setItem("recentRoute",pathname)
    }
  }, []); 

  return { User, STATE, userUid };
}
