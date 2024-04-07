'use client';
import React, { useState, useEffect } from "react";
import STATES from "@/lib/utils/constants";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "@/firebase"

export default function useUser() {
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
  }, []); 

  return { User, STATE, userUid };
}
