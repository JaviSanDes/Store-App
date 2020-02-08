const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  const db = "";
  mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log("conectado"));
}


