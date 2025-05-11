import express from "express";
import Blog from "../models/blog.model.js";
import moment from "moment-timezone";

const router = express.Router();

router.get("/", async (req, res) => {
    const blogs = await Blog.find({});

    const timezone = req.user?.timezone || "Asia/Kolkata";
    const formatBlogs = blogs.map((blog) => {
        const taskTime = moment(blog.createdAt)
            .tz(timezone)
            .format("DD-MM-YYYY hh:mm:ss A z");
        return { ...blog._doc, taskTime };
    });
    return res.render("home", { allBlog: formatBlogs, user: req.user });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.get("/addBlog", (req, res) => {
    return res.render("addBlog", { user: req.user });
});

export default router;
