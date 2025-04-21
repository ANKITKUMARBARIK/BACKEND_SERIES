const User = require("../models/user.js")

async function handleCreateNewUser(req, res) {
    const body = req.body
    if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) return res.status(400).json({ msg: "all fileds are req..." })
    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,
        createdBy: req.user._id  // remember jab hum sessionId match kie the browser aur server ka fhir agar match ho jaega toh wo user req.user ke andar store kr die the..aur req.user ke andar only loggedin user ki details hi rahegi..dusre ki nhi....---- bas jabhi bhi koi main/home page mein kuch krega toh wo user ki _id bhi aa jaegi.
    })
    // return res.status(201).json({ msg: "success", id: result._id })
    return res.redirect("/")
}

async function handleGetAllUsers(req, res) {
    const user = await User.find({})
    return res.json(user)
}

async function handleGetUserById(req, res) {
    const id = req.params.id
    const user = await User.findById(id)
    return res.json(user)
}

async function handleUpdateUserById(req, res) {
    const id = req.params.id
    const user = await User.findByIdAndUpdate(id, { lastName: "AI" })
    return res.json({ status: "success", id: id })
}

async function handleDeleteUserById(req, res) {
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    return res.json({ status: "success", id: id })
}

module.exports = {
    handleCreateNewUser,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById
}