import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/prismaClient.js";

export const createProject = asyncHandler(async (req, res, next) => {
    try {
        const { roomId, projectData } = req.body;
        console.log("Received roomId:", roomId);
        console.log("Received projectData:", projectData);
        console.log("Received feature_list:", projectData.feature_list);

        if (!roomId) {
            return next(new ApiError(400, "Required data is not specified"));
        }

        const projecttablerowcreate = await prisma.new_Project_table.create({
            data: {
                projectName: projectData.projectName
                    ? projectData.projectName
                    : "",
                projectType: projectData.projectType
                    ? projectData.projectType
                    : "",
                projectDescription: projectData.projectDescription
                    ? projectData.projectDescription
                    : "",
                mentor: projectData.mentor ? projectData.mentor : "",
                roomId: roomId,
                reference: projectData.reference ? projectData.reference : "",
                demoLink: projectData.demoLink ? projectData.demoLink : "",
            },
        });
        const projectId = projecttablerowcreate.id;

        if (projectData.successMetrics) {
            for (const item of projectData.successMetrics) {
                const successMetricsCrateData =
                    await prisma.successMetric.create({
                        data: {
                            name: item.name ? item.name : "",
                            description: item.description
                                ? item.description
                                : "",
                            targetValue: item.targetValue
                                ? item.targetValue
                                : "",
                            projectId: projectId,
                        },
                    });
            }
        }
        if (projectData.risks) {
            for (const item of projectData.risks) {
                const riskCrateData = await prisma.risk.create({
                    data: {
                        description: item.description ? item.description : "",
                        impact: item.impact ? item.impact : "",
                        mitigation: item.mitigation ? item.mitigation : "",
                        projectId: projectId,
                    },
                });
            }
        }
        if (projectData.budget) {
            const BudgetData = await prisma.budget.create({
                data: {
                    projectId: projectId,
                },
            });
            const budgetId = BudgetData.id;
            if (projectData.budget.breakdown.length > 0) {
                for (const [key, value] of projectData.budget.breakdown) {
                    const breakdownitemcatagory =
                        await prisma.budgetCategory.create({
                            data: {
                                name: key,
                                amount: value,
                                budgetId: budgetId,
                            },
                        });
                }
            }
        }

        if (projectData.deliverables.length > 0) {
            for (const item of projectData.deliverables) {
                const createData = await prisma.deliverable.create({
                    data: {
                        name: item.name,
                        description: item.description,
                        type: item.type,
                        projectId: projectId,
                    },
                });
            }
        }
        if (projectData.milestones.length > 0) {
            for (const item of projectData.milestones) {
                const date = new Date(item.dueDate);
                const createData = await prisma.milestone.create({
                    data: {
                        name: item.name,
                        description: item.description,
                        dueDate: date.toISOString(),
                        projectId: projectId,
                    },
                });
            }
        }
        if (projectData.technicalRequirements) {
            const techreq = projectData.technicalRequirements;
            const createData = await prisma.technicalRequirement.create({
                data: {
                    databases: techreq.databases,
                    frameworks: techreq.frameworks,
                    infrastructure: techreq.infrastructure,
                    programmingLanguages: techreq.programmingLanguages,
                    tools: techreq.tools,
                    projectId: projectId,
                },
            });
        }
        if (projectData.feature_list.length > 0) {
            for (const feature of projectData.feature_list) {
                let inputId = null;
                let processId = null;
                let outputId = null;
                if (feature.input) {
                    let mediaId = null;
                    if (
                        feature.input.media.image.length > 0 ||
                        feature.input.media.video.length > 0
                    ) {
                        const mediaCreate = await prisma.media.create({
                            data: {
                                images:
                                    feature.input.media.image.length > 0
                                        ? feature.input.media.image
                                        : [],
                                videos:
                                    feature.input.media.video.length > 0
                                        ? feature.input.media.video
                                        : [],
                            },
                        });
                        mediaId = mediaCreate.id;
                    }
                    const inputCreate = await prisma.feature_subSectiom.create({
                        data: {
                            text: feature.input.text ? feature.input.text : "",
                            mediaId: mediaId,
                        },
                    });
                    inputId = inputCreate.id;
                }
                if (feature.process) {
                    let mediaId = null;
                    if (
                        feature.process.media.image.length > 0 ||
                        feature.process.media.video.length > 0
                    ) {
                        const mediaCreate = await prisma.media.create({
                            data: {
                                images:
                                    feature.process.media.image.length > 0
                                        ? feature.process.media.image
                                        : [],
                                videos:
                                    feature.process.media.video.length > 0
                                        ? feature.process.media.video
                                        : [],
                            },
                        });
                        mediaId = mediaCreate.id;
                    }
                    const processCreate =
                        await prisma.feature_subSectiom.create({
                            data: {
                                text: feature.process.text
                                    ? feature.process.text
                                    : "",
                                mediaId: mediaId,
                            },
                        });
                    processId = processCreate.id;
                }
                if (feature.output) {
                    let mediaId = null;
                    if (
                        feature.output.media.image.length > 0 ||
                        feature.output.media.video.length > 0
                    ) {
                        const mediaCreate = await prisma.media.create({
                            data: {
                                images:
                                    feature.output.media.image.length > 0
                                        ? feature.output.media.image
                                        : [],
                                videos:
                                    feature.output.media.video.length > 0
                                        ? feature.output.media.video
                                        : [],
                            },
                        });
                        mediaId = mediaCreate.id;
                    }
                    const outputCreate = await prisma.feature_subSectiom.create(
                        {
                            data: {
                                text: feature.output.text
                                    ? feature.output.text
                                    : "",
                                mediaId: mediaId,
                            },
                        }
                    );
                    outputId = outputCreate.id;
                }
                const new_feature_create = await prisma.new_Feature.create({
                    data: {
                        inputId: inputId,
                        processId: processId,
                        outputId: outputId,
                        projectID: projectId,
                    },
                });
            }
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    projecttablerowcreate,
                    "Project created successfully!"
                )
            );
    } catch (error) {
        console.error("Error in createProject:", error);
        return next(new ApiError(500, "Error while creating project"));
    }
});

