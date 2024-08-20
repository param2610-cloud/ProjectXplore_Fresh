import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
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
export { available_institution,available_interest,available_skill };
