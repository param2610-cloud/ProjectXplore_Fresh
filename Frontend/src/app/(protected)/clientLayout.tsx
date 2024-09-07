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
import userAtom from '../../../lib/atoms/UserAtom';
import UseAuth from "../../../lib/hooks/UseAuth";
import { PopoverContent } from "@radix-ui/react-popover";
import axios from "axios";
import { useAtom } from "jotai";
import { LogOut, Settings, UserCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarCompo from "@/components/NavbarCompo";
import ProjectnumberAtom from "../../../lib/atoms/UseProjectnumber";
import { Domain, FirebaseUrl } from "../../../lib/Domain";
import { Users } from "../../../lib/interface/INTERFACE";
import { useTheme } from "next-themes";
import Notification from "@/components/Notification";
import useFirebaseNotifications from "../../../lib/control/FirebaseNotification";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [Projectnumber] = useAtom(ProjectnumberAtom);
    const { loading, authenticated } = UseAuth();
    const [userid, setUserId] = useAtom(userAtom);
    const [completed, setcompleted] = useState<boolean>(false);
    const [profile, setprofile] = useState<Users | null>();
    const { setTheme } = useTheme();
    const pathname = usePathname();
    const [Isprofile, setIsprofile] = useState<boolean>(false);
    const { notifications, error } = useFirebaseNotifications(FirebaseUrl);

    useEffect(() => {
        const parts = pathname.split("/");
        if (parts[1] === "yourprofile") {
            setIsprofile(true);
        } else {
            setIsprofile(false);
        }
    }, [pathname]);
    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get(
                `${Domain}/api/v1/users/profile-completed`,
                {
                    params: {
                        userId: userid,
                    },
                }
            );
            const response2 = await axios.get(
                `${Domain}/api/v1/users/getUser`,
                {
                    params: {
                        userId: userid,
                    },
                }
            );
            setprofile(response2.data.data);
            setcompleted(response.data.data);
            console.log(response);
        };
        if (userid) {
            fetchdata();
        }
    }, [userid]);
    const handlelogout = async () => {
        if (userid) {
            const response = await axios.post(
                `${Domain}/api/v1/users/logout`,
                { user_id: userid },
                { withCredentials: true }
            );
            if (response.status === 200) {
                setUserId(null);
                router.push("/auth/signin");
            }
        }
    };
    
    if (!userid || Isprofile) {
        return (
            <main className="box-order w-full h-screen overflow-hidden m-0 p-0">
                <div className="absolute top-0 right-0 left-0 w-screen h-16 bg-sky-500 flex justify-between items-center px-5">
                    <div className="text-xl font-bold">ProjectXplore</div>
                    <div>
                        <div className="flex justify-center items-center gap-4">
                            <Link href={"/auth/signin"} passHref>
                                <Button>Sign In</Button>
                            </Link>
                            <Link href={"/auth/signup"} passHref>
                                <Button>Sign Up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Separator orientation="horizontal" />
                <div className="w-screen h-screen">{children}</div>
            </main>
        );
    } else if (profile?.email !== "mentor123@gmail.com") {
        return (
            <div className="grid min-h-screen h-screen w-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
                <div className="hidden border-r sidebar-bg md:block h-screen col-span-1  ">
                    <div className="flex h-full flex-col">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2 font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="">ProjectXplore</span>
                            </Link>
                            <Popover>
                                <PopoverTrigger className="ml-auto h-8 w-8" asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative"
                                    >
                                        <Bell className="h-5 w-5" />
                                        {notifications.length > 0 && (
                                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                                        )}
                                        <span className="sr-only">
                                            Toggle notifications
                                        </span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-background p-5 z-10">
                                    <Notification url={FirebaseUrl} />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex-1">
                            {profile && <NavbarCompo userDetails={profile} />}
                        </div>
                        <div className="mt-auto p-4">
                            {!completed && (
                                <Card x-chunk="dashboard-02-chunk-0">
                                    <CardHeader className="p-2 pt-0 md:p-4">
                                        <CardTitle className="text-xl font-bold">
                                            Add your Institution
                                        </CardTitle>
                                        <CardDescription>
                                            Add Others Details also for primary
                                            inspection.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                        <Link href={"/moreinfo"}>
                                            <Button
                                                size="sm"
                                                className="w-full"
                                            >
                                                Add Institution
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col min-h-screen max-h-full w-full">
                    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b sidebar-bg px-4 lg:px-6 fixed w-screen sm:w-screen md:w-[calc(100vw-220px)] lg:w-[calc(100vw-280px)] z-10">
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
                                {profile && (
                                    <NavbarCompo userDetails={profile} />
                                )}
                                <div className="mt-auto">
                                    {!completed && (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>
                                                    Complete Your Profile
                                                </CardTitle>
                                                <CardDescription>
                                                    If people did not get
                                                    information much about you,
                                                    then how you will get
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
                                        </Card>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                        <div className="w-full flex-1">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search projects..."
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
                                    <Avatar>
                                        <AvatarImage
                                            className="object-cover"
                                            src={profile?.profile_picture_link}
                                        />
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    {profile?.full_name}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setTheme("light")}
                                >
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setTheme("dark")}
                                >
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setTheme("system")}
                                >
                                    System
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/settings/yourprofile"}>
                                        Your Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handlelogout}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>

                    <div className="flex-1 overflow-y-auto mt-14 lg:mt-[60px] ">
                        {children}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <main className="box-order w-full h-screen overflow-hidden m-0 p-0">
                <div className="absolute top-0 right-0 left-0 w-screen h-16 bg-sky-500 flex justify-between items-center px-5">
                    <div className="text-xl font-bold">ProjectXplore</div>
                    <div>
                        <Link href={"#"} passHref>
                            <Button onClick={handlelogout}>Log Out</Button>
                        </Link>
                    </div>
                </div>
                <Separator orientation="horizontal" />
                <div className="w-screen h-screen">{children}</div>
            </main>
        );
    }
}
