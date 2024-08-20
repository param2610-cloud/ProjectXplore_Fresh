'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { domain } from '@/lib/domain'; 
import { Button } from '@/components/ui/button'; 
import {  Input} from '@/components/ui/input'; 
import { Label } from '@/components/ui/label'; 

const Member = () => {
  const { id } = useParams(); // Extract the room ID from the URL
  const [members, setMembers] = useState<any[]>([]); // Replace `any` with a specific type if you have one
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newMemberId, setNewMemberId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]); // Replace `any` with a specific type

  // Fetch room members
  useEffect(() => {
    if (id) {
      const fetchRoomMembers = async () => {
        try {
          const response = await axios.get(`${domain}/api/v1/room/get-room`, { params: { id } });
          console.log(response);
          
          setMembers(response.data.members);
        } catch (error) {
          setError('Failed to fetch room members');
        } finally {
          setLoading(false);
        }
      };

      fetchRoomMembers();
    }
  }, [id]);

  // Search for users
  useEffect(() => {
    if (searchQuery) {
      const searchUsers = async () => {
        try {
          const response = await axios.get(`${domain}/api/v1/search`, { params: { query: searchQuery } });
          setSearchResults(response.data);
        } catch (error) {
          setError('Failed to search users');
        }
      };

      searchUsers();
    }
  }, [searchQuery]);

  // Add member to room
  const handleAddMember = async () => {
    if (!newMemberId || !id) return;
    try {
      await axios.post(`${domain}/api/v1/add-room-member`, { roomId: id, userId: newMemberId });
      setMembers([...members, { id: newMemberId }]); // Update state with the new member
      setNewMemberId('');
    } catch (error) {
      setError('Failed to add member');
    }
  };

  // Delete member from room
  const handleDeleteMember = async (memberId: string) => {
    if (!id) return;
    try {
      await axios.delete(`${domain}/api/v1/delete-request`, { params: { id: memberId } });
      setMembers(members.filter(member => member.id !== memberId)); // Update state by removing the member
    } catch (error) {
      setError('Failed to delete member');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Members</h1>

      <div className="my-4">
        <Label htmlFor="search">Search Users:</Label>
        <Input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for users"
        />
        <div className="mt-2">
          <h2 className="text-lg font-semibold">Search Results:</h2>
          {searchResults.map(user => (
            <div key={user.id} className="flex justify-between items-center">
              <span>{user.name}</span>
              <Button onClick={() => setNewMemberId(user.id)}>Add</Button>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4">
        <h2 className="text-lg font-semibold">Add Member:</h2>
        <div className="flex gap-2">
          <Input
            type="text"
            value={newMemberId}
            onChange={(e) => setNewMemberId(e.target.value)}
            placeholder="Enter user ID"
          />
          <Button onClick={handleAddMember}>Add Member</Button>
        </div>
      </div>

      <div className="my-4">
        <h2 className="text-lg font-semibold">Current Members:</h2>
        <ul>
          {members.map(member => (
            <li key={member.user.id} className="flex justify-between items-center">
              <span>{member.user.name || member.user.id}</span>
              <Button onClick={() => handleDeleteMember(member.user.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Member;
