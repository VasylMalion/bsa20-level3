const { user } = require('../models/user');
const {isEmail, isEmpty, isPhoneNumber, minLength} = require("./validation");
const { User } = require('../models/user');

const createUserValid = (req, res, next) => {

    const data = req.body;
    const errors = validUser(data);

    if (errors.length > 0) {
        errors.push('-------------------------');
        const message = errors.forEach( error => console.log(error));
        errors.length = 0;
        return res.status(400).json({
            error: true,
            message
        })
    }

    next();
};

const updateUserValid = (req, res, next) => {

    const data = req.body;
    const errors = validUser(data);

    if (errors) {
        const message = errors.forEach( error => console.log(error));
        errors.length = 0;

        return res.status(400).json({
            error: true,
            message
        })
    }
    next();
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

    return errors;
};


exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;