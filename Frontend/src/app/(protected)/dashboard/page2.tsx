// "use client";
// import Link from "next/link";
// import {
//     Bell,
//     CircleUser,
//     Earth,
//     Home,
//     LineChart,
//     Menu,
//     Package,
//     Package2,
//     Search,
//     ShoppingCart,
//     Users,
//     WholeWord,  
// } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
//     } from "@/components/ui/card";

// import { useToast } from "@/components/ui/use-toast";
// import { userAtom } from '@/lib/atoms/UserAtom';
// import { Domain } from "@/lib/Domain";
// import UseAuth from "@/lib/hooks/UseAuth";
// import { PopoverContent } from "@radix-ui/react-popover";
// import axios from "axios";
// import { useAtom } from "jotai";
// import { LogOut, Settings, UserCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import NavbarCompo from "@/components/NavbarCompo";
// import { Progress } from "@/components/ui/progress";
// import { NewsArticle } from "@/lib/interface/NewsArticle";
// import { Button } from "@/components/ui/button";
// import Room_list_dashboard from "@/components/room/Room_list_dashboard";

// const roomsarray = [
//     { value: "1", label: "kolkata Jawans" },
//     { value: "2", label: "BharaBytes" },
// ];

// const Page = () => {
//     const { loading, authenticated } = UseAuth();
//     const [user] = useAtom(userAtom);
//     const router = useRouter();
//     useEffect(() => {
//         // Startup loading
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`${Domain}/api/v1/third-party/tech-news`);
//                 setnews(response.data.data.articles);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         if(user === "d0e358f6-c0c7-41a0-8f4a-2687967431ad"){
//             router.push("/institution")
//         }
//         fetchData();
//     }, [user]);
//     useEffect(() => {
//         if (!loading) {
//             console.log(user);
//         }
//     }, [loading, authenticated,user]);
//     const [refresh, setrefresh] = useState<boolean>(false);

//     const [RoomChoice, setRoomChoice] = useState<string>("1");
//     const [CreateRoomClick, setCreateRoomClick] = useState<boolean>(false);
//     const [projectNumber, setprojectNumber] = useState<number>(0);
//     const [Rooms, setRooms] = useState<any>();
//     const [team, setTeam] = useState<any>();
//     const [news, setnews] = useState<NewsArticle[]>();
//     const { toast } = useToast();


//     const handleRoomValueChange = (newValue: string) => {
//         setRoomChoice(newValue);
//     };
//     if (authenticated == false && loading == false) {
//         router.push("/")
//         return (
//             <div className="w-screen h-screen flex justify-center items-center text-[150px]">
//                 Please Login
//             </div>
//         );
//     }

//     const handleLogout = async () => {
//         try {
//             const response = await axios.post(
//                 `${Domain}/api/v1/users/logout`,
//                 {},
//                 { withCredentials: true }
//             );
//             if (response.status === 200) {
//                 router.push("/");
//             }
//         } catch (error) {
//             console.error("Error during logout:", error);
//             toast({
//                 title: "Error Occured During logging out",
//                 description: "Possible Reason Cookie was cleared",
//             });
//         }
//     };
//     const newsDataFetch = async () => {
//         const response = await axios.get(
//             `${Domain}/api/v1/third-party/tech-news`
//         );
//         return response;
//     };
//     if (loading || authenticated == false) {
//         return <div>Loading</div>;
//     } else if (refresh) {
//         return <div>Loading</div>;
//     } else {
//         return (
//             <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-[calc(100vh-60px)] overflow-hidden">
//                 <div className="flex items-center">
//                     <h1 className="text-lg font-semibold md:text-2xl">
//                         Dashboard
//                     </h1>
//                 </div>
//                 <div
//                     className="h-full flex flex-1 items-start justify-start rounded-lg border border-dashed shadow-sm p-7 w-full flex-grow lg:flex-row md:flex-col sm:flex-col"
//                     x-chunk="dashboard-02-chunk-1"
//                 >
//                     <div className="flex flex-col p-4 h-full gap-3 md:w-full sm:w-full lg:flex-1">
//                         <Card className="p-2">
//                             <CardTitle className="text-lg p-1">
//                                 Project Name
//                             </CardTitle>
//                             <CardContent>
//                                 <Progress value={55} />
//                             </CardContent>
//                         </Card>
//                         <div>
//                             <Room_list_dashboard/>
//                         </div>
                        
//                     </div>
//                     <div className="flex flex-col p-4 h-full md:w-full sm:w-full lg:flex-1 gap-4">
//                         <Card className="w-full h-[50%] p-3 overflow-y-scroll shadow-md rounded-lg flex-grow">
//                             <CardTitle className="text-lg font-bold mb-2">
//                                 What&apos;s New
//                             </CardTitle>
//                             <CardContent className="flex flex-col space-y-4">
//                                 {Array.isArray(news) &&
//                                     news.map((item: NewsArticle) => (
//                                         <Link href={item.url} key={item.title}>
//                                             <div
//                                                 key={item.title}
//                                                 className="bg-gray-100 p-4 rounded-lg hover:shadow-md"
//                                             >
//                                                 <h2 className=" font-bold text-black cursor-pointer">
                                                    
//                                                         {item.title?.substring(
//                                                             0,
//                                                             40
//                                                         )}
//                                                 </h2>
//                                                 <p className="text-gray-600 text-sm">
//                                                     {item.content?.substring(
//                                                         0,
//                                                         100
//                                                     )}
//                                                     ...
//                                                 </p>
//                                             </div>
//                                         </Link>
//                                     ))}
//                             </CardContent>
//                         </Card>
//                         <Card className="h-[40%]">
//                             <CardTitle className="p-4">Notification</CardTitle>
//                             <CardContent className="h-full w-full flex justify-center items-center">
//                                 No Notification
//                             </CardContent>
//                         </Card>
//                     </div>
//                     <div className="flex flex-col p-4 md:w-full sm:w-full lg:flex-1 gap-5 h-full">
//                         <Button
//                             style={{
//                                 backgroundImage: "url(bg-idea.jpg)",
//                                 backgroundSize: "cover",
//                                 backgroundPosition: "center",
//                                 backgroundRepeat: "no-repeat",
//                             }}
//                             className="h-[4vw] flex justify-center items-center font-semibold text-2xl pt-4 pl-6"
//                             onClick={()=>{router.push("/idea/create")}}
//                         >
//                             Submit your idea
//                         </Button>
//                         <Button
//                             style={{
//                                 backgroundImage: "url(bg-project.png)",
//                                 backgroundSize: "cover",
//                                 backgroundPosition: "center",
//                                 backgroundRepeat: "no-repeat",
//                             }}
//                             className="h-[4vw] flex justify-center items-center font-bold text-2xl pt-4 pl-6 text-black"
//                             onClick={()=>{router.push("/project/create")}}
//                         >
//                             Submit your project
//                         </Button>
//                         <Button
//                             style={{
//                                 backgroundImage: "url(bg-team.jpg)",
//                                 backgroundSize: "cover",
//                                 backgroundPosition: "center",
//                                 backgroundRepeat: "no-repeat",
//                             }}
//                             className="h-[4vw] flex justify-center items-center font-bold text-2xl pt-4 pl-6 "
//                             onClick={()=>{router.push("/teams")}}
//                         >
//                             Join or Create a Team
//                         </Button>
//                         <Card className="h-full w-full">
//                             <CardTitle className="p-4">Invitation & Requests</CardTitle>
//                             <CardContent className="h-full w-full flex justify-center items-center">
//                                 No inviatation or request
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>
//             </main>
//         );
//     }
// };

// export default Page;
