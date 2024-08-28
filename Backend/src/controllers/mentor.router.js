import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getListOfMentor = asyncHandler(async(req,res,next)=>{
    try {
        const ListOfData = await prisma.mentors.findMany({
            include:{
                projects:true
            }
        })
        if(ListOfData){
            return res.status(200).json(new ApiResponse(200,ListOfData,"List Of mentor Data"))
        }
    } catch (error) {
        console.log(error)
        throw next(new ApiError(500,"Error fetching List"))
    }
})