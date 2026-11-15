import express from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  bulkUploadBlogs,
} from "../controllers/blog.controller.js";

import ownerAuth from "../middleware/ownerAuth.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);

// Verify owner key (must be above "/:id")
blogRouter.get("/admin/verify", ownerAuth, (req, res) => {
  res.json({ success: true });
});

blogRouter.post("/bulk-upload", ownerAuth, bulkUploadBlogs);
blogRouter.get("/:id", getSingleBlog);

blogRouter.post("/", ownerAuth, createBlog);
blogRouter.put("/:id", ownerAuth, updateBlog);
blogRouter.delete("/:id", ownerAuth, deleteBlog);

export default blogRouter;