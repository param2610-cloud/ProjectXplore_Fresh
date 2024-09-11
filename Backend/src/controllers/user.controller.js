import jwt from "jsonwebtoken";
import {
    clearUserRefreshToken,
    comparePassword,
    createUser,
    findUserByEmail,
    findUserById,
    generateAccessToken,
    generateRefreshToken,
    updateUserRefreshToken,
} from "../model/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import prisma from "../db/prismaClient.js";
const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000, 
};

const registerUser = asyncHandler(async (req, res, next) => {
    const { full_name, username, email, password } = req.body;

    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw next(new ApiError(400, "All fields are required"));
    }

    const existedUser = await findUserByEmail(email);

    if (existedUser) {
        throw next(new ApiError(409, "Email already exists"));
    }

    const avatarlocalpath = req.file?.path;
    if (!avatarlocalpath) {
        throw next(new ApiError(400, "Avatar file is required"));
    }

    const avatarUrl = await uploadOnCloudinary(avatarlocalpath);
    if (!avatarUrl) {
        throw next(new ApiError(400, "Failed to upload avatar"));
    }

    const user = await createUser({
        full_name,
        username,
        email,
        password,
        avatarUrl: avatarUrl.url,
    });

    if (!user) {
        throw next(new ApiError(500, "Error registering user"));
    }

    return res
        .status(201)
        .json(new ApiResponse(200, user, "User registered successfully"));
});

const generateTokens = async (userId) => {
    if (!userId) return null;

    const user = await findUserById(userId);
    if (!user) throw new Error("User not found");
    console.log(user);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await updateUserRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
};

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        return next(new ApiError(401, "Email and password are required"));
    }

    const user = await findUserByEmail(email);
    if (!user) {
        return next(new ApiError(402, "User does not exist"));
    }
    console.log(user);

    const validateUser = await comparePassword(password, user.password);
    if (!validateUser) {
        return next(new ApiError(403, "Password is incorrect"));
    }
    console.log(user.user_id);
    const { accessToken, refreshToken } = await generateTokens(user.user_id);


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user, accessToken, refreshToken },
                "Logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res, next) => {
    const { user_id } = req.body;
    await clearUserRefreshToken(user_id);


    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.headers["authorization"]?.substring(7);

    if (!incomingRefreshToken) {
        return res
            .status(200)
            .json(new ApiResponse(200, false, "Token is not available"));
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        const user = await findUserById(decodedToken.id);
        console.log(user);
        
        if (!user || user.refreshToken !== incomingRefreshToken) {
            throw next(new ApiError(401, "Invalid refresh token"));
        }

        const { accessToken, refreshToken } = await generateTokens(user.id);


        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken, user },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        throw next(new ApiError(401, error.message || "Invalid refresh token"));
    }
});

const validateAccessToken = asyncHandler(async (req, res, next) => {
    const incomingAccessToken = req.cookies.accessToken;
    console.log(req.cookies);
    
    if (!incomingAccessToken) {
        return res
            .status(200)
            .json(new ApiResponse(200, false, "Token is not available"));
    }

    try {
        const decodedToken = jwt.verify(
            incomingAccessToken,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = await findUserById(decodedToken.user_id);

        if (!user) {
            throw next(new ApiError(401, "Invalid access token"));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, { user }, "Valid access token"));
    } catch (error) {
        throw next(new ApiError(401, error.message || "Invalid access token"));
    }
});

