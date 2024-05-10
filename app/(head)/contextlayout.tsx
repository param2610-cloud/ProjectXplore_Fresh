'use client';
import React, { ReactNode } from "react";
import { UserContextProvider } from "@/lib/context/Usercontext";
import MainLayoutPage from "./mainLayoutPage";

export default function Contextlayout({children}:{children:ReactNode}){
    
    return(
        <UserContextProvider>
            <MainLayoutPage>
                {children}
            </MainLayoutPage>
        </UserContextProvider>
    )
}