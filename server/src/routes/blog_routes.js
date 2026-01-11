import express from "express";
import { generateBlog } from "../controller/blog_controller.js";

const router = express.Router();

router.post("/create", generateBlog);

export default router;
