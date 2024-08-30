
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Timeline, TimelineItem, TimelineConnector, TimelineHeader, TimelineIcon, TimelineBody } from '@mui/lab';
import { Check, Calendar, DollarSign, AlertTriangle, Target } from 'lucide-react';

const ProjectDetailsPage = ({ projectData, roomData }) => {
  const { data: project } = projectData;
  const { data: room } = roomData;

  const budgetData = Object.entries(project.budget.breakdown).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    amount: value
  }));

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{project.projectName}</CardTitle>
          <CardDescription>{project.projectDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{project.projectType}</Badge>
            {project.softwareTechnologies.map((tech, index) => (
              <Badge key={index} variant="outline">{tech}</Badge>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Mentor:</strong> {project.mentor}</p>
              <p><strong>Room:</strong> {room.room_name}</p>
              <p><strong>Reference:</strong> <a href={project.reference} className="text-blue-500 hover:underline">{project.reference}</a></p>
              <p><strong>Demo Link:</strong> <a href={project.demoLink} className="text-blue-500 hover:underline">{project.demoLink}</a></p>
            </div>
            <div>
              <p><strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
              <p><strong>Last Updated:</strong> {new Date(project.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="features" className="mb-8">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="technical">Technical Requirements</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature List</CardTitle>
            </CardHeader>
            <CardContent>
              {JSON.parse(project.featureList).map((feature, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <h4 className="font-semibold mb-2">Feature {index + 1}</h4>
                  <p><strong>Input:</strong> {feature.input.text}</p>
                  <p><strong>Process:</strong> {feature.process.text}</p>
                  <p><strong>Output:</strong> {feature.output.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical">
          <Card>
            <CardHeader>
              <CardTitle>Technical Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(JSON.parse(project.technicalRequirements)).map(([key, value]) => (
                  <div key={key}>
                    <h4 className="font-semibold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                    <ul className="list-disc list-inside">
                      {value.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline>
                {JSON.parse(project.milestones).map((milestone, index) => (
                  <TimelineItem key={index}>
                    {index < JSON.parse(project.milestones).length - 1 && <TimelineConnector />}
                    <TimelineHeader>
                      <TimelineIcon>
                        <Calendar className="h-4 w-4" />
                      </TimelineIcon>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-semibold">{milestone.milestone}</h4>
                        <p className="text-xs">{new Date(milestone.dueDate).toLocaleDateString()}</p>
                      </div>
                    </TimelineHeader>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle>Budget Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4"><strong>Total Budget:</strong> ${project.budget.totalAmount.toLocaleString()}</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Risks and Mitigation</CardTitle>
            </CardHeader>
            <CardContent>
              {JSON.parse(project.risks).map((risk, index) => (
                <div key={index} className="mb-4 p-4 border rounded flex items-start">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                  <div>
                    <h4 className="font-semibold">{risk.risk}</h4>
                    <p><strong>Mitigation:</strong> {risk.mitigation}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Success Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              {JSON.parse(project.successMetrics).map((metric, index) => (
                <div key={index} className="mb-4 p-4 border rounded flex items-center">
                  <Target className="mr-2 h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-semibold">{metric.metric}</h4>
                    <p><strong>Target:</strong> {metric.target}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Room Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Room Name:</strong> {room.room_name}</p>
          <p><strong>Objective:</strong> {room.objective}</p>
          <p><strong>Members:</strong></p>
          <ul className="list-disc list-inside">
            {room.room_member.map((member, index) => (
              <li key={index}>{member.users.full_name} ({member.role_name})</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetailsPage;