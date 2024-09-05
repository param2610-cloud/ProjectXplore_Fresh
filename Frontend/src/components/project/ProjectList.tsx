"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import UseAuth from "@/lib/hooks/UseAuth";
import userAtom from '@/lib/atoms/UserAtom';
import { useToast } from "../ui/use-toast";
import { ProjectData } from "@/lib/interface/INTERFACE";

const ProjectList = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [error, setError] = useState(null);
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const router = useRouter();
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
                    console.log(data);
                    
                    for (const rooms of data.data.rooms) {
                      for(const project of rooms.New_Project_table){
                          console.log("Data of room ", project);
                          setProjects((prev: ProjectData[]) => [
                            ...prev,
                            project,
                          ]);
                        }
                    }
                } catch (err) {
                    toast({
                        title: "Error",
                        description:
                            "Error fetching projects. Please try again later.",
                    });
                    console.error("Error fetching projects:", err);
                }
            }
        };

        fetchProjects();
    }, [authenticated, userId]);

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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
            {projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => {
                console.log(project);
                
                if (typeof project.id === 'string') {
                  return (
                    <Card
                      key={project.id}
                      className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                      onClick={() => handleProjectClick(project.id as string)} // Ensures project.id is string
                    >
                      <CardHeader>
                        <CardTitle>{project.projectName}</CardTitle>
                        <CardDescription>{project.projectType}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          {project.projectDescription}
                        </p>
                        <p className="mt-2 text-sm font-semibold">
                          Mentor: {project.mentor}
                        </p>
                      </CardContent>
                    </Card>
                  );
                }else{

                    <div>
                      adad
                    </div>
                }
              })}
            </div>
            
            )}
        </div>
    );
};

export default ProjectList;