export const updateProject = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const project = await prisma.new_Project_table.update({
            where: { id },
            data: updateData,
            include: {
                features: {
                    include: {
                        input: true,
                        process: true,
                        output: true,
                    },
                },
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    project,
                    "Project is updated successfully!"
                )
            );
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Error while updating project"));
    }
});

export const getProjectById = asyncHandler(async (req, res, next) => {
    try {
        const { projectId } = req.query;

        if (!projectId) {
            return next(new ApiError(400, "Project ID is required"));
        }

        const project = await prisma.new_Project_table.findUnique({
            where: { id: projectId },
            include: {
                budget: true,
                deliverables: true,
                hardwareComponents: true,
                softwareTechnologies: true,
                milestones: true,
                risks: true,
                room: {
                    include: {
                        update: true,
                        room_member: {
                            include: {
                                users: true,
                            },
                        },
                    },
                },
                successMetrics: true,
                technicalRequirements: true,
                features: {
                    include: {
                        inputs: {
                            include: {
                                medias: true,
                            },
                        },
                        outputs: {
                            include: {
                                medias: true,
                            },
                        },
                        processes: {
                            include: {
                                medias: true,
                            },
                        },
                    },
                },
            },
        });

        if (!project) {
            return next(new ApiError(404, "Project not found"));
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, project, "Project fetched successfully")
            );
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Error while fetching project"));
    }
});

export const getUserProjects = asyncHandler(async (req, res, next) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return next(new ApiError(400, "User ID is required"));
        }

        const User_room_project_data = await prisma.users.findUnique({
            where: {
                user_id: userId,
            },
            include: {
                rooms: {
                    include: {
                        New_Project_table: {
                            include: {
                                budget: true,
                                deliverables: true,
                                hardwareComponents: true,
                                softwareTechnologies: true,
                                milestones: true,
                                risks: true,
                                room: {
                                    include: {
                                        update: true,
                                        room_member: {
                                            include: {
                                                users: true,
                                            },
                                        },
                                    },
                                },
                                successMetrics: true,
                                technicalRequirements: true,
                                features: {
                                    include: {
                                        inputs: {
                                            include: {
                                                medias: true,
                                            },
                                        },
                                        outputs: {
                                            include: {
                                                medias: true,
                                            },
                                        },
                                        processes: {
                                            include: {
                                                medias: true,
                                            },
                                        },
                                    },
                                },
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
                    User_room_project_data,
                    "User projects fetched successfully"
                )
            );
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Error while fetching user projects"));
    }
});
