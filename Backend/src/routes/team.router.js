import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { createTeam, deleteTeam, getListofTeam, getSpecificTeam, teamReqStatus, updateDetailsofTeam, userTeamStatus } from '../controllers/team.controller.js';
const router = express.Router();


router.post("/create-team",verifyJWT,upload.single("avatar"),createTeam)
router.post("/update-team",updateDetailsofTeam)
router.post("/delete-team",deleteTeam)
router.post("/url-status-change",teamReqStatus)
router.get("/get-team",getSpecificTeam)
router.get("/team-list",getListofTeam)
router.get("/team-status",userTeamStatus)

export default router   