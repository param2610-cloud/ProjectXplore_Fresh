'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Domain } from '@/lib/Domain';
import UseAuth from '@/lib/hooks/UseUser';
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';

interface User {
  full_name: string;
  email: string;
  institutionId: string;
}

interface Student {
  id: string;
  studentId: string;
  user: User;
  verificationStatus:boolean;
}

interface Project {
  id: string;
  projectName: string;
  projectDescription: string;
  mentor: string;
  reference: string;
  demoLink: string;
}

const MentorDashboard = () => {
  const {loading,authenticated} = UseAuth();
  const [userId] = useAtom(userAtom)
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState<Student[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const institutionId = 'd9f14849-9783-44eb-85f1-7dcf35ce18ec';

  // Fetch students list
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${Domain}/api/v1/mentor/getallstudent?institutionId=${institutionId}`);
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch project list
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${Domain}/api/v1/mentor/project-list?institutionId=${institutionId}`);
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Approve student
  const handleApprove = async (id: string) => {
    try {
      await axios.post(`${Domain}/api/v1/mentor/change-verification`, { id });
      alert('Student approved successfully');
      fetchStudents(); // Refresh student list
    } catch (error) {
      console.error('Error approving student:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'students') {
      fetchStudents();
    } else if (activeTab === 'projects') {
      fetchProjects();
    }
  }, [activeTab]);
  // if(userId===)
  return (
    <div className="container mx-auto p-4 mt-[60px]">
      <Tabs defaultValue="students" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students">
          <h2 className="text-xl font-semibold mb-4">List of Students</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Institution ID</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Approve</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border p-2">{student.user.full_name}</td>
                  <td className="border p-2">{student.studentId}</td>
                  <td className="border p-2">{student.user.email}</td>
                  <td className="border p-2">
                    <Button onClick={() => handleApprove(student.id)} disabled={student.verificationStatus?true:false}>Approve</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <h2 className="text-xl font-semibold mb-4">List of Projects</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.id} className="mb-4 border p-4">
                <h3 className="text-lg font-bold">{project.projectName}</h3>
                <p>{project.projectDescription}</p>
                <p><strong>Mentor:</strong> {project.mentor}</p>
                <p><a href={project.reference} target="_blank" className="underline">Reference</a></p>
                <p><a href={project.demoLink} target="_blank" className="underline">Demo</a></p>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorDashboard;
