import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";

//get room details on a specific user
export const get_room_details_for_specific_user = asyncHandler(
    async (req, res, next) => {
        const { userId } = req.query;
        try {
            if (userId) {
                const data_as_owner = await prisma.rooms.findMany({
                    where: {
                        owner_id: userId,
                    },
                });
                const data_as_member = await prisma.room_member.findMany({
                    where: {
                        user_id: userId,
                    },
                    include: {
                        rooms: {
                            include: {
                                owner: true,
                            },
                        },
                    },
                });
                console.log(data_as_member, data_as_owner);

                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            200,
                            { data_as_owner, data_as_member },
                            "Data Fetched Succesfully"
                        )
                    );
            }
        } catch (error) {
            console.log(error);
            throw next(new ApiError(500, "Error while fetching data"));
        }
    }
);
export const get_room_details_for_specific_id = asyncHandler(
    async (req, res, next) => {
        const { roomId } = req.query;
        console.log(roomId);
        
        try {
            if (roomId) {
                const data_room = await prisma.rooms.findUnique({
                    where: {
                        room_id: roomId,
                    },
                    include: {
                        ideas: true,
                        room_member: {
                            include: {
                                users: true,
                            },
                        },
                        owner: true,
                        collaboration_requests: {
                            include: {
                                collaboration_request_reviews: {
                                    include: {
                                        users_collaboration_request_reviews_collaborator_idTousers: true,
                                    },
                                },
                            },
                        },
                    },
                });

                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            200,
                            data_room,
                            "Data Fetched Succesfully"
                        )
                    );
            }
        } catch (error) {
            console.log(error);
            throw next(new ApiError(500, "Error while fetching data"));
        }
    }
);
//create a room
export const create_a_room = asyncHandler(async (req, res, next) => {
    const { room_name, objective, owner_id, profile_pic_link } = req.body;
    try {
        if (room_name && owner_id) {
            const create_data = await prisma.rooms.create({
                data: {
                    room_name: room_name,
                    owner_id: owner_id,
                    profile_pic_link: profile_pic_link ? profile_pic_link : "",
                    objective: objective ? objective : "",
                },
            });
            console.log(create_data);
            return res
                .status(200)
                .json(new ApiResponse(200, create_data, "Room is created"));
        }
    } catch (error) {
        console.log(error);
        throw next(new ApiError(500, "Error while fetching data"));
    }
});
export const getRoomData = asyncHandler(async (req, res, next) => {
    const { roomId } = req.query;
    try {
        if (roomId) {
            const Roomdata = await prisma.rooms.findUnique({
                where: {
                    room_id: roomId,
                },
                include: {
                    update: {
                        include: {
                            author_details: true,
                        },
                    },
                    room_member:{
                        include:{
                            users:true
                        }
                    }
                },
            });
            console.log(Roomdata);

            return res
                .status(200)
                .json(new ApiResponse(200, Roomdata, "Succefull"));
        }
    } catch (error) {
        console.log(error);
        throw next(new ApiError(500, "Error while fetching room data"));
    }
});

export const createRequest = asyncHandler(async (req, res, next) => {
    const {
        user_id,
        room_id,
        request_text,
        domain_expertise_required,
        status,
    } = req.body;
    console.log(
        user_id,
        room_id,
        request_text,
        domain_expertise_required,
        status
    );
    try {
        if (user_id) {
            const Data = await prisma.collaboration_requests.create({
                data: {
                    room_id,
                    request_text,
                    domain_expertise_required,
                    status,
                    user_id,
                },
            });
            console.log(Data);
            
            return res
                .status(200)
                .json(new ApiResponse(200, Data, "The request is creaeted"));
        }
    } catch (error) {
        console.log(error);
        throw next(new ApiError(500, "Request is not create."));
    }
});

export const GetRequestDetails = asyncHandler(async (req, res, next) => {
    const { request_id } = req.query;
    try {
        const Data = await prisma.collaboration_requests.findUnique({
            where: {
                request_id,
            },
        });
        if (Data) {
            return res
                .status(200)
                .json(new ApiResponse(200, Data, "The request is fecthed"));
        }
    } catch (error) {
        console.log(error);
        throw next(new ApiError(500, "Request is not create."));
    }
});

