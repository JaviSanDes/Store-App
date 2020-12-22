const Joi = require('joi');
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    dateOrder: { 
        type: String
    },
    shippingData: {
        name: {
          type: String,
          required: true,
        },
        country: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
            minlength: 5,
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
            maxlength: 8
        }
    },
    paymentData: {
      paymentMethod: String,
      firstName: String,
      lastName: String,
      cardNumber: String,
      expiration: String,
      cvcCode: String,
    },
    price: {
        pvp: {
          type: Number, 
        min: 0
        },
        total: {
          type: Number, 
          min: 0
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    products: [{productID: {type: mongoose.Schema.Types.ObjectId,ref: 'alimentos'}, quantity: {type: String}}]
});

const Order = mongoose.model('Order', OrderSchema);

function validateOrder(user) {
    const schema =  Joi.object({
        shippingData: Joi.object().keys({
            name: Joi.string().required(),
            country: Joi.string().required(),
            address: Joi.string().min(5).required(),
            phone: Joi.string().min(6).max(9).required(),
            zipCode: Joi.string().min(5).max(8).required(),
        }),
        paymentData: Joi.object().keys({
            paymentMethod:  Joi.string().required(),
            firstName:  Joi.string().required(),
            lastName:  Joi.string().required(),
            cardNumber:  Joi.string().required(),
            expiration:  Joi.string().required(),
            cvcCode:  Joi.string().required(),
        }),
        price: Joi.object().keys({
            pvp: Joi.number().min(0).required(),
            total: Joi.number().min(0).required(),
        }),
        user: Joi.string().min(5).max(100).required(),
        products: Joi.array(),
    });
  
    return schema.validate(user);
}

exports.Order = Order;
exports.validate = validateOrder;