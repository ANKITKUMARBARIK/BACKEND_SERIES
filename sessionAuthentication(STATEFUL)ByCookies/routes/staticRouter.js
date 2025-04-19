const express = require("express")

const router = express.Router()

const User = require("../models/user.js")

router.get('/', async (req, res) => {
    // mujhe aisa chahiye ki ek user1 hai jisne emailid se login kia aur usse sirf apna Data Analytics dikhe ..dusre user2 ka nhi..understood
    if (!req.user) return res.redirect('/login') // iss condition ko yaha islie likhe ki '/' route pe koi request jaega toh check hoga pehle user login hai ya nhi...
    const user = await User.find({ createdBy: req.user._id })
    // const user = await User.find({})
    return res.render("form", { allUser: user })          //form.ejs
})

router.get('/signup', (req, res) => {
    return res.render("signup")
})

router.get('/login', (req, res) => {
    return res.render("login")
})

module.exports = router