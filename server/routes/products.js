const express = require('express');

const router = express.Router();
const { Product } = require('../models/products');

router.get('/legumes', async (req, res) => {
    const products = await Product.find({ group: 'legumes' }).sort('name');
    res.send(products);
});

router.get('/meat', async (req, res) => {
    const products = await Product.find({ group: 'meat' }).sort('name');
    res.send(products);
});

router.get('/vegetables', async (req, res) => {
    const products = await Product.find({ group: 'vegetables' }).sort('name');
    res.send(products);
});

router.get('/fruits', async (req, res) => {
    const products = await Product.find({ group: 'fruits' }).sort('name');
    res.send(products);
});

router.get('/fish', async (req, res) => {
    const products = await Product.find({ group: 'fish' }).sort('name');
    res.send(products);
});

router.get('/drinks', async (req, res) => {
    const products = await Product.find({ group: 'drinks' }).sort('name');
    res.send(products);
});

router.get('/frozen', async (req, res) => {
    const products = await Product.find({ group: 'frozen' }).sort('name');
    res.send(products);
});

router.get('/pasta', async (req, res) => {
    const products = await Product.find({ group: 'pasta' }).sort('name');
    res.send(products);
});

router.get('/sweets', async (req, res) => {
    const products = await Product.find({ group: 'sweets' }).sort('name');
    res.send(products);
});

router.get('/sauces', async (req, res) => {
    const products = await Product.find({ group: 'sauces' }).sort('name');
    res.send(products);
});

router.get('/offer', async (req, res) => {
    const products = await Product.find({ offer: 50 }).sort('name');
    res.send(products);
});

router.get('/search/:id', async (req, res) => {
    const param = req.params.id;
    const products = await Product.find({
        name: { $regex: param, $options: 'i' },
    }).sort('name');
    res.send(products);
});

module.exports = router;
