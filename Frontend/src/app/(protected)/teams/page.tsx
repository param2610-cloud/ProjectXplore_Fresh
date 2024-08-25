"use client";
import CreateTeam from "@/components/CreateTeam";
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
import { userAtom } from "@/lib/atoms/UserAtom";
import { Domain, FrontendDomain } from "@/lib/Domain";
import UseAuth from "@/lib/hooks/UseUser";
import { TeamData } from "@/lib/interface/teamdata";
import { Avatar } from "@radix-ui/react-avatar";
import axios from "axios";
import { useAtom } from "jotai";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
    const [moreDetails]
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
            console.log(teamId);
        };
        if (!loading && userId) {
            console.log("asdad");

            fetchdata();
        }
    }, [loading, userId]);

    useEffect(() => {
        const fetchteamdetails = async (teamId: string) => {
            console.log("adsad");
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
        if (crossClick) {
            setcreatebuttonpress(false);
            setjoinbuttonpress(false);
            setcrossclick(false);
        }
    }, [crossClick]);
    useEffect(() => {
        const fetchteamOwnerDetails = async () => {
            const response = await axios.get(`${Domain}/api/v1/users/getUser`, {
                params: {
                    userId: teamDetails?.teamDetails?.team_author_id,
                },
            });
            setteamOwnerDetails(response.data.data);
        };
        if (teamDetails) {
            fetchteamOwnerDetails();
        }
    }, [teamDetails]);

    return (
        <ResizablePanelGroup
            className="min-h-[calc(100vh-60px)] overflow-x-hidden flex"
            direction="horizontal"
        >
            <ResizablePanel defaultSize={35} className="m-3">
                {!teamDetails && !createbuttonpress && !joinbuttonpress && (
                    //card
                    <div className="p-4">
                        <Card className="w-full p-4 h-1/2 flex flex-col">
                            <CardTitle>Team Status</CardTitle>
                            <CardContent className="p-3 text-md m-4 flex-grow">
                                <div>Oops, currently you have no team.</div>
                                <div className="text-gray-400">
                                    Team means unity. A solid team can keep
                                    potenial to brings 100 cup. Team up with
                                    your friends existed team or you can create
                                    your own team.
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-4 mr-3">
                                <Button
                                    className="w-full  h-full   text-white font-bold"
                                    style={{
                                        backgroundImage:
                                            "url(button-create.jpg)",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                    onClick={() => {
                                        setcreatebuttonpress(true);
                                    }}
                                >
                                    Create Team
                                </Button>
                                <Button
                                    className="w-full  h-full text-black font-bold"
                                    style={{
                                        backgroundImage:
                                            "url(button-join.avif)",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                    onClick={() => {
                                        setjoinbuttonpress(true);
                                        setcrossclick(false);
                                    }}
                                >
                                    Join Team
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                )}
                {!teamDetails && createbuttonpress && !joinbuttonpress && (
                    <CreateTeam
                        setcrossClick={setcrossclick}
                        setteamdetails={setTeamDetails}
                    />
                )}
                {teamDetails && (
                    <Card className="flex flex-col gap-4">
                        <CardTitle className="flex justify-center items-center m-5 text-3xl">
                            {teamDetails.teamDetails.team_name}
                        </CardTitle>
                        <CardContent className="flex flex-col gap-7">
                            <Avatar className="flex justify-center">
                                <AvatarFallback>TN</AvatarFallback>
                                <AvatarImage
                                    src={
                                        teamDetails.teamDetails.profile_pic_link
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
                                    Inviatation URL:{" "}
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
                                <div>
                                    <Button
                                        variant={"outline"}
                                        className="border-dashed border-gray-500 w-full flex justify-center"
                                    >
                                        Drop Community Post
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant={'outline'}>
                                More Details
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={65}>
                <div>List of teams</div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default Page;