const getUserDetails = asyncHandler(async (req, res, next) => {
    const { userId } = req.query;
    console.log(userId);
    if (!userId) {
        throw next(new ApiError(401, "No user ID found"));
    }

    const userDetails = await prisma.users.findUnique({
        where: {
            user_id: userId,
        },
        include: {
            teams: {
                include: {
                    achievements: true,
                },
            },
            rooms: {
                include: {
                    New_Project_table: true,
                },
            },
            user_achievements: true,
            skills:true,
            education:true,
            experiences:true
        },
    });
    if (!userDetails) {
        throw next(new ApiError(401, "No user details found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, userDetails, "User found"));
});
const getProfileCompleted = asyncHandler(async (req, res, next) => {
    const { userId } = req.query;
    console.log("trigger");

    if (!userId) {
        throw next(new ApiError(401, "No user ID found"));
    }

    const userDetails = await prisma.users.findUnique({
        where: { user_id: userId },
    });
    if (!userDetails) {
        throw next(new ApiError(401, "No user details found"));
    }
    console.log(userDetails);
    if (
        !userDetails.address ||
        userDetails.date_of_birth ||
        userDetails.full_name ||
        userDetails.institution_id ||
        userDetails.full_name ||
        userDetails.phone_number ||
        userDetails.username
    ) {
        return res
            .status(200)
            .json(new ApiResponse(200, false, "Profile is not completed"));
    }

    return res.status(200).json(new ApiResponse(200, true, "User found"));
});

export const submitProfileData = asyncHandler(async (req, res, next) => {
    const { userId } = req.query; // Getting the user ID from the query params
    const {
        full_name,
        username,
        mobileNumber,
        address,
        dateOfBirth,
        institution,
        skills,
        interest,
    } = req.body; // Getting data from request body

    // Check if userId is provided
    if (!userId) {
        return next(new ApiError(401, "No user ID found")); // Throw error if userId is missing
    }

    try {
        // Update user profile details in the database
        const userDetails = await prisma.users.update({
            where: { user_id: userId },
            data: {
                full_name,
                username,
                phone_number: mobileNumber, // Assuming phone_number is used in your schema
                address,
                date_of_birth: dateOfBirth,
                institution_id: institution,
                skills, // Assuming skills is stored as an array
                interest,
            },
        });

        if (!userDetails) {
            return next(new ApiError(401, "No user details found")); // Throw error if user not found
        }

        // Check if the profile is complete (validate key fields)
        if (
            !userDetails.full_name ||
            !userDetails.username ||
            !userDetails.phone_number ||
            !userDetails.address ||
            !userDetails.date_of_birth
        ) {
            return res
                .status(200)
                .json(new ApiResponse(200, false, "Profile is not completed"));
        }

        // If everything is okay, respond with success
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    true,
                    "Profile updated successfully",
                    userDetails
                )
            );
    } catch (error) {
        console.error("Error updating user profile:", error);
        return next(new ApiError(500, "Internal Server Error"));
    }
});

const NoOfProject = asyncHandler(async (req, res, next) => {
    const { userId } = req.query;
    try {
        if (userId) {
            const data = await prisma.users.findUnique({
                where: {
                    user_id: userId,
                },
                include:{
                    rooms:{
                        include:{
                            New_Project_table:true
                        }
                    }
                }
            });
            let index = 0
            for(const rooms of data.rooms){
                for(const project of rooms.New_Project_table){
                    index=index+1;
                }
            }
            return res.status(200).json(new ApiResponse(200, index, "successfull"));
        } else {
            return next(new ApiError(500, "Internal Server Error"));
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Internal Server Error"));
    }
});

const Createachievements = asyncHandler(async (req, res) => {
    try {
        const { user_id, title, description, date, images } = req.body;

        const achievement = await prisma.user_achievements.create({
            data: {
                user_id,
                title,
                description,
                date: date ? new Date(date) : null,
                images,
            },
        });

        res.status(201).json(achievement);
    } catch (error) {
        console.error("Error creating achievement:", error);
        res.status(500).json({ error: "Error creating achievement" });
    }
});
const listofachievements = asyncHandler(async (req, res) => {
    try {
        const { user_id } = req.query;
        console.log(user_id);
        

        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const achievements = await prisma.user_achievements.findMany({
            where: {
                user_id: user_id,
            },
            orderBy: {
                date: "desc",
            },
        });
        console.log(achievements);
        
        res.status(200).json(achievements);
    } catch (error) {
        console.error("Error fetching achievements:", error);
        res.status(500).json({ error: "Error fetching achievements" });
    }
});
const listofteam = asyncHandler(async (req, res) => {
    try {
        const { user_id } = req.query;
        console.log(user_id);
        

        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const rooms = await prisma.users.findUnique({
            where: {
                user_id:user_id
            },
            include:{
                rooms:true
            }
        });
        console.log(rooms.rooms.length);
        
        res.status(200).json(rooms.rooms.length);
    } catch (error) {
        console.error("Error fetching achievements:", error);
        res.status(500).json({ error: "Error fetching achievements" });
    }
});

export {
    getUserDetails,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    validateAccessToken,
    getProfileCompleted,
    NoOfProject,
    Createachievements,
    listofachievements,
    listofteam
};
