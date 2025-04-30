const USER = require("../models/user.js")
const bcrypt = require("bcrypt")
const { createTokenForUser } = require("../services/auth.js")

async function handleSignup(req, res) {
    const { fullName, email, password } = req.body
    if (!fullName || !email || !password) return res.status(400).json({ msg: 'all fields req...' })
    const user = await USER.findOne({ email })
    if (user) return res.render("signup", { signupError: 'User Already Exists' })
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const result = await USER.create({
        fullName,
        email,
        password: hash,
    })

    return res.redirect('/')
}

async function handleSignin(req, res) {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ msg: 'all fields req...' })
    const user = await USER.findOne({ email })
    if (!user) return res.render('signin', { signinError: 'Invalid Email or Password' })
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.render('signin', { signinError: 'Invalid Email or Password' })
    const token = createTokenForUser(user)
    res.cookie('token', token)

    return res.redirect('/')
}

async function handleLogout(req, res) {
    res.clearCookie('token');
    return res.redirect('/');
}

module.exports = {
    handleSignup,
    handleSignin,
    handleLogout
}