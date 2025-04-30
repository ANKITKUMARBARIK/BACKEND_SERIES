const express = require("express")
const router = express.Router()
const BLOG = require("../models/blog.js")

router.get('/', async (req, res) => {
    const allBlogs = await BLOG.find({})
    return res.render("home", {
        user: req.user,
        blogs: allBlogs,
    })
})

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.get('/signin', (req, res) => {
    return res.render('signin')
})

router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user
    })
})

module.exports = router