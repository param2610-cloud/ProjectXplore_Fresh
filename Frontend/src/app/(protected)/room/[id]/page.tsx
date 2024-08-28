"use client";
import { roboto } from "@/app/fonts";
import Formdata_ from "@/components/IdeaCreationGrp/FormdataCompo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { userAtom } from "@/lib/atoms/UserAtom";
import { Domain } from "@/lib/Domain";
import UseAuth from "@/lib/hooks/UseUser";
import { Ideas } from "@/lib/interface/INTERFACE";
import axios from "axios";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const [DataLoading, setDataloading] = useState<boolean>(false);
    const [startupRender, setstartupRender] = useState<boolean>(true);
    const [CreateIdeaCard, setCreateIdeaCard] = useState<boolean>(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [ideaData, setIdeadata] = useState<Ideas>();
    const [roomId, setroomId] = useState<string>();
    const [ideaSubmitted, setideaSubmitted] = useState<boolean>(false);
    const { toast } = useToast();
    const pathname = usePathname();
    const parts = pathname.split("/");
    useEffect(() => {
        const roomIdFromPath = parts[2];
        if (roomIdFromPath && roomIdFromPath !== roomId) {
            setroomId(roomIdFromPath);
        }
    }, [pathname, roomId]);

    useEffect(() => {
        const fetchIdeaData = async () => {
            try {
                toast({
                    title: "Data is Fetching",
                    description:
                        "Due to heavy traffic, delay is there to retrieve data from server.",
                });
                const ideaData = await axios.get(
                    `${Domain}/api/v1/idea/get-idea`,
                    {
                        params: {
                            roomId: roomId,
                        },
                    }
                );
                setIdeadata(ideaData.data.data);
            } catch (error) {
                toast({
                    title: "Error Fetching Data",
                    description:
                        "Unable to retrieve data. Please try again later.",
                    variant: "destructive",
                });
            }
        };
        if (roomId) {
            fetchIdeaData();
        }
    }, [roomId]);

    useEffect(() => {
        if (ideaData) {
            setstartupRender(false);
            setideaSubmitted(true);
        }
    }, [ideaData]);
    const CreateButtonHandlerStartup = async () => {
        setIsFadingOut(true);
        setstartupRender(false);
        setCreateIdeaCard(true);
        setIsFadingOut(false); // Reset a
    };

    return (
        <div className="w-full h-full flex flex-col justify-start items-start overflow-y-auto bg-radial-grid bg-[length:20px_20px]">
            {startupRender && (
                <div className="flex w-full h-full flex-col justify-center items-center">
                    <div
                        className={`w-[60%] h-[30%] rounded-lg flex flex-col justify-center items-center p-5 gap-4 ${
                            isFadingOut ? "animate-fadeOut" : ""
                        }`}
                    >
                        <div className="w-full h-full flex flex-col justify-center items-center p-5 gap-2">
                            <div className="font-extrabold text-[50px]">
                                Initialize Journey by Posting Idea
                            </div>
                            <div className="w-[80%] text-gray-600">
                                If you are looking to submit your project, the
                                first step is to present your idea. Without a
                                clear idea, your project lacks direction and
                                purpose.
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button onClick={CreateButtonHandlerStartup}>
                                Create Idea
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {CreateIdeaCard && (
                <div className="flex w-full h-full flex-col justify-center items-center">
                    <div className="flex items-center flex-col h-full lg:max-h-[calc(100vh-60px)]">
                        <div className="text-[40px] font-serif m-10">
                            Idea Submission
                        </div>
                        <div className="w-[100%] h-full opacity-100 animate-fadeIn">
                            <Formdata_ setSubmitted={setideaSubmitted} />
                        </div>
                    </div>
                </div>
            )}
            {ideaSubmitted && (
                <div className="w-full h-full border-2 flex justify-center items-start pt-4">
                    <div className="flex flex-col w-[90%] h-auto gap-5 border-2 p-6 rounded-lg">
                        <div className="text-[40px]">
                            <p className={roboto.className}>Idea</p>
                        </div>
                        <div className="font-extrabold text-3xl">
                            {ideaData?.idea_name}
                        </div>
                        <div className="px-3 py-2">{ideaData?.idea_text}</div>
                        <div className="px-4 text-blue-500">
                            {ideaData?.usefull_links &&
                            Array.isArray(ideaData.usefull_links) ? (
                                ideaData.usefull_links.map(
                                    (link: string, index: number) => (
                                        <a
                                            key={index}
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:border-b border-blue-500 cursor-pointer w-auto"
                                        >
                                            {link}
                                        </a>
                                    )
                                )
                            ) : (
                                <p>No link available</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {
                <div>
                    <div>
                        <div></div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Page;
