import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createProject, getProjectById, getUserProjects, project_Component_List_get, updateProject } from "../controllers/project.controller.js";


const router = express.Router();


// router.post("/create",);
router.get("/component-list",project_Component_List_get)


router.post('/create', createProject);
router.put('/update/:id', updateProject);
router.get('/project-info', getProjectById);
router.get('/users/:userId/projects', getUserProjects);

export default router