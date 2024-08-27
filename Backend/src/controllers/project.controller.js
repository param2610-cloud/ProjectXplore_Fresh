import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const project_Component_List_get = asyncHandler( async(req,res,next)=>{
    try {
        const data = await prisma.components.findMany()
        if(data){
            return res.status(200).json(
                new ApiResponse(200, data, "Component list fetched successfully!")
            );
        }
    } catch (error) {
        console.log(error)
        throw next(new ApiError(500,"Error While Fetching Component list"))
    }
})