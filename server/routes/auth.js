const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');

/*
router.post('/verifyToken', auth, async (req, res) => {
  console.log(req.user.name)
  const user = req.user.name;
  const userId = req.user._id;
  const isAdmin = req.user.isAdmin;
  res.send({ user: user, userId: userId, isAdmin: isAdmin });
});
*/

router.post('/signIn', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();

  res.header('Access-Control-Expose-Headers', 'x-auth-token, Uid');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header('x_auth_token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
});


router.post('/signUp', async (req, res) => {
  console.log("ENTRAAA")
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('Access-Control-Expose-Headers', 'x-auth-token, Uid');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });
  return schema.validate(req);
}

module.exports = router; 