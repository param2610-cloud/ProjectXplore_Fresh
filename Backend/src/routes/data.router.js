import express from "express";
import { available_institution, available_interest, available_skill, UploadController } from "../controllers/availabledatafetch.controller.js";
import { addInstitution, addInterest, addSkill } from "../controllers/selfdataput.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = express.Router();
//get
router.get("/institution-list",verifyJWT,available_institution);
router.get("/interest-list",verifyJWT,available_interest);
router.get("/skill-list",verifyJWT,available_skill);
router.post("/upload-on-cloudinary",upload.single("mediaFile"),UploadController)
//post
router.post("/add-institution",verifyJWT,addInstitution)  
router.post("/add-interest",verifyJWT,addInterest)  
router.post("/add-skill",verifyJWT,addSkill)  

export default router