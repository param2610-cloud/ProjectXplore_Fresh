"use client";
import CreateTeam from "@/components/CreateTeam";
import GlobalTeamRankingTable from "@/components/GlobalTeamRankingTable";
import RequestList from "@/components/RequestList";
import TeamDetails from "@/components/TeamDetails";
import { JoinTeam } from "@/components/TeamDetailsGrp/Jointeam";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
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
import { userAtom } from '@/lib/atoms/UserAtom';
import { Domain, FrontendDomain } from "@/lib/Domain";
import UseAuth from "@/lib/hooks/UseAuth";
import { TeamData } from "@/lib/interface/teamdata";
import { Avatar } from "@radix-ui/react-avatar";
import axios from "axios";
import { useAtom } from "jotai";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MIgrateRoom } from "@/components/room/TeamMigrateDetails";

const Page = () => {
    const router = useRouter();
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const [teamDetails, setTeamDetails] = useState<TeamData | null>();
    const [teamList, setteamList] = useState<any>();
    const [createbuttonpress, setcreatebuttonpress] = useState(false);
    const [joinbuttonpress, setjoinbuttonpress] = useState(false);
    const [crossClick, setcrossclick] = useState<boolean>(false);
    const [teamId, setteamId] = useState<string | null>();
    const [teamOwnerDetails, setteamOwnerDetails] = useState<any>();
    const [activePanel, setActivePanel] = useState<"details" | "requests" | "ranking" | null>(null);
    
    useEffect(()=>{
        if(crossClick){
            setcreatebuttonpress(false)
            setcrossclick(false)
        }
    },[crossClick])

    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get(
                `${Domain}/api/v1/team/team-status`,
                {
                    params: {
                        userId: userId,
                    },
                }
            );
            setteamId(response.data.data);
        };
        if (!loading && userId) {
            console.log("asdad");

            fetchdata();
        }
    }, [loading, userId, teamDetails]);

    useEffect(() => {
        const fetchteamdetails = async (teamId: string) => {
            const response = await axios.get(`${Domain}/api/v1/team/get-team`, {
                params: { team_id: teamId },
            });
            setTeamDetails(response.data.data);
        };
        const fetchteamList = async () => {
            const response = await axios.get(`${Domain}/api/v1/team/team-list`);

            setteamList(response.data.data);
        };

        if (teamId) {
            fetchteamdetails(teamId);
        } else {
            fetchteamList();
        }
    }, [teamId]);

    if (!loading && !authenticated) {
        router.push("/");
    }
    
    useEffect(() => {
        const fetchteamOwnerDetails = async () => {
            if (teamDetails?.teamDetails?.team_author_id) {
                const response = await axios.get(
                    `${Domain}/api/v1/users/getUser`,
                    {
                        params: {
                            userId: teamDetails?.teamDetails?.team_author_id,
                        },
                    }
                );
                setteamOwnerDetails(response.data.data);
            }
        };
        if (teamDetails) {
            fetchteamOwnerDetails();
        }
    }, [teamDetails]);

    return (
        <ResizablePanelGroup
            className={`min-h-[calc(100vh-60px)] overflow-x-hidden w-full flex`}
            direction="horizontal"
        >
            <ResizablePanel defaultSize={35} className="m-3">
                {!teamDetails && !createbuttonpress && (
                    <div className="p-4">
                        <Card className="w-full p-4 h-1/2 flex flex-col">
                            <CardTitle>Team Status</CardTitle>
                            <CardContent className="p-3 text-md m-4 flex-grow">
                                <div>Oops, currently you have no team.</div>
                                <div className="text-gray-400">
                                    Team means unity. A solid team can keep
                                    potential to bring 100 cups. Team up with
                                    your friend existing teams or you can create
                                    your own team.
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-4 mr-3">
                                <Button
                                    className="w-full  h-full text-white font-bold"
                                    style={{
                                        backgroundImage:
                                            "url(button-create.jpg)",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                    onClick={() => setcreatebuttonpress(true)}
                                >
                                    Create Team
                                </Button>
                                <JoinTeam />
                            </CardFooter>
                        </Card>
                    </div>
                )}
                {!teamDetails && createbuttonpress && (
                    <CreateTeam
                        setcrossClick={setcrossclick}
                        setteamdetails={setTeamDetails}
                    />
                )}
                {teamDetails && (
                    <Card className="flex flex-col gap-4">
                        <CardTitle className="flex justify-center items-center m-5 text-3xl">
                            {teamDetails?.teamDetails?.team_name}
                        </CardTitle>
                        <CardContent className="flex flex-col gap-7">
                            <Avatar className="flex justify-center">
                                <AvatarFallback>TN</AvatarFallback>
                                <AvatarImage
                                    src={
                                        teamDetails?.teamDetails
                                            ?.profile_pic_link
                                    }
                                    className="rounded-full w-[40%]"
                                />
                            </Avatar>
                            <div className="w-full h-full overflow-hidden flex flex-col gap-3">
                                <div className="flex justify-start items-center gap-2">
                                    <div>Team owner:</div>
                                    <div>{teamOwnerDetails?.full_name}</div>
                                </div>
                                <div className="flex justify-start items-center gap-4">
                                    Invitation URL:{" "}
                                    <CopyButton
                                        text={`${FrontendDomain}/team/${teamId}/request`}
                                        className=""
                                        size={15}
                                    />
                                    <div></div>
                                </div>
                                <div className="w-full h-full whitespace-nowrap border-2 rounded-xl p-4">
                                    {`${FrontendDomain}/team/${teamId}/request`}
                                </div>
                                {/* <div>
                                    <Button
                                        variant={"outline"}
                                        className="border-dashed border-gray-500 w-full flex justify-center"
                                    >
                                        Drop Community Post
                                    </Button>
                                </div> */}
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-6 ">
                            <Button
                                variant={"outline"}
                                onClick={() => setActivePanel(activePanel === 'details' ? null : 'details')}
                                className={`${
                                    activePanel === 'details' ? `bg-accent text-accent-foreground` : ``
                                }`}
                            >
                                More Details
                            </Button>
                            {
                                teamDetails?.teamDetails?.team_author_id===userId &&
                            <Button
                            variant={"outline"}
                            onClick={() => setActivePanel(activePanel === 'requests' ? null : 'requests')}
                                className={`${
                                    activePanel === 'requests' ? `bg-accent text-accent-foreground` : ``
                                }`}
                            >
                                Requests
                            </Button>
                            }
                            {
                                teamDetails?.teamDetails?.team_author_id===userId &&
                                <>
                                {
                                    teamId && 
                                    <MIgrateRoom teamId={teamId}/>
                                }
                            
                            </>
                            }
                        </CardFooter>
                    </Card>
                )}
                <Button
                    onClick={() => setActivePanel(activePanel === 'ranking' ? null : 'ranking')}
                    className={`m-4 ${activePanel === 'ranking' ? "bg-primary/90" : ""}`}
                >
                    Global Team Ranking
                </Button>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={65}>
                {activePanel === 'details' && <TeamDetails />}
                {activePanel === 'requests' && teamDetails && typeof teamId==='string' &&  <RequestList teamID={teamId}/>}
                {activePanel === 'ranking' && (
                    <div className="h-full">
                        <GlobalTeamRankingTable />
                        <Button
                            variant={"outline"}
                            className="absolute bottom-0 shadow-xl border-black border-dashed m-4"
                            onClick={() => setActivePanel(null)}
                        >
                            Close Table
                        </Button>
                    </div>
                )}
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};


export default Page;
