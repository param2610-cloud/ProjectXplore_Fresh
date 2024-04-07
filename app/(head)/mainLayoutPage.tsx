"use client";
import react, { ReactNode, useEffect } from "react";
import useUser from '@/hooks/useUser';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import STATES from "@/lib/utils/constants";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function MainLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {


// const pathname =usePathname()
// const {User,userUid,STATE} = useUser()
let User=11;
let STATE = STATES.LOADED
const router = useRouter()


  return (
    <>
    {STATE === STATES.LOADING ? (
      <>LOADING</>
    ) : (
      <>
        {User == null && STATE === STATES.LOADED ? (
          router.push("/auth/signin")
        ) : (
          <>
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Navbar/>
            <Sidebar/>
            {children}
          </div>
          </>
        )}
      </>
    )}
  </>
  );
}
