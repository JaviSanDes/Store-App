const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {Order, validate} = require('../models/order');
const { User } = require('../models/user'); 
const { Product } = require('../models/products');


router.post('/newOrder', auth, async (req, res) => {
  console.log(req.body)
  const { error } = validate(req.body); 
  console.log(error)
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
  res.send('You order has been complited sucseffully');
  
});

router.post('/', auth, async (req, res) => {
  const orders = await Order.find({user: req.body.userId});
  if(!orders) return res.status(400).send("not orders...");

  const end = orders.map(async order => {
    const product = order.products.map(async product => {
      const p = await Product.findById(product.productID);
      p.quantity = product.quantity;
      return p;
    });
    const products = await Promise.all(product);
    const orderData = {...order};
    orderData._doc.products = [...products];
    return orderData._doc
  })
  const s = await Promise.all(end);
  res.send(s);
})

module.exports = router; 