"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Domain } from "@/lib/Domain";
import UseAuth from "@/lib/hooks/UseAuth";
import { userAtom } from '@/lib/atoms/UserAtom';

interface CollaborationRequest {
    request_id: string;
    request_text: string;
    domain_expertise_required: string;
    status: string;
}

interface RoomDetails {
    room_id: string;
    room_name: string;
    owner_id: string;
    room_member: Array<{ user_id: string }>;
    collaboration_requests: CollaborationRequest[];
}

const RequestPage = () => {
    const router = useRouter();
    const [roomId, setroomId] = useState<string>("");
    const pathname = usePathname();
    const parts = pathname.split("/");
    useEffect(() => {
        const roomIdFromPath = parts[2];
        if (roomIdFromPath && roomIdFromPath !== roomId) {
            setroomId(roomIdFromPath);
        }
        console.log(roomId);
    }, [pathname, roomId]);
    const { toast } = useToast();
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
    const [afterActionMessage,setafterActionMessage]=useState<string>('')

    useEffect(() => {
        if (!authenticated && !loading) {
            router.push("/auth/signin");
        }
    }, [authenticated, loading, router]);

    useEffect(() => {
        if (roomId && userId) {
            fetchRoomDetails();
        }
    }, [roomId, userId]);

    const fetchRoomDetails = async () => {
        try {
            const response = await axios.get(
                `${Domain}/api/v1/room/get-room-data-by-id`,
                {
                    params: { roomId: roomId },
                }
            );
            setRoomDetails(response.data.data);
        } catch (error) {
            console.error("Error fetching room details:", error);
            toast({
                title: "Error",
                description: "Failed to fetch room details. Please try again.",
            });
        }
    };

    const handleAcceptRequest = async (requestId: string) => {
        try {
            const response = await axios.post(
                `${Domain}/api/v1/room/accept-request`,
                null,
                {
                    params: {
                        request_id: requestId,
                        collaborator_id: userId,
                        comments: "Interested in joining the collaboration.",
                    },
                }
            );

            if (response.status === 200) {
                setafterActionMessage("accept")
                toast({
                    title: "Request Sent",
                    description:
                        "Your request has been sent. You will receive an email with the owner's decision.",
                });
            }
        } catch (error) {
            console.error("Error accepting request:", error);
            toast({
                title: "Error",
                description: "Failed to send request. Please try again.",
            });
        }
    };

    const handleRejectRequest = (requestId: string) => {
        // Hide the request from the user's view
        setafterActionMessage("reject")
        setRoomDetails((prevDetails) => {
            if (!prevDetails) return null;
            return {
                ...prevDetails,
                collaboration_requests:
                    prevDetails.collaboration_requests.filter(
                        (request) => request.request_id !== requestId
                    ),
            };
        });
    };

    if (loading || !roomDetails) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return null; // The useEffect will redirect to signin page
    }

    const isOwner = userId === roomDetails.owner_id;
    const isMember = roomDetails.room_member.some(
        (member) => member.user_id === userId
    );

    if (isOwner || isMember) {
        return <div>You are already a member or owner of this room.</div>;
    }

    return (
        <div className="container mx-auto p-4">
           

                <h1 className="text-2xl font-bold mb-4">
                Collaboration Requests for {roomDetails.room_name}
            </h1>
            {roomDetails.collaboration_requests.length > 0 ? (
                <ul className="space-y-4">
                    {roomDetails.collaboration_requests.map((request) => (
                        <li
                        key={request.request_id}
                        className="border p-4 rounded"
                        >
                            <h2 className="text-xl font-semibold">
                                {request.request_text}
                            </h2>
                            <p className="text-gray-600">
                                Expertise required:{" "}
                                {request.domain_expertise_required}
                            </p>
                            <p className="text-gray-600">
                                Status: {request.status}
                            </p>
                            <div className="mt-2 space-x-2">
                                <Button
                                    onClick={() =>
                                        handleAcceptRequest(request.request_id)
                                    }
                                    disabled={afterActionMessage?true:false}
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        handleRejectRequest(request.request_id)
                                    }
                                    disabled={afterActionMessage?true:false}
                                    >
                                    Reject
                                </Button>
                            </div>
                        </li>
                    ))}
                    </ul>
            ) : (
                <p>No collaboration requests available for this room.</p>
            )}
        </div>
    );
};

export default RequestPage;
