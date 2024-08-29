import express from 'express'
import { createUpdate, getAllUpdateFromRoomId } from '../controllers/update.controller.js'

const router = express.Router()

router.get("/get-update-list",getAllUpdateFromRoomId)
router.post("/create",createUpdate)


export default router