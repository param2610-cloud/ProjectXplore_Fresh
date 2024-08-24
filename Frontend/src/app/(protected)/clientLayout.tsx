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
import { userAtom } from "@/lib/atoms/UserAtom";
import useAuth from "@/lib/hooks/UseUser";
import { PopoverContent } from "@radix-ui/react-popover";
import axios from "axios";
import { useAtom } from "jotai";
import { LogOut, Settings, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarCompo from "@/components/NavbarCompo";
import { ProjectnumberAtom } from "@/lib/atoms/UseProjectnumber";
import { Domain } from "@/lib/Domain";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [Projectnumber] = useAtom(ProjectnumberAtom);
    const [userid]= useAtom(userAtom)
    const [completed,setcompleted] = useState<boolean>(false)
    useEffect(()=>{
        const fetchdata = async()=>{
            const response = await axios.get(`${Domain}/api/v1/users/profile-completed`,{
                params:{
                    userId:userid
                }
            })
            setcompleted(response.data.data)
            console.log(response)
        }
        if(userid){
            fetchdata()
        }
    },[userid])
    return (
        <div>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2 font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="">ProjectXplore</span>
                            </Link>
                            <Popover>
                                <PopoverTrigger className="ml-auto h-8 w-8" >
                                        <Bell className="h-4 w-4" />
                                        <span className="sr-only">
                                            Toggle notifications
                                        </span>
                                </PopoverTrigger>
                                <PopoverContent>
                                    {/* <Notification/> // ****** */}
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex-1">
                            <NavbarCompo
                                projectNumber={
                                    Projectnumber?.Projectnumber ?? null
                                }
                            />
                        </div>
                        <div className="mt-auto p-4">

                            {!completed && <Card x-chunk="dashboard-02-chunk-0">
                                <CardHeader className="p-2 pt-0 md:p-4">
                                    <CardTitle className="text-xl font-bold">
                                        Complete Your Profile
                                    </CardTitle>
                                    <CardDescription>
                                        If people did not get information much
                                        about you, then how you will get
                                        exposure!
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Link href={"moreinfo"}>

                                    <Button size="sm" className="w-full">
                                        Click
                                    </Button>
                                    </Link>

                                </CardContent>
                            </Card>}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">
                                        Toggle navigation menu
                                    </span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <NavbarCompo
                                    projectNumber={
                                        Projectnumber?.Projectnumber ?? null
                                    }
                                />
                                <div className="mt-auto">

                                    {!completed && <Card>
                                        <CardHeader>
                                            <CardTitle>
                                            Complete Your Profile
                                            </CardTitle>
                                            <CardDescription>
                                            If people did not get information much
                                        about you, then how you will get
                                        exposure!
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Link href={"moreinfo"}>
                                            <Button
                                                size="sm"
                                                className="w-full"
                                            >
                                                Upgrade
                                            </Button>
                                                </Link>
                                        </CardContent>
                                    </Card>}
                                </div>
                            </SheetContent>
                        </Sheet>
                        <div className="w-full flex-1">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search products..."
                                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                    />
                                </div>
                            </form>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="rounded-full"
                                >
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">
                                        Toggle user menu
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    {children}
                </div>
            </div>
        </div>
    );
}
