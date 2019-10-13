const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  
  const db = "mongodb+srv://JavSan:lfVx9DKl6nwARxp5@cluster0-nhl1y.azure.mongodb.net/vidly?retryWrites=true&w=majority";//config.get('db');
  //const dv = "mongodb://localhost/vidly"
  mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log("conectado"));

}


