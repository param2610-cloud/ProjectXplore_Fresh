import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    CollaborationRequestReviews,
    CollaborationRequests,
    Rooms,
} from "@/lib/interface/INTERFACE";
import { Button } from "../ui/button";
import axios from "axios";
import { Domain, FirebaseUrl, FrontendDomain } from "@/lib/Domain";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { usePathname } from "next/navigation";
import CopyButton from "../ui/Copytoclipboard";
import useFirebaseNotifications from "@/lib/control/FirebaseNotification";
import { Loader2 } from "lucide-react";

const RequestList = () => {
    const [roomId, setroomId] = useState<string>("");
    const { toast } = useToast();
    const pathname = usePathname();
    const parts = pathname.split("/");
    useEffect(() => {
        const roomIdFromPath = parts[2];
        if (roomIdFromPath && roomIdFromPath !== roomId) {
            setroomId(roomIdFromPath);
        }
        console.log(roomId);
    }, [pathname, roomId]);
    const [roomDetails, setRoomDetails] = useState<Rooms>();
    const [pastReq, setPastReq] = useState<CollaborationRequests | null>(null);
    const [responses, setResponses] = useState<CollaborationRequestReviews[]>(
        []
    );
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [requestForm, setRequestForm] = useState({
        request_text: "",
        domain_expertise_required: "",
    });
    const [loading,setloading] = useState<boolean>(false)
    const {notifications,error} = useFirebaseNotifications(FirebaseUrl)
    useEffect(() => {
        if (roomId) {
            setloading(true)
            console.log(roomId);
            fetchRequestDetails();
            setloading(false)
        }
    }, [roomId,notifications]);

    const fetchRequestDetails = async () => {
        try {
            console.log("trigger");

            const roomResponse = await axios.get(
                `${Domain}/api/v1/room/get-room-data-by-id`,
                {
                    params: { roomId: roomId },
                }
            );
            console.log(roomResponse.data);

            setRoomDetails(roomResponse.data.data);

            const reqResponse = await axios.get(
                `${Domain}/api/v1/room/req-record-of-room`,
                {
                    params: { room_id: roomId },
                }
            );
            console.log(reqResponse);

            setPastReq(reqResponse.data.data);

            if (reqResponse.data.data?.request_id) {
                const reviewsResponse = await axios.get(
                    `${Domain}/api/v1/room/get-all-request-review`,
                    {
                        params: {
                            request_id: reqResponse.data.data.request_id,
                        },
                    }
                );
                console.log(reviewsResponse);

                setResponses(reviewsResponse.data.data);
            }
        } catch (error) {
            console.error("Error fetching request details:", error);
            toast({
                title: "Error",
                description:
                    "Failed to fetch request details. Please try again.",
            });
        }
    };

    const handleCreateRequest = async (e: React.FormEvent) => {
        console.log("trigger");
        
        e.preventDefault();
        try {
            const response = await axios.post(
                `${Domain}/api/v1/room/create-request`,
                {
                    user_id: roomDetails?.owner_id,
                    room_id: roomId,
                    request_text: requestForm.request_text,
                    domain_expertise_required:
                        requestForm.domain_expertise_required,
                    status: "active",
                }
            );
            console.log(response);
            
            if (response.status === 200) {
                toast({
                    title: "Request Created",
                    description:
                        "Your collaboration request has been created successfully.",
                });
                setShowRequestForm(false);
                fetchRequestDetails();
            }
        } catch (error) {
            console.error("Error creating request:", error);
            toast({
                title: "Error",
                description: "Failed to create request. Please try again.",
            });
        }
    };

    const handleReviewAction = async (
        review_id: string,
        review_status: "approved" | "rejected",
        role_name: string
    ) => {
        try {
            const response = await axios.post(
                `${Domain}/api/v1/room/req-rev-status-update`,
                {
                    review_id,
                    review_status,
                    role_name,
                }
            );

            if (response.status === 200) {
                toast({
                    title: `Request ${review_status}`,
                    description: `The collaboration request has been ${review_status}.`,
                });
                fetchRequestDetails();
            }
        } catch (error) {
            console.error("Error updating request review:", error);
            toast({
                title: "Error",
                description:
                    "Failed to update request review. Please try again.",
            });
        }
    };
    const reqlink = `${FrontendDomain}/room/${roomId}/request`;
    return (
        <div className="w-full h-full flex flex-col p-10 gap-4">
            <h2 className="text-2xl font-bold">Request List</h2>

            {!pastReq && !showRequestForm && (
                <Button onClick={() => setShowRequestForm(true)}>
                    Create New Request
                </Button>
            )}

            {showRequestForm && (
                <form onSubmit={handleCreateRequest} className="space-y-4">
                    <Textarea
                        placeholder="Request text"
                        value={requestForm.request_text}
                        onChange={(e) =>
                            setRequestForm({
                                ...requestForm,
                                request_text: e.target.value,
                            })
                        }
                        required
                    />
                    <Input
                        placeholder="Domain expertise required"
                        value={requestForm.domain_expertise_required}
                        onChange={(e) =>
                            setRequestForm({
                                ...requestForm,
                                domain_expertise_required: e.target.value,
                            })
                        }
                        required
                    />
                    <Button type="submit">Submit Request</Button>
                </form>
            )}

            {pastReq && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Current Request</h3>
                    <p>
                        <strong>Request Text:</strong> {pastReq.request_text}
                    </p>
                    <p>
                        <strong>Domain Expertise Required:</strong>{" "}
                        {pastReq.domain_expertise_required}
                    </p>
                    <p>
                        <strong>Status:</strong> {pastReq.status}
                    </p>
                    <p className="flex gap-1 whitespace-nowrap items-center cursor-pointer">
                        <strong>Link:</strong>{" "}
                        {`${FrontendDomain}/room/${roomId}/request`}
                        <CopyButton
                            text={reqlink as string}
                            className=""
                            size={18}
                        />
                    </p>
                </div>
            )}
            {
                loading && 
                <Loader2 className="w-6 h-6 animate-spin"/>
            }
            {responses.length > 0 && (
                <Table>
                    <TableCaption>Collaboration Request Reviews</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Reviewer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Comments</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {responses.map((response) => {
                            if (response.review_status === null ) {
                                return (
                                    <TableRow key={response.review_id}>
                                        <TableCell>
                                            {response.users_collaboration_request_reviews_collaborator_idTousers.full_name}
                                        </TableCell>
                                        <TableCell>
                                            {response.review_status}
                                        </TableCell>
                                        <TableCell>
                                            {response.comments}
                                        </TableCell>
                                        <TableCell className="flex gap-4">
                                            <Button
                                                onClick={() =>
                                                    handleReviewAction(
                                                        response.review_id,
                                                        "approved",
                                                        "member"
                                                    )
                                                }
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleReviewAction(
                                                        response.review_id,
                                                        "rejected",
                                                        "member"
                                                    )
                                                }
                                            >
                                                Reject
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default RequestList;
