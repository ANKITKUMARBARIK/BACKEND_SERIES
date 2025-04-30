const { validateToken } = require("../services/auth.js")

function checkForAuthenticationCookie(req, res, next) {
    const token = req.cookies?.token
    if (!token) return next()
    const userPayload = validateToken(token)
    if (!userPayload) return res.redirect('/signin')
    req.user = userPayload

    return next()
}

module.exports = {
    checkForAuthenticationCookie
}