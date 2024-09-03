'use client'
import { roboto } from "@/app/fonts";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Avataruploader from "@/lib/control/Avataruploader";
import { Button } from "../ui/button";
import axios from "axios";
import { Domain } from "@/lib/Domain";
import UseAuth from "@/lib/hooks/useUser";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atoms/userAtom";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const Create = () => {
    const {loading,authenticated}= UseAuth()
    const [userId] = useAtom(userAtom)
    const [loading__,setloading__] = useState(false)
    const {toast} = useToast()
    const router = useRouter()
    const [roomName,setroomName] = useState<string>()
    const [ObjectiveName,setroomObjective] = useState<string>()
    const [profile,setprofile]=useState<any>()
    const SubmitHandler =async ()=>{
            setloading__(true)
            if(userId){

                const create = await axios.post(`${Domain}/api/v1/room/create-room`,{
                    room_name:roomName,
                    owner_id:userId
                })
                if(create.status ==200){
                    toast({
                        title:"Successfull",
                        description:"Room is created."
                    })
                    router.push("/room")
                }
            }else{
                toast({
                    title:"Oops",
                    description:"Look's like, you are not logged in."
                })
            }
            setloading__(false)
    }
    return (
        <div className="flex flex-col gap-5 w-[60%] bg-gray-100   overflow-y-auto p-4">
            <div className={`font text-[35px] `}>
                <h1 className={roboto.className}>Initialize a Room</h1>
            </div>
            <div className="flex flex-col gap-5">
                <div className="w-[50%]">

                <Avataruploader setselecetedfile={setprofile}/>
                </div>
                <div>

                <Label className="text-xl">
                    Room Name*
                </Label>
                <Input value={roomName} onChange={(e)=>setroomName(e.target.value)}/>
                </div>
                <div>

                <Label className="text-xl">
                    Objective
                </Label>
                <Input value={ObjectiveName} onChange={(e)=>setroomObjective(e.target.value)}/>
                </div>
            </div>
            <div className="flex justify-center items-centerw-full">
            <Button className="w-[80px]" onClick={SubmitHandler}>Submit</Button>
            </div>
        </div>
    );
};

export default Create;
