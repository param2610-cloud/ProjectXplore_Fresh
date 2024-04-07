import react from "react";
import { Button, buttonVariants } from "@/components/ui/ui/button";
import Link from "next/link";
import {
  Home,
  Bot,
  Users,
  CircleUserRound,
  CodeXml,
  RefreshCcw,
  SquareCheckBig,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <img src="projectxplore.png" alt="Logo" className="h-6 w-6" />
            <span className="">ProjectXplore</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div className="fixed_route">
              <Link
                href="/chatbot"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Bot className="h-4 w-4" />
                ChatBot
              </Link>
              <Link
                href="/home"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/community"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Community
              </Link>
              <Link
                href="/your_profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CircleUserRound className="h-4 w-4" />
                Your's Profile
              </Link>
              <Link
                href="/developer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CodeXml className="h-4 w-4" />
                For Developer
              </Link>
              <Link
                href="/updates"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <RefreshCcw className="h-4 w-4" />
                Updates
              </Link>
              <Link
                href="/tasks"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <SquareCheckBig className="h-4 w-4" />
                Tasks
              </Link>
            </div>
            <div className="chat_route">
              <Link
                href="/chat"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                Chat
              </Link>
              <Link
                href="/chat/user/parambrata"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <div className="w-6 h-6 overflow-hidden rounded-full">
                  <img
                    className="object-cover w-full h-full"
                    src="my_image.jpg"
                    alt="Profile Avatar"
                  />
                </div>
                Parambrata Ghosh
              </Link>
              <Link
                href="/chat/group/tech_giants"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <div className="w-6 h-6 overflow-hidden rounded-full">
                  <img
                    className="object-cover w-full h-full"
                    src="next.svg"
                    alt="Profile Avatar"
                  />
                </div>
                Teach Giants
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
