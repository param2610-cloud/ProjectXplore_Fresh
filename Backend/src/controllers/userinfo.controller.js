import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { SchemaType } from "@google/generative-ai";
import { genAI } from "../utils/genAI.js";
import bcrypt from 'bcrypt';

const getmoreinfo = async () => {
    const {
        role_id,
        phone_number,
        username,
        date_of_birth,
        address,
        avatar,
        institution_id,
        skills,
        interest,
    } = req.body;
};
const getSkill = asyncHandler(async (req, res, next) => {
    const { userId } = req.body;
    try {
        const userSkills = await prisma.user_skills.findMany({
            where: {
                user_id: userId,
            },
            include: {
                skills: true,
            },
        });
        return res
            .status(200)
            .json(
                new ApiResponse(200, userSkills, "Skill retrieved successfully")
            );
    } catch (error) {
        return next(new ApiError(401, error, "Error"));
    }
});

const addSkill = asyncHandler(async (req, res, next) => {
    try {
        let { skill_id, skill_name, userId } = req.body;
        console.log(
            skill_id,
            "           ",
            skill_name,
            "                ",
            userId
        );

        if (!userId) {
            return next(new ApiError(401, "User ID is missing"));
        }

        if (skill_id === null) {
            const newSkill = await prisma.skills.create({
                data: {
                    skill_name: skill_name,
                },
            });
            console.log(newSkill);
            skill_id = newSkill.skill_id;
        }

        const userSkill = await prisma.user_skills.findFirst({
            where: {
                user_id: userId,
                skill_id: skill_id,
            },
        });
        console.log(userSkill);

        if (!userSkill && userId && skill_id) {
            const response = await prisma.user_skills.create({
                data: {
                    user_id: userId,
                    skill_id: skill_id,
                },
            });
            console.log(response);
            return res
                .status(200)
                .json(new ApiResponse(200, "Skill added successfully"));
        } else if (userSkill) {
            return res
                .status(200)
                .json(
                    new ApiResponse(200, "Skill already exists for this user")
                );
        } else {
            return res.status(200).json(new ApiResponse(200, "Id are missing"));
        }
    } catch (error) {
        console.error(error);
        return next(new ApiError(401, error, "Error"));
    }
});
const deleteSkill = asyncHandler(async (req, res, next) => {
    const { userId, skillId } = req.body;
    console.log(userId, "               ", skillId);
    try {
        if (userId && skillId) {
            await prisma.user_skills.delete({
                where: {
                    user_id_skill_id: {
                        user_id: userId,
                        skill_id: skillId,
                    },
                },
            });
            console.log(deleteSkill);

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        deleteSkill,
                        "Skill Deleted successfully"
                    )
                );
        } else {
            return next(new ApiError(401, "Skill id and user id are required"));
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(401, error, "Error"));
    }
});
const addInstitutionToUser = async (req, res) => {
    const { userId, institutionId, studentId } = req.body;

    try {
        const user = await prisma.users.findUnique({
            where: {
                user_id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const institution = await prisma.institutions.findUnique({
            where: {
                institution_id: institutionId,
            },
        });

        if (!institution) {
            return res.status(404).json({ error: "Institution not found" });
        }

        const institutionStudent = await prisma.institutionVerification.create({
            data: {
                institutionId: institutionId,
                userId: userId,
                studentId: studentId,
            },
        });
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    institutionStudent,
                    "Institution added to user successfully"
                )
            );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const deleteInstitutionOfNonVerifiedUser = async (req, res) => {
    const { userId, institutionId } = req.body;

    try {
        const user = await prisma.users.findUnique({
            where: {
                user_id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const institutionStudent = await prisma.institution_student.findUnique({
            where: {
                user_id: userId,
                institution_id: institutionId,
            },
        });

        if (!institutionStudent) {
            return res
                .status(404)
                .json({ error: "Institution not found for this user" });
        }

        if (institutionStudent.verification_status) {
            return res.status(403).json({
                error: "Institution is already verified for this user",
            });
        }

        await prisma.institution_student.delete({
            where: {
                user_id: userId,
                institution_id: institutionId,
            },
        });
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    institutionStudent,
                    "Institution deleted successfully"
                )
            );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const getInstitutionDetails = asyncHandler(async (req, res, next) => {
    const { userId } = req.query;
    console.log(userId);

    try {
        const user = await prisma.users.findUnique({
            where: { user_id: userId },
            include: {
                InstitutionVerification: {
                    include: {
                        institution: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const institutionVerification = user.InstitutionVerification;
        if (!institutionVerification) {
            return res
                .status(404)
                .json({ error: "Institution verification not found" });
        }

        const institution = institutionVerification.institution;
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    institutionVerification,
                    "Data fetched successfully."
                )
            );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

const Moreinfo = asyncHandler(async (req, res,next) => {
    const {
        userId,
        full_name,
        username,
        mobileNumber,
        address,
        dateOfBirth,
        interest,
    } = req.body;
        console.log(userId)

    try {
        // Validate input
        console.log(full_name,username,mobileNumber)
        if (!full_name || !username || !mobileNumber) {
            return res.status(400).json({
                message: "Full name, username, and mobile number are required.",
            });
        }

        let model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            // Set the `responseMimeType` to output JSON
            // Pass the schema object to the `responseSchema` field
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.STRING,
                    },
                },
            },
        });
        let prompt = `${interest} extract keyword of  interest from this quoted text.`;
        let result = await model.generateContent(prompt)
        
        const response  = result.response.candidates[0].content.parts[0].text
        console.log(response)
        const extractedKeywords = response.replace(/[\[\]""]/g, '').split(', ');
        console.log(extractedKeywords)



        // Find or create user
        const user = await prisma.users.update({
            where: { 
              user_id: userId  // Ensure that `userId` exists and is valid
            },
            data: {
              full_name,                     // Make sure these variables are defined and valid
              username,
              phone_number: mobileNumber,
              address,
              date_of_birth: new Date(dateOfBirth)  // Convert the date to a Date object
            }
          });
          

        // Update or create interests for the user
        for (const keyword of extractedKeywords) {
            console.log("Processing keyword:", keyword);

            // Check if interest exists
            let interestRecord = await prisma.interests.findUnique({
                where: { interest_name: keyword },
            });

            // If interest does not exist, create it
            if (!interestRecord) {
                interestRecord = await prisma.interests.create({
                    data: { interest_name: keyword },
                });
            }

            // Create user_interests relationship
            if(interestRecord){

                await prisma.user_interests.upsert({
                    where: {
                        user_id_interest_id: {
                            user_id: userId,
                            interest_id: interestRecord.interest_id,
                        },
                    },
                    update: {},  // No update needed if it already exists
                    create: {
                        user_id: userId,
                        interest_id: interestRecord.interest_id,
                    },
                });
            }
        }

        return res.status(200).json({
            message: "User updated successfully.",
            user,
            interests: extractedKeywords,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res
            .status(500)
            .json({ message: "Internal server error", error });
    }
});
export {
    addSkill,
    deleteSkill,
    getSkill,
    addInstitutionToUser,
    deleteInstitutionOfNonVerifiedUser,
    getInstitutionDetails,
    Moreinfo,
};
