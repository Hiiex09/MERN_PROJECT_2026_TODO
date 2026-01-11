import blogs from "../models/blog_model.js";

export const generateBlog = async (req, res) => {
  try {
    const blog = await blogs.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      category: req.body.category,
      tags: req.body.tags,
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