export const AcceptRequest = asyncHandler(async (req, res, next) => {
    const { request_id, collaborator_id, comments } = req.query;
    console.log(request_id, collaborator_id, comments);

    try {
        if (request_id && collaborator_id) {
            const Data = await prisma.collaboration_request_reviews.create({
                data: {
                    request_id,
                    comments,
                    collaborator_id,
                },
            });
            if(Data.collaborator_id ){
                const collaborator_data = await prisma.users.findUnique({
                    where:{
                        user_id:collaborator_id
                    }
                })
                const collaborator_name = collaborator_data.full_name;
                const requestData = await prisma.collaboration_requests.findUnique({
                    where:{
                        request_id:Data.request_id
                    },
                    include:{
                        users:true,
                        rooms:true
                    }
                })
                const reviewer_email = requestData.users.email
                const roomOwnerName = requestData.users.full_name
                const roomname = requestData.rooms.room_name
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "projectxplore5@gmail.com",
                        pass: process.env.Email_Key,
                    },
                });

                var mailOptions = {
                    from: 'projectxplore5@gmail.com',
                    to: reviewer_email, // Replace with the room owner's email
                    subject: 'New Collaborator Request Accepted',
                    html: `
                    <html>
                      <head>
                        <style>
                          body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                          }
                          .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                          }
                          .header {
                            text-align: center;
                            padding: 10px;
                            background-color: #076AE1;
                            color: white;
                            border-radius: 8px 8px 0 0;
                          }
                          .header h1 {
                            margin: 0;
                          }
                          .content {
                            padding: 20px;
                            color: #333333;
                          }
                          .content h2 {
                            color: #076AE1;
                          }
                          .content p {
                            line-height: 1.6;
                          }
                          .comment-box {
                            background-color: #f9f9f9;
                            border-left: 4px solid #076AE1;
                            padding: 10px;
                            margin: 10px 0;
                            border-radius: 4px;
                            color: #333333;
                          }
                          .footer {
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                            color: #888888;
                          }
                        </style>
                      </head>
                      <body>
                        <div class="container">
                          <div class="header">
                            <h1>Collaborator Request Accepted!</h1>
                          </div>
                          <div class="content">
                            <p>Dear <strong>${roomOwnerName}</strong>,</p>
                            <p>We are happy to inform you that <strong>${collaborator_name}</strong> has accepted the invitation to collaborate on the room <strong>"${roomname}"</strong>. However, the final decision rests with you, and we're awaiting your confirmation to officially add this collaborator.</p>
                            ${
                              comments 
                              ? `<h2>Collaborator's Comments:</h2>
                                  <div class="comment-box">
                                    <p>${comments}</p>
                                  </div>` 
                              : ''
                            }
                            <p>Please review the request and let us know your decision at your earliest convenience.</p>
                          </div>
                          <div class="footer">
                            <p>Best regards,</p>
                            <p>The ProjectXplore Team</p>
                          </div>
                        </div>
                      </body>
                    </html>`
                  };
                  
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent: " + info.response);
                    }
                });
                return res
                    .status(200)
                    .json(new ApiResponse(200, Data, "Your Request is accepted."));
            }
        }
    } catch (error) {
        console.log(error);
        throw next(new ApiError(500, "Request is not create."));
    }
});
export const getAllRequestReview = asyncHandler(async (req, res, next) => {
    const { request_id } = req.query;
    try {
        if (request_id) {
            const Data = await prisma.collaboration_request_reviews.findMany({
                where: {
                    request_id,
                },
                include:{
                    users_collaboration_request_reviews_collaborator_idTousers:true
                }
            });
            console.log(Data);
            
            return res
                .status(200)
                .json(new ApiResponse(200, Data, "Your Request's review list "));
        }
    } catch (error) {
        console.log(error);
        throw next(new ApiError(500, "Request review not got."));
    }
});
export const requestReviewStatusUpdate = asyncHandler(async (req, res, next) => {
    const { review_id, review_status, role_name } = req.body;
    try {
        console.log('Request received with query params:', { review_id, review_status, role_name });

        if (review_id && review_status) {
            const Data = await prisma.collaboration_request_reviews.update({
                where: {
                    review_id,
                },
                data: {
                    review_status,
                },
                include: {
                    users_collaboration_request_reviews_collaborator_idTousers: true,
                },
            });

            console.log('Updated collaboration_request_reviews Data:', Data);

            const RoomId = await prisma.collaboration_requests.findUnique({
                where: {
                    request_id: Data.request_id,
                },
                include: {
                    rooms: true,
                },
            });

            console.log('Found RoomId:', RoomId);

            const roomData = await prisma.rooms.findUnique({
                where: {
                    room_id: RoomId.room_id,
                },
                include: {
                    owner: true,
                    ideas: true,
                },
            });

            console.log('Found room data:', roomData);

            const validStatuses = ["pending", "approved", "rejected"];
            if (validStatuses.includes(review_status) && roomData) {
                const roomname = roomData.room_name;
                const Collaborator_name =Data.users_collaboration_request_reviews_collaborator_idTousers.full_name;
                const IdeaName = roomData?.ideas[0]?.idea_name;
                const IdeaText = roomData?.ideas[0]?.idea_text;
                const Email =
                    Data
                        .users_collaboration_request_reviews_collaborator_idTousers
                        .email;

                console.log('Sending email to:', Email);

                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "projectxplore5@gmail.com",
                        pass: process.env.Email_Key,
                    },
                });

                var mailOptions = {
                    from: "projectxplore5@gmail.com",
                    to: Email,
                    subject: "Your Request for Room Approval is Confirmed",
                    html: `
                    <html>
                      <head>
                        <style>
                          body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                          }
                          .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                          }
                          .header {
                            text-align: center;
                            padding: 10px;
                            background-color: #076AE1;
                            color: white;
                            border-radius: 8px 8px 0 0;
                          }
                          .header h1 {
                            margin: 0;
                          }
                          .content {
                            padding: 20px;
                            color: #333333;
                          }
                          .content h2 {
                            color: #076AE1;
                          }
                          .content p {
                            line-height: 1.6;
                          }
                          .idea-box {
                            background-color: #f9f9f9;
                            border-left: 4px solid #076AE1;
                            padding: 10px;
                            margin: 10px 0;
                            border-radius: 4px;
                          }
                          .footer {
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                            color: #888888;
                          }
                            .a {
                            color:#076DFF;
                            }
                        </style>
                      </head>
                      <body>
                        <div class="container">
                          <div class="header">
                            <h1>Room Approved!</h1>
                          </div>
                          <div class="content">
                            <p>Dear <strong>${Collaborator_name}</strong>,</p>
                            <p>We are excited to inform you that your request for the room <a href="${process.env.FRONTEND_DOMAIN}/room/${RoomId.room_id}"><strong>"${roomname}"</strong></a> has been approved for the role of ${role_name}. Every room in ProjectXplore is built around an idea, and our goal is to help you turn that idea into reality!</p>
                            <h2>Your Idea</h2>
                            <div class="idea-box">
                              <p><strong>Idea Name:</strong> ${IdeaName}</p>
                              <p><strong>Description:</strong> ${IdeaText}</p>
                            </div>
                            <p>Now that the room is live, you and your team can collaborate, share insights, and take steps toward making your idea a reality. We're here to support you throughout the journey.</p>
                            <p>Good luck, and let's bring your idea to life!</p>
                          </div>
                          <div class="footer">
                            <p>Best regards,</p>
                            <p>The ProjectXplore Team</p>
                          </div>
                        </div>
                      </body>
                    </html>`,
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.error('Error while sending email:', error);
                    } else {
                        console.log("Email sent: " + info.response);
                    }
                });

                console.log('Adding new member to room:', {
                    user_id: Data.collaborator_id,
                    room_id: RoomId.room_id,
                    role_name
                });

                const AddMember = await prisma.room_member.create({
                    data: {
                        user_id: Data.collaborator_id,
                        room_id: RoomId.room_id,
                        role_name
                    }
                });
                sendNotification({ message: `Member is added.` });

                console.log('Member added successfully:', AddMember);

                return res
                    .status(200)
                    .json(new ApiResponse(200, AddMember, "Member is added."));
            } else {
                console.warn('Invalid status or roomData missing');
            }
        } else {
            console.warn('Missing required parameters: review_id or review_status');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        next(new ApiError(500, "Problem"));
    }
});
export const listOfRequestMadeByRoom = asyncHandler(async(req,res,next)=>{
    const {room_id} = req.query;
    console.log(room_id);
    
    try {
        if(room_id){
            const Request_data = await prisma.collaboration_requests.findFirst({
                where:{
                    room_id:room_id
                }
            })
            console.log(Request_data);
            
            return res.status(200).json(new ApiResponse(200,Request_data,"Data is fetched"))
        }
    } catch (error) {
        console.log(error)
        throw next(new ApiError(500,"Error"))
    }
})
export const removeRoomMember = asyncHandler(async (req, res, next) => {
    const { room_id, user_id } = req.body;

    try {
        // Check if the room and user exist in the room_member table
        const member = await prisma.room_member.findFirst({
            where: {
                room_id,
                user_id
            }
        });

        if (!member) {
            return next(new ApiError(404, 'Member not found in this room.'));
        }

        // Delete the room_member entry
        const deletedMember = await prisma.room_member.delete({
            where: {
                id: member.id
            }
        });

        // Return success response
        return res.status(200).json(new ApiResponse(200, deletedMember, 'Member removed successfully.'));
    } catch (error) {
        console.error('Error while removing member:', error);
        return next(new ApiError(500, 'Unable to remove the member.'));
    }
});
export const migrate_room =asyncHandler(async(req,res,next)=>{
    const {teamId,room_name,profile_pic_link,objective} = req.body;
    console.log(teamId,room_name,profile_pic_link,objective);
    
    try {
        const TeamData = await prisma.teams.findUnique({
            where:{
                team_id:teamId
            },
            include:{
                team_member_roles:true  
            }
        }) 
        const createRoom = await prisma.rooms.create({
            data: {
                room_name: room_name,
                owner_id: TeamData.team_author_id,
                profile_pic_link: profile_pic_link ? profile_pic_link : "",
                objective: objective ? objective : ""
            },
        });
        TeamData.team_member_roles.forEach(async(member)=>{
            const Addmember  = await prisma.room_member.create({
                data:{
                    role_name:member.role_name,
                    room_id:createRoom.room_id,
                    user_id:member.user_id
                }
            })
            
        })
        // console.log(TeamData);
        return res.status(200).json(new ApiResponse(200, createRoom, 'Member removed successfully.'));
        
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, 'Unable to remove the member.'));

    }
})

