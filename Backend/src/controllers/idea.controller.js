import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendNotification } from "../utils/Firebase.js";

export const createIdea = asyncHandler(async (req, res, next) => {
    const {
        ideaName,
        ideaDescription,
        mediaLinks,
        uploadedImageMediaLinks,
        uploadedVideoMediaLinks,
        userId,
        roomId,
    } = req.body;
    // console.log(ideaName, ideaDescription, mediaLinks, userId);

    try {
        if (!ideaDescription || !userId || !roomId) {
            throw next(new ApiError(500, "User id or desc not revieved "));
        }

        const idea = await prisma.ideas.create({
            data: {
                idea_name: ideaName,
                idea_text: ideaDescription,
                image_link: uploadedImageMediaLinks,
                video_link: uploadedVideoMediaLinks,
                user_id: userId,
                usefull_links: mediaLinks,
                roomId: roomId,
            },
        });
        console.log(idea);
        sendNotification({ message: `Idea is uploaded` });
        
        return res
            .status(200)
            .json(new ApiResponse(200, idea, "Idea is created successfully!"));
    } catch (error) {
        console.error(error);
        throw next(new ApiError(500, "Error while creating Idea"));
    }
});
export const getIdea = asyncHandler(async (req, res, next) => {
    const { ideaId, roomId } = req.query;
    
    // Log the received query parameters for debugging
    console.log('Idea ID:', ideaId, 'Room ID:', roomId);

    try {
        if (!ideaId && !roomId) {
            return res.status(400).json(new ApiResponse(400, null, "Idea ID or Room ID is required"));
        }

        let data = null;
        
        if (ideaId) {
            data = await prisma.ideas.findUnique({
                where: {
                    idea_id: ideaId,
                },
                include: {
                    idea_comments: {
                        include: { comments: { include: { users: true } } },
                    },
                    idea_impressions: { include: { users: true } },
                    users: true,
                },
            });
        } else if (roomId) {
            data = await prisma.ideas.findFirst({
                where: {
                    roomId: roomId,
                },
                include: {
                    idea_comments: {
                        include: { comments: { include: { users: true } } },
                    },
                    idea_impressions: { include: { users: true } },
                    users: true,
                },
            });
        }

        if (!data) {
            return res.status(200).json(new ApiResponse(200, null, "Idea not found"));
        }

        return res.status(200).json(new ApiResponse(200, data, "Idea fetched successfully"));

    } catch (error) {
        console.error("Error while fetching idea:", error);
        return next(new ApiError(500, "Error while fetching Idea"));
    }
});

