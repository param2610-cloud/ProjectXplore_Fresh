'use client'
import React, { useEffect, useState } from 'react';
import { Domain } from '../../../lib/Domain';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const ProjectHistory = ({team_id}:{team_id:string}) => {
  const [projects, setProjects] = useState<any[]>([]);

  // Fetch project history from the API
  useEffect(() => {
    const fetchProjectHistory = async () => {
      try {
        const response = await fetch(`${Domain}/api/v1/team/project-history?teamId=${team_id}`);
        const data = await response.json();
        
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching project history:", error);
      }
    };

    fetchProjectHistory();
  }, [team_id]);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Card key={project.id} className="shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle>{project.projectName}</CardTitle>
            <CardDescription>{project.mentor}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Description:</strong> {project.projectDescription}</p>
            <p><strong>Reference:</strong> <a href={project.reference} target="_blank" rel="noopener noreferrer">{project.reference}</a></p>
            <p><strong>Demo:</strong> <a href={project.demoLink} target="_blank" rel="noopener noreferrer">{project.demoLink}</a></p>
            <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectHistory;
