'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Rocket, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { globeConfig, sampleArcs } from '@/components/home/Globeconts';
import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";

const World = dynamic(
    () => import("@/components/ui/globe").then((m) => m.World),
    {
        ssr: false,
    }
);
// import { World } from "@/components/ui/globe";
const colors = ["#06b6d4", "#3b82f6", "#6366f1"];


const Hero = () => (
    <div className="min-h-screen bg-black">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="text-2xl font-bold text-white">
                        ProjectXplore
                    </div>
                    <div className="flex gap-4">
                        <Link href={"/auth/signin"}>
                        <Button
                            variant="ghost"
                            className="text-neutral-200 hover:text-white"
                            >
                            Sign In
                        </Button>
                            </Link>
                        <Link href={"/auth/signup"}>
                        <Button
                        >Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>

        {/* Hero Section with Globe */}
        <div className="flex flex-row items-center justify-center py-20 h-screen dark:bg-black bg-black relative w-full">
            <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
                {/* Animated Content */}
                <div className="relative z-20 pt-20 animate-fade-in">
                    <h2 className="text-center text-4xl md:text-6xl font-bold text-white mb-6">
                        Transform Ideas into
                        <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                            Global Impact
                        </span>
                    </h2>
                    <p className="text-center text-base md:text-lg font-normal text-neutral-300 max-w-2xl mt-4 mx-auto">
                        Track, document, and showcase your projects&apos;
                        evolution from conception to completion. Join a
                        worldwide community of innovators and creators.
                    </p>
                    <div className="mt-10 flex gap-4 justify-center">
                        <Button size="lg" className="gap-2">
                            Start Your Journey{" "}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-neutral-200 border-neutral-700"
                        >
                            Explore Projects
                        </Button>
                    </div>
                </div>

                {/* Globe Gradient Overlay */}
                <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-black z-40" />

                {/* Globe Container */}
                <div className="absolute w-full -bottom-20 h-72 md:h-full z-10 bg-black">
                    <World data={sampleArcs} globeConfig={globeConfig} />
                </div>
            </div>
        </div>

        {/* Features Section */}
        <FeatureSection />

        {/* How It Works Section */}
        <div className="bg-black py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-16 text-white">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <Step
                        number="1"
                        title="Create Project"
                        description="Start with your idea, add a headline and description."
                    />
                    <Step
                        number="2"
                        title="Document Progress"
                        description="Update regularly with developments and achievements."
                    />
                    <Step
                        number="3"
                        title="Add Media"
                        description="Attach images and files to visualize your journey."
                    />
                    <Step
                        number="4"
                        title="Share & Showcase"
                        description="Publish your portfolio and inspire others."
                    />
                </div>
            </div>
        </div>
    </div>
);

const FeatureSection = () => (
    <div className="relative bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                    icon={<Rocket className="w-8 h-8" />}
                    title="Project Timeline"
                    description="Document your journey from ideation to completion. Track milestones and progress in real-time."
                />
                <FeatureCard
                    icon={<Book className="w-8 h-8" />}
                    title="Showcase Room"
                    description="Create a dedicated space for your institute's projects. Highlight student achievements."
                />
                <FeatureCard
                    icon={<Users className="w-8 h-8" />}
                    title="Team Portfolio"
                    description="Build your team's online presence. Share achievements and expertise with the world."
                />
            </div>
        </div>
    </div>
);

const FeatureCard = ({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) => (
    <div className="relative w-full h-full">
        <div className="relative w-full h-full">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-400 to-violet-400 transform scale-[0.80] rounded-full blur-3xl opacity-30" />
            <div className="relative shadow-xl bg-neutral-900 border border-neutral-800 px-6 py-8 h-full overflow-hidden rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-blue-400 mb-4">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white relative z-20">
                    {title}
                </h3>
                <p className="text-neutral-300 relative z-20">{description}</p>

                <button className="mt-6 border px-4 py-1 rounded-lg border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors relative z-20">
                    Learn More
                </button>

                <Meteors number={10} />
            </div>
        </div>
    </div>
);

const Step = ({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) => (
    <div className="text-center transform transition-transform duration-300 hover:-translate-y-1">
        <div className="w-12 h-12 rounded-full bg-neutral-800 text-blue-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            {number}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-neutral-300">{description}</p>
    </div>
);

// Add these styles to your global CSS file
const globalStyles = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}
`;

export default Hero;
