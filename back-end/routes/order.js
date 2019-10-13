const {Order, validate} = require('../models/order');
const express = require('express');
const router = express.Router();
const {User} = require('../models/user'); 
const {Alimento} = require('../models/alimentos');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await User.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');
  
    if(!req.body.products) return res.status(400).send('No products.');
  
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let dateOrder= `${year}/${month}/${day}/${hours}:${minutes}`;
    dateOrder = dateOrder.toString();
    const price = '34';
    
    let order = new Order({
        dateOrder: dateOrder,
        orderData: {
            country: req.body.orderData.country,
            deliveryMethod: req.body.orderData.deliveryMethod,
            address: req.body.orderData.address,
            phone: req.body.orderData.phone,
            zipCode: req.body.orderData.zipCode
        },
        price: price,
        customer: req.body.customerId,
        products: req.body.products
    });

    await order.save();
    var prueba = 'string de prueba'
    res.send(prueba);
  });

  router.get('/', auth, async (req, res) => {
    let param = req.query.id;
    let order = await Order.find({customer: param}).sort('dateOrder');
    let orderReturn = [];
    let products = [];
    async function crarOrder() {
        for (const [index, item] of order.entries()) {
            orderReturn.push({
                dateOrder: item.dateOrder,
                orderData: item.orderData,
                price: item.price,
                products: []
            })
            await prueba(item)
            orderReturn[index].products = [...products];
        }
        async function prueba(elem) {
            products = [];
            for (const item of elem.products) {
                product = await Alimento.find({_id: item.productID});
                products.push({
                    cantidad: product[0].cantidad,
                    grupo: product[0].grupo,
                    imagen: product[0].imagen,
                    medida: product[0].medida,
                    nombre: product[0].nombre,
                    precio: product[0].precio
                })
            }
        }
    }
    await crarOrder();
    res.send(orderReturn);
  });

  module.exports = router;