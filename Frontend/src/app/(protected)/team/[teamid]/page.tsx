"use client";
import CreateTeam from "@/components/CreateTeam";
import GlobalTeamRankingTable from "@/components/GlobalTeamRankingTable";
import TeamDetails from "@/components/TeamDetails";
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
import { userAtom } from '@/lib/atoms/UserAtom';
import { Domain, FrontendDomain } from "@/lib/Domain";
import UseAuth from "@/lib/hooks/UseAuth";
import { TeamMemberRoles } from "@/lib/interface/INTERFACE";
import { TeamData } from "@/lib/interface/teamdata";
import { Avatar } from "@radix-ui/react-avatar";
import axios from "axios";
import { useAtom } from "jotai";
import { Copy } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const pathname = usePathname();
    const parts = pathname.split("/");
    const [teamId, setTeamId] = useState<string | null>(null);

    useEffect(() => {
        if (parts[2]) {
            setTeamId(parts[2]);
        }
    }, [pathname]);
    const router = useRouter();
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const [teamDetails, setTeamDetails] = useState<TeamData | null>();
    const [createbuttonpress, setcreatebuttonpress] = useState(false);
    const [joinbuttonpress, setjoinbuttonpress] = useState(false);
    const [crossClick, setcrossclick] = useState<boolean>(false);
    const [teamOwnerDetails, setteamOwnerDetails] = useState<any>();
    const [clickmoredetails, setclickmoredetails] = useState<boolean>(true);
    const [clickGlobalranking, setclickglobalranking] =
        useState<boolean>(false);
    const [Member, setMember] = useState<TeamMemberRoles[]>();

    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get(`${Domain}/api/v1/team/get-team`, {
                params: { team_id: teamId },
            });
            setTeamDetails(response.data.data);
        };
        if (!loading && userId && teamId) {
            fetchdata();
        }
    }, [loading, userId, teamId]);
    useEffect(() => {
        if (teamDetails) {
            setMember(teamDetails?.teamDetails?.team_member_roles);
        }
    }, [teamDetails]);
    useEffect(() => {
        if (crossClick) {
            setcreatebuttonpress(false);
            setjoinbuttonpress(false);
            setcrossclick(false);
        }
    }, [crossClick]);

    return (
        <ResizablePanelGroup
            className="min-h-[calc(100vh-60px)] overflow-x-hidden w-full flex "
            direction="horizontal"
        >
            <ResizablePanel defaultSize={35} className="m-3">
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
                                    <div>
                                        {
                                            teamDetails.teamDetails.users
                                                ?.full_name
                                        }
                                    </div>
                                </div>
                                {Member &&
                                    Member.some(
                                        (m: TeamMemberRoles) =>
                                            m.user_id === userId
                                    ) && (
                                        <>
                                            <div>
                                                Your Role:{" "}
                                                {
                                                    Member.find(
                                                        (m: TeamMemberRoles) =>
                                                            m.user_id === userId
                                                    )?.role_name
                                                }
                                            </div>
                                            <div className="flex justify-start items-center gap-4">
                                                Invitation URL:{" "}
                                                <CopyButton
                                                    text={`${FrontendDomain}/team/${teamId}/request`}
                                                    className=""
                                                    size={15}
                                                />
                                            </div>
                                            <div className="w-full h-full whitespace-nowrap border-2 rounded-xl p-4">
                                                {`${FrontendDomain}/team/${teamId}/request`}
                                            </div>
                                        </>
                                    )}
                                {Member &&
                                    Member.some(
                                        (m: TeamMemberRoles) =>
                                            m.user_id !== userId
                                    ) && (
                                        <>
                                            <div>
                                                <Button
                                                    variant={"outline"}
                                                    className="border-dashed border-gray-500 w-full flex justify-center"
                                                >
                                                    Request To Join
                                                </Button>
                                            </div>
                                        </>
                                    )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant={"outline"}
                                onClick={() =>
                                    setclickmoredetails(!clickmoredetails)
                                }
                                className={`${
                                    clickmoredetails
                                        ? `bg-accent text-accent-foreground`
                                        : ``
                                }`}
                            >
                                More Details
                            </Button>
                            {Member &&
                                Member.some(
                                    (m: TeamMemberRoles) => m.user_id !== userId
                                ) && (
                                    <>
                                        <Button
                                            variant={"outline"}
                                            onClick={() =>
                                                setclickmoredetails(
                                                    !clickmoredetails
                                                )
                                            }
                                            className={`${
                                                clickmoredetails
                                                    ? `bg-accent text-accent-foreground`
                                                    : ``
                                            }`}
                                        >
                                            More Details
                                        </Button>
                                    </>
                                )}
                        </CardFooter>
                    </Card>
                )}
                <Button
                    onClick={() => {
                        setclickmoredetails(clickGlobalranking);
                        setclickglobalranking(!clickGlobalranking);
                    }}
                    className={`m-4 ${
                        clickGlobalranking ? "bg-primary/90" : ""
                    }`}
                >
                    Global Team Ranking
                </Button>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={65}>
                {clickmoredetails && <TeamDetails />}
                {clickGlobalranking && (
                    <div className="h-full">
                        <GlobalTeamRankingTable />

                        <Button
                            variant={"outline"}
                            className="absolute bottom-0 shadow-xl border-black border-dashed m-4"
                            onClick={() => {
                                setclickmoredetails(clickGlobalranking);
                                setclickglobalranking(!clickGlobalranking);
                            }}
                        >
                            Close Table
                        </Button>
                    </div>
                )}
            </ResizablePanel>
        </ResizablePanelGroup>
        // <div>Hello</div>
    );
};

export default Page;
