const express = require("express")
const router = express.Router()
const { handleSignup, handleSignin, handleLogout } = require("../controllers/user.js")

router.post('/signup', handleSignup)
router.post('/signin', handleSignin)
router.get('/logout', handleLogout)

module.exports = router