import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const project_Component_List_get = asyncHandler(
    async (req, res, next) => {
        try {
            const data = await prisma.components.findMany();
            if (data) {
                console.log(data);

                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            200,
                            data,
                            "Component list fetched successfully!"
                        )
                    );
            }
        } catch (error) {
            console.log(error);
            throw next(
                new ApiError(500, "Error While Fetching Component list")
            );
        }
    }
);

export const createProject = asyncHandler(async (req, res, next) => {
  try {
      const { roomId, projectData } = req.body;
      console.log('Received roomId:', roomId);
      console.log('Received projectData:', projectData);
      console.log('Received feature_list:', projectData.feature_list);

      if (
          !roomId ||
          
          !projectData.feature_list
      ) {
          return next(
              new ApiError(500, "Data is not specified")
          );
      }

      // Ensure correct field names and proper JSON structure
      const project = await prisma.new_Project_table.create({
          data: {
              roomId,
              projectType: projectData.projectType ?? null,
              projectName: projectData.projectName ?? null,
              projectDescription: projectData.projectDescription ?? null,
              mentor: projectData.mentor ?? null,
              reference: projectData.reference ?? null,
              demoLink: projectData.demoLink ?? null,
              hardwareComponents: JSON.stringify(
                  projectData.hardwareComponents ?? []
              ),
              featureList: JSON.stringify(projectData.feature_list ?? []),
              technicalRequirements: JSON.stringify(
                  projectData.technicalRequirements ?? []
              ),
              milestones: JSON.stringify(projectData.milestones ?? []),
              deliverables: JSON.stringify(projectData.deliverables ?? []),
              budget: JSON.stringify(projectData.budget ?? {}),
              risks: JSON.stringify(projectData.risks ?? []),
              successMetrics: JSON.stringify(
                  projectData.successMetrics ?? []
              ),
              softwareTechnologies: projectData.softwareTechnologies ?? [], // Ensure it's an array
          },
      });

      return res
          .status(200)
          .json(
              new ApiResponse(
                  200,
                  project,
                  "Project is created successfully!"
              )
          );
  } catch (error) {
      console.log(error);
      return next(new ApiError(500, "Error while creating project"));
  }
});


export const updateProject = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const project = await prisma.new_Project_table.update({
            where: { id },
            data: {
                ...updateData,
                hardwareComponents: updateData.hardwareComponents
                    ? JSON.stringify(updateData.hardwareComponents)
                    : undefined,
                featureList: updateData.featureList
                    ? JSON.stringify(updateData.featureList)
                    : undefined,
                technicalRequirements: updateData.technicalRequirements
                    ? JSON.stringify(updateData.technicalRequirements)
                    : undefined,
                milestones: updateData.milestones
                    ? JSON.stringify(updateData.milestones)
                    : undefined,
                deliverables: updateData.deliverables
                    ? JSON.stringify(updateData.deliverables)
                    : undefined,
                budget: updateData.budget
                    ? JSON.stringify(updateData.budget)
                    : undefined,
                risks: updateData.risks
                    ? JSON.stringify(updateData.risks)
                    : undefined,
                successMetrics: updateData.successMetrics
                    ? JSON.stringify(updateData.successMetrics)
                    : undefined,
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
        throw next(new ApiError(500, "Error While Fetching "));
    }
});

export const getProjectById = asyncHandler(async (req, res, next) => {
    try {
        const { projectId } = req.query;

        const project = await prisma.new_Project_table.findUnique({
            where: { id:projectId },
        });

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    project,
                    "Project is fetched successfully!"
                )
            );
    } catch (error) {
        console.log(error);
        throw next(new ApiError(500, "Error  Fetching Data"));
    }
});

export const getUserProjects = asyncHandler(async (req, res, next) => {
    try {
        const { userId } = req.params;

        const userRooms = await prisma.room_member.findMany({
            where: { user_id: userId },
            select: { room_id: true },
        });

        const roomIds = userRooms.map((room) => room.room_id);

        const projects = await prisma.new_Project_table.findMany({
            where: {
                roomId: {
                    in: roomIds,
                },
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    projects,
                    "Project is created successfully!"
                )
            );
    } catch (error) {
        console.log(error);
        throw next(new ApiError(500, "Error While Fetching Data"));
    }
});
