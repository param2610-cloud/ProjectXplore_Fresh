import { PrismaClient } from '@prisma/client';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
const prisma = new PrismaClient();

const createProject = asyncHandler(async (req, res, next) => {
  const { userId, name, description, links : linksString, roomId } = req.body; // Extract roomId from req.body if needed
  const images = req.files;

  console.log(typeof links);

  // Validate the input data
  if (!userId || !name || !description) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const authorId = parseInt(userId, 10);
  if (isNaN(authorId)) {
    return next(new ApiError(400, 'Invalid user ID'));
  }

  try {
    // Create a new project
    const project = await prisma.project.create({
      data: {
        authorId,        // Correctly use authorId
        name,
        description,
        roomId: roomId ? parseInt(roomId, 10) : null, // Optionally handle roomId if provided
      },
    });

    // Upload images to Cloudinary and create image records
    const imageRecords = [];
    for (const image of images) {
      const avatarUrl = await uploadOnCloudinary(image.path);
      imageRecords.push({
        url: avatarUrl.url,
        projectId: project.id,
      });
    }

    // Create image records in the database
    await prisma.image.createMany({
      data: imageRecords,
    });

    let links = [];
  try {
    if (linksString) {
      links = JSON.parse(linksString); // Convert JSON string to array
    }
  } catch (error) {
    return next(new ApiError(400, 'Invalid links format'));
  }

  if (!Array.isArray(links)) {
    return next(new ApiError(400, 'Links should be an array'));
  }


    // Create link records
    const linkRecords = links.map((link) => ({
      url: link,
      projectId: project.id,
    }));

    // Create link records in the database
    await prisma.link.createMany({
      data: linkRecords,
    });

    return res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, 'Error creating project')); // Correctly use `new ApiError()`
  }
});
const sentListOfProject = asyncHandler(async (req,res,next)=>{
  const {userId} = req.query;
  const authorId = parseInt(userId, 10);
  if (isNaN(authorId)) {
    return next(new ApiError(400, 'Invalid user ID'));
  }
  try {
    const data =await prisma.project.findMany({
      where:{
        authorId,
      },
    });
    console.log(data);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, 'Error retrieving project')); 
  }
})

const getProjectById = asyncHandler(async(req,res,next)=>{

  const { projectId } = req.query

  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
      include: {
        author: true,   // Includes author details
        room: true,     // Includes room details if exists
        links: true,    // Includes project links
        images: true,   // Includes project images
      },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}) 

// Create a comment
const createComment = asyncHandler(async (req, res, next) => {
  const { content, authorId, projectId } = req.body;

  if (!content || !authorId || !projectId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Create the new comment
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: parseInt(authorId, 10),
        projectId: parseInt(projectId, 10),
      },
      include: {
        author: true,
        commentLikes: {
          select: {
            userId: true,
          },
        },
      },
    });

    // Transform the new comment to match the structure
    const transformedComment = {
      id: comment.id,
      content: comment.content,
      authorId: comment.authorId,
      projectId: comment.projectId,
      createdAt: comment.createdAt,
      author: {
        id: comment.author.id,
        name: comment.author.name,
        email: comment.author.email,
        avatarUrl: comment.author.avatarUrl, // Include the author's avatar URL
      },
      likesCount: comment.commentLikes.length, // Count of likes
      likedUserIds: comment.commentLikes.map(like => like.userId), // Array of liked user IDs
    };

    return res.status(201).json({ message: 'Comment created successfully', comment: transformedComment });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, 'Error creating comment'));
  }
});


// Get all comments for a project
const getCommentsByProjectId = asyncHandler(async (req, res, next) => {
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  try {
    // Fetch comments with their authors and likes
    const comments = await prisma.comment.findMany({
      where: { projectId: parseInt(projectId, 10) },
      include: {
        author: true,
        commentLikes: {
          select: {
            userId: true, // Only select userId to avoid fetching unnecessary data
          },
        },
      },
    });

    // Transform comments to include likes count and liked user IDs
    const transformedComments = comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      authorId: comment.authorId,
      projectId: comment.projectId,
      createdAt: comment.createdAt,
      author: comment.author,
      likesCount: comment.commentLikes.length, // Count of likes
      likedUserIds: comment.commentLikes.map(like => like.userId), // Array of liked user IDs
    }));

    return res.status(200).json(transformedComments);
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, 'Error fetching comments'));
  }
});


