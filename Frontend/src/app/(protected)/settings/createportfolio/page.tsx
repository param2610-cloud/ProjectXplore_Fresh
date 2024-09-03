// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Domain } from '@/lib/Domain';
import UseAuth from '@/lib/hooks/UseUser';
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';



const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

const DeveloperPortfolioForm = () => {
  const {loading,authenticated} = UseAuth()
  const [userId]= useAtom(userAtom)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [activeTab, setActiveTab] = useState('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Handle image upload to Cloudinary
      if (data.profilePicture[0]) {
        const imageFormData = new FormData();
        imageFormData.append('file', data.profilePicture[0]);
        imageFormData.append('upload_preset', UPLOAD_PRESET);
        
        const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: imageFormData
        });

        const imageData = await cloudinaryResponse.json();
        data.profilePicture = imageData.secure_url;
      }

      console.log(data);
      
      // Send data to backend API
      const response = await fetch(`${Domain}/api/v1/portfolio/portfolio?userId=${userId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
        body: JSON.stringify(data),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to submit portfolio');
      }
      

      setSubmitStatus({ type: 'success', message: 'Portfolio submitted successfully!' });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to submit portfolio. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Developer Portfolio Form</CardTitle>
          <CardDescription>Fill in your information to create your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[500px] w-full rounded-md border p-4 mt-4">
              <TabsContent value="personal">
                <div className="space-y-4">
                  
                  <div>
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <Input id="profilePicture" type="file" {...register("profilePicture")} />
                  </div>
                  <div>
                    <Label htmlFor="title">Title/Role</Label>
                    <Input id="title" {...register("title", { required: "Title is required" })} />
                    {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="bio">Brief Bio</Label>
                    <Textarea id="bio" {...register("bio", { required: "Bio is required" })} />
                    {errors.bio && <span className="text-red-500">{errors.bio.message}</span>}
                  </div>
                 
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" {...register("location")} />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input id="linkedin" {...register("linkedin")} />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input id="github" {...register("github")} />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter URL (Optional)</Label>
                    <Input id="twitter" {...register("twitter")} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="skills">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="technicalSkills">Technical Skills (comma-separated)</Label>
                    <Textarea id="technicalSkills" {...register("technicalSkills", { required: "Technical skills are required" })} />
                    {errors.technicalSkills && <span className="text-red-500">{errors.technicalSkills.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="softSkills">Soft Skills (comma-separated)</Label>
                    <Textarea id="softSkills" {...register("softSkills", { required: "Soft skills are required" })} />
                    {errors.softSkills && <span className="text-red-500">{errors.softSkills.message}</span>}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="projects">
                <Accordion type="multiple" className="w-full">
                  {[0, 1, 2].map((index) => (
                    <AccordionItem value={`project-${index}`} key={index}>
                      <AccordionTrigger>Project {index + 1}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`projectName${index}`}>Project Name</Label>
                            <Input id={`projectName${index}`} {...register(`projects[${index}].name`)} />
                          </div>
                          <div>
                            <Label htmlFor={`projectDescription${index}`}>Description</Label>
                            <Textarea id={`projectDescription${index}`} {...register(`projects[${index}].description`)} />
                          </div>
                          <div>
                            <Label htmlFor={`projectTechnologies${index}`}>Technologies Used (comma-separated)</Label>
                            <Input id={`projectTechnologies${index}`} {...register(`projects[${index}].technologies`)} />
                          </div>
                          <div>
                            <Label htmlFor={`projectRole${index}`}>Your Role</Label>
                            <Input id={`projectRole${index}`} {...register(`projects[${index}].role`)} />
                          </div>
                          <div>
                            <Label htmlFor={`projectDemo${index}`}>Demo Link</Label>
                            <Input id={`projectDemo${index}`} {...register(`projects[${index}].demoLink`)} />
                          </div>
                          <div>
                            <Label htmlFor={`projectGithub${index}`}>GitHub Link</Label>
                            <Input id={`projectGithub${index}`} {...register(`projects[${index}].githubLink`)} />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              <TabsContent value="experience">
                <Accordion type="multiple" className="w-full">
                  {[0, 1, 2].map((index) => (
                    <AccordionItem value={`experience-${index}`} key={index}>
                      <AccordionTrigger>Experience {index + 1}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`jobTitle${index}`}>Job Title</Label>
                            <Input id={`jobTitle${index}`} {...register(`experience[${index}].jobTitle`)} />
                          </div>
                          <div>
                            <Label htmlFor={`company${index}`}>Company</Label>
                            <Input id={`company${index}`} {...register(`experience[${index}].company`)} />
                          </div>
                          <div>
                            <Label htmlFor={`duration${index}`}>Duration</Label>
                            <Input id={`duration${index}`} {...register(`experience[${index}].duration`)} />
                          </div>
                          <div>
                            <Label htmlFor={`responsibilities${index}`}>Responsibilities</Label>
                            <Textarea id={`responsibilities${index}`} {...register(`experience[${index}].responsibilities`)} />
                          </div>
                          <div>
                            <Label htmlFor={`expTechnologies${index}`}>Technologies Used (comma-separated)</Label>
                            <Input id={`expTechnologies${index}`} {...register(`experience[${index}].technologies`)} />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              <TabsContent value="education">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="degree">Degree</Label>
                    <Input id="degree" {...register("education.degree", { required: "Degree is required" })} />
                    {errors.education?.degree && <span className="text-red-500">{errors.education.degree.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="institution">Institution</Label>
                    <Input id="institution" {...register("education.institution", { required: "Institution is required" })} />
                    {errors.education?.institution && <span className="text-red-500">{errors.education.institution.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="graduationDate">Graduation Date</Label>
                    <Input id="graduationDate" {...register("education.graduationDate", { required: "Graduation date is required" })} />
                    {errors.education?.graduationDate && <span className="text-red-500">{errors.education.graduationDate.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="relevantCourses">Relevant Courses (comma-separated)</Label>
                    <Textarea id="relevantCourses" {...register("education.relevantCourses")} />
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Portfolio'}
          </Button>
        </CardFooter>
      </Card>
      {submitStatus && (
        <Alert className="mt-4" variant={submitStatus.type === 'success' ? 'default' : 'destructive'}>
          <AlertTitle>{submitStatus.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
          <AlertDescription>{submitStatus.message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default DeveloperPortfolioForm;