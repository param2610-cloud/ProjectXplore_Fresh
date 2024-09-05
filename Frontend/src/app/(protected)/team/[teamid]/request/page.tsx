"use client";
import RequestList from "@/components/RequestList";
import { User } from "@/components/SearchDialouge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import userAtom from '@/lib/atoms/UserAtom';
import { Domain } from "@/lib/Domain";
import UseAuth from "@/lib/hooks/UseAuth";
import { team_request_response_record, TeamMemberRoles, Users } from "@/lib/interface/INTERFACE";
import { TeamData } from "@/lib/interface/teamdata";
import axios from "axios";
import { useAtom } from "jotai";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const { loading, authenticated } = UseAuth();
    const pathname = usePathname();
    const parts = pathname.split("/");
    console.log(parts);

    const [teamId, setTeamId] = useState<string | null>(null);
    const [userDetails, setuserDetails] = useState<Users>();
    const [TeamDetails, setteamdetails] = useState<TeamData>();
    const [ issent,setissent]= useState<boolean>(false)
    useEffect(() => {
        if (parts[2]) {
            setTeamId(parts[2]);
            console.log(parts[2]);
        }
    }, [pathname, parts]);
    const [userId] = useAtom(userAtom);
    useEffect(() => {
        const fetchdata = async () => {
            const data = await axios.get(`${Domain}/api/v1/users/getUser`, {
                params: { userId: userId },
            });
            const response = await axios.get(`${Domain}/api/v1/team/get-team`, {
                params: { team_id: teamId },
            });
            console.log(data);
            console.log(response);

            setteamdetails(response.data.data);
            setuserDetails(data.data.data);
        };
        if (userId && teamId) {
            console.log("trigger");

            fetchdata();
        }
    }, [userId, teamId]);
    if (userId === TeamDetails?.teamDetails.team_author_id) {
        return (
            typeof teamId === 'string' && <RequestList teamID={teamId} />
        );
    }
    const acceptreq =async ()=>{
        try {
            const data = await axios.post(`${Domain}/api/v1/team/team-req-send`, {
                teamId:teamId,
                userId:userId
            });
            if(data.status === 201){
                setissent(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    if(issent){
        return (<div className="w-full h-full flex justify-center items-center font-sans text-2xl">
            Request is sent successfully.
        </div>)
    }else{

        return (
            <div className="w-full h-full flex justify-start items-center flex-col">
            <div className="m-10 w-full">
                <div className="flex justify-start items-center ml-10 gap-3">
                    <img
                        src={TeamDetails?.teamDetails?.profile_pic_link}
                        className="rounded-lg"
                        width={100}
                        height={100}
                    />
                    <div className="text-3xl font-bold ">
                        {TeamDetails?.teamDetails.team_name}
                    </div>
                </div>
                <h1 className="text-2xl flex w-full justify-center">
                    Hello, {userDetails?.full_name}.{" "}
                    {TeamDetails?.teamDetails.users?.full_name} is inviting to
                    join his or her team.
                </h1>
            </div>
            <div className="flex gap-10">
                <Button onClick={acceptreq}>Accept</Button>
                <Button>Decline</Button>
            </div>
        </div>
    );
}
};

export default Page;
