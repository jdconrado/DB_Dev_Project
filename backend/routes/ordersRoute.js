const express = require('express');
const router = express.Router();

const ordersCtrl = require('../controllers/OrdersCtrl');
const orDetCtrl = require('../controllers/orderDetailCtrl');

router.post('/create', ordersCtrl.create);
router.post('/DETAILS/create', orDetCtrl.create);
