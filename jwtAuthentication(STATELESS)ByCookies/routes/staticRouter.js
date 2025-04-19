const express = require("express")
const router = express.Router()
const URL = require("../models/url.js")

router.get('/', async (req, res) => {
    // const result = await URL.find({})
    if (!req.user) return res.redirect('/login')
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