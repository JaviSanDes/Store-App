const express = require('express');
const router = express.Router();
const {Alimento} = require('../models/alimentos');

router.get('/', async (req, res) => {
    const alimentos = await Alimento.find().sort('valoracion');
    res.send(alimentos);
});

router.get('/selected', async (req, res) => {
    let param = req.query.foo;
    const alimentos = await Alimento.find({grupo: param}).sort('valoracion');
    res.send(alimentos);
});

router.get('/search', async (req, res) => {
    let param = `^${req.query.foo}`;
    const alimentos = await Alimento.find({ nombre: {$regex: param,$options:'i' } });
    console.log(alimentos)
    res.send(alimentos);
});

router.get('/oferta', async (req, res) => {
    let param = req.query.foo
    console.log(param)
    const alimentos = await Alimento.find({oferta: true }).sort('valoracion');
    console.log(alimentos)
    res.send(alimentos);
});

module.exports = router;