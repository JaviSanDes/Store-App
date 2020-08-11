const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    measure: String,
    group: String,
    image: String,
    name: String,
    description: String,
    price: Number,
    offer: Number,
    assessment: Number,
    quantity: Number,
});

const Product = mongoose.model('products', productsSchema);
exports.Product = Product;
