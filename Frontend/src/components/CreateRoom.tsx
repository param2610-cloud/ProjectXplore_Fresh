// pages/create-room.tsx

import React, { useState } from "react";
import SearchDialog, { User } from "../components/SearchDialouge";
import { Input } from "../components/ui/input"; 
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button"; 
import axios from "axios";
import { Domain } from "../lib/Domain"; 
import { useAtom } from "jotai";
import userAtom from "../lib/atoms/UserAtom"; 
import { useToast } from "../components/ui/use-toast";

const CreateRoomPage = () => {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [roomName, setRoomName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [user] = useAtom(userAtom);
    const { toast } = useToast();

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const response = await axios.post(`${Domain}/api/v1/room/create`, {
                name: roomName,
                authorId: user,
            });
            console.log(response);
            

            const roomId = response.data.id;

            for (const recieveruser of selectedUsers) {
                await axios.post(`${Domain}/api/v1/room/send-email`, {
                    senderId: user,
                    receiverId: recieveruser.id,
                    roomId,
                });
            }

            toast({
                title: "Room Created",
                description: "The room has been created and invitations sent.",
            });
        } catch (error) {
            console.error("Error creating room:", error);
            toast({
                title: "Error",
                description: "There was an error creating the room.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Create Room</h1>
            </div>
            <div className="mb-4">
                <Label className="text-lg">Room Name</Label>
                <Input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter room name"
                />
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Find Member</h2>
                <SearchDialog selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
            </div>
            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating..." : "Create"}
            </Button>
        </div>
    );
};

export default CreateRoomPage;
