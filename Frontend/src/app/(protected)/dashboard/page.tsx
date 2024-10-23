"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Bell,
    PlusCircle,
    Search,
    Rocket,
    Target,
    Users,
    Trophy,
    ArrowRight,
} from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("getting-started");

    // Placeholder project templates
    const projectTemplates = [
        {
            name: "Personal Blog",
            difficulty: "Easy",
            duration: "2-3 days",
            category: "Web Development",
        },
        {
            name: "Task Manager",
            difficulty: "Medium",
            duration: "1 week",
            category: "Productivity",
        },
        {
            name: "Portfolio Site",
            difficulty: "Easy",
            duration: "2-4 days",
            category: "Web Development",
        },
        {
            name: "Weather App",
            difficulty: "Medium",
            duration: "3-5 days",
            category: "Mobile",
        },
    ];

    // Achievement badges
    const badges = [
        {
            name: "First Login",
            icon: <Rocket className="w-6 h-6" />,
            earned: true,
        },
        {
            name: "Profile Complete",
            icon: <Users className="w-6 h-6" />,
            earned: false,
        },
        {
            name: "First Project",
            icon: <Target className="w-6 h-6" />,
            earned: false,
        },
        {
            name: "Team Player",
            icon: <Trophy className="w-6 h-6" />,
            earned: false,
        },
    ];

    return (
        <div className="min-h-screen bg-black/[0.96] relative overflow-hidden">
            <BackgroundBeams />

            <main className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">
                {/* Welcome Header */}
                <div className="mb-12 relative">
                    <TextGenerateEffect
                        words="Welcome to Your Creative Space! 🚀"
                        className="text-4xl font-bold text-white mb-4"
                    />
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Get started on your journey by exploring project
                        templates, joining a team, or creating something
                        entirely new.
                    </p>
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={12}
                        className="absolute right-0 top-0 w-32 h-32"
                        particleColor="#FFFFFF"
                    />
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Link className="w-full h-full" href={"/room/create"}>
                        <Button
                            className="w-full h-24 bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            onClick={() => setActiveTab("templates")}
                        >
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Start New Project
                        </Button>
                    </Link>
                    <Link className="w-full h-full" href={"/teams"}>
                    <Button
                        className="w-full h-24 bg-gradient-to-br from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                        variant="outline"
                    >
                        <Users className="mr-2 h-5 w-5" />
                        Join a Team
                    </Button>
                        </Link>
                        <Link className="w-full h-full" href={"/settings/createportfolio"}>
                    <Button
                        className="w-full h-24 bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        variant="outline"
                        >
                        <Trophy className="mr-2 h-5 w-5" />
                        Complete Profile
                    </Button>
                        </Link>
                </div>

                {/* Project Templates */}
                <Card className="bg-zinc-900/50 border-white/10 mb-8">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-white flex items-center justify-between">
                            Popular Templates
                            <Button variant="ghost" className="text-sm">
                                View All <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projectTemplates.map((template, i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-lg bg-black/40 hover:bg-black/60 transition-all transform hover:scale-102 cursor-pointer border border-white/5 hover:border-white/20"
                                >
                                    <h3 className="font-semibold text-white mb-2">
                                        {template.name}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                                        <span>{template.difficulty}</span>
                                        <span>•</span>
                                        <span>{template.duration}</span>
                                    </div>
                                    <div className="mt-4">
                                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-white">
                                            {template.category}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Achievements Section */}
                <Card className="bg-zinc-900/50 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-white">
                            Getting Started
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {badges.map((badge, i) => (
                                <div
                                    key={i}
                                    className={`p-6 rounded-lg ${
                                        badge.earned
                                            ? "bg-green-900/20"
                                            : "bg-black/40"
                                    } border ${
                                        badge.earned
                                            ? "border-green-500/20"
                                            : "border-white/5"
                                    } text-center`}
                                >
                                    <div
                                        className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                                            badge.earned
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-zinc-800/50 text-zinc-500"
                                        } mb-3`}
                                    >
                                        {badge.icon}
                                    </div>
                                    <h3
                                        className={`font-medium ${
                                            badge.earned
                                                ? "text-green-400"
                                                : "text-zinc-400"
                                        }`}
                                    >
                                        {badge.name}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default Dashboard;
