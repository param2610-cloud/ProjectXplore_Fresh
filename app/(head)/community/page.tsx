"use client";
import react from "react";
import { Category } from "@/components/categorybar";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/ui/card";
import {
  EllipsisVertical,
  EyeIcon,
  Heart,
  MessageSquareTextIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/ui/button";
import { ShortsCard } from "@/components/ui/ui/ShortsCard";
import Explore_updates from "@/components/explore/Explore_updates";
import Explore_suggestions from "@/components/explore/Explore_suggestions";
import Explore_recommendations from "@/components/explore/Explore_recommendations";
import Explore_card from "@/components/ui/ui/Explore_card";
import Explore_experimental_card from "@/components/ui/ui/Explore_experimental_card";

export interface CategoryItem {
  id: number;
  title: string;
}

export interface contentAttribute {
  Title: string;
  Author: string;
  like: number;
  description: string;
}

const categoryList: CategoryItem[] = [
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "Trending",
  },
  {
    id: 100,
    title: "AI",
  },
  {
    id: 101,
    title: "Robotics",
  },
  {
    id: 102,
    title: "VR",
  },
  {
    id: 103,
    title: "BioTech",
  },
  {
    id: 104,
    title: "Blockchain",
  },
  {
    id: 105,
    title: "Web",
  },
  {
    id: 106,
    title: "Android",
  },
];

export default function page() {
  return (
    <div className="grid grid-cols-[75%_1fr] ">
      <div id="parent_explore" className="flex flex-col w-full ">
        <div
          id="explore_heading"
          className=" pt-12 flex justify-center sm:text-4xl text-2xl  font-work_sans font-bold"
        >
          Explore <p className="text-[#DF5173] pl-2">Innovation</p>
        </div>
        <div
          id="desktop_category"
          className="sm:flex hidden justify-center mt-8   "
        >
          <Category category={categoryList} number_of_category={8} />
        </div>
        <div
          id="smartphone_category"
          className="lg:hidden md:hidden flex justify-center mt-8   "
        >
          <Category category={categoryList} number_of_category={5} />
        </div>
        <div id="contents" className="">
          <div id="cards" className=" flex flex-col items-center">
            {/* <Explore_experimental_card/> */}
            <Explore_card avatar="my_image.jpg" name="Parambrata Ghosh" time="5 hours ago" description="This is an incredible and clean style transfer. ✨A single image of The Joker was fed into ViggleAI, with extra clean-ups done in Stable Diffusion We are getting close to being able to make the AVATAR movie at home!" images={["1.png","2.png","3.png"]} likes="1.2 k" views="1.2 M "fallback="PG" className="bg-[#FFF6DF]"/>
            <Explore_card avatar="minu.jpg" name="Mrinmoy Mondal" time="2 mins ago" description="This is an incredible and clean style transfer. ✨A single image of The Joker was fed into ViggleAI, with extra clean-ups done in Stable Diffusion We are getting close to being able to make the AVATAR movie at home!" images={["1.png","2.png","3.png"]} likes="1.2 k" views="1.2 M "fallback="PG" className=""/>
            <Explore_card avatar="minu.jpg" name="Mrinmoy Mondal" time="2 mins ago" description="This is an incredible and clean style transfer. ✨A single image of The Joker was fed into ViggleAI, with extra clean-ups done in Stable Diffusion We are getting close to being able to make the AVATAR movie at home!" images={["1.png","2.png","3.png"]} likes="1.2 k" views="1.2 M "fallback="PG" className="bg-[#FFDDDF]"/>
            <Explore_card avatar="minu.jpg" name="Mrinmoy Mondal" time="2 mins ago" description="This is an incredible and clean style transfer. ✨A single image of The Joker was fed into ViggleAI, with extra clean-ups done in Stable Diffusion We are getting close to being able to make the AVATAR movie at home!" images={["1.png","2.png","3.png"]} likes="1.2 k" views="1.2 M "fallback="PG" className="bg-[#CFFFDE]"/>
            <Explore_card avatar="minu.jpg" name="Hiranmay Pore" time="5 mins ago" description="This is an incredible and clean style transfer. ✨A single image of The Joker was fed into ViggleAI, with extra clean-ups done in Stable Diffusion We are getting close to being able to make the AVATAR movie at home!" images={["1.png","2.png","3.png"]} likes="1.2 k" views="1.2 M "fallback="PG" className="bg-[#C7FAFE]"/>
          </div>
        </div>
      </div>
      <div className="h-screen w-full">
        <div className="top-14 right-0 h-full">
          <div className="flex flex-col h-screen ">
            <div className="flex-grow ">
              <div id="ALL_rightbar" className="fixed">
                <div className="pb-5">
                  <Explore_updates />
                </div>
                <Explore_suggestions />
                <Explore_recommendations />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
