const USERAUTH = require("../models/userAuth.js")

const bcrypt = require("bcrypt") // hashing psswd for security

const { v4: uuidv4 } = require("uuid")

// sessions setUser
const { setUser } = require("../service/auth.js")

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.json({ msg: "all fields are req..." })

    const user = await USERAUTH.findOne({ email })
    if (user) return res.json({ msg: "User already exists" })

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt) // server- encode the user password for security purpose, then store in database.

    const result = await USERAUTH.create({
        name,
        email,
        password: hash
    })
    return res.redirect("/")
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body
    if (!email || !password) return res.json({ msg: "all fields are req..." })

    const user = await USERAUTH.findOne({ email })
    if (!user) return res.render("login", { error: "Invalid username or password" })

    // Compare Password - once user send psswd..then, sever encode the user password and compare the user password and database stored password 
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.redirect("/login")

    // sessionId
    const sessionId = uuidv4()  //👉 Server ek unique session ID generate karta hai using uuid.
    setUser(sessionId, user)    // Ab ye sessionId ke against user ka data server ne apne paas memory me store kar liya ✅
    res.cookie('uid', sessionId) // 👉 Server ne user ko ek uid naam ki cookie bhej di, jisme session ID hai:
    // Isse user ke browser me session ID store ho gayi.
    // Agli baar jab user request karega, toh uid cookie ke through server ko sessionId mil jayega.

    return res.redirect("/")
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}