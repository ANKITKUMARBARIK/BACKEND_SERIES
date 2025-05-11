import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

export async function handleAddBlog(req, res) {
    const { title, body } = req.body;
    if (!title || !body)
        return res.status(400).json({ msg: "all fields req..." });
    const result = await Blog.create({
        title,
        body,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id,
        creatorTimezone: req.user.timezone,
    });

    return res.redirect(`/blog/${result._id}`);
}

export async function handleGetBlog(req, res) {
    const blogId = req.params.blogId;
    const blogs = await Blog.findById(blogId).populate("createdBy");
    const comments = await Comment.find({ blogId: blogId }).populate(
        "createdBy"
    );

    return res.render("blog", {
        blog: blogs,
        allComment: comments,
        user: req.user,
    });
}

export async function handleComment(req, res) {
    const { content } = req.body;
    const blogId = req.params.blogId;
    const comment = await Comment.create({
        content,
        blogId,
        createdBy: req.user._id,
    });

    return res.redirect(`/blog/${blogId}`);
}
