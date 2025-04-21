const USER = require("../models/user.js")
const bcrypt = require("bcrypt")
const { setUser } = require("../service/auth.js")

async function handleSignup(req, res) {
    const { name, email, role, password } = req.body
    if (!name || !email || !role || !password) return res.status(400).json({ msg: 'all fields req...' })
    const user = await USER.findOne({ email })
    if (user) return res.json({ msg: 'User already exists' })
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await USER.create({
        name,
        email,
        role,
        password: hash,
    })

    return res.redirect('/')
}

async function handleLogin(req, res) {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ msg: 'all fields req...' })
    const user = await USER.findOne({ email })
    if (!user) return res.redirect('/login')
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.redirect('/login')

    // when client login, then server send token to the client browser 
    const token = setUser(user)
    res.cookie('uid', token)

    return res.redirect('/')
}

module.exports = {
    handleSignup,
    handleLogin
}