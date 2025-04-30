const BLOG = require("../models/blog.js")
const COMMENT = require("../models/comment.js")


async function handleAddBlog(req, res) {
    const { title, body } = req.body
    if (!title || !body) return res.status(400).json({ msg: 'all fileds req...' })
    const result = await BLOG.create({
        title,
        body,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id,
    })

    return res.redirect(`/blog/${result._id}`)
}

async function handleGetBlog(req, res) {
    const id = req.params.id
    const blog = await BLOG.findById(id).populate("createdBy")
    const comments = await COMMENT.find({ blogId: id }).populate("createdBy")
    // console.log(blog)
    // console.log(comments)

    return res.render("blog", { user: req.user, allBlogs: blog, allComments: comments })
}

async function handleComment(req, res) {
    const comment = await COMMENT.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    })

    return res.redirect(`/blog/${req.params.blogId}`)
}


module.exports = {
    handleAddBlog,
    handleGetBlog,
    handleComment
}