import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { validateAccessToken } from "../utils/reusableFunc.js";

const available_institution = asyncHandler(async (req, res, next) => {
    
    const data =await prisma.institutions.findMany();

    return res
        .status(200)
        .json(new ApiResponse(200, data, "Institution list sent"));
});
const available_interest = asyncHandler(async (req, res, next) => {
    
    const data =await prisma.interests.findMany();

    return res
        .status(200)
        .json(new ApiResponse(200, data, "Interest list sent"));
});
const available_skill = asyncHandler(async (req, res, next) => {
    
    const data =await prisma.skills.findMany();

    return res
        .status(200)
        .json(new ApiResponse(200, data, "Interest list sent"));
});


const UploadController = asyncHandler(async (req,res,next)=>{
    try {
        const Media = req.file?.path;
        if (!Media) {
            throw next(new ApiError(400, "Media file is required"));
        }
        console.log(Media);
        
        const MediaURL = await uploadOnCloudinary(Media);
        if (!MediaURL) {
            throw next(new ApiError(400, "Failed to upload Media"));
        }
        console.log(MediaURL);
        return res
            .status(201)
            .json(new ApiResponse(200, MediaURL.url, "Media uploaded successfully"));
    } catch (error) {
        console.log(error)
        throw next(new ApiError(400, "Failed to upload Media"));
        
    }
})
export { available_institution,available_interest,available_skill,UploadController };
