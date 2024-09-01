import { v4 as uuidv4 } from 'uuid';
import prisma from '../db/prismaClient.js';

const updatePortfolio = async (req, res) => {
  const { userId } = req.query; 
  let portfolioData = req.body;
  console.log(portfolioData,userId);
  
  try {
    // Check if the user exists
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's portfolio information
    const updatedUser = await prisma.users.update({
      where: { user_id: userId },
      data: {
        portfolio_profilePicture: portfolioData.profilePicture,
        title: portfolioData.title,
        bio: portfolioData.bio,
        location: portfolioData.location,
        linkedinUrl: portfolioData.linkedinUrl,
        githubUrl: portfolioData.githubUrl,
        twitterUrl: portfolioData.twitterUrl,
      },
    });

    // Update skills
    if (portfolioData.skills) {
      await prisma.developer_Skill.deleteMany({
        where: { usersUser_id: userId },
      });
      portfolioData.skills = portfolioData.skills.split(",")

      await prisma.developer_Skill.createMany({
        data: portfolioData.skills.map(skill => ({
          id: uuidv4(),
          usersUser_id: userId,
          name: skill.name,
          type: skill.type,
        })),
      });
    }

   
    // Update projects
    if (portfolioData.projects && Array.isArray(portfolioData.projects)) {
      // Validate each project has required fields
      let newportfoliodataprojects = [];
      for (const project of portfolioData.projects) {
        if (!project.name && !project.description && !project.role && !project.demoLink && !project.githubLink) {
          continue
        }
        if (!project.name || !project.description || !project.role || !project.demoLink || !project.githubLink) {
          newportfoliodataprojects.push(project)
          
        }
        console.log(project);
      }

      // Delete related technologies first
      const projectIds = await prisma.developer_Project.findMany({
        where: { usersUser_id: userId },
        select: { id: true },
      }).then(projects => projects.map(project => project.id));

      await prisma.developer_ProjectTechnology.deleteMany({
        where: { projectId: { in: projectIds } },
      });

      // Delete projects
      await prisma.developer_Project.deleteMany({
        where: { usersUser_id: userId },
      });

      // Create new projects and their technologies
      for (const project of newportfoliodataprojects) {
        const createdProject = await prisma.developer_Project.create({
          data: {
            id: uuidv4(),
            usersUser_id: userId,
            name: project.name,
            description: project.description,
            role: project.role,
            demoLink: project.demoLink,
            githubLink: project.githubLink,
          },
        });

        // Add project technologies
        if (project.technologies && Array.isArray(project.technologies)) {
          await prisma.developer_ProjectTechnology.createMany({
            data: project.technologies.map(tech => ({
              id: uuidv4(),
              projectId: createdProject.id,
              name: tech,
            })),
          });
        }
      }
    }


    // Update experiences
    if (portfolioData.experiences) {
      const experienceIds = await prisma.developer_Experience.findMany({
        where: { usersUser_id: userId },
        select: { id: true },
      }).then(experiences => experiences.map(exp => exp.id));

      await prisma.developer_ExperienceTechnology.deleteMany({
        where: { experienceId: { in: experienceIds } },
      });

      await prisma.developer_Experience.deleteMany({
        where: { usersUser_id: userId },
      });

      for (const experience of portfolioData.experiences) {
        const createdExperience = await prisma.developer_Experience.create({
          data: {
            id: uuidv4(),
            usersUser_id: userId,
            jobTitle: experience.jobTitle,
            company: experience.company,
            startDate: experience.startDate,
            endDate: experience.endDate,
            responsibilities: experience.responsibilities,
          },
        });

        await prisma.developer_ExperienceTechnology.createMany({
          data: experience.technologies.map(tech => ({
            id: uuidv4(),
            experienceId: createdExperience.id,
            name: tech,
          })),
        });
      }
    }

    // Update education
    if (portfolioData.education) {
      portfolioData.education =[portfolioData.education]
      const educationIds = await prisma.developer_Education.findMany({
        where: { usersUser_id: userId },
        select: { id: true },
      }).then(educations => educations.map(edu => edu.id));

      await prisma.developer_RelevantCourse.deleteMany({
        where: { educationId: { in: educationIds } },
      });

      await prisma.developer_Education.deleteMany({
        where: { usersUser_id: userId },
      });

      for (let edu of portfolioData.education) {
        const date = new Date(edu.graduationDate)
        const createdEducation = await prisma.developer_Education.create({
          data: {
            id: uuidv4(),
            usersUser_id: userId,
            degree: edu.degree,
            institution: edu.institution,
            graduationDate: date.toISOString(),
          },
        });
        edu.relevantCourses = edu.relevantCourses.split(",")
        await prisma.developer_RelevantCourse.createMany({
          data: edu.relevantCourses.map(course => ({
            id: uuidv4(),
            educationId: createdEducation.id,
            name: course,
          })),
        });
      }
    }

    res.status(200).json({ message: 'Portfolio updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ error: 'An error occurred while updating the portfolio' });
  }
};



export { updatePortfolio };
