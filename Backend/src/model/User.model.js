import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const createUser = async ({ full_name,username, email, password, avatarUrl }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.users.create({
        data: {
            full_name:full_name,
            username:username,
            email:email,
            password:hashedPassword,
            profile_picture_link:avatarUrl
        }
    });
};

export const findUserByEmail = async (email) => {
    if(!email){
        console.log("no emial")
    }
    return prisma.users.findUnique({
        where: { email },
        select: { password:true, refreshToken:true, user_id:true, username:true, email: true }
    });
};

export const findUserById = async (id) => { 
    if(!id){
        return null
    }
    return prisma.users.findUnique({
        where: {user_id:id}
    });
};

export const updateUserRefreshToken = async (id, refreshToken) => {
    return prisma.users.update({
        where: { user_id:id },
        data: { refreshToken }
    });
};

export const clearUserRefreshToken = async (id) => {
    return prisma.users.update({
        where: { user_id },
        data: { refreshToken: null }
    });
};

export const comparePassword = async (inputPassword, hashedPassword) => {
    return bcrypt.compare(inputPassword, hashedPassword);
};

export const generateAccessToken = (user) => {
    return jwt.sign(
        { user_id: user.user_id, email: user.email, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};
    
export const generateRefreshToken = (user) => {
    return jwt.sign(
        { user_id: user.user_id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};
