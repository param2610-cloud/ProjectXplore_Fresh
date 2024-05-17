"use client";
import React, { ReactNode } from "react";
import { UserContextProvider } from "@/lib/context/Usercontext";
import MainLayoutPage from "./mainLayoutPage";
import { Toaster } from "@/components/ui/ui/toaster";

export default function Contextlayout({ children }: { children: ReactNode }) {
  return (
    <UserContextProvider>
      <MainLayoutPage>
        <main>{children} </main>
        <Toaster />
      </MainLayoutPage>
    </UserContextProvider>
  );
}
