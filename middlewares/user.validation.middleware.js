const { user } = require('../models/user');
const { check, validationResult } = require('express-validator');
const {isEmail, isEmpty, isPhoneNumber, minLength} = require("./validation");

const createUserValid = (req, res, next) => {

    const data = req.body;
    validUser(data);

    next();
};

const updateUserValid = (req, res, next) => {

    const data = req.body;
    validUser(data);

    next();
};

const checkUserValid = (data) => {

    check(data.firstName, "Поле пусте!").isEmpty().isLength({max: 20});
    check(data.firstName, "Поле пусте!").isEmpty();
    console.log(validationResult);
    check(data.firstname, "Поле пусте!").isEmpty();
    check(data.firstname, "Поле пусте!").isEmpty();

    return
};

const validUser = (data) => {
    let errors = [];

    if (isEmpty(data.firstName)) {
        errors.push(`Field 'firstName' is empty!`);
    }
    if (isEmpty(data.lastName)) {
        errors.push(`Field 'lastName' is empty!`);
    }
    if (isEmpty(data.email)) {
        errors.push(`Field 'email' is empty!`);
    } else if (!isEmail(data.email)) {
        errors.push("Email is incorrect");
    }
    if (isEmpty(data.phoneNumber)) {
        errors.push(`Field 'phoneNumber' is empty!`);
    } else if (!isPhoneNumber(data.phoneNumber)) {
        errors.push("Phone number is incorrect");
    }
    if (isEmpty(data.password)) {
        errors.push(`Field 'password' is empty!`);
    } else if (!minLength(data.password, 3)) {
        errors.push("The password is short");
    }

    if (errors) {

        const message = errors.forEach( error => console.log(error));
        errors.length = 0;

        return res.status(400).json({
            error: true,
            message
        })
    }
};


exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;