// Like a comment
const likeComment = asyncHandler(async (req, res, next) => {
  const { userId, commentId } = req.body;

  if (!userId || !commentId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if the like already exists
    const existingLike = await prisma.commentLike.findUnique({
      where: { userId_commentId: { userId: parseInt(userId, 10), commentId: parseInt(commentId, 10) } },
    });

    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this comment' });
    }

    // Create a new like
    await prisma.commentLike.create({
      data: {
        userId: parseInt(userId, 10),
        commentId: parseInt(commentId, 10),
      },
    });

    return res.status(201).json({ message: 'Comment liked successfully' });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, 'Error liking comment'));
  }
});

const likeProject = asyncHandler(async (req, res, next) => {
  const { userId, projectId } = req.body;

  if (!userId || !projectId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if the like already exists
    const existingLike = await prisma.projectLike.findUnique({
      where: { userId_projectId: { userId: parseInt(userId, 10), projectId: parseInt(projectId, 10) } },
    });

    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this project' });
    }

    // Create a new like
    await prisma.projectLike.create({
      data: {
        userId: parseInt(userId, 10),
        projectId: parseInt(projectId, 10),
      },
    });

    return res.status(201).json({ message: 'Project liked successfully' });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, 'Error liking project'));
  }
});

// Get the number of likes for a comment
const getCommentLikesCount = asyncHandler(async (req, res, next) => {
  const { commentId } = req.query;

  if (!commentId) {
    return res.status(400).json({ message: 'Comment ID is required' });
  }

  try {
    const likesCount = await prisma.commentLike.count({
      where: { commentId: parseInt(commentId, 10) },
    });

    return res.status(200).json({ count: likesCount });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, 'Error fetching comment likes count'));
  }
});
// Get the number of likes for a project
const getProjectLikesCount = asyncHandler(async (req, res, next) => {
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  try {
    const likesCount = await prisma.projectLike.count({
      where: { projectId: parseInt(projectId, 10) },
    });

    return res.status(200).json({ count: likesCount });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, 'Error fetching project likes count'));
  }
});
const removeProjectLike =asyncHandler( async (req, res, next) => {
  const { userId, projectId } = req.body;
  try {
      // Delete the like from the database
      await prisma.projectLike.deleteMany({
          where: {
              userId: userId,
              projectId: parseInt(projectId, 10),
          },
      });

      // Optionally, you might want to get the updated like count and return it
      const updatedLikeCount = await prisma.projectLike.count({
          where: {
              projectId:  parseInt(projectId, 10),
          },
      });

      res.status(200).json({ message: 'Like removed successfully', updatedLikeCount });
  } catch (error) {
      console.error(error);
      next(new ApiError(500, 'Error removing like'));
  }
});


const removeCommentLike =asyncHandler( async (req, res, next) => {
  const { userId, commentId } = req.body;

  try {
      // Delete the like from the database
      await prisma.commentLike.deleteMany({
          where: {
              userId: userId,
              commentId: commentId,
          },
      });

      // Optionally, you might want to get the updated like count and return it
      const updatedLikeCount = await prisma.commentLike.count({
          where: {
              commentId: commentId,
          },
      });

      res.status(200).json({ message: 'Like removed successfully', updatedLikeCount });
  } catch (error) {
      console.error(error);
      next(new ApiError(500, 'Error removing like'));
  }
});
const checkUserLikeOnProject = async (req, res, next) => {
  const { userId, projectId } = req.query;


  if (!userId || !projectId) {
      return res.status(400).json({ message: 'User ID and Project ID are required' });
  }

  try {
      // Check if the like exists
      const like = await prisma.projectLike.findFirst({
          where: {
              userId: parseInt(userId, 10),
              projectId: parseInt(projectId, 10),
          },
      });

      // Respond based on the existence of the like
      if (like) {
          res.status(200).json({ hasLiked: true });
      } else {
          res.status(200).json({ hasLiked: false });
      }
  } catch (error) {
      console.error(error);
      next(new ApiError(500, 'Error checking like status'));
  }
};
const checkUserLikeOnComment = async (req, res, next) => {
  const { userId, commentId } = req.query;


  if (!userId || !commentId) {
      return res.status(400).json({ message: 'User ID and Comment ID are required' });
  }

  try {
      // Check if the like exists
      const like = await prisma.projectLike.findFirst({
          where: {
              userId: parseInt(userId, 10),
              commentId: parseInt(commentId, 10),
          },
      });

      // Respond based on the existence of the like
      if (like) {
          res.status(200).json({ hasLiked: true });
      } else {
          res.status(200).json({ hasLiked: false });
      }
  } catch (error) {
      console.error(error);
      next(new ApiError(500, 'Error checking like status'));
  }
};




export { createProject,sentListOfProject,getProjectById,createComment,getCommentsByProjectId,likeComment,likeProject,getCommentLikesCount,getProjectLikesCount,removeCommentLike,removeProjectLike,checkUserLikeOnProject,checkUserLikeOnComment };
