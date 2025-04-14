// static Router for frontend

const express = require("express")

const router = express.Router()

const URL = require("../models/url.js")

// make for frontend page
router.get('/', async (req, res) => {
    const result = await URL.find({})
    return res.render("home", { urls: result })  // "home" -> home.ejs
    // {urls: result}: This is an object that passes data to the view. The key urls will be available inside the home.ejs file, and its value will be the allUrls variable, which can contain an array or data of URLs.
})

module.exports = router