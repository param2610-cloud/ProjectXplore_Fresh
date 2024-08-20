import express from "express";
import { checkUserLikeOnComment, checkUserLikeOnProject, createComment, createProject,getCommentLikesCount,getCommentsByProjectId,getProjectById,getProjectLikesCount,likeComment,likeProject,removeCommentLike,removeProjectLike,sentListOfProject } from "../controllers/project.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();


router.post("/create",upload.array('images'),createProject);
router.get("/list",sentListOfProject);
router.get("/get",getProjectById);
 // comment routes
router.post("/comment/create", createComment);
router.get("/comment/list", getCommentsByProjectId);
router.get("/comment/likes", getCommentLikesCount); 
router.post("/comment/remove-likes", removeCommentLike); 
router.post("/comment/like", likeComment);
router.post("/comment/check-like", checkUserLikeOnComment);

// Like routes
router.post("/project/like", likeProject);
router.get("/project/likes", getProjectLikesCount);
router.post("/project/remove-likes", removeProjectLike); 
router.get('/project/check-like', checkUserLikeOnProject);


export default router