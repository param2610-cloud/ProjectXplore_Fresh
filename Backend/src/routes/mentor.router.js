import express from 'express'

const router = express.Router();



router.get("/list-of-mentor",getListOfMentor);

export default router;