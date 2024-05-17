"use client";
import Profile_main from "@/components/profile/profile";
import { useUserId } from "@/lib/context/Usercontext";
import { UserDataContextProvider } from "@/lib/context/my_profile/User_details";
import React from "react";
import Project_details from "@/components/profile/project";


const page = () => {
  let { uid } = useUserId();

  return (
    <div className="flex h-full mr-2">
      <div
        id="profile_details"
        className="fixed h-[calc(100vh-4rem)]  w-[300px] bottom-0 top-[56px]"
      >
        {uid? 
        <UserDataContextProvider uid={uid}>
          <Profile_main />
        </UserDataContextProvider>: null
        }
      </div>
      <div id="Project_details" className=" ml-[310px] flex-grow shadow-lg h-full">
        <Project_details />
      </div>
    </div>
  );
};

export default page;
