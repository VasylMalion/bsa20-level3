const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', (req, res) => {
    const users = UserService.getAllUsers();
    if (users) {
        res.json(users);
    } else {
        res.json(400).json({
            error: true,
            message: 'No users in db',
        });
    }
});

// @route GET /api/users/:id
// @desc Returns specific user by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const foundUser = UserService.search({ id });
    if (foundUser) {
        res.json(foundUser);
    } else {
        res.status(404).json({
            error: true,
            message: 'No user with such id',
        });
    }
});

// @route POST /api/users
// @desc Creates user
router.post('/', createUserValid, (req, res) => {
    const user = new User(req.body);
    const result = UserService.createUser(user);
    if (result) {
        res.json(result);
    } else {
        res.status(400).json({
            error: true,
            message: 'Error has occured',
        });
    }
});

// @route PUT /api/users/:id
// @desc Updates user information details
router.put('/:id', updateUserValid, (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;
    const updatedUser = UserService.updateUser(id, userInfo);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({
            error: true,
            message: 'No user with such id',
        });
    }
});

// @route DELETE /api/users/:id
// @desc Removes user from db by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const deletedUser = UserService.deleteUser(id);
    if (deletedUser) {
        res.json(deletedUser);
    } else {
        res.status(404).json({
            error: true,
            message: 'No user with such id',
        });
    }
});

module.exports = router;