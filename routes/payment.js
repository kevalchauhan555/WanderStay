const express = require('express');
const payment_route = express();
const paymentController = require('../controllers/paymentController');


payment_route.post('/createOrder', paymentController.createOrder);

module.exports = payment_route;
