import express from 'express';
import { create_a_room, get_room_details_for_specific_user, getRoomData } from '../controllers/room.controller.js';
const router = express.Router();


router.get("/user-room-data",get_room_details_for_specific_user)
router.post("/create-room",create_a_room)
router.get("/get-room-data",getRoomData)


export default router
