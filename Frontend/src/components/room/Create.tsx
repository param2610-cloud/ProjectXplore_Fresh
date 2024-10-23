'use client';

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { roboto } from "@/app/fonts";
import Avataruploader from "../../../lib/control/Avataruploader";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import userAtom from '../../../lib/atoms/UserAtom';
import UseAuth from "../../../lib/hooks/UseAuth";
import axios from "axios";
import { Domain } from "../../../lib/Domain";
import { Rocket, Users2, Target } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";

const Create = () => {
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const [roomName, setRoomName] = useState("");
    const [objectiveName, setObjectiveName] = useState("");
    const [profile, setProfile] = useState<File | null>(null);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (!roomName || !objectiveName) {
            toast({
                title: "Missing Fields",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        try {
            if (userId) {
                const response = await axios.post(`${Domain}/api/v1/room/create-room`, {
                    room_name: roomName,
                    owner_id: userId
                });

                if (response.status === 200) {
                    toast({
                        title: "Room Created Successfully",
                        description: "Your new room is ready to go!",
                    });
                    router.push("/room");
                }
            } else {
                toast({
                    title: "Authentication Required",
                    description: "Please log in to create a room.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create room. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-black relative animate-fade-in">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-400 to-violet-400 transform scale-[0.80] rounded-3xl blur-3xl opacity-20" />
            
            <div className="relative shadow-xl bg-neutral-900/80 border border-neutral-800 rounded-2xl p-8 backdrop-blur-xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-blue-400">
                            <Rocket className="w-5 h-5" />
                        </div>
                        <h1 className={`text-2xl font-bold text-white ${roboto.className}`}>
                            Create New Room
                        </h1>
                    </div>
                    <p className="text-neutral-300">Set up a collaborative space for your projects</p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar Upload */}
                    <div className="space-y-2">
                        <Label className="text-sm text-neutral-300">Room Avatar</Label>
                        <div className="flex justify-center p-6 bg-neutral-800/50 rounded-xl border-2 border-dashed border-neutral-700 hover:border-neutral-600 transition-colors">
                            <Avataruploader setSelectedFile={setProfile} />
                        </div>
                    </div>

                    {/* Room Name */}
                    <div className="space-y-2">
                        <Label htmlFor="roomName" className="text-sm text-neutral-300">
                            Room Name
                        </Label>
                        <div className="relative">
                            <Users2 className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                            <Input
                                id="roomName"
                                placeholder="Enter room name"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                className="pl-10 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:ring-blue-400"
                            />
                        </div>
                    </div>

                    {/* Objective */}
                    <div className="space-y-2">
                        <Label htmlFor="objective" className="text-sm text-neutral-300">
                            Room Objective
                        </Label>
                        <div className="relative">
                            <Target className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                            <Textarea
                                id="objective"
                                placeholder="What's the purpose of this room?"
                                value={objectiveName}
                                onChange={(e) => setObjectiveName(e.target.value)}
                                className="pl-10 min-h-[100px] bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:ring-blue-400"
                            />
                        </div>
                    </div>

                    {/* Auth Warning */}
                    {!authenticated && (
                        <Alert className="bg-neutral-800/50 border-neutral-700">
                            <AlertDescription className="text-neutral-300">
                                You need to be logged in to create a room.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Submit Button */}
                    <Button
                        className="w-full bg-gradient-to-r from-blue-400 to-violet-400 text-white hover:opacity-90 transition-opacity"
                        onClick={handleSubmit}
                        disabled={isLoading || !authenticated}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                <span>Creating Room...</span>
                            </div>
                        ) : (
                            "Create Room"
                        )}
                    </Button>
                </form>

                <Meteors number={20} />
            </div>
        </div>
    );
};

export default Create;