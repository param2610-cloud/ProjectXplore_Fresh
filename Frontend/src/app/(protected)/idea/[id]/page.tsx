"use client";
import CommentsSection from "@/components/CommentSection";
import CreateTeam from "@/components/CreateTeam";
import GlobalTeamRankingTable from "@/components/GlobalTeamRankingTable";
import FormdataShowOnly from "@/components/IdeaCreationGrp/FormdataShowOnly";
import Overview from "@/components/IdeaCreationGrp/overview";
import RequestList from "@/components/RequestList";
import TeamDetails from "@/components/TeamDetails";
import { JoinTeam } from "@/components/TeamDetailsGrp/Jointeam";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import CopyButton from "@/components/ui/Copytoclipboard";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import userAtom from '../../../../../lib/atoms/UserAtom';
import { Domain, FrontendDomain } from "../../../../../lib/Domain";
import UseAuth from "../../../../../lib/hooks/UseAuth";
import { Ideas } from "../../../../../lib/interface/INTERFACE";
import { TeamData } from "../../../../../lib/interface/teamdata";
import { Avatar } from "@radix-ui/react-avatar";
import axios from "axios";
import { useAtom } from "jotai";
import { Copy } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {CommentSectionForIdea} from "@/components/IdeaCreationGrp/Commnet";
import IdeaREquestList from "@/components/IdeaCreationGrp/IdeaRequestList";

const Page = () => {
  const pathname = usePathname();
    const parts = pathname.split("/");
    const [teamId, setTeamId] = useState<string | null>(null);
    const [ideaId, setIdeaId] = useState<string | null>(null);

    useEffect(() => {
        if (parts[2]) {
            setIdeaId(parts[2]);
        }
    }, [pathname,parts]);
    const router = useRouter();
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const [teamDetails, setTeamDetails] = useState<TeamData | null>();
    const [ideaDetails, setIdeaDetails] = useState<Ideas | null>();
    const [teamList, setteamList] = useState<any>();
    const [createbuttonpress, setcreatebuttonpress] = useState(false);
    const [joinbuttonpress, setjoinbuttonpress] = useState(false);
    const [crossClick, setcrossclick] = useState<boolean>(false);
    const [teamOwnerDetails, setteamOwnerDetails] = useState<any>();
    const [activePanel, setActivePanel] = useState<"overview" | "collaboration" | "comments" | null>(null);
    useEffect(()=>{
        if(crossClick){
            setcreatebuttonpress(false)
            setcrossclick(false)
        }
    },[crossClick])


    useEffect(() => {
        const fetchideadetails = async () => {
            const response = await axios.get(`${Domain}/api/v1/idea/get-idea`, {
                params: { ideaId: ideaId },
            });
            setIdeaDetails(response.data.data);
            console.log(response.data.data);
            
        };
        
        if(ideaId){
            fetchideadetails();
        }
        
    }, [ideaId]);

    
    

    return (
        <div className="min-h-[calc(100vh-60px)] ">
            <div className="flex gap-4 m-5">
            <Button variant='link' onClick={()=>setActivePanel('overview')}>
                    Overview
                </Button>
            <Button variant='link' onClick={()=>setActivePanel('comments')}>
                    Comments
                </Button>
            <Button variant='link' onClick={()=>setActivePanel('collaboration')}>
                    Collaboration
                </Button>
            </div>
        <ResizablePanelGroup
            className="min-h-[calc(100vh-60px)]  overflow-y-scroll  overflow-x-hidden w-full flex "
            direction="horizontal"
        >
            <ResizablePanel defaultSize={50} className="m-3">
                {
                
                ideaDetails && <FormdataShowOnly ideaDetails={ideaDetails}/>
                }
                
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
                {activePanel === 'overview' &&ideaDetails&& <Overview IdeaDetails={ideaDetails}/>}
                {activePanel === 'collaboration' && ideaDetails &&  <IdeaREquestList IdeaDetails={ideaDetails}/>}
                {activePanel === 'comments' && ideaDetails &&  <CommentSectionForIdea IdeaDetails={ideaDetails}/>}
                
            </ResizablePanel>
        </ResizablePanelGroup>
        </div>
    );
};


export default Page;
