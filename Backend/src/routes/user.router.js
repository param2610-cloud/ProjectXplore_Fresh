import express from "express";
import {  getUserDetails, loginUser, logoutUser, refreshAccessToken, registerUser, validateAccessToken,getProfileCompleted } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout",verifyJWT, logoutUser);
router.post("/refresh-token",refreshAccessToken);
router.post("/validate-token",validateAccessToken);
router.post("/profile-submission",getProfileCompleted)
router.get("/getUser",getUserDetails);
router.get("/profile-completed",getProfileCompleted)


export default router;
