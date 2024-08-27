import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createIdea = asyncHandler(async (req, res, next) => {
    const {
        ideaName,
        ideaDescription,
        mediaLinks,
        uploadedImageMediaLinks,
        uploadedVideoMediaLinks,
        uploadedApplicationMediaLinks,
        userId,
    } = req.body;
    // console.log(ideaName, ideaDescription, mediaLinks, userId);

    try {
        if (!ideaDescription || !userId) {
            throw next(new ApiError(500, "User id or desc not revieved "));
        }

        const idea = await prisma.ideas.create({
            data: {
                idea_name: ideaName,
                idea_text: ideaDescription,
                image_link: uploadedImageMediaLinks,
                video_link: uploadedVideoMediaLinks,
                docs_link: uploadedApplicationMediaLinks,
                user_id: userId,
                usefull_links:mediaLinks
            },
        });
        console.log(idea);

        return res.status(200).json(
            new ApiResponse(200, idea, "Idea is created successfully!")
        );
    } catch (error) {
        console.error(error);
        throw next(new ApiError(500, "Error while creating Idea"));
    }
});
export const getIdea = asyncHandler(async (req, res, next) => {
    const { ideaId } = req.query;
    try {
        if (ideaId) {
            const data = await prisma.ideas.findUnique({
                where: {
                    idea_id: ideaId,
                },
                include: {
                    collaboration_requests: { include: { users: true } },
                    idea_comments: {
                        include: { comments: { include: { users: true } } },
                    },
                    idea_impressions: { include: { users: true } },
                    users: true,
                },
            });
            if(data){
                return res.status(200).json(
                    new ApiResponse(200, data, "Idea is created successfully!")
                );
            }
        }
    } catch (error) {
        console.log(error);
        throw next(new ApiError(500, "Error while creating Idea"));
    }
});
