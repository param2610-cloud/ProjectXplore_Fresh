'use client;'
import React from "react";
import { Commentcard } from "./CommentCard";

const Commentbar = () => {
  return (
    <div className=" py-5">
      <div className="comment">
      <Commentcard Profile_Name="Elon Musk" image="Elon_Musk.jpg" Comment_string="This is so impressive" reply="yoo" time="5m"/>
      </div>


    </div>
  );
};

export default Commentbar;
