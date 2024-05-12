"use client";
import Profile_main from "@/components/profile/profile";
import { Button } from "@/components/ui/ui/button";
import { useUserId } from "@/lib/context/Usercontext";
import STATES from "@/lib/utils/constants";
import { CircleArrowUp } from "lucide-react";
import { UserDataContextProvider } from "@/lib/context/my_profile/User_details";

import React, { useContext, useEffect, useState } from "react";

const page = () => {
  let { uid } = useUserId();
  let [Ideano, setIdeano] = useState<number | null>(5);
  let [collecno, setcollecno] = useState<number | null>(5);
  return (
    <div className="flex h-full mr-2">
      <div
        id="profile_details"
        className=" h-[calc(100vh-4rem)]  w-[300px] bottom-0 top-[56px]"
      >
        <UserDataContextProvider uid={uid}>
          <Profile_main />
        </UserDataContextProvider>
      </div>
      <div id="Project_details" className=" flex-grow shadow-lg h-full">
        <div className="flex flex-col h-full">
          <div className="flex m-10 space-x-16">
            <div className="text-primary border-primary border-b-2">
              {"Ideas" + "(" + Ideano + ")"}
            </div>
            <div>{"Collections" + "(" + collecno + ")"}</div>
          </div>
          <div className=" flex-grow flex p-4">
            <div className=" bg-[#c0c4fa] w-[40%] h-[250px] border-blue-400 border-4 border-dashed mx-3 flex flex-col justify-center items-center">
              <div>
                <CircleArrowUp size={90} />
              </div>
              <p className="text-md">Upload Your Idea</p>
            </div>
            <div className="w-[60%] h-[250px]">
              <div>
                <img
                  src="5.png"
                  alt=""
                  className="bg-cover h-[230px] w-full rounded-md"
                />
                <p className="text-xl font-bold pl-2 pt-1">React Website</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
