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
import { userAtom } from '@/lib/atoms/UserAtom';
import { Req_send_handler } from "@/lib/control/Req_send_handler";
import { FrontendDomain } from "@/lib/Domain";
import UseAuth from "@/lib/hooks/UseAuth";
import { useAtom } from "jotai";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

export function JoinTeam() {
    const { loading, authenticated } = UseAuth();
    const [userid] = useAtom(userAtom);
    const [url, seturl] = useState<string>("");
    const { toast } = useToast();
    const [open, setOpen] = useState(false); // Control dialog open state

    const sendHandler = async () => {
        const parts = url?.split("/");
        if (parts && userid) {
            const teamid = parts[4];
            console.log(teamid);

            const status = await Req_send_handler(teamid, userid);
            if (status) {
                toast({
                    title: "Request sent successfully.",
                    description: "Please close this window.",
                });
                setOpen(false); // Close dialog on success
            } else {
                toast({
                    title: "Request not sent.",
                    description: "Please try again later.",
                });
            }
        } else {
            toast({
                title: "Please login again or provide a valid URL.",
                description: "Try again.",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="w-full h-full text-black font-bold"
                    style={{
                        backgroundImage: "url(button-join.avif)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    Join Team
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send Request</DialogTitle>
                    <DialogDescription>
                        Drop invitation URL here
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Message
                        </Label>
                        <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            URL
                        </Label>
                        <Input
                            id="username"
                            value={url}
                            onChange={(e: any) => seturl(e.target.value)}
                            placeholder={`${FrontendDomain}/team/*********/request`}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={sendHandler}>
                        Send
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
