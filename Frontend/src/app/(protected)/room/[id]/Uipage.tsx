import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Meteors } from "@/components/ui/meteors";
import {
    ArrowRight,
    ChevronLeft,
    List,
    Loader2,
    LightbulbIcon,
    Pin,
    Settings,
    Upload,
    Users,
    PlusCircle,
    Paperclip,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Uipage = ({
    roomData,
    ideaData,
    update_list,
    DataLoading,
    userId,
}: {
    roomData: any;
    ideaData: any;
    update_list: any;
    DataLoading: any;
    userId: any;
}) => {
    return (
        <div className="relative min-h-screen w-full bg-black">
            {/* Dot Background */}
            <div className="absolute inset-0 dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
                <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center w-full p-6 bg-gradient-to-b from-black to-transparent">
                    <div className="flex items-center gap-4">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500">
                            {roomData?.room_name || "Room Name"}
                        </h1>
                        {DataLoading && (
                            <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
                        )}
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="border-neutral-800 hover:border-neutral-700"
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Room Options
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 bg-neutral-900 border-neutral-800">
                            <div className="flex flex-col space-y-2">
                                <Button
                                    variant="ghost"
                                    className="text-neutral-200 hover:text-white hover:bg-neutral-800"
                                >
                                    <List className="mr-2 h-4 w-4" />
                                    Submit Final Project
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-neutral-200 hover:text-white hover:bg-neutral-800"
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    Member List
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-neutral-200 hover:text-white hover:bg-neutral-800"
                                >
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Main Content Area */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Idea Section */}
                    {ideaData && (
                        <CardSpotlight className="w-full mb-8 p-6">
                            <div className="relative z-20">
                                <div className="flex items-center gap-2 mb-4">
                                    <LightbulbIcon className="w-6 h-6 text-yellow-400" />
                                    <h2 className="text-2xl font-bold text-white">
                                        Idea
                                    </h2>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-200 mb-4">
                                    {ideaData.idea_name}
                                </h3>
                                <p className="text-neutral-300 mb-6">
                                    {ideaData.idea_text}
                                </p>

                                {/* Media Gallery */}
                                {(ideaData.image_link?.length > 0 ||
                                    ideaData.video_link?.length > 0) && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        {ideaData.image_link?.map(
                                            ({
                                                link,
                                                index,
                                            }: {
                                                link: any;
                                                index: any;
                                            }) => (
                                                <div
                                                    key={index}
                                                    className="relative aspect-video rounded-lg overflow-hidden"
                                                >
                                                    <Image
                                                        src={link}
                                                        alt="Idea visualization"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="transition-transform hover:scale-105"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                            <Meteors number={20} />
                        </CardSpotlight>
                    )}

                    {/* Updates Section */}
                    <div className="space-y-4 mb-32">
                        {update_list?.map(
                            ({
                                update,
                                index,
                            }: {
                                update: any;
                                index: any;
                            }) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                        update.author_id === userId
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div className="max-w-2xl bg-neutral-900/50 backdrop-blur-sm rounded-lg p-4 border border-neutral-800">
                                        <p className="text-neutral-200">
                                            {update.text}
                                        </p>
                                        {update.image_link && (
                                            <div className="mt-2 flex gap-2">
                                                {update.image_link.map(
                                                    ({
                                                        image,
                                                        idx,
                                                    }: {
                                                        image: string;
                                                        idx: number;
                                                    }) => (
                                                        <img
                                                            key={idx}
                                                            src={image}
                                                            alt=""
                                                            className="w-20 h-20 object-cover rounded-md"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="fixed bottom-0 right-0 left-0 bg-gradient-to-t from-black to-transparent p-6">
                    <div className="max-w-4xl mx-auto flex gap-4">
                        <Input
                            className="bg-neutral-900 border-neutral-800 text-white"
                            placeholder="Share your progress..."
                        />
                        <Button className="bg-gradient-to-r from-blue-400 to-violet-400 hover:opacity-90">
                            <Upload className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Uipage;
