'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Domain } from "@/lib/Domain";
import { usePathname } from 'next/navigation';
import { User } from '../SearchDialouge';
import { Rooms } from '@/lib/interface/INTERFACE';
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';



const MemberList = () => {
    const [userId] = useAtom(userAtom);
    const [roomId,setroomId] = useState<string>('')
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
  const [roomDetails, setRoomDetails] = useState<Rooms | null>(null);

  useEffect(() => {
    fetchRoomDetails();
  }, [roomId]);

  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(`${Domain}/api/v1/room/get-room-data-by-id`, {
        params: { roomId: roomId },
      });
      console.log(response.data);
      
      setRoomDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching room details:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch room members. Please try again.',
      });
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
        axios.delete(`${Domain}/api/v1/room/remove-member`, {
            data: {
              room_id: roomId,
              user_id: memberId,
            }
          })
          .then(response => {
              toast({
                title: 'Member Removed',
                description: 'The member has been removed from the room.',
              });
            console.log(response.data);
            fetchRoomDetails(); // Refresh the member list
          })
          .catch(error => {
            console.error('Error removing member:', error);
          });
    } catch (error) {
      console.error('Error removing member:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove member. Please try again.',
      });
    }
  };

  if (!roomDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col p-10 gap-4">
      <h2 className="text-2xl font-bold">Room Members</h2>
      
      <Table>
        <TableCaption>List of members in {roomDetails.room_name}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roomDetails.room_member.map((member,index) => (
            <TableRow key={index}>
              <TableCell>{member.users?.full_name}</TableCell>
              <TableCell>{member.users?.email}</TableCell>
              <TableCell>{member.user_id === roomDetails.owner_id ? 'Owner' : 'Member'}</TableCell>
              <TableCell>
                {member.user_id !== roomDetails.owner_id && member.user_id!==userId && (
                  <Button 
                    variant="destructive" 
                    onClick={() => member.user_id?handleRemoveMember(member.user_id):null}
                  >
                    Remove
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberList;