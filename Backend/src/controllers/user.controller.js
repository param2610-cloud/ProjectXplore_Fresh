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
} from "../model/User.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

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
    console.log(user)

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
    console.log(user.user_id)
    const { accessToken, refreshToken } = await generateTokens(user.user_id);

    const options = {
        httpOnly: true,
        secure: false, // HTTP for development
        sameSite: 'Lax', // or 'Strict' based on your needs
        maxAge: 24 * 60 * 60 * 1000 // Optional: Set expiration time
      };
      

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
    await clearUserRefreshToken(req.user.id);

    const options = {
        httpOnly: true,
        secure: true, // Set to true if you're using HTTPS
        sameSite: "Strict",
    };

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
        throw next(new ApiError(401, "Unauthorized request"));
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        const user = await findUserById(decodedToken.id);

        if (!user || user.refreshToken !== incomingRefreshToken) {
            throw next(new ApiError(401, "Invalid refresh token"));
        }

        const { accessToken, refreshToken } = await generateTokens(user.id);

        const options = {
            httpOnly: true,
            secure: true, // Set to true if you're using HTTPS
            sameSite: "Strict",
        };

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
    
    if (!incomingAccessToken) {
        throw next(new ApiError(401, "Unauthorized request"));
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

    if (!userId) {
        throw next(new ApiError(401, "No user ID found"));
    }

    const userDetails = await findUserById(userId);
    if (!userDetails) {
        throw next(new ApiError(401, "No user details found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, userDetails, "User found"));
});


export {
    getUserDetails, loginUser,
    logoutUser,
    refreshAccessToken, registerUser, validateAccessToken
};

