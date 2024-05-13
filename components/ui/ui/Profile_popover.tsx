"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { LogOut } from "@/lib/firebase/logout";
import { useUserId } from "@/lib/context/Usercontext";
import { useEffect, useState } from "react";
import STATES from "@/lib/utils/constants";
import { UserProfile } from "firebase/auth";

export function ProfilePopover() {
  let { uid } = useUserId();
  const [state, setload] = useState(STATES.LOADING);
  const [Data, setData] = useState<UserProfile | null>();
  let firstString = "";
  useEffect(() => {
    setload(STATES.LOADING);
    try {
      if (uid) {
        fetch(`/api/profile?id=${uid}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setData(data);
            setload(STATES.LOADED);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, [uid]);
  const name = Data?.Full_Name;
  let avatar_URL: string | null = null;
  let Fallback = "";
  if (state === STATES.LOADED && typeof name === "string") {
    const parts = name.split(" ");
    firstString = parts[0].charAt(0);
    const lastString =
      parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    Fallback = firstString + lastString;
  }
  if (state === STATES.LOADED) {
    avatar_URL = typeof Data?.avatar_URL === "string" ? Data?.avatar_URL : null;
  }
  const Setdata = (name: any) => (name ? name : "UNKNOWN");
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className=" border-2 border-[#F9DEE4] border-solid h-10 w-10">
          {avatar_URL !== null ? <AvatarImage src={avatar_URL} /> : undefined}
          <AvatarFallback>{Fallback}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="bg-background">
        <div className="w-full h-full flex flex-col justify-center items-start">
          <div className="w-full flex justify-center">
            {Setdata(Data?.email)}
          </div>
          <div className="w-full flex justify-center my-5">
            <Avatar className=" border-2 border-[#F9DEE4] border-solid h-24 w-24">
            {avatar_URL !== null ? <AvatarImage src={avatar_URL} /> : undefined}
              <AvatarFallback>{firstString}</AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full flex justify-center text-2xl mb-10">
            {"Hi, " +
              Setdata(typeof name === "string" ? name.split(" ")[0] : "User")}
          </div>
              
          <div className=" w-full flex justify-center space-x-5">
            <div>
              <Button>Profile Settings</Button>
            </div>
            <Button  onClick={LogOut}>
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
