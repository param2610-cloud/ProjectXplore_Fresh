import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Twitter, MapPin, Calendar, Briefcase, GraduationCap, Mail, Phone } from 'lucide-react';
import { UserPortfolioGetDataResponse } from '../../../lib/interface/INTERFACE';

const DeveloperPortfolio = ({ data }:{data:UserPortfolioGetDataResponse}) => {
  console.log(data);
  
  const {
    full_name,
    email,
    phone_number,
    profile_picture_link,
    portfolio_profilePicture,
    title,
    bio,
    location,
    linkedinUrl,
    githubUrl,
    twitterUrl,
    user_achievements,
    skills,
    experiences,
    education
  } = data;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="text-center mb-8">
        <div className="mb-4">
          <img 
            src={portfolio_profilePicture || profile_picture_link || "/api/placeholder/150/150"} 
            alt={full_name} 
            className="w-32 h-32 rounded-full mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold mb-2">{full_name}</h1>
        {title && <p className="text-xl text-gray-600 mb-2">{title}</p>}
        {location && (
          <p className="flex items-center justify-center text-gray-600 mb-2">
            <MapPin size={16} className="mr-2" /> {location}
          </p>
        )}
        <div className="flex justify-center space-x-4 mb-4">
          {email && (
            <a href={`mailto:${email}`} className="text-blue-600 hover:underline flex items-center">
              <Mail size={16} className="mr-1" /> Email
            </a>
          )}
          {phone_number && (
            <a href={`tel:${phone_number}`} className="text-blue-600 hover:underline flex items-center">
              <Phone size={16} className="mr-1" /> Call
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
              <Linkedin size={16} className="mr-1" /> LinkedIn
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
              <Github size={16} className="mr-1" /> GitHub
            </a>
          )}
          {twitterUrl && (
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
              <Twitter size={16} className="mr-1" /> Twitter
            </a>
          )}
        </div>
        {bio && <p className="text-lg">{bio}</p>}
      </header>

      <Separator className="my-8" />

      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill.id} variant="secondary">{skill.name}</Badge>
            ))}
          </div>
        </section>
      )}

      {experiences && experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <Card key={exp.id}>
                <CardHeader>
                  <CardTitle>{exp.jobTitle} at {exp.company}</CardTitle>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{exp.responsibilities}</p>
                  {exp.technologies && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exp.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <Card key={edu.id}>
                <CardHeader>
                  <CardTitle>{edu.degree}</CardTitle>
                  <div className="text-gray-600">{edu.institution}</div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <GraduationCap size={16} className="mr-2" />
                    <span>Graduated: {edu.graduationDate}</span>
                  </div>
                  {edu.relevantCourses && <p><strong>Relevant Courses:</strong> {edu.relevantCourses}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {user_achievements && user_achievements.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
          <div className="space-y-4">
            {user_achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <CardTitle>{achievement.title}</CardTitle>
                  <div className="text-gray-600">{achievement.date}</div>
                </CardHeader>
                <CardContent>
                  <p>{achievement.description}</p>
                  {achievement.images && achievement.images.length > 0 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto">
                      {achievement.images.map((image, index) => (
                        <img key={index} src={image} alt={`Achievement ${index + 1}`} className="w-24 h-24 object-cover rounded" />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DeveloperPortfolio;