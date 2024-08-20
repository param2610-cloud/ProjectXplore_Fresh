'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { domain } from '@/lib/domain'; // Adjust the import according to your domain setup

const Home = () => {
  const { id } = useParams(); // Extract the room ID from the URL
  const [roomData, setRoomData] = useState<any>(null); // Replace `any` with a specific type if you have one
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchRoomData = async () => {
        try {
          const response = await axios.get(`${domain}/api/v1/room/get-room`, { params: { id } });
          setRoomData(response.data);
        } catch (error) {
          setError("Failed to fetch room data");
        } finally {
          setLoading(false);
        }
      };

      fetchRoomData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      {roomData ? (
        <div>
          <h1 className="text-2xl font-bold">{roomData.name}</h1>
          <p className="text-lg">Description: {roomData.description || 'No description available'}</p>
          <p className="text-lg">Members: {roomData.members.length}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>No room data available</p>
      )}
    </div>
  );
};

export default Home;
