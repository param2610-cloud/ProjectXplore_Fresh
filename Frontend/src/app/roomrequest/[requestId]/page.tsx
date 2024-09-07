"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Domain } from "../../../../lib/Domain";

const Page = ({ params }: { params: { requestId: string } }) => {
    const [request, setRequest] = useState<any>(null);
    const [room, setRoom] = useState<any>(null);
    const [author, setAuthor] = useState<any>(null);
    const [error, setError] = useState<any>("");
    const router = useRouter();
    const { requestId } = params;
    console.log("Request ID:", requestId);

    useEffect(() => {
        if (requestId) {
            console.log(`Fetching request details for requestId: ${requestId}`);

            // Fetch request details
            axios
                .get(`${Domain}/api/v1/room/get-request`, {
                    params: { id: requestId },
                })
                .then((response) => {
                    console.log("Request details response:", response.data);

                    if (response.data) {
                        setRequest(response.data);

                        // Fetch room details
                        return axios.get(`${Domain}/api/v1/room/get-room`, {
                            params: { id: response.data.roomId },
                        });
                    } else {
                        setError("Request is expired");
                        throw new Error("Request not found");
                    }
                })
                .then((response) => {
                    console.log("Room details response:", response.data);
                    setRoom(response.data);
                    setAuthor(response.data.author);
                })
                .catch((err) => {
                    console.error("Error fetching data:", err);
                    if (err.response && err.response.status === 404) {
                        setError("Request is expired");
                    } else {
                        setError("An error occurred");
                    }
                });
        }
    }, [requestId]);

    const handleAccept = async () => {
        if (!room || !request) {
            console.log(
                "Cannot accept request. Room or request data is missing."
            );
            return;
        }

        console.log("Handling accept request:", {
            roomId: room.id,
            userId: request.receiverId,
        });

        try {
            // Add user to the room
            await axios.post(`${Domain}/api/v1/room/add-room-member`,{roomId:room.id,userId:request.receiverId})

            // Delete the request
            await axios.delete(`${Domain}/api/v1/room/delete-request`, {
                params: { id: request.id },
            });

            console.log("Request accepted and deleted successfully.");
            router.push("/success-page");
        } catch (err) {
            console.error("Failed to accept request:", err);
            setError("Failed to accept request");
        }
    };

    const handleDecline = async () => {
        if (!request) {
            console.log("Cannot decline request. Request data is missing.");
            return;
        }

        console.log("Handling decline request:", { requestId: request.id });

        try {
            // Delete the request
            await axios.delete(`${Domain}/api/requests/delete-request`, {
                params: { id: request.id },
            });

            console.log("Request declined and deleted successfully.");
            router.push("/success-page");
        } catch (err) {
            console.error("Failed to decline request:", err);
            setError("Failed to decline request");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!room || !author) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Room Request</h1>
            <h2>Room Details</h2>
            <p>Name: {room.name}</p>
            <h2>Author Details</h2>
            <p>Name: {author.name}</p>
            <p>Email: {author.email}</p>
            <button onClick={handleAccept}>Accept Request</button>
            <button onClick={handleDecline}>Decline Request</button>
        </div>
    );
};

export default Page;
