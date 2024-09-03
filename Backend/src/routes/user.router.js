import express from "express";
import {  getUserDetails, loginUser, logoutUser, refreshAccessToken, registerUser, validateAccessToken,getProfileCompleted, NoOfProject, Createachievements, listofachievements, listofteam } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addInstitutionToUser, addSkill, checkUsernameAvailability, deleteInstitutionOfNonVerifiedUser, deleteSkill, getInstitutionDetails, getSkill, Moreinfo } from "../controllers/userinfo.controller.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout",verifyJWT, logoutUser);
router.post("/refresh-token",refreshAccessToken);
router.post("/validate-token",validateAccessToken);
router.post("/profile-submission",getProfileCompleted)
router.post("/add-skill",addSkill)
router.post("/delete-skill",deleteSkill)
router.post("/add-institution",addInstitutionToUser)
router.post("/delete-institution",deleteInstitutionOfNonVerifiedUser)
router.post("/more-info",Moreinfo)
router.post('/achievements',Createachievements)


router.get("/getUser",getUserDetails);
router.get("/get-institution",getInstitutionDetails)
router.get("/profile-completed",getProfileCompleted)
router.get("/get-skill",getSkill)
router.get("/username-status",checkUsernameAvailability)
router.get("/no-of-project",NoOfProject)
router.get('/achievements',listofachievements)
router.get('/teams',listofteam)


export default router;
