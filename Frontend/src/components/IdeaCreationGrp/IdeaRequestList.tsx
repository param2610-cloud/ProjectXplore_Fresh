"use client";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Ideas, team_request_response_record } from "../../../lib/interface/INTERFACE";
import { TeamData } from "../../../lib/interface/teamdata";
import { Button } from "../ui/button";
import axios from "axios";
import { Domain } from "../../../lib/Domain";
import { useToast } from "../ui/use-toast";

const IdeaREquestList = ({IdeaDetails}:{IdeaDetails:Ideas}) => {
    const {toast} = useToast()
    const [TeamDetails,setTeamDetails] = useState<TeamData>()
    // useEffect(()=>{
    //     const fetchteamdetails = async (teamId: string) => {
    //         const response = await axios.get(`${Domain}/api/v1/idea/get-team`, {
    //             params: { team_id: teamId },
    //         });
    //         setTeamDetails(response.data.data);
    //         console.log(response);
            
    //     };
    //     if(teamID){
    //         console.log("data");
            
    //         // fetchteamdetails(teamID)
    //     }
    // },[teamID])
    const AddMemberHandler = async(user_id:string)=>{
        if(user_id && TeamDetails?.teamDetails.team_id){
            const send = await axios.post(`${Domain}/api/v1/team/team-member-add`,{
                userId:user_id,
                teamId:TeamDetails?.teamDetails.team_id
            })
            if(send.status == 201){
                toast({
                    title:"Member Added Succesfully",
                    description:"If Member is not showing add member list, then refresh once."
                })
            }else{
                toast({
                    title:"Member Added Succesfully",
                    description:"Please Try Again Later"
                })

            }
        }
    }
    return (
        <div className=" w-full h-full flex justify-start items-start flex-col p-10 gap-4">
            <div className="text-2xl font-bold flex justify-start">
                Request List
            </div>
            <div className="w-full">
                <Table className="">
                    <TableCaption>A list of Members In team</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Applicants Name</TableHead>
                            <TableHead>Applicants Team Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {TeamDetails?.teamDetails?.team_request_response_record.map(
                            (
                                item: team_request_response_record,
                                index: number
                            ) => {
                                console.log(item);
                                
                                if (item.res_applicant_user_id !== null) {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium text-left">
                                                {item.users.full_name}
                                            </TableCell>
                                            <TableCell className="font-medium text-left">
                                                {item.users.team_id?'True':'False'}
                                            </TableCell>
                                            <TableCell className="font-medium pl-16">
                                                <Button  onClick={async() => await AddMemberHandler(item.res_applicant_user_id)}>Add</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            }
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default IdeaREquestList;
