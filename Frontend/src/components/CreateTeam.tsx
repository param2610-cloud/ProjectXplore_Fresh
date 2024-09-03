import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Avataruploader from "@/lib/control/Avataruploader";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { userAtom } from '@/lib/atoms/UserAtom';
import { ChevronLeft } from "lucide-react";
import { Domain } from "@/lib/Domain";
import axios from "axios";
import { useToast } from "./ui/use-toast";

const CreateTeam = ({setcrossClick,setteamdetails}:{setcrossClick:React.Dispatch<React.SetStateAction<boolean>>,setteamdetails:React.Dispatch<React.SetStateAction<any>>}) => {
    const [userId] = useAtom(userAtom)
    const [teamavatar,setteamavatar] = useState<any>()
    const [teamname,setteamname] = useState<string>()
    const [teamobjective,setteamobjective] = useState<string>()
    const [createbuttonpress,setcreatebuttonpress] = useState<any>(false)
    const [loading,setloading] = useState<any>()
    const {toast}=useToast()
    const createButtonHandle =async ()=>{
        try {
            setloading(true)
            if(teamname && teamobjective && typeof userId== 'string'&& teamavatar){

                const formdata = new FormData();
                formdata.append("team_name",teamname)
                formdata.append("team_author_id",userId)
                formdata.append("objective",teamobjective)
                formdata.append("avatar",teamavatar)
                const response = await axios.post(`${Domain}/api/v1/team/create-team`,formdata,{withCredentials:true})
                console.log(response)
                setteamdetails(response.data.data)
            }else{
                toast({
                    title:`Please Enter ${!teamname?'Team Name':!teamobjective?`Team Objective`:``}`
                })
            }
            setloading(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <Card className="flex flex-col gap-4">
        <ChevronLeft className="absolute m-4 border-2 cursor-pointer" size={30} onClick={()=>{setcrossClick(true)}}/>
        <CardTitle className="flex justify-center items-center m-5 text-3xl">
            Create Team
        </CardTitle>
        <CardContent className="flex flex-col gap-7">
            <Avataruploader setselecetedfile={setteamavatar}/>
            <div>
            <Label className="text-lg">
                Team Name
            </Label>
            <Input 
            placeholder="Team Name"
            value={teamname}
            onChange={(e:any)=>{setteamname(e.target.value)}}/>
            </div>
            <div>

            <Label className="text-lg">
                Team Objective
            </Label>
            <Textarea className="" value={teamobjective} onChange={(e:any)=>{setteamobjective(e.target.value)}}>

            </Textarea>
            </div>
            <div className="flex justify-center items-center gap-4">
                {/* <Button variant={"outline"} className="border-dashed border-gray-800">
                    Send Community Post
                </Button> */}
                <Button onClick={createButtonHandle} disabled={loading?true:false}>
                    Create Team
                </Button>

            </div>
        </CardContent>
    </Card>
    );
};

export default CreateTeam;
