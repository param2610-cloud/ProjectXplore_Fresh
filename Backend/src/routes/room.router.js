import express from 'express';
const router = express.Router();
import { addRoomMember, createRoom, deleteRequestById, getAllReceivedRequests, getRequestById, getRoomById, searchUsers, sendEmail,getTaskById, addTask, updateTask, getAllTasks, getAllMember, getUserRooms } from '../controllers/room.controller.js';

router.get('/search', searchUsers);
router.post('/send-email', sendEmail);
router.post('/create', createRoom);
router.post('/add-room-member', addRoomMember);
router.delete('/delete-request', deleteRequestById);
router.get('/received-requests', getAllReceivedRequests);
router.get('/get-request', getRequestById);
router.get('/get-room', getRoomById);
router.get('/get-all-member', getAllMember);
router.get('/get-all-room', getUserRooms);
//task  
router.get('/task', getTaskById);
router.post('/task', addTask);
router.put('/task', updateTask);
router.get('/tasks', getAllTasks);



export default router
