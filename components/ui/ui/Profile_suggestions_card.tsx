import React from "react";
import { Card,CardTitle } from "./card";
import { Button } from "./button";
import { Avatar,AvatarImage,AvatarFallback } from "./avatar";


interface Profile_suggestions_cardProps {
    first_name:string,
    last_name:string,
    profile_pic:string,
    className:string;
}

const Profile_suggestions_card = ({first_name,last_name,profile_pic,className}:Profile_suggestions_cardProps) => {
  return (
    <>
      <Card className="w-[18vw] border-none shadow-none">
        <CardTitle className="flex items-center">
          <Avatar className="w-12 h-12">
            <AvatarImage src={profile_pic} />
            <AvatarFallback>{first_name.slice(0,1)+last_name.slice(0,1).toUpperCase}</AvatarFallback>
          </Avatar>
          <div className=" pl-3 flex-grow flex flex-col text-[18px] font-kanit font-medium ">
            <div className="flex items-end">{first_name}</div>
            <div className="flex items-start">{last_name}</div>
          </div>
          <Button variant={"destructive"} className=" rounded-2xl h-8">
            Follow
          </Button>
        </CardTitle>
      </Card>
    </>
  );
};

export default Profile_suggestions_card;
