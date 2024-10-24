"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PlusCircle, Users, Link as LinkIcon, ArrowRight } from "lucide-react";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Domain, FrontendDomain } from "../../../../lib/Domain";
import userAtom from "../../../../lib/atoms/UserAtom";
import UseAuth from "../../../../lib/hooks/UseAuth";
import { RoomGetData, Rooms } from "../../../../lib/interface/INTERFACE";
import { Meteors } from "@/components/ui/meteors";
import { useRouter } from "next/navigation";

const RoomCard = ({ RoomData, mode }: { RoomData: Rooms; mode: string }) => {
    const roomName =
        mode === "owner" ? RoomData.room_name : RoomData.rooms?.room_name;
    const objective =
        mode === "owner" ? RoomData.objective : RoomData.rooms?.objective;
    const router = useRouter();
    return (
        <CardSpotlight className="w-full md:w-80 h-64 transition-all duration-300 hover:scale-105">
            <div className="relative z-20">
                <div className="flex items-center gap-2 mb-4">
                    {mode === "owner" ? (
                        <PlusCircle className="w-5 h-5 text-blue-400" />
                    ) : (
                        <Users className="w-5 h-5 text-green-400" />
                    )}
                    <span className="text-sm font-medium text-neutral-300">
                        {mode === "owner" ? "Room Owner" : "Room Member"}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                    {roomName}
                </h3>
                <p className="text-neutral-300 text-sm line-clamp-3">
                    {objective}
                </p>

                    <Button
                        variant="ghost"
                        className="mt-6 group text-neutral-200 hover:text-white"
                        onClick={()=>{
                            router.push(`/room/${RoomData.room_id}`)
                        }}
                    >
                        View Room
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
            </div>
            <Meteors number={4} />
        </CardSpotlight>
    );
};

const RoomPage = () => {
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const router = useRouter();
    const [roomData, setRoomData] = useState<RoomGetData>();
    const [link, setlink] = useState<string>("");

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const fetchedData = await axios.get(
                    `${Domain}/api/v1/room/user-room-data`,
                    {
                        params: { userId },
                    }
                );
                setRoomData(fetchedData.data.data);
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };

        if (userId) {
            fetchRoomData();
        }
    }, [userId]);

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="relative mb-16">
                    <div className="absolute inset-0 h-1/2 bg-gradient-to-r from-blue-400/20 to-violet-400/20 blur-3xl" />
                    <div className="relative flex justify-between items-center">
                        <h1 className="text-4xl font-bold">My Rooms</h1>
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={() => router.push("/room/create")}
                                className="bg-gradient-to-r from-blue-400 to-violet-400 hover:opacity-90"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Create Room
                            </Button>

                            <Popover>
                                <PopoverTrigger>
                                    <Button
                                        variant="outline"
                                        className="border-neutral-800"
                                    >
                                        <LinkIcon className="w-4 h-4 mr-2" />
                                        Join Room
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-neutral-900 border-neutral-800">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Paste room link"
                                            className="bg-neutral-800 border-neutral-700"
                                            value={link}
                                            onChange={(e) =>
                                                setlink(e.target.value)
                                            }
                                        />
                                        <Button
                                            onClick={() => {
                                                const parts = link.split("/");
                                                const freshLink =
                                                    parts[2] + "/" + parts[3];
                                                router.push(freshLink);
                                            }}
                                        >
                                            Join
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>

                {/* Owner Rooms Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-8 text-neutral-200">
                        Rooms as Owner
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {roomData?.data_as_owner?.map((item, index) => (
                            <RoomCard
                                RoomData={item}
                                key={index}
                                mode="owner"
                            />
                        ))}
                    </div>
                </section>

                {/* Member Rooms Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-8 text-neutral-200">
                        Rooms as Member
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {roomData?.data_as_member?.map((item, index) => (
                            <RoomCard
                                RoomData={item}
                                key={index}
                                mode="member"
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RoomPage;
