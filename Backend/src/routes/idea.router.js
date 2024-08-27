import express from "express";
import { createIdea, getIdea } from "../controllers/idea.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; 

const router = express.Router();

router.post("/create", createIdea); 
router.get("/get-idea", getIdea); 

export default router;
