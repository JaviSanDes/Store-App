const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {Order, validate} = require('../models/order');
const { User } = require('../models/user'); 

router.post('/', auth, async (req, res) => {
  console.log(req.body);
});

router.post('/newOrder', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const userExist = await User.findById(req.body.user);
  if (!userExist) return res.status(400).send('Invalid user.');

  if(!req.body.products) return res.status(400).send('No products.');

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const dateOrder= `${year}/${month}/${day}/${hours}:${minutes}`.toString();

  const { shippingData, paymentData, price, user, products } = req.body;
  
  let order = new Order({
    dateOrder,
    shippingData,
    paymentData,
    price,
    user,
    products,
  });

  await order.save();
  var prueba = 'string de prueba'
  res.send(prueba);
});

module.exports = router; 


/*
shippingData: {
  name: shippingData.name,
  country: shippingData.country,
  address: shippingData.address,
  phone: shippingData.phone,
  zipCode: shippingData.zipCode,
},
paymentData: {
  paymentMethod:  paymentData.paymentMethod,
  firstName:  paymentData.firstName,
  lastName:  paymentData.lastName,
  cardNumber:  paymentData.cardNumber,
  expiration:  paymentData.expiration,
  cvcCode:  paymentData.cvcCode,
},
price: {
  pvp: price.pvp,
  total: price.total,
},
*/