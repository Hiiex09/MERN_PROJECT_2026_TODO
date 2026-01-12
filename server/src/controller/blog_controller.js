import blogs from "../models/blog_model.js";

export const generateBlog = async (req, res) => {
  const { title, content, author, category, tags } = req.body;
  try {
    const blog = await blogs.create({ title, content, author, category, tags });

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

export const getBlogs = async (req, res) => {
  const userId = req.user._id;

  try {
    const get_blog = await blogs.find({ author: userId });
    res.status(200).json({
      data: "All Blogs",
      count: get_blog.length,
      data: get_blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
