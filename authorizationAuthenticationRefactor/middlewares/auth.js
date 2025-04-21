const { getUser } = require("../service/auth.js")

// AUTHENTICATION middleware
function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.uid
    if (!tokenCookie) return next()
    const user = getUser(tokenCookie)
    if (!user) return res.redirect('/login')
    req.user = user

    return next()
}


// AUTHORIZATION middleware
function restrictTo(roles = []) {   // role like - ADMIN, NORMAL
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login')
        // req.user.role -> basically ye role jwt token se aarha h 
        if (!roles.includes(req.user.role)) return res.end('UnAuthorized')

        return next()
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}