import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex lg:w-[calc(100vw-280px)] md:w-[calc(100vw-220px)]   h-full bg-background">
            <div>
                <div>
                    <Link href={"/settings/achievements"}>Achievements</Link>
                </div>
                <div>Project Settings</div>
                <div>Room Settings</div>
                <div>
                  <Link href={"/settings/createportfolio"}>
                  Create Portfolio
                  </Link>
                </div>
                <div>
                  <Link href={`/yourprofile`}>
                  Your Portfolio
                  </Link>
                </div>
            </div>
            <div className="w-full flex-1">{children}</div>
        </div>
    );
};

export default layout;
