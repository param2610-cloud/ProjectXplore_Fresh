import React, { ReactNode, createContext, useContext, useState, useEffect } from "react";
import STATES from "@/lib/utils/constants";
import { UserProfile } from "@/lib/interface/UserProfile";

const User_details = createContext<UserProfile | undefined>(undefined);

export const UserDataContextProvider = ({ children, uid }: { children: ReactNode; uid: any; }) => {
  const [user_data, setuser_data] = useState<UserProfile | undefined>(undefined);
  const [loading, setloading] = useState(STATES.LOADED);

  useEffect(() => {
    setloading(STATES.LOADING);
    fetch(`/api/profile?id=${uid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setuser_data(data);
        setloading(STATES.LOADED);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [uid]);

  return (
    <User_details.Provider value={user_data}>{children}</User_details.Provider>
  );
};

export const USERDATA = () => {
  const Context = useContext(User_details);

  if (!Context) {
    console.log("Error occurred in userdata context");
  }

  return Context;
};
