import express from 'express';
import { AcceptRequest, create_a_room, createRequest, get_room_details_for_specific_id, get_room_details_for_specific_user, getAllRequestReview, GetRequestDetails, getRoomData, listOfRequestMadeByRoom, migrate_room, removeRoomMember, requestReviewStatusUpdate } from '../controllers/room.controller.js';
const router = express.Router();


router.get("/user-room-data",get_room_details_for_specific_user)
router.post("/create-room",create_a_room)
router.get("/get-room-data",getRoomData)
router.get("/get-room-data-by-id",get_room_details_for_specific_id)
router.post("/create-request",createRequest)
router.get("/get-request-details",GetRequestDetails)
router.post("/accept-request",AcceptRequest)
router.get("/get-all-request-review",getAllRequestReview)
router.post("/req-rev-status-update",requestReviewStatusUpdate)
router.get("/req-record-of-room",listOfRequestMadeByRoom)
router.delete('/remove-member', removeRoomMember);
router.post("/migrate-team",migrate_room)





export default router
