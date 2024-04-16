"use client";
import react, { createElement, useState } from "react";
import { Avatar, AvatarImage } from "./avatar";
import { Button } from "./button";
interface Props{
  Profile_Name:string,
  Comment_string:string,
  image:string,
  time:string,
  reply:string,

}

export function Commentcard({Profile_Name,Comment_string,image,time,reply}:Props) {
  const [Reply, setReply] = useState<boolean | null>(false);
  const [showReplies,setShowReplies]=useState<boolean | null>(false);

  return (
    <div id="CommentCard">
      <div className="flex w-fit m-3">
        <div id="Avatar" className="flex items-start mr-2">
          <Avatar className="">
            <AvatarImage src={image} />
          </Avatar>
        </div>
        <div id="main" className="flex flex-col ">
          <div className="bg-[#FDE8FF] rounded-xl pl-3 pr-7 py-2">
            <div id="Profile_name" className="text-bold ">
              {Profile_Name}
            </div>
            <div id="comment">{Comment_string}</div>
          </div>
          <div
            id="options"
            className="text-sm flex justify-between pt-[3px] pl-[6px]"
          >
            <div id="time">{time}</div>
            <button className="hover:border-b border-black">Like</button>
            <button
              className="hover:border-b border-black"
              onClick={() => setReply(!Reply)}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
      {/* <Comment/> */}
      {Reply ? <Comment /> : ""}
      <div>
        {reply? <button onClick={()=>setShowReplies(!showReplies)}>Show replies</button>:''}
        {showReplies?<ShowReplies/>:""}
      </div>
    </div>
  );
}
function ShowReplies(){
  return( 
    <div>
       <div className="ml-32 mt-5 w-[]">
      <div id="CommentCard" className="flex w-fit m-3">
        <div id="Avatar" className="flex items-start mr-2">
          <Avatar className="">
            <AvatarImage src="my_image.jpg" />
          </Avatar>
        </div>
        <div id="main" className="flex flex-col ">
          <div className="bg-[#FDE8FF] rounded-xl pl-3 pr-7 py-2">
            <div id="Profile_name" className="text-bold ">
              Parambrata Ghosh
            </div>
            <div id="comment">
              this is reply
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

function Comment() {
  return (
    <div className="ml-32 mt-5 w-[]">
      <div id="CommentCard" className="flex w-fit m-3">
        <div id="Avatar" className="flex items-start mr-2">
          <Avatar className="">
            <AvatarImage src="my_image.jpg" />
          </Avatar>
        </div>
        <div id="main" className="flex flex-col ">
          <div className="bg-[#FDE8FF] rounded-xl pl-3 pr-7 py-2">
            <div id="Profile_name" className="text-bold ">
              Parambrata Ghosh
            </div>
            <div id="comment">
              <input type="text" id="My_Comment" className="rounded-xl pl-2 h-8 border border-black" placeholder="Type your Reply"/>
              <Button variant={"outline"} className="bg-[#DF5173] hover:bg-[#DF5173] ml-5">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
