const express = require('express');
const router = express.Router();
const Human = require('../models/human');
const Joi = require('joi');

const getHuman = async (req, res, next) => {
    let human;

    if (req.params.id.length !== 24) return res.status(404).send('Invalid id.');
    try {
        human = await Human.findById(req.params.id);
        if (!human) return res.status(404).send('Cannot find human.');
    } catch (error) {
        return res.status(500).send(`Error ${error}.`);
    }
    res.human = human;
    next();
}

router.get('/human/', async (req, res) => {
    try {
        const human = await Human.find();
        res.json(human);
    } catch (error) {
        return res.status(500).send(`Error ${error}.`);
    }
});

router.get('/human/:id', getHuman, (req, res) => {
    res.json(res.human);
});

router.post('/human/', async (req, res) => {
    const human = new Human({
        name: req.body.name,
        email: req.body.email
    });

    try {
        const new_human = await human.save();
        res.status(201).json(new_human);
    } catch (error) {
        res.status(500).send(`Error ${error}.`);
    }
});

router.put('/human/:id', getHuman, async (req, res) => {
    try {
        const human = res.human;
        if (human.name) human.name = req.body.name;
        if (human.email) human.email = req.body.email;
        const updated_human = await human.save();
        res.json(updated_human);
    } catch (error) {
        res.status(500).send(`Error ${error}.`);
    }
});

router.delete('/human/:id', getHuman, async (req, res) => {
    try {
        const deleted_human = res.human.name;
        await res.human.remove();
        res.send(`${deleted_human} is deleted.`);
    } catch (error) {
        return res.status(500).send(`Error ${error}.`);
    }
});

module.exports = router;
