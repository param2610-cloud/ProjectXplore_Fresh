"use client";
import { GlobalTeam, TeamData } from "@/lib/interface/teamdata";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { TeamMemberRoles, Teams } from "@/lib/interface/INTERFACE";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { userAtom } from '@/lib/atoms/UserAtom';
import { useAtom } from "jotai";
import UseAuth from "@/lib/hooks/UseAuth";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Domain } from "@/lib/Domain";
import { useToast } from "../ui/use-toast";

const Member = ({ teamDetails }: { teamDetails: TeamData | null }) => {
    const pathname = usePathname();
    const parts = pathname.split("/");
    const [URLstatus, setURLstatus] = useState<string | null>(null);
    const { loading, authenticated } = UseAuth();
    const { toast } = useToast();
    useEffect(() => {
        if (parts[2]) {
            setURLstatus(parts[1]);
        }
    }, [pathname]);
    const [userId] = useAtom(userAtom);
    console.log(userId);
    const removeTeamMember = async (UserId: string) => {
        if (UserId && teamDetails?.teamDetails.team_id) {
            const send = await axios.post(
                `${Domain}/api/v1/team/team-member-remove`,
                {
                    userId: userId,
                    teamId: teamDetails.teamDetails.team_id,
                }
            );
            console.log(send);
            
            if (send.status == 201) {
                toast({
                    title: "Member Removed Succesfully",
                    description:
                        "If not effecting member list, then refresh once.",
                });
            } else {
                toast({
                    title: "Action is undone",
                    description: "Please Try Again Later",
                });
            }
        }
    };

    return (
        <div className="flex-grow flex flex-col m-4">
            <Table className="">
                <TableCaption>A list of Members In team</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Member Name</TableHead>
                        <TableHead>Member Role</TableHead>
                        <TableHead>No. of Project</TableHead>
                        {URLstatus !== "team" && (
                            <TableHead className="">Action</TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teamDetails &&
                        teamDetails.teamDetails.team_member_roles.map(
                            (item: TeamMemberRoles, index: number) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium text-left">
                                            {item.users?.full_name}
                                        </TableCell>
                                        <TableCell className="font-medium text-left">
                                            {item.role_name}
                                        </TableCell>
                                        <TableCell className="font-medium pl-16">
                                            {
                                                item.users?.user_project_track
                                                    .length
                                            }
                                        </TableCell>

                                        {URLstatus !== "team" &&
                                            userId &&
                                            teamDetails.teamDetails
                                                .team_author_id &&
                                            teamDetails.teamDetails
                                                .team_author_id === userId &&
                                            item.user_id !== userId && (
                                                <TableCell className="">
                                                    <Button
                                                        variant={"destructive"}
                                                        onClick={() => {
                                                            if (
                                                                typeof item.user_id ===
                                                                "string"
                                                            ) {
                                                                removeTeamMember(
                                                                    item.user_id
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </TableCell>
                                            )}
                                    </TableRow>
                                );
                            }
                        )}
                </TableBody>
            </Table>
        </div>
    );
};

export default Member;
