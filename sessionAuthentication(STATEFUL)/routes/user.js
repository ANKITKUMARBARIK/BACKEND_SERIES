const express = require("express")

const router = express.Router()

const { handleCreateNewUser, handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById } = require("../controllers/user.js")

router.route('/')
    .post(handleCreateNewUser)
    .get(handleGetAllUsers)

router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

module.exports = router