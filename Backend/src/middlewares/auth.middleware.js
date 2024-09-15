import prisma from '../db/prismaClient.js';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const {accessToken,refreshToken} = req.body;
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await prisma.users.findUnique({
            where: { user_id: decodedToken.user_id },
            select: { user_id: true, full_name: true, email: true, profile_picture_link: true }
        });

        if (!user) {
            throw new ApiError(401, "Invalid access token: User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error verifying JWT:", error);
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
