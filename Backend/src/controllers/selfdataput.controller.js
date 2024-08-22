import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addInstitution = asyncHandler(async (req,res,next)=>{
    const {Institution_name,Address} = req.body;
    if ([Institution_name,Address].some((field) => field?.trim() === "")) {
        throw next(new ApiError(400, "All fields are required"));
    }
    //check for existed data regarding sudhir chandra sur
    const checking =await prisma.institutions.findMany({
        where:{
            name:Institution_name
        }
    })
    if(checking[0]){
        return res
        .status(201)
        .json(new ApiResponse(200, checking[0], "Institution already added"));
    }
    const data =await prisma.institutions.create({
        data:{
            name:Institution_name,
            address:Address
        }
    })
    if(data){
        return res
        .status(201)
        .json(new ApiResponse(200, data, "Institution added successfully"));
    }else{
        throw next(new ApiError(500, "Error occured while adding the data"));
    }
})
const addInterest = asyncHandler(async (req,res,next)=>{
    const {Interest_name} = req.body;
    if ([Interest_name].some((field) => field?.trim() === "")) {
        throw next(new ApiError(400, "All fields are required"));
    }
    //check for existed data regarding sudhir chandra sur
    const checking =await prisma.interests.findMany({
        where:{
            interest_name:Interest_name
        }
    })
    if(checking[0]){
        return res
        .status(201)
        .json(new ApiResponse(200, checking[0], "Interest already added"));
    }
    const data =await prisma.interests.create({
        data:{
            interest_name:Interest_name
        }
    })
    if(data){
        return res
        .status(201)
        .json(new ApiResponse(200, data, "Interest added successfully"));
    }else{
        throw next(new ApiError(500, "Error occured while adding the data"));
    }
})
const addSkill = asyncHandler(async (req,res,next)=>{
    const {skill_name} = req.body;
    if ([skill_name].some((field) => field?.trim() === "")) {
        throw next(new ApiError(400, "All fields are required"));
    }
    //check for existed data regarding sudhir chandra sur
    const checking =await prisma.skills.findMany({
        where:{
            skill_name:skill_name
        }
    })
    if(checking[0]){
        return res
        .status(201)
        .json(new ApiResponse(200, checking, "Skill already added"));
    }
    const data =await prisma.skills.create({
        data:{
            skill_name:skill_name
        }
    })
    if(data){
        return res
        .status(201)
        .json(new ApiResponse(200, data, "Skill added successfully"));
    }else{
        throw next(new ApiError(500, "Error occured while adding the data"));
    }
})
export {addInstitution,addInterest,addSkill}