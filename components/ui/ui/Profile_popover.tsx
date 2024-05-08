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
  let firstString = ""
  useEffect(() => {
    setload(STATES.LOADING);
    try {
      console.log(uid);
      fetch(`/api/profile?id=${uid}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("this data from popover", data);
          setData(data);
          setload(STATES.LOADED);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const name = Data?.Full_Name;
  let Fallback = "";
  if (state === STATES.LOADED && typeof name === "string") {
    const parts = name.split(" ");
    firstString = parts[0].charAt(0);
    const lastString =
      parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    Fallback = firstString + lastString;
}
    if (state === STATES.LOADED){
        
    }
  // console.log(name)
  // console.log(Fallback)
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className=" border-2 border-[#F9DEE4] border-solid h-10 w-10">
          <AvatarImage src={Data?.avatar_URL} />
          <AvatarFallback>{Fallback}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="bg-[#F9DEE4]">
        <div>
          <Avatar className=" border-2 border-[#F9DEE4] border-solid h-10 w-10">
            <AvatarImage src="my_image.jpg" />
            <AvatarFallback>{firstString}</AvatarFallback>
          </Avatar>
        </div>
        <div>{Data?.Full_Name}</div>
        <Button className="bg-[#DF5173]" onClick={LogOut}>
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
}
