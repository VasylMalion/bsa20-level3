const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { userValidation } = require('../middlewares/user.validation.middleware');

const router = Router();

router.post('/login',  (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = AuthService.login({email});
        if(!user) {
            return res.status(401).send({
                error: true,
                message: "1"
            });
        }
        if (password === user.password) {
            return res.json(user);
        } else {
            return res.status(401).js({
                error: true,
                message: "2"
            });
        }
        // TODO: Implement login action
        // res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;