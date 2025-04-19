const express = require("express")
const router = express.Router()
const URL = require("../models/url.js")

router.get('/', async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const result = await URL.find({ createdBy: req.user._id })
    return res.render("home", { allURL: result })
})

router.get('/signup', async (req, res) => {
    return res.render("signup")
})

router.get('/login', async (req, res) => {
    return res.render("login")
})

module.exports = router