import React, { SetStateAction, useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"; // Adjust imports as needed
import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Domain } from "../../lib/Domain";

export interface User {
    id: number;
    name: string;
    email: string;
    followers: {
        followerId: number;
    }[];
    projects: {
        id: number;
    }[];
}
interface SearchDialogProps {
    selectedUsers: User[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const SearchDialog = ({selectedUsers,setSelectedUsers}:SearchDialogProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${Domain}/api/v1/room/search`, {
                params: { query: searchQuery },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };



    const handleAddUser = (user: User) => {
        setSelectedUsers((prev) => [...prev, user]);
    };
    const handleRemoveUser = (user: User) => {
        setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
    };

    return (
        <>
            <div className="flex gap-4">
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users..."
                />
                <Button onClick={handleSearch}>Find</Button>
            </div>
            <Table>
                <TableCaption>A list of users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Follower</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.followers.length}</TableCell>
                            <TableCell>{user.projects.length}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    onClick={() => handleAddUser(user)}
                                    disabled={
                                        selectedUsers.some(
                                            (u) => u.id === user.id
                                        ) 
                                    }
                                >
                                    Add
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Table>
                <TableCaption>A list of selected users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Follower</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {selectedUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.followers.length}</TableCell>
                            <TableCell>{user.projects.length}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="destructive"
                                    onClick={() => handleRemoveUser(user)}
                                >
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default SearchDialog;
