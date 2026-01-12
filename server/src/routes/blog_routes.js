import express from "express";
import { generateBlog, getBlogs } from "../controller/blog_controller.js";
import { protectRoute } from "../middlewares/auth_middlewares.js";

const router = express.Router();

router.post("/create", generateBlog);
router.get("/:userId/blogs", protectRoute, getBlogs);

export default router;
