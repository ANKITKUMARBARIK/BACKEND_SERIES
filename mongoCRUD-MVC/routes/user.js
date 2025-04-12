const express = require("express")


const router = express.Router()

const { handleGetAllUsers, handleGetAllUsersHtml, handleCreateNewUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById } = require('../controllers/user.js')

// Routes
router.get('/html', handleGetAllUsersHtml)  // list all users on HTML format

router.route('/')
    .get(handleGetAllUsers)  // list all users
    .post(handleCreateNewUser)  // create user

router.route('/:id')
    .get(handleGetUserById)  // list user with id
    .patch(handleUpdateUserById)  // update user with id
    .delete(handleDeleteUserById)  // delete user with id

module.exports = router