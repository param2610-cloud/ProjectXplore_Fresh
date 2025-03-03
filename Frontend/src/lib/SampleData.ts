import { UserPortfolioGetDataResponse } from "./interface/INTERFACE";

export const sampleUserData = {
    "user_id": "2f6fab34-f628-479b-a7d6-a6b38d2bd343",
    "full_name": "Hiranmay Pore",
    "role_id": "hiranmay123",
    "email": "hiranmaypore4@gmail.com",
    "phone_number": "+91 9876543210",
    "username": "hiranma123",
    "password": "$2b$10$Au3X1LHQnv6rJCe.MgBj0.lcNi4I8N6l/jzTkt3cCqXjut5lO9kPm",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWI5ODlkNTAtMzBkNS00OGNlLWI1Y2ItODY1ZGFhNjlhYzdiIiwiaWF0IjoxNzI1MTY1OTM2LCJleHAiOjE3MzAzNDk5MzZ9.OgCLNXPY0PF6uJ0KjLgtm4JAik9kQMmCzl_FVyyYP9E",
    "date_of_birth": "1992-05-15",
    "address": "123 Tech Park, Bengaluru, Karnataka 560001",
    "profile_picture_link": "http://res.cloudinary.com/dhrldqxg9/image/upload/v1725138103/saiapqtr4wpwmgr5eqgk.jpg",
    "institution_id": "inst-456",
    "team_id": "08c5f8e8-ebc5-4338-a48b-94f5ee4a2497",
    "portfolio_profilePicture": "",
    "title": "Senior Full Stack Developer",
    "bio": "Passionate full-stack developer with 7+ years of experience in creating robust web applications. Specialized in MERN stack and cloud technologies. Always excited to learn and implement cutting-edge technologies to solve real-world problems.",
    "location": "Bengaluru, India",
    "linkedinUrl": "https://www.linkedin.com/in/hiranmay-pore",
    "githubUrl": "https://github.com/hiranmaypore",
    "twitterUrl": "https://twitter.com/hiranmaypore",
    "createdAt": "2022-09-01T04:45:36.808Z",
    "updatedAt": "2024-09-01T05:16:50.470Z",
    "teams": [
      {
        "id": "team-789",
        "name": "Backend Ninjas",
        "role": "Team Lead"
      }
    ],
    "rooms": [
      {
        "id": "room-101",
        "name": "Project Brainstorming"
      }
    ],
    "user_achievements": [
      {
        "id": "ach-001",
        "user_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b",
        "title": "Best Innovation Award",
        "description": "Received for developing an AI-powered code review system",
        "date": "2023-11-15",
        "images": []
      }
    ],
    "skills": [
      {
        "id": "skill-001",
        "name": "React",
        "type": "TECHNICAL",
        "createdAt": "2022-09-01T04:45:36.808Z",
        "updatedAt": "2022-09-01T04:45:36.808Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      },
      {
        "id": "skill-002",
        "name": "Node.js",
        "type": "TECHNICAL",
        "createdAt": "2022-09-01T04:45:36.808Z",
        "updatedAt": "2022-09-01T04:45:36.808Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      },
      {
        "id": "skill-003",
        "name": "MongoDB",
        "type": "TECHNICAL",
        "createdAt": "2022-09-01T04:45:36.808Z",
        "updatedAt": "2022-09-01T04:45:36.808Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      },
      {
        "id": "skill-004",
        "name": "AWS",
        "type": "TECHNICAL",
        "createdAt": "2022-09-01T04:45:36.808Z",
        "updatedAt": "2022-09-01T04:45:36.808Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      },
      {
        "id": "skill-005",
        "name": "Team Leadership",
        "type": "SOFT",
        "createdAt": "2022-09-01T04:45:36.808Z",
        "updatedAt": "2022-09-01T04:45:36.808Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      },
      {
        "id": "skill-006",
        "name": "Problem Solving",
        "type": "SOFT",
        "createdAt": "2022-09-01T04:45:36.808Z",
        "updatedAt": "2022-09-01T04:45:36.808Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      }
    ],
    "projects": [
      {
        "id": "proj-001",
        "name": "E-commerce Platform",
        "description": "Developed a full-fledged e-commerce platform with features like product catalog, shopping cart, payment integration, and order tracking.",
        "role": "Full Stack Developer",
        "demoLink": "https://ecommerce-demo.hiranmayporecom",
        "githubLink": "https://github.com/hiranmaypore/ecommerce-platform",
        "technologies": [
          {"name": "React"},
          {"name": "Node.js"},
          {"name": "Express"},
          {"name": "MongoDB"},
          {"name": "AWS"}
        ],
        "createdAt": "2023-03-15T10:30:00.000Z",
        "updatedAt": "2023-03-15T10:30:00.000Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      },
      {
        "id": "proj-002",
        "name": "AI-powered Chatbot",
        "description": "Created an intelligent chatbot using natural language processing to assist customers with product inquiries and support requests.",
        "role": "Backend Developer",
        "demoLink": "https://chatbot-demo.hiranmaypore.com",
        "githubLink": "https://github.com/hiranmaypore/ai-chatbot",
        "technologies": [
          {"name": "Python"},
          {"name": "Flask"},
          {"name": "TensorFlow"},
          {"name": "Docker"}
        ],
        "createdAt": "2023-08-22T14:45:00.000Z",
        "updatedAt": "2023-08-22T14:45:00.000Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      }
    ],
    "education": [
      {
        "id": "edu-001",
        "degree": "B.Tech in Computer Science",
        "institution": "Indian Institute of Technology, Delhi",
        "graduationDate": "2014-05-30",
        "relevantCourses": "Data Structures, Algorithms, Database Management Systems, Web Technologies",
        "createdAt": "2022-09-01T04:45:36.808Z",
        "updatedAt": "2022-09-01T04:45:36.808Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      },
      {
        "id": "edu-002",
        "degree": "M.Tech in Artificial Intelligence",
        "institution": "Indian Institute of Science, Bangalore",
        "graduationDate": "2016-12-15",
        "relevantCourses": "Machine Learning, Natural Language Processing, Computer Vision, Deep Learning",
        "createdAt": "2022-09-01T04:45:36.808Z",
        "updatedAt": "2022-09-01T04:45:36.808Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      }
    ],
    "experiences": [
      {
        "id": "exp-001",
        "jobTitle": "Senior Full Stack Developer",
        "company": "TechInnovate Solutions",
        "startDate": "2020-06-01",
        "endDate": null,
        "responsibilities": "Lead a team of 5 developers, architect and develop scalable web applications, implement CI/CD pipelines, and mentor junior developers.",
        "technologies": [
          {"name": "React"},
          {"name": "Node.js"},
          {"name": "MongoDB"},
          {"name": "AWS"},
          {"name": "Docker"}
        ],
        "createdAt": "2022-09-01T04:45:36.808Z",
        "updatedAt": "2022-09-01T04:45:36.808Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      },
      {
        "id": "exp-002",
        "jobTitle": "Full Stack Developer",
        "company": "GlobalTech Innovations",
        "startDate": "2016-08-15",
        "endDate": "2020-05-31",
        "responsibilities": "Developed and maintained multiple web applications, collaborated with cross-functional teams, and optimized application performance.",
        "technologies": [
          {"name": "Angular"},
          {"name": "Express.js"},
          {"name": "PostgreSQL"},
          {"name": "Azure"}
        ],
        "createdAt": "2022-09-01T04:45:36.808Z",
        "updatedAt": "2022-09-01T04:45:36.808Z",
        "usersUser_id": "9b989d50-30d5-48ce-b5cb-865daa69ac7b"
      }
    ]
  };

export const dummyData:UserPortfolioGetDataResponse = {
    "user_id": "user123",
    "full_name": "Jane Doe",
    "role_id": "developer001",
    "email": "jane.doe@example.com",
    "phone_number": "+1 (555) 123-4567",
    "username": "janedoe",
    "date_of_birth": "1990-01-15",
    "address": "123 Tech Street, Silicon Valley, CA 94000",
    "profile_picture_link": "https://example.com/jane-profile-pic.jpg",
    "portfolio_profilePicture": "https://example.com/jane-portfolio-pic.jpg",
    "title": "Senior Full Stack Developer",
    "bio": "Passionate full stack developer with 8+ years of experience in creating robust and scalable web applications. Expertise in JavaScript, React, Node.js, and cloud technologies.",
    "location": "San Francisco, CA",
    "linkedinUrl": "https://www.linkedin.com/in/janedoe",
    "githubUrl": "https://github.com/janedoe",
    "twitterUrl": "https://twitter.com/janedoe",
    "createdAt": "2022-01-01T00:00:00Z",
    "updatedAt": "2023-06-15T12:30:00Z",
    "skills": [
      {
        "id": "skill1",
        "name": "JavaScript",
        "type": "Programming Language"
      },
      {
        "id": "skill2",
        "name": "React",
        "type": "Frontend Framework"
      },
      {
        "id": "skill3",
        "name": "Node.js",
        "type": "Backend Framework"
      },
      {
        "id": "skill4",
        "name": "AWS",
        "type": "Cloud Platform"
      },
      {
        "id": "skill5",
        "name": "GraphQL",
        "type": "API"
      }
    ],
    "experiences": [
      {
        "id": "exp1",
        "jobTitle": "Senior Full Stack Developer",
        "company": "TechCorp Inc.",
        "startDate": "2020-03-01",
        "endDate": null,
        "responsibilities": "Lead development of scalable web applications, mentor junior developers, and implement best practices for code quality and performance.",
        "technologies": ["React", "Node.js", "GraphQL", "AWS"]
      },
      {
        "id": "exp2",
        "jobTitle": "Full Stack Developer",
        "company": "WebSolutions LLC",
        "startDate": "2017-06-01",
        "endDate": "2020-02-29",
        "responsibilities": "Developed and maintained multiple client websites, implemented responsive designs, and optimized database performance.",
        "technologies": ["JavaScript", "React", "Express.js", "MongoDB"]
      }
    ],
    "education": [
      {
        "id": "edu1",
        "degree": "Bachelor of Science in Computer Science",
        "institution": "Tech University",
        "graduationDate": "2015-05-15",
        "relevantCourses": "Data Structures, Algorithms, Web Development, Database Systems"
      },
      {
        "id": "edu2",
        "degree": "Full Stack Web Development Bootcamp",
        "institution": "CodeCamp Academy",
        "graduationDate": "2016-12-20",
        "relevantCourses": "JavaScript, React, Node.js, RESTful APIs"
      }
    ],
    "user_achievements": [
      {
        "id": "ach1",
        "title": "Employee of the Year",
        "description": "Recognized for outstanding contributions to project success and team leadership.",
        "date": "2022-12-15",
        "images": ["https://example.com/award-image1.jpg", "https://example.com/award-image2.jpg"]
      },
      {
        "id": "ach2",
        "title": "Conference Speaker",
        "description": "Presented 'Scaling React Applications' at ReactConf 2023.",
        "date": "2023-04-10",
        "images": ["https://example.com/conference-image.jpg"]
      }
    ],
    "teams": [
      {
        "team_id": "team1",
        "team_name": "Alpha Project Team"
      }
    ],
    "rooms": [
      {
        "room_id": "room1",
        "room_name": "Frontend Development"
      }
    ]
  }