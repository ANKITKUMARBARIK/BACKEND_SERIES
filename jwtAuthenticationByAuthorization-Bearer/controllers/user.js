const USER = require("../models/user.js")
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")
const { setUser } = require("../service/auth.js")

async function handleSignup(req, res) {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ msg: 'all fields req...' })
    const user = await USER.findOne({ email })
    if (user) return res.json({ msg: 'User already exists' })
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const result = await USER.create({
        name,
        email,
        password: hash
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
    const token = setUser(user)
    // server client ko jwt token bhejega using json -> Authorization-Bearer way ...ab client ko apne browser pe ek custom headers banana padega jisme wo token store krega.. - header: {Authorization: Bearer <token>}
    return res.json({ token })
}

module.exports = {
    handleSignup,
    handleLogin
}