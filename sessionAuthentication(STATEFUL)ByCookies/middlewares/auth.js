const { getUser } = require("../service/auth.js")

async function restrictToLoggedinUserOnly(req, res, next) {
    // Agar user koi bhi request krta h like /profile...toh check krenge ki user browser ke pass cookie hai ki nhi...agar nhi h toh usse fhirse login page pe rakho.. 
    const userUid = req.cookies?.uid  // Check if 'uid' cookie exists
    if (!userUid) return res.redirect('/login')

    // agar user browser ke pass cookie(sessionId) hai...toh ye bhi check krna padega ki wo sessionId(user) server ke pass hai ya nhi
    const user = getUser(userUid)
    if (!user) return res.redirect('/login')

    // agar sab shi h toh req.user = user -> isse n ab user agar like /profile ye sab routes pe jata h toh wo only loggedin user ka data wo route pe le sakta h....note:- only loggedin user!!
    req.user = user  // req.user -> .user ek custom property bane aur req object mein req.user ke andar only loggedin user store ho jaega.

    // Example Scenario:
    // User 1 logs in and gets a session ID stored in a cookie.
    // User 1 tries to access /profile route. In that case, req.user will contain User 1's data.
    // User 2 logs in (different session ID and cookie).
    // User 2 accesses /profile. Now, req.user will contain User 2's data.
    // User 1 or any other user cannot access User 2's data unless they are authenticated with their own session ID.

    // Continue to the next middleware or route handler
    next()
}

// ye middleware basically check krega ..jaruri nhi h ki authenticate hona chahiye ya nhi...forcefully check nhi krenge..
// ye middleware islie banae ki main/home page pe bhi hume req.user ka access chahiye tha beacuse validate kr pae user already login h ya nhi agar h toh direct home/main page dikh jaega agar nhi h toh login page dikh jaega
async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid
    const user = getUser(userUid)
    req.user = user
    next()
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth
}

// restrictToLoggedinUserOnly se hum koi bhi route pe laga sakte hain jisse only loggedIn user hi wo page like home,about,contact ye sab mein ja sakta h
