const URL = require("../models/url.js")
const { nanoid } = require("nanoid")

async function handleGenerateShortId(req, res) {
    const body = req.body
    if (!body.url) return res.status(400).json({ msg: 'url is required' })
    const nanoId = nanoid(8)
    const result = await URL.create({
        shortId: nanoId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })

    // return res.status(201).json({ msg: 'success', id: result.shortId })
    return res.render('home', { id: result.shortId })
}

async function handleGetURL(req, res) {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        { shortId: shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    )

    return res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId: shortId })

    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = {
    handleGenerateShortId,
    handleGetURL,
    handleGetAnalytics
}