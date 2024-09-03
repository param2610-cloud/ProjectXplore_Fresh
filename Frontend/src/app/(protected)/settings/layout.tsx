import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex lg:w-[calc(100vw-280px)] md:w-[calc(100vw-220px)] h-full bg-background">
            <div className="w-56 bg-background  text-foreground p-4">
                <div className="mb-4">
                    <Link href="/settings/achievements" className="block text-foreground hover:text-gray-300">
                        Achievements
                    </Link>
                </div>
                <div className="mb-4">
                    <Link href="/settings" className="block text-foreground hover:text-gray-300">
                        Project Settings
                    </Link>
                </div>
                <div className="mb-4">
                    <Link href="/roomsettings" className="block text-foreground hover:text-gray-300">
                        Room Settings
                    </Link>
                </div>
                <div className="mb-4">
                    <Link href="/settings/createportfolio" className="block text-foreground hover:text-gray-300">
                        Create Portfolio
                    </Link>
                </div>
                <div>
                    <Link href="/yourprofile" className="block text-foreground hover:text-gray-300">
                        Your Portfolio
                    </Link>
                </div>
            </div>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default Layout;
