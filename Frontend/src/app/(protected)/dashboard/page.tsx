"use client";
import React, { useEffect, useState } from "react";
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
import UseAuth from "../../../../lib/hooks/UseAuth";
import { useAtom } from "jotai";
import userAtom from '../../../../lib/atoms/UserAtom';
import { useRouter } from "next/navigation";
import { Domain,FirebaseUrl } from "../../../../lib/Domain";
import Notification from "@/components/Notification";
import { useToast } from "@/components/ui/use-toast";
import { ProjectData } from "../../../../lib/interface/INTERFACE";
import Link from "next/link";

const Dashboard = () => {
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const router = useRouter();
    const [teamsCount, setTeamsCount] = useState(0);
    const [projectsCount, setProjectsCount] = useState(0);
    const [achievementsCount, setAchievementsCount] = useState(0);

    useEffect(() => {
        if (userId === "0c33131a-5771-424e-87a7-bf788bb656e4") {
            router.push("/institution");
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId]);

    const fetchData = async () => {
        try {
            const [teamsResponse, projectsResponse, achievementsResponse] = await Promise.all([
                fetch(`${Domain}/api/v1/users/teams?user_id=${userId}`),
                fetch(`${Domain}/api/v1/users/no-of-project?userId=${userId}`),
                fetch(`${Domain}/api/v1/users/achievements?user_id=${userId}`)
            ]);

            const teamsData = await teamsResponse.json();
            const projectsData = await projectsResponse.json();
            const achievementsData = await achievementsResponse.json();
            console.log(teamsData,projectsData,achievementsData);
            
            setTeamsCount(teamsData);
            setProjectsCount(projectsData.data);
            setAchievementsCount(achievementsData.length);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [error, setError] = useState<any>(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchProjects = async () => {
            if (authenticated && userId) {
                try {
                    const response = await fetch(
                        `http://localhost:8080/api/v1/project/users/projects?userId=${userId}`
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch projects");
                    }
                    const data = await response.json();
                    
                    let fetchedProjects: ProjectData[] = [];
                    for (const rooms of data.data.rooms) {
                        for (const project of rooms.New_Project_table) {
                            fetchedProjects.push(project);
                        }
                    }
                    setProjects(fetchedProjects);
                } catch (err) {
                    toast({
                        title: "Error",
                        description: "Error fetching projects. Please try again later.",
                    });
                    console.error("Error fetching projects:", err);
                    setError("Failed to fetch projects");
                }
            }
        };

        fetchProjects();
    }, [authenticated, userId, toast]);

    const handleProjectClick = (projectId: string) => {
        router.push(`/project/${projectId}`);
    };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (!authenticated) {
        return (
            <div className="text-center p-4">
                Please log in to view your projects.
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 p-4">{error}</div>;
    }


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
                            {projectsCount}
                        </div>
                        <p className="text-sm text-indigo-600">
                            Total projects
                        </p>
                        <Progress value={projectsCount * 10} className="mt-2" />
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
                            {teamsCount}
                        </div>
                        <p className="text-sm text-indigo-600">
                            Total teams
                        </p>
                        <div className="flex -space-x-2 overflow-hidden mt-2">
                            {[...Array(Math.min(5, teamsCount))].map((_, i) => (
                                <img
                                    key={i}
                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                    src={`/api/placeholder/${30 + i}/30`}
                                    alt={`Team member ${i + 1}`}
                                />
                            ))}
                            {teamsCount > 5 && (
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium">
                                    +{teamsCount - 5}
                                </span>
                            )}
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
                            {achievementsCount}
                        </div>
                        <p className="text-sm text-indigo-600">
                            Total achievements
                        </p>
                        <div className="flex space-x-1 mt-2">
                            {[...Array(Math.min(5, achievementsCount))].map((_, i) => (
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
                    <CardContent className="space-y-3 flex flex-col">
                      <Link href={"/project"} className="">
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create New Project
                        </Button>
                      </Link>
                        <Link href={"/room"}>
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Update Project Status
                        </Button>
                        </Link>
                        <Link href={"/teams"}>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Invite Team Member
                        </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-indigo-800">
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Notification url={FirebaseUrl}/>
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
                    {projects.length === 0 ? (
                        <p className="text-center text-indigo-600">No projects found.</p>
                    ) : (
                        <ul className="space-y-4">
                            {projects.map((project) => (
                                <li key={project.id} className="flex justify-between items-center cursor-pointer" onClick={() => handleProjectClick(project.id as string)}>
                                    <div>
                                        <h3 className="font-semibold text-indigo-700">
                                            {project.projectName}
                                        </h3>
                                        <p className="text-sm text-indigo-600">
                                            {project.projectType}
                                        </p>
                                    </div>
                                    <Progress value={Math.random() * 100} className="w-1/3" />
                                </li>
                            ))}
                        </ul>
                    )}
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
