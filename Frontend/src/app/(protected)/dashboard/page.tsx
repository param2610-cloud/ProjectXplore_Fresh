"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Folder,
    Users,
    Award,
    Bell,
    Search,
    PlusCircle,
    RefreshCw,
    UserPlus,
} from "lucide-react";
import UseAuth from "@/lib/hooks/useUser";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atoms/userAtom";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const {} = UseAuth();
    const [userId] = useAtom(userAtom);
    const router = useRouter();
    useEffect(() => {
        if (userId === "0c33131a-5771-424e-87a7-bf788bb656e4") {
            router.push("/institution");
        }
    }, [userId]);
    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-indigo-800">
                    Your ProjectXplore Workspace
                </h1>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold text-indigo-700">
                            Your Projects
                        </CardTitle>
                        <Folder className="h-6 w-6 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-indigo-900">
                            7
                        </div>
                        <p className="text-sm text-indigo-600">
                            2 active, 5 completed
                        </p>
                        <Progress value={70} className="mt-2" />
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold text-indigo-700">
                            Your Teams
                        </CardTitle>
                        <Users className="h-6 w-6 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-indigo-900">
                            3
                        </div>
                        <p className="text-sm text-indigo-600">
                            12 team members total
                        </p>
                        <div className="flex -space-x-2 overflow-hidden mt-2">
                            {[...Array(5)].map((_, i) => (
                                <img
                                    key={i}
                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                    src={`/api/placeholder/${30 + i}/30`}
                                    alt={`Team member ${i + 1}`}
                                />
                            ))}
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium">
                                +7
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold text-indigo-700">
                            Your Achievements
                        </CardTitle>
                        <Award className="h-6 w-6 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-indigo-900">
                            5
                        </div>
                        <p className="text-sm text-indigo-600">
                            1 new this month
                        </p>
                        <div className="flex space-x-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-indigo-400"
                                ></span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-indigo-800">
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create New Project
                        </Button>
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Update Project Status
                        </Button>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Invite Team Member
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-indigo-800">
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <li className="flex items-center p-2 bg-indigo-50 rounded-lg">
                                <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center mr-3">
                                    <Folder className="h-4 w-4 text-indigo-600" />
                                </div>
                                <span className="text-sm text-indigo-800">
                                    Updated "AI Chat Bot" project
                                </span>
                            </li>
                            <li className="flex items-center p-2 bg-green-50 rounded-lg">
                                <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center mr-3">
                                    <Users className="h-4 w-4 text-green-600" />
                                </div>
                                <span className="text-sm text-green-800">
                                    New member joined "CodeCrafters" team
                                </span>
                            </li>
                            <li className="flex items-center p-2 bg-yellow-50 rounded-lg">
                                <div className="h-8 w-8 rounded-full bg-yellow-200 flex items-center justify-center mr-3">
                                    <Award className="h-4 w-4 text-yellow-600" />
                                </div>
                                <span className="text-sm text-yellow-800">
                                    Earned "Innovation Star" achievement
                                </span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-indigo-800">
                        Your Active Projects
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-indigo-700">
                                    AI Chat Bot
                                </h3>
                                <p className="text-sm text-indigo-600">
                                    Due in 7 days
                                </p>
                            </div>
                            <Progress value={75} className="w-1/3" />
                        </li>
                        <li className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-indigo-700">
                                    Smart Home IoT
                                </h3>
                                <p className="text-sm text-indigo-600">
                                    Due in 14 days
                                </p>
                            </div>
                            <Progress value={40} className="w-1/3" />
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-indigo-800">
                        Explore Projects
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-grow">
                            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                            Search
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
