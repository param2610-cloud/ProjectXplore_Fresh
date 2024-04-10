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
import Explore_updates from "@/components/Explore_updates";
import Explore_suggestions from "@/components/Explore_suggestions";
import Explore_recommendations from "@/components/Explore_recommendations";
import Explore_card from "@/components/ui/ui/Explore_card";

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
          <div id="cards" className=" ">
            <Explore_card />
            <Explore_card />
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
