const URL = require("../models/url.js")
const { nanoid } = require("nanoid")

async function handleGenerateNewShortURL(req, res) {
    const body = req.body
    if (!body.url) return res.status(400).json({ error: "url is required" })
    const nanoID = nanoid(8)
    const result = await URL.create({
        shortId: nanoID,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.status(201).json({ id: nanoID })
}

async function handleGetURL(req, res) {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        { shortId: shortId },  // find / filter
        { $push: { visitHistory: { timestamp: Date.now() } } }  // update
    )
    return res.redirect(entry.redirectURL) // ⬇️ This line sends the user from the short URL to the actual full URL
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId: shortId }) // Finds/Search and returns the first document from the database that matches the given condition.
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetURL,
    handleGetAnalytics
}