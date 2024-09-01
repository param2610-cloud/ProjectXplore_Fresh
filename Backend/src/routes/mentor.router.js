import express from 'express'
import { doVerification, getListOfMentor, getListOfstudents, ProjectList } from '../controllers/mentor.controller.js';

const router = express.Router();



router.get("/list-of-mentor",getListOfMentor);
router.get("/getallstudent",getListOfstudents)
router.get("/project-list",ProjectList)
router.post("/change-verification",doVerification)

export default router;