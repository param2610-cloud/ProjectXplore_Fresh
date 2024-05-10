"use client";
import react, { ReactNode, useEffect } from "react";
import useUser from '@/hooks/useUser';
import { useRouter } from "next/navigation";
import STATES from "@/lib/utils/constants";
import Sidebar from "@/components/sidebar";
import { UserContextProvider } from "@/lib/context/Usercontext";
import { useUserId } from "@/lib/context/Usercontext";

export default function MainLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter()
  const {User,STATE} = useUser()
  const {uid,setUid} = useUserId()
  try {
    useEffect(() => {
      if (User && User.uid && STATE === STATES.LOADED) {
        try {
          setUid(User.uid)
        } catch (error) {
          console.log(error)
        }
      }
    }, [STATE]);
   
  } catch (error) {
    console.log(error)
  }
  

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
          <div className="grid sm:grid-cols-[221px_1fr] grid-cols-[0px_1fr]  grid-rows-[56px_1fr]  min-h-screen w-screen" id="main_layout_page">
            
            <Sidebar/>
            <div id="main_content" className="row-start-2 col-start-2 ">
              
                {children}  
              
            </div>
          </div>
          </>
        )}
      </>
    )}
  </>
  );
}
