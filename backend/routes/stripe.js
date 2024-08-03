const express = require('express');
const stripeRouter = express.Router();
const createStripe = require('../controllers/stripe')
stripeRouter.post('/pay',createStripe);

module.exports = stripeRouter;
