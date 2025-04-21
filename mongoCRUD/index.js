const express = require("express")
const app = express()
const PORT = 8000

// middlewares - plugin
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const mongoose = require("mongoose")

// Connection // user-db -> db(database) name
mongoose.connect("mongodb://127.0.0.1:27017/userdb-app-1")
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('Mongo Error ', err))

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
}, { timestamps: true }) // timestamps -> track created/updated time

// Model
const User = mongoose.model("user", userSchema) // "user" - collection

// list all users on HTML format
app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({})
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    <ul>
    `
    res.send(html)
})


app.route('/api/users')
    .get(async (req, res) => { // list all users
        const allDbUsers = await User.find({})
        return res.json(allDbUsers)
    }).post(async (req, res) => { // create user
        const body = req.body
        if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {
            return res.status(400).json({ msg: "All fields are req..." })
        }
        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle,
        })
        console.log("result: ", result)
        return res.status(201).json({ msg: "success" })
    })


app.route('/api/users/:id')
    .get(async (req, res) => { // list user with id
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ error: "User Not Found" })
        return res.json(user)
    }).patch(async (req, res) => { // update user with id
        await User.findByIdAndUpdate(req.params.id, { lastName: 'Ai' })
        return res.json({ status: "Success" })
    }).delete(async (req, res) => { // update user with id
        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: "Success" })
    })


app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`))