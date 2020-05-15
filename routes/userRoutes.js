const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');
const User = require('../models/user').User;

const router = Router();

router.get('/', (req, res) => {
    const allUsers = UserService.getAllUsers();
    if (allUsers) {
        res.json(allUsers);
    } else {
        res.json(400).json({
            error: true,
            message: 'No users',
        });
    }
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const findUser = UserService.searchUser({ userId });
    if (findUser) {
        res.json(findUser);
    } else {
        res.status(404).json({
            error: true,
            message: 'There is no such user',
        });
    }
});

router.post('/', (req, res) => {
    const user = new User(req.body);
    const result = UserService.createUser(user);
    if (result) {
        res.json(result);
    } else {
        res.status(400).json({
            error: true,
            message: 'Error creating',
        });
    }
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = UserService.updateUser(userId, userData);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({
            error: true,
            message: 'There is no such user',
        });
    }
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    const deletedUser = UserService.deleteUser(userId);
    if (deletedUser) {
        res.json(deletedUser);
    } else {
        res.status(404).json({
            error: true,
            message: 'There is no such user',
        });
    }
});

module.exports = router;