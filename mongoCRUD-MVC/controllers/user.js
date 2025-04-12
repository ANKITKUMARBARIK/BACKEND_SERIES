const User = require('../models/user.js')

async function handleGetAllUsersHtml(req, res) {
    const allDbUsers = await User.find({})
    const html = `
        <ul>
            ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
        <ul>
        `
    return res.send(html)
}

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
}

async function handleCreateNewUser(req, res) {
    const body = req.body
    if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) return res.status(400).json({ msg: "All fields are req..." })
    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,
    })
    console.log("result: ", result)
    return res.status(201).json({ msg: "success", id: result._id })
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "User Not Found" })
    return res.json(user)
}

async function handleUpdateUserById(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, { lastName: "AI" })
    if (!user) return res.status(404).json({ error: "User Not Found" })
    return res.json({ status: "success" })
}

async function handleDeleteUserById(req, res) {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ error: "User Not Found" })
    return res.json({ status: "success" })
}

module.exports = {
    handleGetAllUsersHtml,
    handleGetAllUsers,
    handleCreateNewUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
}