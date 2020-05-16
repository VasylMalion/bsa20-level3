const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');
const Fighter = require('../models/fighter');

const router = Router();

router.get('/', (req, res) => {
    const allFighters = FighterService.getAllFighters();
    if (allFighters) {
        res.json(allFighters);
    } else {
        res.json(400).json({
            error: true,
            message: 'No fighters',
        });
    }
});

router.get('/:id', (req, res) => {
    const fighterId = req.params.id;
    const findUser = FighterService.searchFighter({ fighterId });
    if (findUser) {
        res.json(findUser);
    } else {
        res.status(404).json({
            error: true,
            message: 'There is no such fighter',
        });
    }
});

router.post('/', createFighterValid, (req, res) => {
    const fighter = new Fighter(req.body);
    const result = FighterService.createFighter(fighter);
    if (result) {
        res.json(result);
    } else {
        res.status(400).json({
            error: true,
            message: 'Error creating fighter',
        });
    }
});

router.put('/:id', updateFighterValid, (req, res) => {
    const fighterId = req.params.id;
    const fighterData = req.body;
    const updatedFighter = FighterService.updateFighter(fighterId, fighterData);
    if (updatedFighter) {
        res.json(updatedFighter);
    } else {
        res.status(404).json({
            error: true,
            message: 'There is no such fighter',
        });
    }
});

router.delete('/:id', (req, res) => {
    const fighterId = req.params.id;
    const deletedFighter = FighterService.deleteFighter(fighterId);
    if (deletedFighter) {
        res.json(deletedFighter);
    } else {
        res.status(404).json({
            error: true,
            message: 'There is no such fighter',
        });
    }
});

module.exports = router;