const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const order = require('../routes/order');
const alimentos = require('../routes/alimentos');
const error = require('../middleware/error');
var cors = require('cors');

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/order', order);
  app.use('/api/alimentos', alimentos);
  app.use(error);
}