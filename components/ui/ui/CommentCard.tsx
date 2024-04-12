"use client";
import react, { createElement, useState } from "react";
import { Avatar, AvatarImage } from "./avatar";

export function Commentcard() {
  const [Reply, setReply] = useState<boolean | null>(false);
  return (
    <div id="CommentCard">
      <div className="flex w-fit m-3">
        <div id="Avatar" className="flex items-start mr-2">
          <Avatar className="">
            <AvatarImage src="Elon_Musk.jpg" />
          </Avatar>
        </div>
        <div id="main" className="flex flex-col ">
          <div className="bg-[#FDE8FF] rounded-xl pl-3 pr-7 py-2">
            <div id="Profile_name" className="text-bold ">
              Elon Musk
            </div>
            <div id="comment">This is so impressive.....</div>
          </div>
          <div
            id="options"
            className="text-sm flex justify-between pt-[3px] pl-[6px]"
          >
            <div id="time">2w</div>
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
      <Comment/>
      {/* {Reply ? <Comment /> : ""} */}
    </div>
  );
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
              <input type="text" id="My_Comment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
