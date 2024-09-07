'use client';
import { SetStateAction } from "jotai";
import { Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const TeamDetailsNavbar = ({setActiveTab}:{setActiveTab:React.Dispatch<SetStateAction<string>>}) => {
    const pathname = usePathname();
    const parts = pathname.split("/");
    const [URLstatus, setURLstatus] = useState<string | null>(null);

    useEffect(() => {
        if (parts[2]) {
            setURLstatus(parts[1]);
        }
    }, [pathname,parts]);
    return (
        <>
            <Link
                href="#"
                onClick={()=>{setActiveTab('overview')}}
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
                href="#"
                onClick={()=>{setActiveTab('members')}}
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Members
            </Link>
            {
                URLstatus!=='team' && <Link
                href="#"
                onClick={()=>{setActiveTab('chats')}}
                className="text-foreground transition-colors hover:text-foreground"
            >
                Chats
            </Link>
            }
            
            <Link
                href="#"
                onClick={()=>{setActiveTab('projects')}}
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Projects
            </Link>
            <Link
                href="#"
                onClick={()=>{setActiveTab('achievements')}}
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Achievements
            </Link>
        </>
    );
};

export default TeamDetailsNavbar;
