"use client";
import Link from "next/link";
import {
    Bell,
    CircleUser,
    Earth,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
    WholeWord,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CreateRoom from "@/components/CreateRoom";
import Project from "@/components/Project";
import ProjectList from "@/components/ProjectList";
import SearchDialog from "@/components/SearchDialouge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/combobox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { userAtom } from "@/lib/atoms/userAtom";
import { domain } from "@/lib/domain";
import useAuth from "@/lib/hooks/useUser";
import { PopoverContent } from "@radix-ui/react-popover";
import axios from "axios";
import { useAtom } from "jotai";
import { LogOut, Settings, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarCompo from "@/components/NavbarCompo";
import { Progress } from "@/components/ui/progress";

const roomsarray = [
    { value: "1", label: "kolkata Jawans" },
    { value: "2", label: "BharaBytes" },
];

const Page = () => {
    // Capitalized the component name
    const router = useRouter();
    const { loading, authenticated } = useAuth();
    const [user] = useAtom(userAtom);
    useEffect(() => {
        if (!loading) {
            console.log(user);
        }
    }, [loading, authenticated]);
    const [refresh, setrefresh] = useState<boolean>(false);

    const [RoomChoice, setRoomChoice] = useState<string>("1");
    const [CreateRoomClick, setCreateRoomClick] = useState<boolean>(false);
    const [projectNumber,setprojectNumber] = useState<number>(0)
    const [Rooms,setRooms] = useState<any>();
    const [team,setTeam] = useState<any>();
    const { toast } = useToast();

    useEffect(() => {
        if (CreateRoomClick) {
        }
    }, [CreateRoomClick]);

    const handleRoomValueChange = (newValue: string) => {
        setRoomChoice(newValue);
    };
    if (authenticated == false && loading == false) {
        return (
            <div className="w-screen h-screen flex justify-center items-center text-[150px]">
                Please Login
            </div>
        );
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${domain}/api/v1/users/logout`,
                {},
                { withCredentials: true }
            );
            if (response.status === 200) {
                router.push("/");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            toast({
                title: "Error Occured During logging out",
                description: "Possible Reason Cookie was cleared",
            });
        }
    };
    if (loading || authenticated == false) {
        return <div>Loading</div>;
    } else if (refresh) {
        return <div>Loading</div>;
    } else {
        return (
                        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold md:text-2xl">
                                    Dashboard
                                </h1>
                            </div>
                            <div
                                className="flex flex-1 items-start justify-start rounded-lg border border-dashed shadow-sm p-7 w-full h-full"
                                x-chunk="dashboard-02-chunk-1"
                            >
                                <div className="flex flex-col flex-grow p-4 h-full gap-3">
                                    <Card className="p-2">
                                        <CardTitle className="text-lg p-1">
                                            Project Name
                                        </CardTitle>
                                        <CardContent>
                                            <Progress value={55}/>
                                        </CardContent>
                                    </Card>
                                    <Card className="flex-grow p-5">
                                        <CardTitle className="text-lg">
                                            List
                                        </CardTitle>
                                    </Card>
                                </div>
                                <div className="flex flex-col flex-grow p-4">

                                </div>
                                <div className="flex flex-col flex-grow p-4">
                                    <Card>
                                        <CardTitle className="text-lg">
                                            Project Name
                                        </CardTitle>
                                        <CardContent>
                                            <Progress value={55}/>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>
                        </main>
            
        );
    }
};

export default Page;
