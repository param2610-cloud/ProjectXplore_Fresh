import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

const searchUsers = asyncHandler(async (req, res, next) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive", // Case-insensitive search
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                projects: {
                    select: {
                        id: true,
                    },
                },
                followers: {
                    select: {
                        followerId: true,
                    },
                },
                following: {
                    select: {
                        followingId: true,
                    },
                },
            },
        });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
    }
});

const sendEmail = asyncHandler(async (req, res, next) => {
    const { senderId, receiverId,roomId } = req.body;
  console.log(senderId,receiverId);
  
    // Retrieve sender and receiver emails from the database
    const sender = await prisma.user.findUnique({ where: { id: senderId } });
    const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
    console.log(sender,receiver)
    if (!sender || !receiver) {
        return res.status(404).json({ error: 'Sender or receiver not found' });
    }
    
    // Create a new request record
    const request = await prisma.request.create({
        data: {
            senderId,
            receiverId,
            roomId
        },
    });
    console.log(request)
    
    // Send email
    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['gpampa138@gmail.com'],
        subject: "Request Notification",
        html: `
        <p>Hello ${receiver.name},</p>
        <p>You have a new request from ${sender.name}. Please review it using the link below:</p>
        <a href="http://localhost:3000/roomrequest/${request.id}">View Request</a>
        <p>Thank you!</p>
        `,
    });
    
    console.log(data)
    if (error) {
        console.log(error)
        return res.status(400).json({ error });
    }
    
    res.status(200).json({ data, requestId: request.id });
});

const createRoom = asyncHandler(async (req, res,next) => {
    const { name, authorId } = req.body;
    console.log(name,authorId);
    

    if (!name || !authorId) {
        return res.status(400).json({ message: 'Room name and author ID are required' });
    }

    try {
        const newRoom = await prisma.room.create({
            data: {
                name,
                authorId,
            },
        });

        res.status(201).json(newRoom);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Error creating room' });
    }
})
// controllers/roomController.js


// Add a room member
const addRoomMember =asyncHandler( async (req, res,next) => {
    const { roomId, userId } = req.body;
    console.log(roomId,userId);
    

    if (!roomId || !userId) {
        return res.status(400).json({ error: 'roomId and userId are required' });
    }

    try {
        // Check if the room and user exist
        const room = await prisma.room.findUnique({
            where: { id: parseInt(roomId,10) }
        });
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId,10) }
        });

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the room member
        const roomMember = await prisma.roomMember.create({
            data: {
                roomId: parseInt(roomId,10),
                userId: parseInt(userId,10)
            }
        });

        return res.status(201).json(roomMember);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding the room member' });
    }
});
const deleteRequestById = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Request ID is required' });
    }

    try {
        // Check if the request exists
        const request = await prisma.request.findUnique({
            where: { id: parseInt(id) }
        });

        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Delete the request
        await prisma.request.delete({
            where: { id: parseInt(id) }
        });

        return res.status(204).send(); // No content response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the request' });
    }
};
const getAllReceivedRequests = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Fetch all requests where the user is the receiver
        const requests = await prisma.request.findMany({
            where: { receiverId: parseInt(userId) }
        });

        if (requests.length === 0) {
            return res.status(404).json({ message: 'No requests found for this user' });
        }

        return res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching requests' });
    }
};
const getRequestById = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Request ID is required' });
    }

    try {
        // Fetch the request
        const request = await prisma.request.findUnique({
            where: { id: parseInt(id) }
        });

        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        return res.status(200).json(request);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the request' });
    }
};
const getRoomById = asyncHandler(async (req, res, next) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Room ID is required' });
    }

    try {
        // Fetch the room details with members and their details
        const room = await prisma.room.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                author: true,
                members: {
                    include: {
                        user: true  
                    }
                }
            }
        });

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        return res.status(200).json(room);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the room details' });
    }
});
const getUserRooms = asyncHandler(async (req, res, next) => {
    const { userId } = req.query   ;
    console.log(userId);
    
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const userRooms = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) },
            include: {
                roomsAsAuthor: true,
                roomsAsMember: {
                    include: {
                        room: true
                    }
                }
            }
        });

        if (!userRooms) {
            return res.status(404).json({ error: 'User not found' });
        }

        const authoredRooms = userRooms.roomsAsAuthor;
        const memberRooms = userRooms.roomsAsMember.map(member => member.room);

        return res.json({ authoredRooms, memberRooms });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve rooms' });
    }
});


// Get task by ID
const getTaskById = asyncHandler(async (req, res, next) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Task ID is required' });
    }

    try {
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                author: true,
                assignedTo: true
            }
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the task' });
    }
});

// Add a new task
const addTask = asyncHandler(async (req, res, next) => {
    const { content, authorId, assignId, status } = req.body;

    if (!content || !authorId || !assignId) {
        return res.status(400).json({ error: 'Content, authorId, and assignId are required' });
    }

    try {
        const newTask = await prisma.task.create({
            data: {
                content,
                authorId,
                assignId,
                status
            }
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the task' });
    }
});

// Update task by ID
const updateTask = asyncHandler(async (req, res, next) => {
    const { id } = req.query;
    const { content, assignId, status } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Task ID is required' });
    }

    try {
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id, 10) },
            data: {
                content,
                assignId,
                status
            }
        });

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the task' });
    }
});

// View all tasks
const getAllTasks = asyncHandler(async (req, res, next) => {
    try {
        const tasks = await prisma.task.findMany({
            include: {
                author: true,
                assignedTo: true
            }
        });

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the tasks' });
    }
});
const getAllMember = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
  console.log(roomId);
  
    if (!roomId) {
      return res.status(400).json({ error: 'Room ID is required' });
    }
  
    try {
      // Fetch members from the RoomMember table and get user details
      const members = await prisma.roomMember.findMany({
        where: {
          roomId: Number(roomId)
        },
        include: {
          user: true // Include user details
        }
      });
  
      return res.status(200).json(members.map(member => member.user));
    } catch (error) {
      console.error('Error fetching room members:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });


export { searchUsers,sendEmail,createRoom,addRoomMember,deleteRequestById,getAllReceivedRequests,getRequestById,getRoomById,getTaskById, addTask, updateTask, getAllTasks,getAllMember,getUserRooms  };
