const Joi = require('joi');
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    dateOrder: { 
        type: String
    },
    orderData: {
        country: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        deliveryMethod: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        address: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 200
        },
        phone: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 9
        },
        zipCode: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 5
        }
    },
    price: {
        type: Number, 
        min: 0
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    products: [{productID: {type: mongoose.Schema.Types.ObjectId,ref: 'alimentos'}, vezesComprado: {type: String}}]
});

const Order = mongoose.model('Order', OrderSchema);

function validateOrder(user) {
    const schema = {
        products: Joi.array(),
        orderData: Joi.object().keys({
            phone: Joi.string().min(6).max(9).required(),
            address: Joi.string().min(5).max(200).required(),
            zipCode: Joi.string().min(5).max(5).required(),
            country: Joi.string().min(5).max(50).required(),
            deliveryMethod: Joi.string().min(5).max(50).required()
        }),
        customerId: Joi.string().min(5).max(100).required()
    };
  
    return Joi.validate(user, schema);
}

exports.Order = Order;
exports.validate = validateOrder;