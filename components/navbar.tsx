"use client";
import react, { Fragment } from "react";
import { Button, buttonVariants } from "@/components/ui/ui/button";
import { Search, Bell, MessageSquareMore, Plus, Route } from "lucide-react";
import { Input } from "./ui/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/ui/popover";
import Link from "next/link";
import { Avatar, AvatarFallback,AvatarImage } from "./ui/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@radix-ui/react-dropdown-menu";

const notifications = [
  {
    title: "Parambrata Ghosh followed you",
    description: "5 min ago",
  },
  {
    title: "Hiranmay Pore leave interest on your idea.",
    description: "5 min ago",
  },
];

export default function Navbar() {
  return (
    // <div className="fixed top-0 left-0 right-0 bg-gray-400 z-50 shadow-md">

    <div className="flex-1 flex items-center justify-center h-[50px] w-full gap-6 ">
      <div className="flex-grow ">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 " />
            <Input
              type="search"
              placeholder="Search for all the inspiration you need..."
              className=" w-full appearance-none bg-background pl-8 shadow-none "
              />
          </div>
        </form>
      </div>
      <div className=" flex items-center justify-end gap-6 flex-shrink ">
        <Popover>
          <PopoverTrigger>
            <Bell className="h-6 w-6 md:block hidden " />
          </PopoverTrigger>
          <PopoverContent>
            {notifications.map((notification, index) => (
              <div
              key={index}
              className="mb-4 flex gap-4 items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-[#DF5173]" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </PopoverContent>
        </Popover>
        <div className="md:block hidden">

        <Link href="/chat">
          <MessageSquareMore className="h-6 w-6" />
        </Link>
        </div>
        <Link href="/upload" className="md:block hidden">
          <span className="flex justify-center items-center border border-1 border-[#DF5173] w-[210px] h-8 rounded-3xl text-[#DF5173]">
            <Plus />
            <p className="">Share your idea</p>
          </span>
        </Link>
        {/* <Avatar>
          <AvatarImage src="my_image.jpg" />
          <AvatarFallback>PG</AvatarFallback>
        </Avatar> */}
        <div className="flex-grow w-10 flex justify-center items-center">
          <Popover>
            <PopoverTrigger>
              <Avatar className="border border-2 border-[#F9DEE4] border-solid h-10 w-10">
                <AvatarImage src="my_image.jpg"/>
                <AvatarFallback>PG</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="bg-[#F9DEE4]">
              <Link href="/logout">
                <Button className="bg-[#DF5173]">Logout</Button>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
        // </div>
  );
}
