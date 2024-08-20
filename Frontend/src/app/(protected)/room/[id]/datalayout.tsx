"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { domain } from "@/lib/domain";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Datalayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    // State to store room data
    const [roomData, setRoomData] = useState<any>(null); // Replace `any` with a specific type if you have one
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchRoomData = async () => {
                try {
                    const response = await axios.get(
                        `${domain}/api/v1/room/get-room`,
                        { params: { id } }
                    );
                    setRoomData(response.data);
                    console.log(response.data);
                } catch (error) {
                    setError("Failed to fetch room data");
                } finally {
                    setLoading(false);
                }
            };

            fetchRoomData();
        }
    }, [id]);

    return (
        <div className="w-screen min-h-screen max-h-full">
            <div id="header" className="top-0 right-0 left-0 w-screen h-[160px] bg-primary">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {roomData && (
                    <div className="p-4 text-primary-foreground">
                        <div id="roomname" className="text-[30px] font-extrabold">
                            {roomData.name}
                        </div>
                        <div className="ml-2">
                            {roomData.members.length} members
                        </div>
                    </div>
                )}
                <div className="w-screen h-full flex space-x-4 p-4">
                    <Button onClick={() => router.push(`/room/${id}/home`)}>Home</Button>
                    <Button onClick={() => router.push(`/room/${id}/task`)}>Task</Button>
                    <Button onClick={() => router.push(`/room/${id}/members`)}>Members</Button>
                    <Button onClick={() => router.push(`/room/${id}/chat`)}>Chat</Button>
                </div>
            </div>
            {children}
        </div>
    );
}
