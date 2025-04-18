const { getUser } = require("../service/auth.js")

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uid
    if (!userUid) return res.redirect('/login')
    const user = getUser(userUid)
    if (!user) return res.redirect('/login')
    req.user = user
    next()
}

async function checkRestrict(req, res, next) {
    const userUid = req.cookies?.uid
    const user = getUser(userUid)
    req.user = user
    next()
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkRestrict
}