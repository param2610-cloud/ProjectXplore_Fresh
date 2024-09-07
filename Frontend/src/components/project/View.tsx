import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Timeline } from "@/components/ui/timeline";
import { AlertTriangle, Anvil, Calendar, Code, Database, DollarSign, MessageSquare, Server, Target, User } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectData,media } from '../../../lib/interface/INTERFACE';
import Image from 'next/image';

const ProjectDetailsPage = ({ projectData }:{projectData:ProjectData}) => {
  const budgetData = [
    { name: 'Total Budget', amount: projectData.budget?.totalAmount || 0 }
  ];

  const timelineData = projectData.milestones.map((milestone) => ({
    title: new Date(milestone.dueDate).getFullYear().toString(),
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-sm font-semibold mb-2">
          {milestone.name}
        </p>
        <p className="text-neutral-700 dark:text-neutral-300 text-xs mb-2">
          {milestone.description}
        </p>
        <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs">
          <Calendar className="h-4 w-4" />
          {new Date(milestone.dueDate).toLocaleDateString()}
        </div>
      </div>
    ),
  }));

  const MediaDisplay = ({ media }:{media:media}) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {media?.images?.map((image, index) => (
        <Image height={192} width={0} style={{objectFit:'cover'}} key={index} src={image} alt={`Image ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
      ))}
      {media?.videos?.map((video, index) => (
        <video key={index} src={video} controls className="w-full h-48 object-cover rounded-lg">
          Your browser does not support the video tag.
        </video>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold">{projectData.projectName}</CardTitle>
              <CardDescription className="mt-2">{projectData.projectDescription}</CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg">{projectData.projectType}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p><strong>Mentor:</strong> {projectData.mentor}</p>
              <p><strong>Room:</strong> {projectData?.room?.room_name}</p>
              <p><strong>Reference:</strong> <a href={projectData.reference} className="text-blue-500 hover:underline">{projectData.reference}</a></p>
              <p><strong>Demo Link:</strong> <a href={projectData.demoLink} className="text-blue-500 hover:underline">{projectData.demoLink}</a></p>
            </div>
            <div>
              <p><strong>Created:</strong> {new Date(projectData.createdAt).toLocaleDateString()}</p>
              <p><strong>Last Updated:</strong> {new Date(projectData.updatedAt).toLocaleDateString()}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {projectData.softwareTechnologies.map((tech, index) => (
                  <Badge key={index} variant="outline">{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="features" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="risks">Risks</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>Feature List</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {projectData.features.map((feature, index) => (
                      <AccordionItem key={index} value={`feature-${index}`}>
                        <AccordionTrigger>Feature {index + 1}</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Input</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p>{feature.inputs.text}</p>
                                <MediaDisplay media={feature.inputs.media} />
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Process</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p>{feature?.processes?.text}</p>
                                <MediaDisplay media={feature.processes.media} />
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-sm">Output</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p>{feature.outputs.text}</p>
                                <MediaDisplay media={feature.outputs.media} />
                              </CardContent>
                            </Card>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: "Programming Languages", icon: Code, items: projectData.technicalRequirements.programmingLanguages },
                      { title: "Databases", icon: Database, items: projectData.technicalRequirements.databases },
                      { title: "Frameworks", icon: Server, items: projectData.technicalRequirements.frameworks },
                      { title: "Infrastructure", icon: Server, items: projectData.technicalRequirements.infrastructure },
                      { title: "Tools", icon: Anvil, items: projectData.technicalRequirements.tools }
                    ].map((section, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center">
                            <section.icon className="mr-2 h-4 w-4" /> {section.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside">
                            {section.items.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
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
                  <Timeline data={timelineData} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="budget">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-2xl font-bold flex items-center">
                    <DollarSign className="inline-block mr-2" />
                    {projectData.budget.totalAmount?.toLocaleString()}
                  </p>
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead>Mitigation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projectData.risks.map((risk, index) => (
                        <TableRow key={index}>
                          <TableCell>{risk.description}</TableCell>
                          <TableCell>
                            <Badge variant={risk.impact === 'high' ? 'destructive' : 'secondary'}>
                              {risk.impact}
                            </Badge>
                          </TableCell>
                          <TableCell>{risk.mitigation}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics">
              <Card>
                <CardHeader>
                  <CardTitle>Success Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectData.successMetrics.map((metric, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <Target className="mr-2 h-5 w-5 text-green-500" />
                            {metric.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p><strong>Description:</strong> {metric.description}</p>
                          <p><strong>Target Value:</strong> {metric.targetValue}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Room Name:</strong> {projectData?.room?.room_name}</p>
              <p><strong>Objective:</strong> {projectData?.room?.objective}</p>
              <h4 className="font-semibold mt-4 mb-2">Members:</h4>
              <ScrollArea className="h-[200px]">
                {projectData?.room?.room_member.map((member, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4">
                    <User className="h-10 w-10 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">{member?.users?.full_name}</p>
                      <p className="text-xs text-gray-500">{member.role_name}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Room Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {projectData?.room?.update?.map((update, index) => (
                  <Card key={index} className="mb-4">
                    <CardContent className="pt-6">
                      <p className="text-sm">{update.text}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(update.createdAt).toLocaleString()}
                      </p>
                      <MediaDisplay media={{ images: update?.image_link, videos: update.video_link }} />
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;