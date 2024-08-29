import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//get room details on a specific user
export const get_room_details_for_specific_user = asyncHandler(async(req,res,next)=>{
    const {userId} = req.query;
    try {
        if(userId){
            const data_as_owner = await prisma.rooms.findMany({
                where:{
                    owner_id:userId
                }
            })
            const data_as_member =await prisma.room_member.findMany({
                where:{
                    user_id:userId
                },include:{
                    rooms:{
                        include:{
                            owner:true
                        }
                    }
                }
            })
            console.log(data_as_member,data_as_owner);
            
            return res.status(200).json(new ApiResponse(200,{data_as_owner,data_as_member},"Data Fetched Succesfully"))
        }
        
    } catch (error) {
        console.log(error)
        throw next(new ApiError(500,"Error while fetching data"))
    }
})
//create a room 
export const create_a_room = asyncHandler(async(req,res,next)=>{
    const {room_name,objective,owner_id,profile_pic_link} = req.body;
    try {
        if(room_name && owner_id){
            const create_data = await prisma.rooms.create({
                data:{
                    room_name:room_name,
                    owner_id:owner_id,
                    profile_pic_link:profile_pic_link?profile_pic_link:'',
                    objective:objective?objective:''
                }
            })
            console.log(create_data);
            return res.status(200).json(new ApiResponse(200,create_data,"Room is created"))
            
        }
    } catch (error) {
        console.log(error)
        throw next(new ApiError(500,"Error while fetching data"))
        
    }
})
export const getRoomData = asyncHandler(async(req,res,next)=>{
    const {roomId} = req.query;
    try {
        if(roomId){
            const Roomdata= await prisma.rooms.findUnique({
                where:{
                    room_id:roomId
                },include:{
                    project_update:{
                        include:{
                            author_details:true
                        }
                    }
                }
            })
            console.log(Roomdata);
            
            return res.status(200).json(new ApiResponse(200,Roomdata,"Succefull"))
        }
    } catch (error) {
        console.log(error)
        throw next(new ApiError(500,"Error while fetching room data"))
    }
})