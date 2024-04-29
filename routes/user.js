const express = require('express');
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteById, handleCreateNewUser } = require('../controllers/user')

const router = express.Router();

router
    .route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

router
    .route('/:id')
    .get(handleGetUserById)
    .put(handleUpdateUserById)
    .delete(handleDeleteById)

module.exports = router;