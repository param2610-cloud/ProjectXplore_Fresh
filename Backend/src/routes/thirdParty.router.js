import express from "express";
import { techNewsApi } from "../controllers/thirdparty.controller.js";


const router = express.Router();

router.get("/tech-news",techNewsApi)

export default router