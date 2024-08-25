import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//create team
const createTeam = asyncHandler(async (req, res, next) => {
    const { team_name, team_author_id, objective } = req.body;
    const avatarlocalpath = req.file?.path;
    if (!avatarlocalpath) {
        throw next(new ApiError(400, "Avatar file is required"));
    }

    const avatarUrl = await uploadOnCloudinary(avatarlocalpath);
    if (!avatarUrl) {
        throw next(new ApiError(400, "Failed to upload avatar"));
    }
    try {
        if (!team_name || !team_author_id) {
            return next(
                new ApiError(400, "Team name and team author ID are required")
            );
        }

        const newTeam = await prisma.teams.create({
            data: {
                team_name,
                team_author_id,
                objective,
                profile_pic_link:avatarUrl.url,
            },
        });
        const userUpdate = await prisma.users.update({
            data:{
                team_id:newTeam.team_id
            },
            where:{
                user_id:team_author_id
            }
        })
        const url = process.env.FRONTEND_DOMAIN+"/team/"+newTeam.team_id+"/request"
        const Urlcreation = await prisma.team_request_response_record.create({
            data:{
                team_id:newTeam.team_id,
                team_author_id:team_author_id,
                url:url,
                status:true
            }
        })
        console.log(Urlcreation);
        

        // Send a successful response
        res.status(201).json(
            new ApiResponse(200, newTeam, "Team is created Succesfully")
        );
    } catch (error) {
        console.error(error);
        throw next(
            new ApiError(500, error.message, "Error while creating team")
        );
    }
});
//get specific team
const getSpecificTeam = asyncHandler(async (req, res, next) => {
    const { team_id } = req.query;
    try {
        if (team_id) {
            const teamDetails = await prisma.teams.findUnique({
                where: {
                    team_id: team_id,
                }
            });
            const teamUrldetails = await prisma.team_request_response_record.findFirst({
                where:{team_id:team_id}
            })
            console.log(teamUrldetails);
            
            res.status(201).json(
                new ApiResponse(
                    200,
                    {teamDetails,teamUrldetails},
                    "Team details fetched succesfully"
                )
            );
        } else {
            throw next(
                new ApiError(500, error.message, "team id is not defined")
            );
        }
    } catch (error) {
        console.log(error);
        throw next(
            new ApiError(500, error, "Error while fetching team data")
        );
    }
});

//get list of team
const getListofTeam = asyncHandler(async (req, res, next) => {
    try {
        const response = await prisma.teams.findMany();
        res.status(201).json(
            new ApiResponse(200, response, "Team List fetched succesfully")
        );
    } catch (error) {
        console.log(error);
        throw next(
            new ApiError(500, error.message, "Error while fetching team data")
        );
    }
});
//update team
const updateDetailsofTeam = asyncHandler(async (req, res, next) => {
    const { team_id, team_name, team_author_id, objective, profile_pic_link } =
        req.body;

    try {
        // Check if team exists
        const existingTeam = await prisma.teams.findUnique({
            where: { team_id },
        });

        if (!existingTeam) {
            return next(new ApiError(404, "Team not found"));
        }

        // Update the team details
        const updatedTeam = await prisma.teams.update({
            where: { team_id },
            data: {
                team_name: team_name || existingTeam.team_name,
                objective: objective || existingTeam.objective,
                profile_pic_link:
                    profile_pic_link || existingTeam.profile_pic_link,
            },
        });

        res.status(200).json({
            success: true,
            message: "Team details updated successfully",
            data: updatedTeam,
        });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Error updating team details"));
    }
});
//delete team
const deleteTeam = asyncHandler(async (req, res, next) => {
    const { team_id } = req.query; // Assuming team_id is passed as a URL parameter

    try {
        // Check if the team exists
        const existingTeam = await prisma.teams.findUnique({
            where: { team_id },
        });

        if (!existingTeam) {
            return next(new ApiError(404, "Team not found"));
        }

        // Delete the team
        await prisma.teams.delete({
            where: { team_id },
        });

        res.status(200).json({
            success: true,
            message: "Team deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Error deleting team"));
    }
});
//user team status
const userTeamStatus = asyncHandler(async(req,res,next)=>{
    const {userId} = req.query;
    try {
        const data = await prisma.users.findUnique({
            where:{
                user_id:userId
            }
        })
        const teamId = data.team_id;
        res.status(201).json(
            new ApiResponse(200, teamId, "Team status fetched succesfully")
        );
    } catch (error) {
        console.log(error)
        throw next(new ApiError(500,"Error Retirieveing status"))
    }
})
const teamReqStatus = asyncHandler(async(req,res,next)=>{
    const {teamid,status} = req.body
    try {
        if(teamid &&status){
            const team = await prisma.team_request_response_record.findFirst({
                where:{
                    team_id:teamid
                }
            })
            const statuschange = await prisma.team_request_response_record.update(
                {
                    where:{
                        id:team.id
                    },
                    data:{
                        status:status
                    }
                }
            )
            console.log(statuschange);
            
            res.status(201).json(
                new ApiResponse(200, statuschange, "Team url status changed succesfully")
            );
        }
        } catch (error) {
        console.log(error)
        throw next(new ApiError(500,"Error Retirieveing status"))
    }
})

export { createTeam,getSpecificTeam,getListofTeam,deleteTeam,updateDetailsofTeam,userTeamStatus,teamReqStatus };
