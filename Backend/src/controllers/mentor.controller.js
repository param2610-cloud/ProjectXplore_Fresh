import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getListOfMentor = asyncHandler(async(req,res,next)=>{
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
export const getListOfstudents = asyncHandler(async(req,res,next)=>{
    const {institutionId} = req.query;

    try {
        const ListOfData = await prisma.institutionVerification.findMany({
            where:{
                institutionId:institutionId
            },
            include:{
                user:true
            }
        })
        if(ListOfData){
            return res.status(200).json(new ApiResponse(200,ListOfData,"List Of student Data"))
        }
    } catch (error) {
        console.log(error)
        throw next(new ApiError(500,"Error fetching List"))
    }
})

export const doVerification  = asyncHandler(async (req,res,next)=>{
    const {id} = req.body;
    try {
        if(id){

            const change = await prisma.institutionVerification.update({
                where:{
                    id
                },
                data:{
                    verificationStatus:true
                }
            })
            return res.status(200).json(new ApiResponse(200,change,"Chenge the veridication data"))
        }

    } catch (error) {
        console.log(error)
        throw next(new ApiError(500,"Error "))
    }
})


export const ProjectList  = asyncHandler(async(req,res,next)=>{
    const {institutionId} = req.query;
    try {
        const data = await prisma.institutionVerification.findMany({
            where:{
                institutionId:institutionId,
                verificationStatus:true
            },include:{
                user:{
                    include:{
                        rooms:{
                            include:{
                                New_Project_table:true
                            }
                        }
                    }
                }
            }
        })
        console.log(data);
        
        const allProjects = data.flatMap(verification =>
            verification.user?.rooms?.flatMap(room =>
                room.New_Project_table || []  
            ) || []
        );
        return res.status(200).json(new ApiResponse(200,allProjects,"Project List are fetched"))

    } catch (error) {
        console.log(error)
        throw next(new ApiError(500,"Error "))
    }
})