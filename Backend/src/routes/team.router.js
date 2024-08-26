import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { AddTeamMember, createTeam, deleteTeam, getListofTeam, getSpecificTeam, GlobalTeamListData, RemoveTeamMember, teamReqStatus, teamRequest_send, updateDetailsofTeam, userTeamStatus } from '../controllers/team.controller.js';
const router = express.Router();


router.post("/create-team",verifyJWT,upload.single("avatar"),createTeam)
router.post("/update-team",updateDetailsofTeam)
router.post("/delete-team",deleteTeam)
router.post("/url-status-change",teamReqStatus)
router.post("/team-req-send",teamRequest_send)
router.post("/team-member-add",AddTeamMember)
router.post("/team-member-remove",RemoveTeamMember)
router.get("/get-team",getSpecificTeam)
router.get("/team-list",GlobalTeamListData)
router.get("/team-status",userTeamStatus)

export default router   