// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ProjectDetailsPage from '@/components/project/View';
import { Domain } from '../../../../../lib/Domain';
import axios from 'axios';
import { ProjectApiResponse, ProjectData, Rooms } from '../../../../../lib/interface/INTERFACE';

export default function Page() {
  const [roomData, setRoomData] = useState<Rooms|null>(null);
  const [projectData, setProjectData] = useState<ProjectData|null>(null);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      const projectId = pathname.split('/').pop(); // Extract projectId from the URL

      try {
        // Fetch project data to get roomId
        const projectResponse = await axios.get(`${Domain}/api/v1/project/project-info`,{
          params:{
            projectId:projectId
          }
        });
        if (!projectResponse.status === 200) {
          throw new Error('Failed to fetch project data');
        }
        console.log(projectResponse);
        const projectData =projectResponse.data.data;
        setProjectData(projectData);

        // Fetch room data using roomId from project data
        const roomId = projectData.roomId;
        const roomResponse = await axios.get(`${Domain}/api/v1/room/get-room-data`,{
          params:{
            roomId:roomId
          }
        });
        console.log(roomResponse);
        
        if (!roomResponse.status === 200) {
          throw new Error('Failed to fetch room data');
        }
        const roomData =roomResponse.data.data;
        setRoomData(roomData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      }
    };

    fetchData();
  }, [pathname]); // Empty dependency array except for router to trigger only on route change

  if (error) {
    return <div>{error}</div>;
  }

  if (!roomData || !projectData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProjectDetailsPage projectData={projectData} />
    </div>
  );
}
