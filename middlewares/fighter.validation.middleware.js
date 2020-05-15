const {isEmpty, typeData, minNum, maxNum} = require('./validation');

const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    const data = req.body;

    validFighter(data, res);
    next();
}

const updateFighterValid = (req, res, next) => {
    const data = req.body;

    validFighter(data, res);
    next();
}

const validFighter = (fighter, res) => {
    let errors = [];

    if (isEmpty(fighter.name)) {
        errors.push(`Field 'name' is empty!`);
    }
    if (isEmpty(fighter.health)) {
        errors.push(`Field 'health' is empty!`);
    } else if (typeData(Number(fighter.health))) {
        errors.push("'Health' is not number!");
    }
    if (isEmpty(fighter.power)) {
        errors.push(`Field 'power' is empty!`);
    } else if (typeData(Number(fighter.power))) {
        errors.push("'Power' is not number!");
    } else if (!maxNum(fighter.power, 100)) {
        errors.push("'Power' cannot be greater than 100");
    }
    if (isEmpty(fighter.defense)) {
        errors.push("'Defense' is not number!");
    } else if (typeData(Number(fighter.defense))) {
        errors.push("'Defense' is not number!");
    } else if (!maxNum(fighter.defense, 9) ||
        !minNum(fighter.defense, 1)) {
        errors.push("'Defense' should be between 1 and 9");
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

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;