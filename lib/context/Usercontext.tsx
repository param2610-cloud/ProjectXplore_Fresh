import React, { createContext, useContext, useState } from "react";

export interface UserContextType {
  uid: string | null;
  setUid: (id: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: any }) => {
  const [uid, setUidState] = useState<string | null>(null);

  const setUid = (id: string | null) => {
    setUidState(id);
  };

  return (
    <UserContext.Provider value={{ uid, setUid }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserId must be within UserContextProvider");
  }
  return context;
};
