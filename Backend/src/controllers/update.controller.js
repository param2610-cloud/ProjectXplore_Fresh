import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendNotification } from "../utils/Firebase.js";

const getAllUpdateFromRoomId = asyncHandler(async (req, res, next) => {
    const { RoomId } = req.query;
    console.log(RoomId);
    
    try {
        if (RoomId) {
            const data = await prisma.update.findMany({
                where: {
                    room_id: RoomId,
                },
                include: {
                    author_details: true,
                    room_details: true,
                },
            });
            if (data) {
                return res
                    .status(200)
                    .json(
                        new ApiResponse(200, data, "data fethed sucessfully")
                    );
            }
        }
    } catch (error) {
        console.log(error);
        throw next(new ApiError(500, "Error"));
    }
});

const createUpdate = asyncHandler(async (req, res, next) => {
    const { update_text, image_link, video_link, author_id,roomId } = req.body;
    console.log(update_text, image_link, video_link, author_id,roomId);
    try {
        if (update_text && author_id) {
            const createData = await prisma.update.create({
                data: {
                    text: update_text,
                    image_link: image_link,
                    video_link: video_link,
                    author_id: author_id,
                    room_id:roomId
                },
            });
            if (createData) {
                sendNotification({ message: `New Update: \"${update_text}\"` });
                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            200,
                            createData,
                            "The Update is created."
                        )
                    );
            }
        }
    } catch (error) {
        console.log(error);
        throw next(new ApiError(500, "Error"));
    }
});
export { getAllUpdateFromRoomId,createUpdate };
