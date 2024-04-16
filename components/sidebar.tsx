'use client';
import react, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "./ui/ui/sheet";
import { Input } from "./ui/ui/input";
import Navbar from "./navbar";
import Link from "next/link";
import {
  Home,
  Bot,
  Users,
  CircleUserRound,
  CodeXml,
  RefreshCcw,
  SquareCheckBig,
  Menu,
  Search,
  Plus,
  Bell,
} from "lucide-react";
import SidebarCard from "./ui/ui/SidebarCard";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden  md:block" id="parent_sidebar_div">
        <div className=" fixed top-0 left-0 bottom-0 flex h-full max-h-screen flex-col gap-2 border-r bg-white" id="sidebar">
          <div className="flex h-[50px] items-center border-b px-4 lg:h-[50px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <img src="projectxplore.png" alt="Logo" className="h-6 w-6" />
              <span className="">ProjectXplore</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <div className="fixed_route">
                <SidebarCard icon={<Bot className="h-4 w-4" />} link="/chatbot" className={pathname.indexOf("/chatbot") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}>
                  ChatBot
                </SidebarCard>
          
              
                <SidebarCard icon={<Home className="h-4 w-4" />} link="/home" className={pathname.indexOf("/home") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}>
                  Home
                </SidebarCard>
               
                <SidebarCard
                  icon={<Users className="h-4 w-4" />}
                  link="/community"
                  className={pathname.indexOf("/community") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                >
                  Community
                </SidebarCard>
                <SidebarCard
                  icon={<CircleUserRound className="h-4 w-4" />}
                  link="/your_profile"
                  className={pathname.indexOf("/your_profile") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                >
                  Your's Profile
                </SidebarCard>
                <SidebarCard
                  icon={<CodeXml className="h-4 w-4" />}
                  link="/developer"
                  className={pathname.indexOf("/developer") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                >
                  For Developer
                </SidebarCard>
                <SidebarCard
                  icon={<RefreshCcw className="h-4 w-4" />}
                  link="/updates"
                  className={pathname.indexOf("/updates") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                >
                  Updates
                </SidebarCard>
                <SidebarCard
                  icon={<SquareCheckBig className="h-4 w-4" />}
                  link="/tasks"
                  className={pathname.indexOf("/tasks") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                >
                  Tasks
                </SidebarCard>
              </div>
              <div className="chat_route border-t">
                <Link
                  href="/chat"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[#DF5173]"
                >
                  Chat
                </Link>
                <SidebarCard
                  icon={
                    <Avatar>
                      {" "}
                      <AvatarImage src="my_image.jpg" />{" "}
                      <AvatarFallback>PG</AvatarFallback>
                    </Avatar>
                  }
                  link="/chat/user/parambrata"
                  className={pathname.indexOf("/chat/user/parambrata") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                >
                  Parambrata Ghosh
                </SidebarCard>
                <SidebarCard
                  icon={
                    <Avatar>
                      {" "}
                      <AvatarImage src="next.svg" />{" "}
                      <AvatarFallback>TG</AvatarFallback>
                    </Avatar>
                  }
                  link="/chat/group/tech_giants"
                  className={pathname.indexOf("/chat/group/tech_giants") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                >
                  Teach Giants
                </SidebarCard>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="fixed top-0 md:left-[220px] sm:left-[220px] left-0 right-0 flex-grow flex flex-col" id="parent_navbar&sm">
        <header className="flex h-[50px] items-start gap-4 border-b px-4 lg:h-[50px] lg:px-6 bg-white">
          <Sheet>
            <SheetTrigger asChild className="mt-[5px]">
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden "
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                  >
                  <img src="projectxplore.png" alt="Logo" className="h-6 w-6" />
                  <span className="">ProjectXplore</span>
                </Link>
                <div className="fixed_route">
                  <SidebarCard
                    icon={<Bot className="h-4 w-4" />}
                    link="/chatbot"
                    className={pathname.indexOf("/chatbot") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                    >
                    ChatBot
                  </SidebarCard>
                  <SidebarCard icon={<Home className="h-4 w-4" />} link="/home"  className={pathname.indexOf("/home") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}>
                    Home
                  </SidebarCard>
                  <SidebarCard
                    icon={<Users className="h-4 w-4" />}
                    link="/community"
                    className={pathname.indexOf("/community") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                    >
                    Community
                  </SidebarCard>
                  <SidebarCard
                    icon={<CircleUserRound className="h-4 w-4" />}
                    link="/your_profile"
                    className={pathname.indexOf("/your_profile") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                    >
                    Your's Profile
                  </SidebarCard>
                  <SidebarCard
                    icon={<CodeXml className="h-4 w-4" />}
                    link="/developer"
                    className={pathname.indexOf("/developer") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                    >
                    For Developer
                  </SidebarCard>
                  <SidebarCard
                    icon={<RefreshCcw className="h-4 w-4" />}
                    link="/updates"
                    className={pathname.indexOf("/updates") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                    >
                    Updates
                  </SidebarCard>
                  <SidebarCard
                    icon={<SquareCheckBig className="h-4 w-4" />}
                    link="/tasks"
                    className={pathname.indexOf("/tasks") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                    >
                    Tasks
                  </SidebarCard>
                  <SidebarCard
                    icon={<Plus className="h-4 w-4" />}
                    link="/upload"
                    className={pathname.indexOf("/tasks") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                    >
                    Share your idea
                  </SidebarCard>
                  <SidebarCard
                    icon={<Bell className="h-4 w-4" />}
                    link="/activity"
                    className={pathname.indexOf("/tasks") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                    >
                    Activity
                  </SidebarCard>
                </div>
                <div className="chat_route border-t">
                  <Link
                    href="/chat"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[#DF5173]"
                    >
                    Chat
                  </Link>
                  <SidebarCard
                    icon={
                      <Avatar>
                        {" "}
                        <AvatarImage src="my_image.jpg" />{" "}
                        <AvatarFallback>PG</AvatarFallback>
                      </Avatar>
                    }
                    link="/chat/user/parambrata"
                    className={pathname.indexOf("/chat/user/parambrata") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                    >
                    Parambrata Ghosh
                  </SidebarCard>
                  <SidebarCard
                    icon={
                      <Avatar>
                        {" "}
                        <AvatarImage src="next.svg" />{" "}
                        <AvatarFallback>TG</AvatarFallback>
                      </Avatar>
                    }
                    link="/chat/group/tech_giants"
                    className={pathname.indexOf("/chat/group/tech_giants") !== -1?"bg-[#F9DEE4] text-[#DF5173] font-bold":''}
                    >
                    Teach Giants
                  </SidebarCard>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Navbar />
        </header>
      </div>
    </>
  );
}
