const express = require("express")
const router = express.Router()
const URL = require("../models/url.js")
const { restrictTo } = require("../middlewares/auth.js")

// AUTHORIZATION only for accessible by ("ADMIN") user
router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
    const result = await URL.find({})
    return res.render("home", { allUrl: result })
})

// AUTHORIZATION only for accessible by ("NORMAL","ADMIN") user
router.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    // const result = await URL.find({})
    const result = await URL.find({ createdBy: req.user._id })
    return res.render("home", { allUrl: result })
})

router.get('/signup', async (req, res) => {
    return res.render("signup")
})

router.get('/login', async (req, res) => {
    return res.render("login")
})

module.exports = router