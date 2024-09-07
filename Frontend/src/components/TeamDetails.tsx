import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, Package2 } from "lucide-react";
import TeamDetailsNavbar from "./TeamDetailsNavbar";
import axios from "axios";
import { useAtom } from "jotai";
import userAtom from '@/lib/atoms/UserAtom';
import { Domain } from "@/lib/Domain";
import { TeamData } from "@/lib/interface/teamdata";
import { Teams } from "@/lib/interface/INTERFACE";
import Member from "./TeamDetailsGrp/Member";
import AchievementsPage from "@/app/(protected)/settings/achievements/page";
import { TeamAchievementsPage } from "./TeamDetailsGrp/TeamAchievements";
import ProjectHistory from "./TeamDetailsGrp/ProjectHistory";

const TeamDetails = () => {
    const [userId] = useAtom(userAtom);
    const [ActiveTab,setActiveTab] = useState<string>("members")
    const [teamDetails,setteamdetails]= useState<TeamData>()
    useEffect(()=>{
        const fetchdata = async()=>{
            const userTeamData = await axios.get(
                `${Domain}/api/v1/team/team-status`,
                {
                    params: {
                        userId: userId,
                    },
                }
            );
            const response = await axios.get(`${Domain}/api/v1/team/get-team`, {
                params: { team_id: userTeamData.data.data },
            });
            setteamdetails(response.data.data)
            
            
        }
        if(userId){
            fetchdata()
        }
    },[])
    return (
        <div className="flex min-h-[calc(100vh-60px)] w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <TeamDetailsNavbar setActiveTab={setActiveTab}/>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <TeamDetailsNavbar setActiveTab={setActiveTab}/>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4"></div>
            </header>
            {/* <main className="flex min-h-[calc(100vh-60px)] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"></main> */}
            <main className="flex-1 overflow-hidden flex flex-col">
                {
                    ActiveTab==="members" && (
                        <Member teamDetails={teamDetails?teamDetails:null}/>
                    )
                }
                {
                    ActiveTab==="projects" && teamDetails?.teamDetails.team_id &&  (
                        <ProjectHistory team_id={teamDetails?.teamDetails.team_id}/>
                    )
                }
                {
                    ActiveTab==="achievements" && teamDetails?.teamDetails.team_id && (
                        <TeamAchievementsPage team_id={teamDetails?.teamDetails.team_id}/>
                    )
                }
            </main>
        </div>
    );
};

export default TeamDetails;
