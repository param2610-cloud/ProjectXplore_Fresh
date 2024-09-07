import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import axios from "axios";
import { Domain } from "../../lib/Domain";
import { GlobalTeam } from "../../lib/interface/teamdata";

const GlobalTeamRankingTable = () => {
    const [TeamListData,setTeamListData] = useState<GlobalTeam[]>()
    useEffect(()=>{
        const fetchdata = async()=>{
            const data = await axios.get(`${Domain}/api/v1/team/team-list`)
            console.log(data);
            setTeamListData(data.data.data)
        }
        fetchdata()
    },[])
    return (
        <Table className="">
            <TableCaption>A list of Global Team & Room ranking.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Team Name</TableHead>
                    <TableHead>Team Owner</TableHead>
                    <TableHead>No. of Member</TableHead>
                    <TableHead>No. of Project</TableHead>
                    <TableHead className="text-right">
                        No. of Achievements
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    TeamListData && TeamListData.map((item:GlobalTeam,index:number)=>{
                        return (
                            <TableRow key={index}>
                                <TableCell className="font-medium text-left">{item.team_name}</TableCell>
                                <TableCell className="font-medium text-left">{item.users.full_name}</TableCell>
                                <TableCell className="font-medium pl-16">{item.team_member_roles.length}</TableCell>
                                <TableCell className="font-medium pl-16">{item.team_project_record.length}</TableCell>
                                <TableCell className="text-center pl-20">{item.achievements.length}</TableCell>
                            </TableRow>

                        )
                    })
                }
            </TableBody>
        </Table>
    );
};

export default GlobalTeamRankingTable;
