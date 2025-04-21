const express = require("express")
const router = express.Router()
const { handleGenerateShortId, handleGetURL, handleGetAnalytics } = require("../controllers/url.js")

router.post('/', handleGenerateShortId)
router.get('/:shortId',handleGetURL)
router.get('/analytics/:shortId',handleGetAnalytics)

module.exports = router