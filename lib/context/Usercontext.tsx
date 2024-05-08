'use client';
import React, {createContext,useContext,useState} from "react";

export interface usercontextType{
    uid: string | null ,
    setUid: (id:string | null)=>void;
}

const UserContext = createContext<usercontextType | undefined>();

export const UserContextProvider = ({children}:{children:any}) =>{
    const [uid, setuid]= useState(null)
    const setUid = (id:any)=>{
        setuid(id)
    }
    return(
        <UserContext.Provider value={{uid,setUid}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserId = () =>{
    const context  = useContext(UserContext);
    if(!context){
        throw new Error("useUserId must be withhin usercontext provider");
    }
    return context;
}