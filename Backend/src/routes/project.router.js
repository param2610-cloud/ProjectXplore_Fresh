import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { project_Component_List_get } from "../controllers/project.controller.js";

const router = express.Router();


// router.post("/create",);
router.get("/component-list",project_Component_List_get)

export default router