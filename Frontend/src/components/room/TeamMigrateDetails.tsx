import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userAtom } from "@/lib/atoms/userAtom";
import { Req_send_handler } from "@/lib/control/Req_send_handler";
import { Domain, FrontendDomain } from "@/lib/Domain";
import UseAuth from "@/lib/hooks/useUser";
import { useAtom } from "jotai";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import Avataruploader from "@/lib/control/Avataruploader";
import axios from "axios";

export function MIgrateRoom({teamId}:{teamId:string}) {
    const { loading, authenticated } = UseAuth();
    const [userid] = useAtom(userAtom);
    const [roomName, setroomName] = useState<string>("");
    const [profile_Pic_link, setprofile_Pic_link] = useState<any>("");
    const [objective, setobjective] = useState<string>("");
    const { toast } = useToast();
    const [open, setOpen] = useState(false); // Control dialog open state

    const createHandler = async () => {
        if(teamId && roomName && profile_Pic_link && objective){
            const SendData = await axios.post(`${Domain}/api/v1/room/migrate-team`,{
                teamId,
                room_name:roomName,
                profile_pic_link:profile_Pic_link.url,
                objective:objective
            })
            if (SendData) {
                toast({
                    title: "Room is created successfully.",
                    description: "Please close this window.",
                });
                setOpen(false); // Close dialog on success
            } else {
                toast({
                    title: "Room is not created sent.",
                    description: "Please try again later.",
                });
            }
        }
            }
        
        return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"destructive"}>Migrate Room</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Room</DialogTitle>
                    <DialogDescription>Room</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Avataruploader setselecetedfile={setprofile_Pic_link} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Room Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={roomName}
                            onChange={(e) => setroomName(e.target.value)}
                            required
                            />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Objective
                        </Label>
                        <Input
                            id="username"
                            value={objective}
                            onChange={(e: any) => setobjective(e.target.value)}
                            className="col-span-3"
                            required
                            />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={createHandler}>
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

};